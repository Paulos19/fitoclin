"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { sendPreConsultationEmail } from "@/lib/mail"; 

const prisma = new PrismaClient();

// Schema para validação (mantido igual)
const ScheduleSettingsSchema = z.array(z.object({
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string(),
  endTime: z.string(),
  isEnabled: z.boolean(),
}));

// 1. Salvar Configuração de Horários (mantido igual)
export async function saveScheduleSettings(data: any) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  const schedules = ScheduleSettingsSchema.parse(data);

  try {
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

// 2. Criar Agendamento (Atualizado com envio de Data/Hora)
export async function createAppointment(formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Não autorizado" };

  const rawDate = formData.get("date") as string;
  const time = formData.get("time") as string;
  
  const dateObj = new Date(rawDate);
  const [hours, minutes] = time.split(':').map(Number);
  dateObj.setHours(hours, minutes, 0, 0);

  const patientId = (formData.get("patientId") as string) || session.user.id;
  
  const doctor = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!doctor) return { error: "Médico não encontrado no sistema." };

  const data = {
    patientId: patientId,
    meetLink: formData.get("meetLink") as string,
    notes: formData.get("notes") as string,
    date: dateObj,
  };

  try {
    const appointment = await prisma.appointment.create({
      data: {
        date: data.date,
        meetLink: data.meetLink,
        notes: data.notes,
        patientId: data.patientId,
        doctorId: doctor.id,
        status: "SCHEDULED",
        type: "FIRST_VISIT" 
      },
      include: {
        patient: {
          include: { user: true }
        }
      }
    });

    // --- BLOCO DE EMAIL ATUALIZADO ---
    if (appointment.patient && appointment.patient.user.email) {
      const { email, name } = appointment.patient.user;
      
      try {
        // Passando a DATA DO AGENDAMENTO como terceiro argumento
        await sendPreConsultationEmail(email, name, appointment.date);
      } catch (emailError) {
        console.error("⚠️ Falha ao enviar email de pré-consulta:", emailError);
      }
    }
    // ---------------------------------

    revalidatePath("/dashboard/schedule");
    revalidatePath("/dashboard"); 

    return { success: "Agendamento realizado e email enviado!" };

  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    return { error: "Erro ao agendar." };
  }
}