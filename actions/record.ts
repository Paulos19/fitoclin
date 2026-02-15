"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// --- SCHEMA DE VALIDAÇÃO ---
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

// --- 1. CRIAR NOVA EVOLUÇÃO ---
export async function saveMedicalRecord(formData: FormData) {
  const session = await auth();
  
  // Permite Admin, Profissional e Secretária criar registros
  // @ts-ignore
  const isAllowed = ["ADMIN", "PROFESSIONAL", "SECRETARY"].includes(session?.user?.role);
  
  if (!isAllowed) return { error: "Não autorizado." };

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
    return { error: "Preencha os campos obrigatórios corretamente." };
  }

  const data = validated.data;

  try {
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
        // Se houver necessidade de vincular o autor exato:
        // professionalId: session.user.id 
      },
    });

    revalidatePath(`/dashboard/records/${data.patientId}`);
    return { success: "Evolução salva com sucesso!" };
  } catch (error) {
    console.error("Erro ao salvar:", error);
    return { error: "Erro interno ao salvar prontuário." };
  }
}

// --- 2. ATUALIZAR EVOLUÇÃO EXISTENTE ---
export async function updateMedicalRecord(recordId: string, formData: FormData) {
  const session = await auth();
  
  // Permite edição para Admin, Profissional e Secretária
  // @ts-ignore
  const isAllowed = ["ADMIN", "PROFESSIONAL", "SECRETARY"].includes(session?.user?.role);

  if (!isAllowed) {
    return { error: "Permissão negada." };
  }

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
    return { error: "Dados inválidos para atualização." };
  }

  const data = validated.data;

  try {
    await db.medicalRecord.update({
      where: { id: recordId },
      data: {
        title: data.title,
        pilar1_investigacao: data.pilar1,
        pilar2_fitoterapia: data.pilar2,
        pilar3_metabolismo: data.pilar3,
        pilar4_estresse: data.pilar4,
        pilar5_evolucao: data.pilar5,
        notes: data.notes,
      }
    });

    revalidatePath(`/dashboard/records/${data.patientId}`);
    return { success: "Evolução atualizada com sucesso!" };
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    return { error: "Erro ao atualizar registro." };
  }
}

// --- 3. DELETAR EVOLUÇÃO ---
export async function deleteMedicalRecord(recordId: string, patientId: string) {
  const session = await auth();
  
  // Segurança: Apenas Admin e Profissional podem DELETAR
  // Secretárias podem criar/editar, mas não apagar histórico clínico.
  // @ts-ignore
  const isAllowed = ["ADMIN", "PROFESSIONAL"].includes(session?.user?.role);

  if (!isAllowed) {
    return { error: "Apenas administradores e profissionais podem excluir registros." };
  }

  try {
    await db.medicalRecord.delete({
      where: { id: recordId }
    });

    revalidatePath(`/dashboard/records/${patientId}`);
    return { success: "Registro removido permanentemente." };
  } catch (error) {
    console.error("Erro ao deletar:", error);
    return { error: "Erro ao deletar registro." };
  }
}

// --- 4. LISTAR TUDO (Para a Sidebar do PEP) ---
export async function getPatientRecords(patientId: string) {
  const session = await auth();
  if (!session) return [];

  try {
    const records = await db.medicalRecord.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
      take: 50 // Limite para garantir performance na UI
    });
    return records;
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    return [];
  }
}

// --- 5. LISTAR APENAS EVOLUÇÕES (Para o Contexto da IA) ---
export async function getPatientEvolutions(patientId: string) {
  const session = await auth();
  if (!session) return [];

  try {
    const records = await db.medicalRecord.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        date: true,
        title: true,
        // CORREÇÃO: Buscando todos os pilares para dar contexto à IA
        pilar1_investigacao: true, 
        pilar2_fitoterapia: true,
        pilar3_metabolismo: true,
        pilar4_estresse: true,
        pilar5_evolucao: true,
        notes: true
      }
    });

    // Filtra registros que tenham pelo menos um campo preenchido
    return records.filter(r => 
      r.pilar1_investigacao || 
      r.pilar5_evolucao || 
      r.notes || 
      r.pilar3_metabolismo
    );
  } catch (error) {
    console.error("Erro ao buscar evoluções para IA:", error);
    return [];
  }
}