"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { sendEmail, getAppointmentTemplate } from "@/lib/mail";

const prisma = new PrismaClient();

// --- SCHEMAS DE VALIDAÇÃO ---

const ScheduleSettingsSchema = z.array(z.object({
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string(),
  endTime: z.string(),
  isEnabled: z.boolean(),
}));

// --- 1. SALVAR CONFIGURAÇÃO DE HORÁRIOS (ADMIN) ---

export async function saveScheduleSettings(data: any) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  try {
    const schedules = ScheduleSettingsSchema.parse(data);

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
    console.error("Erro ao salvar horários:", error);
    return { error: "Erro ao salvar horários." };
  }
}

// --- 2. CRIAR AGENDAMENTO (PACIENTE OU ADMIN) ---

export async function createAppointment(formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Não autorizado" };

  // A. Tratamento de Data e Hora
  const rawDate = formData.get("date") as string;
  const time = formData.get("time") as string;
  
  if (!rawDate || !time) {
    return { error: "Data e horário são obrigatórios." };
  }

  const dateObj = new Date(rawDate);
  const [hours, minutes] = time.split(':').map(Number);
  
  // Zera segundos/milissegundos para garantir a precisão da trava @@unique
  dateObj.setHours(hours, minutes, 0, 0); 

  // B. Identificação do Paciente
  let patientId = formData.get("patientId") as string;

  if (!patientId) {
    const patientProfile = await prisma.patient.findUnique({
      where: { userId: session.user.id }
    });

    if (!patientProfile) {
      return { error: "Perfil de paciente não encontrado. Por favor, complete seu cadastro." };
    }
    
    patientId = patientProfile.id;
  }

  // C. Identificação do Médico (Dra. Isa / Admin)
  const doctor = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!doctor) return { error: "Agenda médica não configurada no sistema." };

  const data = {
    patientId: patientId,
    doctorId: doctor.id,
    meetLink: formData.get("meetLink") as string,
    notes: formData.get("notes") as string,
    date: dateObj,
  };

  try {
    // --- INÍCIO DA TRANSAÇÃO ---
    const result = await prisma.$transaction(async (tx) => {
      
      // 1. Criar o Agendamento
      const appointment = await tx.appointment.create({
        data: {
          date: data.date,
          meetLink: data.meetLink,
          notes: data.notes,
          patientId: data.patientId,
          doctorId: data.doctorId,
          status: "SCHEDULED",
          type: "FIRST_VISIT"
        },
        include: {
          patient: { include: { user: true } } 
        }
      });

      // 2. Criar Notificação para a Admin
      const dateFormatted = appointment.date.toLocaleDateString('pt-BR');
      const timeFormatted = appointment.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      const patientName = appointment.patient.user.name || "Paciente";

      await tx.notification.create({
        data: {
          userId: doctor.id,
          title: "Novo Agendamento! 🗓️",
          message: `${patientName} agendou para ${dateFormatted} às ${timeFormatted}.`,
          link: "/dashboard/appointments",
          read: false
        }
      });

      return appointment;
    });
    // --- FIM DA TRANSAÇÃO ---

    // D. Envio de Email
    if (result.patient?.user?.email) {
      const { email, name } = result.patient.user;
      
      sendEmail({
        to: email,
        subject: "Confirmação de Agendamento - FitoClin",
        html: getAppointmentTemplate(name || "Paciente", result.date, "Primeira Consulta")
      }).catch((err) => {
        console.error("⚠️ Falha silenciosa no envio de email:", err);
      });
    }

    revalidatePath("/dashboard/schedule");
    revalidatePath("/dashboard/appointments");
    revalidatePath("/dashboard");

    return { success: "Agendamento realizado com sucesso!" };

  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: "Ops! Este horário acabou de ser reservado por outra pessoa. Por favor, escolha outro horário." };
    }
    console.error("Erro crítico ao criar agendamento:", error);
    return { error: "Erro interno ao processar agendamento. Tente novamente." };
  }
}

// --- 3. ATUALIZAR LINK DA CHAMADA (NOVA FUNÇÃO) ---

export async function updateMeetLink(formData: FormData) {
  const session = await auth();
  // Apenas Admin pode alterar o link do Meet
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  const appointmentId = formData.get("appointmentId") as string;
  const meetLink = formData.get("meetLink") as string;

  if (!appointmentId) return { error: "ID do agendamento obrigatório." };

  try {
    // Atualiza o link no banco
    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { meetLink },
      include: {
        patient: { include: { user: true } }
      }
    });

    // Opcional: Notificar o paciente por e-mail sobre a atualização do link
    if (updatedAppointment.patient?.user?.email && meetLink) {
        sendEmail({
            to: updatedAppointment.patient.user.email,
            subject: "Atualização: Link da Sua Consulta - FitoClin",
            html: getAppointmentTemplate(
                updatedAppointment.patient.user.name || "Paciente", 
                updatedAppointment.date, 
                "Consulta (Link Atualizado)"
            )
        }).catch(err => console.error("Erro ao enviar email de update:", err));
    }

    revalidatePath("/dashboard/appointments");
    revalidatePath("/dashboard/schedule");
    
    return { success: "Link da videochamada atualizado!" };
  } catch (error) {
    console.error("Erro ao atualizar link:", error);
    return { error: "Erro ao atualizar o link." };
  }
}