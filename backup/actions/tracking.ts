"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

const CheckinSchema = z.object({
  sleepQuality: z.coerce.number().min(0).max(10),
  energyLevel: z.coerce.number().min(0).max(10),
  mood: z.coerce.number().min(0).max(10),
  digestion: z.coerce.number().min(0).max(10),
  notes: z.string().optional(),
});

export async function saveWeeklyCheckin(formData: FormData) {
  const session = await auth();
  if (!session?.user) return { error: "Não autorizado" };

  const patient = await prisma.patient.findUnique({
    where: { userId: session.user.id }
  });

  if (!patient) return { error: "Paciente não encontrado." };

  try {
    const data = CheckinSchema.parse({
      sleepQuality: formData.get("sleepQuality"),
      energyLevel: formData.get("energyLevel"),
      mood: formData.get("mood"),
      digestion: formData.get("digestion"),
      notes: formData.get("notes"),
    });

    // Impede spam: Verifica se já fez check-in nos últimos 5 dias
    const lastCheckin = await prisma.weeklyCheckin.findFirst({
        where: { patientId: patient.id },
        orderBy: { createdAt: 'desc' }
    });

    if (lastCheckin) {
        const daysSince = (new Date().getTime() - lastCheckin.createdAt.getTime()) / (1000 * 3600 * 24);
        if (daysSince < 5) {
            return { error: "Você já realizou o check-in desta semana. Volte em alguns dias!" };
        }
    }

    await prisma.weeklyCheckin.create({
      data: {
        ...data,
        patientId: patient.id,
      }
    });

    revalidatePath("/dashboard");
    return { success: "Check-in registado! Veja o gráfico da sua evolução." };
  } catch (error) {
    return { error: "Erro ao salvar check-in." };
  }
}

export async function getPatientEvolution() {
    const session = await auth();
    if (!session?.user) return [];

    const patient = await prisma.patient.findUnique({
        where: { userId: session.user.id },
        include: { 
            weeklyCheckins: {
                orderBy: { createdAt: 'asc' },
                take: 12 // Últimas 12 semanas (3 meses)
            }
        }
    });

    if (!patient) return [];

    // Formata para o Recharts
    return patient.weeklyCheckins.map(c => ({
        date: c.createdAt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
        Sono: c.sleepQuality,
        Energia: c.energyLevel,
        Humor: c.mood,
        Digestão: c.digestion
    }));
}