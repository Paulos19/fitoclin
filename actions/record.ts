"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const RecordSchema = z.object({
  patientId: z.string(),
  title: z.string().min(1, "O título é obrigatório"),
  pilar1: z.string().optional(),
  pilar2: z.string().optional(),
  pilar3: z.string().optional(),
  pilar4: z.string().optional(),
  pilar5: z.string().optional(),
  notes: z.string().optional(),
});

export async function saveMedicalRecord(formData: FormData) {
  const session = await auth();
  
  // 👇 Permite Admin e Profissional
  const isAllowed = session?.user?.role === "ADMIN" || session?.user?.role === "PROFESSIONAL";
  if (!isAllowed) return { error: "Não autorizado" };

  const rawData = {
    patientId: formData.get("patientId"),
    title: formData.get("title"),
    pilar1: formData.get("pilar1"),
    pilar2: formData.get("pilar2"),
    pilar3: formData.get("pilar3"),
    pilar4: formData.get("pilar4"),
    pilar5: formData.get("pilar5"),
    notes: formData.get("notes"),
  };

  const validated = RecordSchema.safeParse(rawData);

  if (!validated.success) {
    return { error: "Verifique os campos obrigatórios." };
  }

  const data = validated.data;

  try {
    // Opcional: Verificar se o paciente pertence ao profissional antes de salvar
    // const patient = await db.patient.findUnique({ where: { id: data.patientId } });
    // if (patient.professionalId !== session.user.id && session.user.role !== 'ADMIN') return { error: "Paciente não pertence a você" };

    await db.medicalRecord.create({
      data: {
        patientId: data.patientId,
        title: data.title,
        pilar1_investigacao: data.pilar1,
        pilar2_fitoterapia: data.pilar2,
        pilar3_metabolismo: data.pilar3,
        pilar4_estresse: data.pilar4,
        pilar5_evolucao: data.pilar5,
        notes: data.notes,
        date: new Date(),
      },
    });

    revalidatePath(`/dashboard/records/${data.patientId}`);
    return { success: "Evolução salva no prontuário!" };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao salvar prontuário." };
  }
}