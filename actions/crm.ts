"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { sendEmail, getWelcomeTemplate } from "@/lib/mail";
import { LeadStatus } from "@prisma/client";
import * as XLSX from "xlsx";

// === FUNÇÕES DE IMPORTAÇÃO XLSX ===

export async function importLeadsFromXlsx(base64File: string) {
  const session = await auth();
  if (!session) return { success: false, message: "Não autorizado" };

  try {
    const buffer = Buffer.from(base64File, "base64");
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

    if (data.length <= 1) return { success: false, message: "Arquivo vazio ou sem dados" };

    const headers = data[0];
    const rows = data.slice(1);

    const mappedLeads = rows.map((row) => {
      // Mapeamento baseado na análise do arquivo
      const name = row[2] || "S/N"; // NOME COMPLETO
      const email = row[1]; // Endereço de e-mail
      const phone = row[10] || row[3] || ""; // WHASTSAPP principal ou secundário
      const source = row[25] || "Importado"; // Como soube...

      // Concatenar notas importantes
      const notesArray = [];
      if (row[12]) notesArray.push(`Objetivo: ${row[12]}`);
      if (row[16]) notesArray.push(`Doença: ${row[16]}`);
      if (row[18]) notesArray.push(`Alergia: ${row[18]}`);
      if (row[26]) notesArray.push(`Observação Importante: ${row[26]}`);

      const notes = notesArray.join(" | ");

      return {
        name: String(name).trim(),
        email: email ? String(email).trim().toLowerCase() : null,
        phone: String(phone).replace(/\D/g, ""),
        source: String(source),
        notes: notes || null,
        status: "NEW" as LeadStatus,
        professionalId: session.user.role === "PROFESSIONAL" ? session.user.id : null,
      };
    });

    // Filtro básico para evitar nomes vazios
    const validLeads = mappedLeads.filter(l => l.name !== "S/N");

    if (validLeads.length === 0) return { success: false, message: "Nenhum lead válido encontrado" };

    // Upsert: atualiza se já existe (mesmo nome + telefone), senão cria novo
    let created = 0;
    let updated = 0;

    for (const lead of validLeads) {
      const existing = await db.lead.findFirst({
        where: {
          name: { equals: lead.name, mode: 'insensitive' },
          phone: lead.phone,
        },
      });

      if (existing) {
        await db.lead.update({
          where: { id: existing.id },
          data: {
            email: lead.email || existing.email,
            source: lead.source,
            notes: lead.notes || existing.notes,
          },
        });
        updated++;
      } else {
        await db.lead.create({ data: lead });
        created++;
      }
    }

    revalidatePath("/dashboard/crm");
    return { success: true, message: `${created} novos leads importados, ${updated} atualizados.` };

  } catch (error) {
    console.error("Erro importLeadsFromXlsx:", error);
    return { success: false, message: "Erro ao processar arquivo" };
  }
}

const LeadSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  phone: z.string().min(10, "Telefone inválido"),
  email: z.string().email().optional().or(z.literal("")),
  source: z.string().min(1, "Origem obrigatória"),
  notes: z.string().optional(),
});

// === FUNÇÕES INTERNAS PARA N8N ===

// Fluxo Novo (Botão Manual: Apenas muda Status para POS_CONSULTA)
async function triggerN8nSetStatus(leadId: string) {
  const webhookUrl = process.env.N8N_SET_STATUS_WEBHOOK;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId }),
    });
  } catch (error) {
    console.error("Erro ao chamar n8n (SetStatus):", error);
  }
}

// ==========================================================
// 1. CRIAR LEAD
// ==========================================================
export async function createLead(formData: FormData) {
  const session = await auth();

  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email")?.toString() || "",
    source: formData.get("source"),
    notes: formData.get("notes")?.toString() || "",
  };

  try {
    const data = LeadSchema.parse(rawData);

    // Vincula ao profissional se quem criou for um
    const professionalId = session?.user?.role === "PROFESSIONAL" ? session.user.id : null;

    const newLead = await db.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        source: data.source,
        email: data.email === "" ? null : data.email,
        notes: data.notes === "" ? null : data.notes,
        status: "NEW",
        professionalId: professionalId,
      }
    });

    // Envio de Email
    if (newLead.email) {
      sendEmail({
        to: newLead.email,
        subject: "Recebemos o seu contacto! - FitoClin",
        html: getWelcomeTemplate(newLead.name)
      }).catch(err => console.error("Erro email:", err));
    }

    revalidatePath("/dashboard/crm");
    return { success: true, message: "Lead cadastrado com sucesso!" };

  } catch (error) {
    console.error("❌ ERRO CRIAR LEAD:", error);
    if (error instanceof z.ZodError) {
      return { success: false, message: `Erro de validação: ${error.message}` };
    }
    return { success: false, message: "Erro interno." };
  }
}

// ==========================================================
// 2. ATUALIZAR STATUS (Drag & Drop)
// ==========================================================
export async function updateLeadStatus(id: string, newStatus: string) {
  try {
    if (!Object.values(LeadStatus).includes(newStatus as LeadStatus)) {
      return { success: false, message: "Status inválido." };
    }

    await db.lead.update({
      where: { id },
      data: { status: newStatus as LeadStatus },
    });

    // NOTA: O gatilho automático via drag-and-drop foi removido propositalmente 
    // para priorizar o acionamento manual via botão, dando mais controle ao usuário.
    // Se desejar reativar, descomente o bloco abaixo.
    /*
    if (newStatus === "WON") {
       // lógica de automação automática...
    }
    */

    revalidatePath("/dashboard/crm");
    return { success: true, message: "Status atualizado" };
  } catch (error) {
    console.error("Erro updateLeadStatus:", error);
    return { success: false, message: "Erro ao mover lead" };
  }
}

// ==========================================================
// 3. DISPARO MANUAL (Botão "Iniciar Pós-Consulta")
// ==========================================================
export async function triggerPostConsultationManual(leadId: string) {
  try {
    const lead = await db.lead.findUnique({ where: { id: leadId } });
    if (!lead) return { success: false, message: "Lead não encontrado" };

    // 1. Chama o N8N para mudar status para POS_CONSULTA no banco (via webhook)
    await triggerN8nSetStatus(lead.id);

    // O Scheduler do N8N pegará esse lead depois para enviar a mensagem

    return { success: true };
  } catch (error) {
    console.error("Erro manual:", error);
    return { success: false };
  }
}

// ==========================================================
// 4. BUSCAR LEADS FILTRADOS (Lista com Filtros + Paginação)
// ==========================================================
export async function getLeadsFiltered(page: number = 1, query: string = "", statusFilter: string = "ALL") {
  const session = await auth();
  if (!session) return { data: [], totalPages: 0, currentPage: page, total: 0 };

  const PAGE_SIZE = 10;

  try {
    const whereClause: any = {};

    // Permissão
    if (session.user.role !== "ADMIN" && session.user.role !== "SECRETARY") {
      whereClause.professionalId = session.user.id;
    }

    // Filtro de status
    if (statusFilter !== "ALL") {
      if (statusFilter === "WON") {
        whereClause.status = { in: ["WON", "POS_CONSULTA", "POS_CONSULTA_ENVIADO"] };
      } else if (Object.values(LeadStatus).includes(statusFilter as LeadStatus)) {
        whereClause.status = statusFilter as LeadStatus;
      }
    }

    // Busca por nome
    if (query) {
      whereClause.name = { contains: query, mode: 'insensitive' };
    }

    const [leads, total] = await Promise.all([
      db.lead.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
      }),
      db.lead.count({ where: whereClause }),
    ]);

    return {
      data: leads,
      totalPages: Math.ceil(total / PAGE_SIZE),
      currentPage: page,
      total,
    };
  } catch (error) {
    console.error("Erro getLeadsFiltered:", error);
    return { data: [], totalPages: 0, currentPage: page, total: 0 };
  }
}


// ==========================================================
// 5. BUSCAR LEADS PAGINADOS (Kanban Otimizado)
// ==========================================================
export async function getLeadsPaginated(status: string, page: number) {
  const session = await auth();
  if (!session) return { success: false, data: [] };

  const PAGE_SIZE = 10;

  try {
    const whereClause: any = {};

    // Filtro de Permissão
    if (session.user.role !== "ADMIN" && session.user.role !== "SECRETARY") {
      whereClause.professionalId = session.user.id;
    }

    // LÓGICA ESPECIAL PARA COLUNA "WON"
    // Se o frontend pedir "WON", trazemos também os status subsequentes (POS_CONSULTA...)
    // Isso garante que o card não suma da tela após clicar no botão
    if (status === "WON") {
      whereClause.status = {
        in: ["WON", "POS_CONSULTA", "POS_CONSULTA_ENVIADO"]
      };
    } else {
      // Validação padrão para outras colunas
      if (Object.values(LeadStatus).includes(status as LeadStatus)) {
        whereClause.status = status as LeadStatus;
      } else {
        return { success: false, data: [] };
      }
    }

    const leads = await db.lead.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    });

    return { success: true, data: leads };
  } catch (error) {
    console.error("Erro getLeadsPaginated:", error);
    return { success: false, data: [] };
  }
}

// ==========================================================
// 6. BUSCAR PACIENTE POR LEAD (Para Agendamento)
// ==========================================================
export async function getPatientByLead(leadId: string) {
  try {
    const lead = await db.lead.findUnique({ where: { id: leadId } });
    if (!lead) return null;

    // Tenta encontrar o paciente pelo email ou pelo nome
    // (O ideal seria ter um campo patientId no Lead, mas como não tem, usamos heurística)
    let patient = null;

    if (lead.email) {
      patient = await db.patient.findFirst({
        where: { user: { email: lead.email } },
        select: { id: true }
      });
    }

    if (!patient) {
      patient = await db.patient.findFirst({
        where: { user: { name: lead.name } },
        select: { id: true }
      });
    }

    return patient?.id || null;
  } catch (error) {
    console.error("Erro getPatientByLead:", error);
    return null;
  }
}

// ==========================================================
// 7. ENVIAR CONVITE DE CADASTRO (WhatsApp com Token)
// ==========================================================
export async function sendRegistrationInvite(leadId: string) {
  const session = await auth();
  if (!session) return { success: false, message: "Não autorizado" };

  try {
    const lead = await db.lead.findUnique({ where: { id: leadId } });
    if (!lead) return { success: false, message: "Lead não encontrado" };

    // Gerar token único (usa cuid do Prisma)
    const token = `${leadId}-${Date.now().toString(36)}`;

    await db.lead.update({
      where: { id: leadId },
      data: { registrationToken: token },
    });

    // Montar link de cadastro
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const registerLink = `${baseUrl}/register/${token}`;

    // Montar mensagem WhatsApp
    const cleanPhone = lead.phone.replace(/\D/g, "");
    const finalPhone = cleanPhone.length >= 10 && !cleanPhone.startsWith("55") ? `55${cleanPhone}` : cleanPhone;

    const message = encodeURIComponent(
      `Olá, ${lead.name}! 😊\n\n` +
      `Você foi convidado(a) a se cadastrar na plataforma FitoClin.\n\n` +
      `Clique no link abaixo para completar seu cadastro:\n${registerLink}\n\n` +
      `Basta criar seu email e senha para acessar. 🌿`
    );

    const whatsappUrl = `https://wa.me/${finalPhone}?text=${message}`;

    revalidatePath("/dashboard/crm");
    revalidatePath("/dashboard/patients");

    return { success: true, whatsappUrl };
  } catch (error) {
    console.error("Erro sendRegistrationInvite:", error);
    return { success: false, message: "Erro ao gerar convite" };
  }
}