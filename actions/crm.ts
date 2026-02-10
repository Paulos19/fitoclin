"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { sendEmail, getWelcomeTemplate } from "@/lib/mail";
import { LeadStatus } from "@prisma/client";

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
// 4. BUSCAR LEADS (Lista Completa)
// ==========================================================
export async function getLeads() {
  const session = await auth();
  if (!session) return [];

  const whereClause = session.user.role === "ADMIN" || session.user.role === "SECRETARY"
    ? {} 
    : { professionalId: session.user.id };

  return await db.lead.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });
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