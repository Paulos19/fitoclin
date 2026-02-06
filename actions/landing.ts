"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const LeadSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  phone: z.string().min(10, "Telefone inválido"),
  source: z.string().default("LANDING_PAGE"),
});

export async function submitLandingLead(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    source: "LANDING_PAGE",
  };

  const validated = LeadSchema.safeParse(rawData);

  if (!validated.success) {
    return { error: "Verifique os dados preenchidos." };
  }

  try {
    await db.lead.create({
      data: {
        name: validated.data.name,
        email: validated.data.email || null,
        phone: validated.data.phone,
        source: validated.data.source,
        status: "NEW",
      },
    });

    return { success: "Recebemos seu contato! Em breve falaremos com você." };
  } catch (error) {
    console.error("Erro ao salvar lead:", error);
    return { error: "Erro interno. Tente chamar no WhatsApp." };
  }
}