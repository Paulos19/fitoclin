"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Validação dos dados (garante que números sejam 0-10)
const AnamnesisSchema = z.object({
  fullName: z.string().min(2, "Nome obrigatório"),
  age: z.string().min(1, "Idade obrigatória"),
  profession: z.string().min(2, "Profissão obrigatória"),
  phone: z.string().min(10, "Telefone inválido"),
  consultationDate: z.string().optional(),
  isFirstTime: z.string().transform(val => val === "sim"), // Vem como string do form
  diagnosedDiseases: z.string().optional(),
  mainComplaint: z.string().min(2, "Descreva o incômodo principal"),

  // Ratings (Convertemos string para número)
  sleepQuality: z.coerce.number().min(0).max(10),
  bowelFunction: z.coerce.number().min(0).max(10),
  energyLevel: z.coerce.number().min(0).max(10),
  bodyPain: z.coerce.number().min(0).max(10),
  immunity: z.coerce.number().min(0).max(10),

  anxiety: z.coerce.number().min(0).max(10),
  sadness: z.coerce.number().min(0).max(10),
  mentalClarity: z.coerce.number().min(0).max(10),
  stressHandling: z.coerce.number().min(0).max(10),
  lifeSatisfaction: z.coerce.number().min(0).max(10),
  purpose: z.coerce.number().min(0).max(10),

  spirituality: z.coerce.number().min(0).max(10),
  selfCare: z.coerce.number().min(0).max(10),
  innerPeace: z.coerce.number().min(0).max(10),

  medications: z.string().optional(),
  supplements: z.string().optional(),
  allergies: z.string().optional(),
  dietQuality: z.coerce.number().min(0).max(10),

  lgpdAuthorized: z.coerce.boolean().refine(val => val === true, "Você precisa autorizar para prosseguir."),
});

export async function saveAnamnesis(formData: FormData) {
  const session = await auth();
  if (!session?.user) return { error: "Não autorizado" };

  // Busca o ID do Paciente vinculado ao Usuário logado
  const patient = await db.patient.findUnique({
    where: { userId: session.user.id }
  });

  if (!patient) return { error: "Perfil de paciente não encontrado." };

  try {
    // Converte FormData em objeto simples
    const rawData: any = {};
    formData.forEach((value, key) => { rawData[key] = value });

    // Tratamento especial para o checkbox do LGPD
    rawData.lgpdAuthorized = formData.get("lgpdAuthorized") === "on";

    const data = AnamnesisSchema.parse(rawData);

    // Salva no banco (Upsert: Cria ou Atualiza se já existir)
    await db.anamnesis.upsert({
      where: { patientId: patient.id },
      update: { ...data, consultationDate: data.consultationDate ? new Date(data.consultationDate) : undefined },
      create: {
        ...data,
        patientId: patient.id,
        consultationDate: data.consultationDate ? new Date(data.consultationDate) : undefined
      }
    });

    // 🔒 Bloqueia novas edições da anamnese até que seja solicitado novamente
    await db.patient.update({
      where: { id: patient.id },
      data: { allowAnamnesisUpdate: false }
    });

    // 🔔 Notifica a Dra. Isa (Admin)
    const admin = await db.user.findFirst({ where: { role: "ADMIN" } });
    if (admin) {
      await db.notification.create({
        data: {
          userId: admin.id,
          title: "Anamnese Recebida 📝",
          message: `O paciente ${data.fullName} preencheu o formulário pré-consulta.`,
          link: `/dashboard/records/${patient.id}`,
          read: false
        }
      });
    }

    revalidatePath("/dashboard");
    return { success: "Formulário enviado com sucesso! Nos vemos na consulta." };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao salvar formulário. Verifique os campos." };
  }
}
