"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Schema de validação (Zod)
const EpigeneticSchema = z.object({
  patientId: z.string().min(1),
  familyHistory: z.string().optional(),
  nutrition: z.string().optional(),
  physicalActivity: z.string().optional(),
  environmentalExposure: z.string().optional(),
  stressAndMentalHealth: z.string().optional(),
  healthHistory: z.string().optional(),
  substanceUse: z.string().optional(),
  sleepQuality: z.string().optional(),
  socialRelationships: z.string().optional(),
  traumaHistory: z.string().optional(),
});

export async function saveEpigeneticAnamnesis(data: z.infer<typeof EpigeneticSchema>) {
  const session = await auth();

  // 🔒 Segurança: Apenas Profissionais e Admins
  if (!session || session.user.role === "PATIENT") {
    return { error: "Acesso negado. Apenas médicos podem realizar esta ação." };
  }

  const validated = EpigeneticSchema.safeParse(data);

  if (!validated.success) {
    return { error: "Dados inválidos." };
  }

  try {
    await db.epigeneticAnamnesis.create({
      data: validated.data,
    });

    revalidatePath(`/dashboard/records/${data.patientId}`);
    return { success: "Anamnese Epigenética salva com sucesso!" };
  } catch (error) {
    console.error("Erro ao salvar epigenética:", error);
    return { error: "Erro interno ao salvar o formulário." };
  }
}

export async function getEpigeneticHistory(patientId: string) {
    const session = await auth();
    if (!session || session.user.role === "PATIENT") return [];

    return await db.epigeneticAnamnesis.findMany({
        where: { patientId },
        orderBy: { createdAt: 'desc' }
    });
}