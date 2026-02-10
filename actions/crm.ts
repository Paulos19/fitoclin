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

// === FUNÇÃO INTERNA PARA N8N ===
async function triggerN8nPostConsultation(patientData: { name: string; phone: string; patientId?: string }) {
  const webhookUrl = process.env.N8N_WORKFLOW_START_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patientData),
    });
  } catch (error) {
    console.error("Erro ao chamar n8n:", error);
  }
}

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
    if (!Object.values(LeadStatus).includes(newStatus as LeadStatus)) {
        return { success: false, message: "Status inválido." };
    }

    const lead = await db.lead.update({
      where: { id },
      data: { status: newStatus as LeadStatus },
    });
    
    // GATILHO AUTOMÁTICO: Se virou Paciente (WON)
    if (newStatus === "WON") {
       const cleanPhone = lead.phone.replace(/\D/g, "");
       const patient = await db.patient.findFirst({
         where: { phone: { contains: cleanPhone.slice(-8) } }
       });

       triggerN8nPostConsultation({
          name: lead.name,
          phone: cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`,
          patientId: patient?.id
       });
    }
    
    revalidatePath("/dashboard/crm");
    return { success: true, message: "Status atualizado" };
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    return { success: false, message: "Erro ao mover lead" };
  }
}

// 3. DISPARO MANUAL DE PÓS-CONSULTA
export async function triggerPostConsultationManual(leadId: string) {
  try {
    const lead = await db.lead.findUnique({ where: { id: leadId } });
    if (!lead) return { success: false, message: "Lead não encontrado" };

    const cleanPhone = lead.phone.replace(/\D/g, "");
    
    const patient = await db.patient.findFirst({
        where: { phone: { contains: cleanPhone.slice(-8) } }
    });

    await triggerN8nPostConsultation({
        name: lead.name,
        phone: cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`,
        patientId: patient?.id
    });

    return { success: true };
  } catch (error) {
    console.error("Erro manual:", error);
    return { success: false };
  }
}

// 4. BUSCAR LEADS (Legado)
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

// 5. BUSCAR LEADS PAGINADOS
export async function getLeadsPaginated(status: string, page: number) {
  const session = await auth();
  if (!session) return { success: false, data: [] };

  const PAGE_SIZE = 10;

  try {
    if (!Object.values(LeadStatus).includes(status as LeadStatus)) {
        return { success: false, data: [] };
    }

    const whereClause: any = {
        status: status as LeadStatus
    };

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