"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { sendEmail, getAppointmentTemplate } from "@/lib/mail";

// --- SCHEMAS DE VALIDAÇÃO ---
const ScheduleSettingsSchema = z.array(z.object({
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string(),
  endTime: z.string(),
  isEnabled: z.boolean(),
}));

// --- 0. LER AGENDAMENTOS (Faltava) ---
export async function getAppointments() {
  const session = await auth();
  if (!session) return [];

  // Se for Profissional ou Admin, vê onde ele é o MÉDICO
  if (session.user.role === "ADMIN" || session.user.role === "PROFESSIONAL") {
      return await db.appointment.findMany({
          where: { doctorId: session.user.id },
          include: { patient: { include: { user: true } } },
          orderBy: { date: 'asc' }
      });
  }

  // Se for Paciente, vê onde ele é o PACIENTE
  if (session.user.role === "PATIENT") {
      const patient = await db.patient.findUnique({ where: { userId: session.user.id } });
      if (!patient) return [];
      
      return await db.appointment.findMany({
          where: { patientId: patient.id },
          include: { doctor: true },
          orderBy: { date: 'asc' }
      });
  }

  return [];
}

// --- 1. SALVAR CONFIGURAÇÃO DE HORÁRIOS ---
export async function saveScheduleSettings(data: any) {
  const session = await auth();
  // Permite Admin e Profissional
  const isAllowed = session?.user?.role === "ADMIN" || session?.user?.role === "PROFESSIONAL";
  if (!isAllowed) return { error: "Não autorizado" };

  try {
    const schedules = ScheduleSettingsSchema.parse(data);

    await db.$transaction(
      schedules.map((schedule) => 
        db.doctorSchedule.upsert({
          where: {
            userId_dayOfWeek: {
              userId: session.user.id, // Configura para si mesmo
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

// --- 2. CRIAR AGENDAMENTO ---
export async function createAppointment(formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Não autorizado" };

  const rawDate = formData.get("date") as string;
  const time = formData.get("time") as string;
  
  if (!rawDate || !time) return { error: "Data e horário são obrigatórios." };

  const dateObj = new Date(rawDate);
  const [hours, minutes] = time.split(':').map(Number);
  dateObj.setHours(hours, minutes, 0, 0); 

  let patientId = formData.get("patientId") as string;
  let doctorId = "";

  // LÓGICA DE QUEM É O MÉDICO
  if (session.user.role === "PROFESSIONAL" || session.user.role === "ADMIN") {
      // Se quem agenda é o profissional, ele é o médico
      doctorId = session.user.id;
      if (!patientId) return { error: "Selecione um paciente." };
  } else {
      // Se é PACIENTE (Auto-agendamento)
      const patientProfile = await db.patient.findUnique({ where: { userId: session.user.id } });
      if (!patientProfile) return { error: "Perfil incompleto." };
      
      patientId = patientProfile.id;

      // Busca o médico do paciente (professionalId) ou o Admin padrão
      if (patientProfile.professionalId) {
          doctorId = patientProfile.professionalId;
      } else {
          // Fallback para admin se não tiver profissional vinculado
          const admin = await db.user.findFirst({ where: { role: 'ADMIN' } });
          if (!admin) return { error: "Médico não encontrado." };
          doctorId = admin.id;
      }
  }

  const data = {
    patientId,
    doctorId,
    meetLink: formData.get("meetLink") as string,
    notes: formData.get("notes") as string,
    date: dateObj,
  };

  try {
    const result = await db.$transaction(async (tx) => {
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
        include: { patient: { include: { user: true } } } 
      });

      // Notificação (apenas se foi o paciente que agendou)
      if (session.user.role === "PATIENT") {
          await tx.notification.create({
            data: {
              userId: doctorId,
              title: "Novo Agendamento! 🗓️",
              message: `${appointment.patient.user.name} agendou para ${data.date.toLocaleDateString()}.`,
              link: "/dashboard/appointments",
            }
          });
      }

      return appointment;
    });

    if (result.patient?.user?.email) {
      const { email, name } = result.patient.user;
      sendEmail({
        to: email,
        subject: "Confirmação de Agendamento - FitoClin",
        html: getAppointmentTemplate(name || "Paciente", result.date, "Consulta")
      }).catch((err) => console.error("Erro email:", err));
    }

    revalidatePath("/dashboard/schedule");
    revalidatePath("/dashboard/appointments");
    revalidatePath("/dashboard");

    return { success: "Agendamento realizado com sucesso!" };

  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: "Horário já reservado." };
    }
    console.error(error);
    return { error: "Erro interno." };
  }
}

// --- 3. ATUALIZAR LINK ---
export async function updateMeetLink(formData: FormData) {
  const session = await auth();
  const isAllowed = session?.user?.role === "ADMIN" || session?.user?.role === "PROFESSIONAL";
  if (!isAllowed) return { error: "Não autorizado" };

  const appointmentId = formData.get("appointmentId") as string;
  const meetLink = formData.get("meetLink") as string;

  if (!appointmentId) return { error: "ID obrigatório." };

  try {
    // Garante que o agendamento pertence a este médico
    const updatedAppointment = await db.appointment.update({
      where: { 
          id: appointmentId,
          doctorId: session.user.id // Trava de segurança
      },
      data: { meetLink },
      include: { patient: { include: { user: true } } }
    });

    if (updatedAppointment.patient?.user?.email && meetLink) {
        sendEmail({
            to: updatedAppointment.patient.user.email,
            subject: "Atualização: Link da Sua Consulta",
            html: getAppointmentTemplate(
                updatedAppointment.patient.user.name || "Paciente", 
                updatedAppointment.date, 
                "Consulta (Link Atualizado)"
            )
        }).catch(err => console.error(err));
    }

    revalidatePath("/dashboard/appointments");
    return { success: "Link atualizado!" };
  } catch (error) {
    return { error: "Erro ao atualizar ou permissão negada." };
  }
}