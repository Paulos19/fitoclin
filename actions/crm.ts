"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

const LeadSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  phone: z.string().min(10, "Telefone inválido"),
  email: z.string().email().optional().or(z.literal("")),
  source: z.string().min(1, "Origem obrigatória"),
  notes: z.string().optional(),
});

export async function createLead(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    // 👇 AQUI ESTÁ A CORREÇÃO:
    // Se for null, transforma em string vazia "" para passar na validação
    email: formData.get("email")?.toString() || "", 
    source: formData.get("source"),
    notes: formData.get("notes")?.toString() || "", // Mesma proteção para notas
  };

  try {
    const data = LeadSchema.parse(rawData);
    await prisma.lead.create({ 
      data: {
        ...data,
        // Opcional: Se o e-mail for vazio, salva como null no banco (se o banco permitir) 
        // ou salva como string vazia mesmo. O schema do prisma aceita String? (opcional)
        email: data.email === "" ? null : data.email,
        notes: data.notes === "" ? null : data.notes,
      } 
    });
    
    revalidatePath("/dashboard/crm");
    return { success: true, message: "Lead cadastrado!" };
  } catch (error) {
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
    return { success: false, message: "Erro ao mover lead" };
  }
}

export async function getLeads() {
  return await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });
}