"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

// Schema para validação
const ScheduleSettingsSchema = z.array(z.object({
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string(),
  endTime: z.string(),
  isEnabled: z.boolean(),
}));

const AppointmentSchema = z.object({
  patientId: z.string(),
  date: z.date(), // Data completa com hora
  meetLink: z.string().optional(),
  notes: z.string().optional(),
});

// 1. Salvar Configuração de Horários
export async function saveScheduleSettings(data: any) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  // Parse e validação
  const schedules = ScheduleSettingsSchema.parse(data);

  try {
    // Transaction para atualizar tudo de uma vez
    await prisma.$transaction(
      schedules.map((schedule) => 
        prisma.doctorSchedule.upsert({
          where: {
            userId_dayOfWeek: {
              userId: session.user.id,
              dayOfWeek: schedule.dayOfWeek,
            }
          },
          update: {
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            isEnabled: schedule.isEnabled,
          },
          create: {
            userId: session.user.id,
            dayOfWeek: schedule.dayOfWeek,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            isEnabled: schedule.isEnabled,
          }
        })
      )
    );

    revalidatePath("/dashboard/schedule");
    return { success: "Horários atualizados com sucesso!" };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao salvar horários." };
  }
}

// 2. Criar Agendamento (Com Link do Meet)
export async function createAppointment(formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Não autorizado" };

  const rawDate = formData.get("date") as string; // ISO String vinda do front
  const time = formData.get("time") as string; // "09:00"
  
  // Combinar Data + Hora em objeto Date
  const dateObj = new Date(rawDate);
  const [hours, minutes] = time.split(':').map(Number);
  dateObj.setHours(hours, minutes, 0, 0);

  const data = {
    patientId: formData.get("patientId") as string, // Se for admin agendando
    meetLink: formData.get("meetLink") as string,
    notes: formData.get("notes") as string,
    date: dateObj,
  };

  try {
    await prisma.appointment.create({
      data: {
        date: data.date,
        meetLink: data.meetLink,
        notes: data.notes,
        patientId: data.patientId || session.user.id, // Se paciente agendar, usa o ID dele
        doctorId: (await prisma.user.findFirst({ where: { role: 'ADMIN' } }))?.id as string,
        status: "SCHEDULED",
        type: "FIRST_VISIT" // Default, poderia ser selecionável
      }
    });

    revalidatePath("/dashboard/schedule");
    return { success: "Agendamento realizado!" };
  } catch (error) {
    return { error: "Erro ao agendar." };
  }
}