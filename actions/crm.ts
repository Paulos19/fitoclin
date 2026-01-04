"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { sendEmail, getWelcomeTemplate } from "@/lib/mail";

const prisma = new PrismaClient();

// Schema permissivo que aceita string vazia como "válido" (tratamos antes de salvar)
const LeadSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  phone: z.string().min(10, "Telefone inválido"),
  // Aceita e-mail válido OU string vazia
  email: z.string().email().optional().or(z.literal("")),
  source: z.string().min(1, "Origem obrigatória"),
  notes: z.string().optional(),
});

export async function createLead(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    // Garante que null vira string vazia "" para passar na validação do Zod
    email: formData.get("email")?.toString() || "", 
    source: formData.get("source"),
    notes: formData.get("notes")?.toString() || "",
  };

  try {
    const data = LeadSchema.parse(rawData);
    
    // Cria no banco convertendo "" de volta para null (para manter o banco limpo)
    const newLead = await prisma.lead.create({ 
      data: {
        name: data.name,
        phone: data.phone,
        source: data.source,
        email: data.email === "" ? null : data.email,
        notes: data.notes === "" ? null : data.notes,
        status: "NEW"
      } 
    });

    // 📧 AUTOMAÇÃO: Envia e-mail de boas-vindas se houver e-mail
    if (newLead.email) {
      sendEmail({
        to: newLead.email,
        subject: "Recebemos o seu contacto! - FitoClin",
        html: getWelcomeTemplate(newLead.name)
      }).catch(err => console.error("Erro ao enviar e-mail de boas-vindas:", err));
    }
    
    revalidatePath("/dashboard/crm");
    return { success: true, message: "Lead cadastrado com sucesso!" };

  } catch (error) {
    // Log detalhado para debug no terminal
    console.error("❌ ERRO AO CRIAR LEAD:", error);

    if (error instanceof z.ZodError) {
        return { 
            success: false, 
            message: `Erro de validação: ${error.message}` 
        };
    }

    return { success: false, message: "Erro interno. Verifique o terminal." };
  }
}

export async function updateLeadStatus(id: string, newStatus: string) {
  try {
    await prisma.lead.update({
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
  return await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });
}