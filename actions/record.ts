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
  
  // 👇 Permite Admin, Profissional e Secretária
  // @ts-ignore
  const isAllowed = session?.user?.role === "ADMIN" || session?.user?.role === "PROFESSIONAL" || session?.user?.role === "SECRETARY";
  
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
    // Opcional: Se quiser restringir que Profissional só edite seus próprios pacientes, 
    // descomente e ajuste a lógica abaixo (adicionando SECRETARY na exceção também).
    /*
    const patient = await db.patient.findUnique({ where: { id: data.patientId } });
    if (patient?.professionalId !== session.user.id && session.user.role !== 'ADMIN' && session.user.role !== 'SECRETARY') {
       return { error: "Paciente não pertence a você" };
    }
    */

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

export async function getPatientEvolutions(patientId: string) {
  const session = await auth();
  if (!session) return [];

  try {
    const records = await db.medicalRecord.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
      take: 10, // Pega as 10 últimas
      select: {
        id: true,
        date: true,
        title: true,
        pilar5_evolucao: true, // O campo onde fica a evolução
        notes: true
      }
    });

    // Filtra apenas registros que tenham algum texto relevante
    return records.filter(r => r.pilar5_evolucao || r.notes);
  } catch (error) {
    console.error("Erro ao buscar evoluções:", error);
    return [];
  }
}