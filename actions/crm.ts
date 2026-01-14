"use server";

import { auth } from "@/auth"; // 👈 Importante
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { sendEmail, getWelcomeTemplate } from "@/lib/mail";

const LeadSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  phone: z.string().min(10, "Telefone inválido"),
  email: z.string().email().optional().or(z.literal("")),
  source: z.string().min(1, "Origem obrigatória"),
  notes: z.string().optional(),
});

export async function createLead(formData: FormData) {
  const session = await auth(); // 👈 Pegar sessão
  
  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email")?.toString() || "", 
    source: formData.get("source"),
    notes: formData.get("notes")?.toString() || "",
  };

  try {
    const data = LeadSchema.parse(rawData);
    
    // Definir Dono do Lead
    const professionalId = session?.user?.role === "PROFESSIONAL" ? session.user.id : null;

    const newLead = await db.lead.create({ 
      data: {
        name: data.name,
        phone: data.phone,
        source: data.source,
        email: data.email === "" ? null : data.email,
        notes: data.notes === "" ? null : data.notes,
        status: "NEW",
        // 👇 Vínculo
        professionalId: professionalId,
      } 
    });

    if (newLead.email) {
      sendEmail({
        to: newLead.email,
        subject: "Recebemos o seu contacto! - FitoClin",
        html: getWelcomeTemplate(newLead.name)
      }).catch(err => console.error("Erro no email:", err));
    }
    
    revalidatePath("/dashboard/crm");
    return { success: true, message: "Lead cadastrado com sucesso!" };

  } catch (error) {
    console.error("❌ ERRO AO CRIAR LEAD:", error);
    if (error instanceof z.ZodError) {
        return { success: false, message: `Erro de validação: ${error.message}` };
    }
    return { success: false, message: "Erro interno." };
  }
}

export async function updateLeadStatus(id: string, newStatus: string) {
  // Opcional: Verificar se o lead pertence ao usuário antes de atualizar
  try {
    await db.lead.update({
      where: { id },
      data: { status: newStatus as any },
    });
    revalidatePath("/dashboard/crm");
    return { success: true, message: "Status atualizado" };
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    return { success: false, message: "Erro ao mover lead" };
  }
}

export async function getLeads() {
  const session = await auth();
  if (!session) return [];

  // Filtro de Segurança
  const whereClause = session.user.role === "ADMIN" 
    ? {} // Admin vê tudo
    : { professionalId: session.user.id }; // Professional vê só os dele

  return await db.lead.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });
}