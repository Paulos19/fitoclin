"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { sendEmail, getWelcomeTemplate } from "@/lib/mail";
import { LeadStatus } from "@prisma/client"; // 👈 Importação Essencial para corrigir o erro de tipo

const LeadSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  phone: z.string().min(10, "Telefone inválido"),
  email: z.string().email().optional().or(z.literal("")),
  source: z.string().min(1, "Origem obrigatória"),
  notes: z.string().optional(),
});

// 1. CRIAR LEAD
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
    
    // Definir Dono do Lead (Se for profissional, vincula a ele. Se for admin/secretária, fica solto ou vincula a quem criou)
    const professionalId = session?.user?.role === "PROFESSIONAL" ? session.user.id : null;

    const newLead = await db.lead.create({ 
      data: {
        name: data.name,
        phone: data.phone,
        source: data.source,
        email: data.email === "" ? null : data.email,
        notes: data.notes === "" ? null : data.notes,
        status: "NEW", // O Prisma aceita a string se bater com o Enum
        professionalId: professionalId,
      } 
    });

    // Envio de Email de Boas-vindas (se houver email)
    if (newLead.email) {
      sendEmail({
        to: newLead.email,
        subject: "Recebemos o seu contacto! - FitoClin",
        html: getWelcomeTemplate(newLead.name)
      }).catch(err => console.error("Erro ao enviar email de boas-vindas:", err));
    }
    
    revalidatePath("/dashboard/crm");
    return { success: true, message: "Lead cadastrado com sucesso!" };

  } catch (error) {
    console.error("❌ ERRO AO CRIAR LEAD:", error);
    if (error instanceof z.ZodError) {
        return { success: false, message: `Erro de validação: ${error.message}` };
    }
    return { success: false, message: "Erro interno ao criar lead." };
  }
}

// 2. ATUALIZAR STATUS (Mover Card)
export async function updateLeadStatus(id: string, newStatus: string) {
  try {
    // Validação de Segurança: Verificar se o status existe no Enum
    if (!Object.values(LeadStatus).includes(newStatus as LeadStatus)) {
        return { success: false, message: "Status inválido." };
    }

    await db.lead.update({
      where: { id },
      data: { 
        status: newStatus as LeadStatus // 👈 Casting Correto
      },
    });
    
    // Revalidar é opcional aqui se estiver usando state local otimista, 
    // mas é bom para garantir consistência
    revalidatePath("/dashboard/crm");
    
    return { success: true, message: "Status atualizado" };
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    return { success: false, message: "Erro ao mover lead" };
  }
}

// 3. BUSCAR LEADS (Lista Completa - Legado ou uso específico)
export async function getLeads() {
  const session = await auth();
  if (!session) return [];

  // Filtro de Segurança
  const whereClause = session.user.role === "ADMIN" || session.user.role === "SECRETARY"
    ? {} // Admin/Secretária vê tudo
    : { professionalId: session.user.id }; // Profissional vê só os dele

  return await db.lead.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });
}

// 4. BUSCAR LEADS PAGINADOS (Para o Kanban Otimizado)
export async function getLeadsPaginated(status: string, page: number) {
  const session = await auth();
  if (!session) return { success: false, data: [] };

  const PAGE_SIZE = 10;

  try {
    // Validação do Status
    if (!Object.values(LeadStatus).includes(status as LeadStatus)) {
        return { success: false, data: [] };
    }

    // Construção do Filtro (Status + Permissão de Usuário)
    const whereClause: any = {
        status: status as LeadStatus // 👈 Casting
    };

    // Se NÃO for Admin/Secretária, aplica filtro de dono
    if (session.user.role !== "ADMIN" && session.user.role !== "SECRETARY") {
        whereClause.professionalId = session.user.id;
    }

    const leads = await db.lead.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    });
    
    return { success: true, data: leads };
  } catch (error) {
    console.error("Erro na paginação de leads:", error);
    return { success: false, data: [] };
  }
}