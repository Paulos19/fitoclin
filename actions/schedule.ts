"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { sendEmail, getAppointmentTemplate } from "@/lib/mail";
import bcrypt from "bcryptjs";

// --- SCHEMAS DE VALIDAÇÃO ---
const ScheduleSettingsSchema = z.array(z.object({
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string(),
  endTime: z.string(),
  isEnabled: z.boolean(),
}));

// --- 0. LER AGENDAMENTOS ---
export async function getAppointments() {
  const session = await auth();
  if (!session) return [];

  const role = session.user.role;

  // 👇 SECRETÁRIA E ADMIN: Veem TUDO (Agenda da Clínica)
  // Removemos a cláusula 'where: { doctorId }' para eles verem todos os agendamentos
  // @ts-ignore
  if (role === "ADMIN" || role === "SECRETARY") {
    return await db.appointment.findMany({
      // Sem filtro de doctorId para ver a agenda geral
      include: {
        patient: { include: { user: true } },
        doctor: true // Importante para saber de qual médico é o agendamento
      },
      orderBy: { date: 'asc' }
    });
  }

  // 👇 PROFISSIONAL: Vê apenas os SEUS agendamentos
  if (role === "PROFESSIONAL") {
    return await db.appointment.findMany({
      where: { doctorId: session.user.id },
      include: { patient: { include: { user: true } } },
      orderBy: { date: 'asc' }
    });
  }

  // 👇 PACIENTE: Vê onde ele é o paciente
  if (role === "PATIENT") {
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

  // @ts-ignore
  const isAllowed = session?.user?.role === "ADMIN" || session?.user?.role === "PROFESSIONAL" || session?.user?.role === "SECRETARY";
  if (!isAllowed) return { error: "Não autorizado" };

  try {
    const schedules = ScheduleSettingsSchema.parse(data);

    // 👇 LÓGICA INTELIGENTE DE ALVO:
    // Se for Profissional/Admin, configura para SI MESMO.
    // Se for Secretária, configura para o ADMIN (Dra. Isa).
    let targetUserId = session.user.id;

    // @ts-ignore
    if (session.user.role === "SECRETARY") {
      const admin = await db.user.findFirst({
        where: { role: "ADMIN" },
        orderBy: { createdAt: "asc" }
      });
      if (!admin) return { error: "Administrador principal não encontrado." };
      targetUserId = admin.id;
    }

    await db.$transaction(
      schedules.map((schedule) =>
        db.doctorSchedule.upsert({
          where: {
            userId_dayOfWeek: {
              userId: targetUserId, // <--- Usa o ID alvo definido acima
              dayOfWeek: schedule.dayOfWeek,
            }
          },
          update: {
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            isEnabled: schedule.isEnabled,
          },
          create: {
            userId: targetUserId,
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
  // 👇 LÓGICA DE CONVERSÃO: Se for um LEAD, vira Paciente agora.
  if (patientId && patientId.startsWith("lead_")) {
    const leadId = patientId.replace("lead_", "");
    const lead = await db.lead.findUnique({ where: { id: leadId } });

    if (lead) {
      let existingUser = lead.email ? await db.user.findUnique({ where: { email: lead.email } }) : null;
      let targetPatientId = "";

      if (existingUser) {
        const existingPatient = await db.patient.findUnique({ where: { userId: existingUser.id } });
        if (existingPatient) {
          targetPatientId = existingPatient.id;
        } else {
          const newPatient = await db.patient.create({
            data: {
              userId: existingUser.id,
              phone: lead.phone,
              professionalId: lead.professionalId
            }
          });
          targetPatientId = newPatient.id;
        }
      } else {
        const hashedPassword = await bcrypt.hash("fitoclin123", 10);
        const finalEmail = lead.email || `paciente.${lead.id}@sistema.local`;

        const newUser = await db.user.create({
          data: {
            name: lead.name,
            email: finalEmail,
            password: hashedPassword,
            role: "PATIENT",
          }
        });

        const newPatient = await db.patient.create({
          data: {
            userId: newUser.id,
            phone: lead.phone,
            professionalId: lead.professionalId,
          }
        });
        targetPatientId = newPatient.id;
      }

      // Atualiza o lead para status WON (Virou Paciente)
      await db.lead.update({
        where: { id: lead.id },
        data: { status: "WON" }
      });

      patientId = targetPatientId;
    }
  }

  let doctorId = "";

  // 👇 LÓGICA DE QUEM É O MÉDICO
  // @ts-ignore
  if (session.user.role === "PROFESSIONAL" || session.user.role === "ADMIN" || session.user.role === "SECRETARY") {

    // Se for Secretária, o médico é o Admin (Dra.)
    // @ts-ignore
    if (session.user.role === "SECRETARY") {
      const admin = await db.user.findFirst({
        where: { role: "ADMIN" },
        orderBy: { createdAt: "asc" }
      });
      if (!admin) return { error: "Médico não encontrado." };
      doctorId = admin.id;
    } else {
      // Se for Admin ou Profissional, o médico é ele mesmo
      doctorId = session.user.id;
    }

    if (!patientId) return { error: "Selecione um paciente." };

  } else {
    // Se é PACIENTE (Auto-agendamento)
    const patientProfile = await db.patient.findUnique({ where: { userId: session.user.id } });
    if (!patientProfile) return { error: "Perfil incompleto." };

    patientId = patientProfile.id;

    if (patientProfile.professionalId) {
      doctorId = patientProfile.professionalId;
    } else {
      const admin = await db.user.findFirst({
        where: { role: 'ADMIN' },
        orderBy: { createdAt: 'asc' }
      });
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

    return {
      success: "Agendamento realizado com sucesso!",
      phone: result.patient?.phone
    };

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
  // @ts-ignore
  const isAllowed = session?.user?.role === "ADMIN" || session?.user?.role === "PROFESSIONAL" || session?.user?.role === "SECRETARY";
  if (!isAllowed) return { error: "Não autorizado" };

  const appointmentId = formData.get("appointmentId") as string;
  const meetLink = formData.get("meetLink") as string;

  if (!appointmentId) return { error: "ID obrigatório." };

  try {
    // 👇 FLEXIBILIDADE NA SEGURANÇA:
    // Profissional só edita OS DELE.
    // Admin e Secretária editam QUALQUER UM.
    const whereClause: any = { id: appointmentId };

    // @ts-ignore
    if (session.user.role === "PROFESSIONAL") {
      whereClause.doctorId = session.user.id;
    }

    const updatedAppointment = await db.appointment.update({
      where: whereClause,
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

// --- 4. EXCLUIR AGENDAMENTO ---
export async function deleteAppointment(appointmentId: string) {
  const session = await auth();
  if (!session) return { error: "Não autorizado" };

  if (!appointmentId) return { error: "ID do agendamento é obrigatório." };

  try {
    const appointment = await db.appointment.findUnique({
      where: { id: appointmentId },
      include: { patient: true }
    });

    if (!appointment) return { error: "Agendamento não encontrado." };

    // @ts-ignore
    const role = session.user.role;
    let isAllowed = false;

    if (role === "ADMIN" || role === "SECRETARY") {
      isAllowed = true;
    } else if (role === "PROFESSIONAL" && appointment.doctorId === session.user.id) {
      isAllowed = true;
    } else if (role === "PATIENT" && appointment.patient?.userId === session.user.id) {
      isAllowed = true;
    }

    if (!isAllowed) return { error: "Sem permissão para excluir este agendamento." };

    await db.appointment.delete({
      where: { id: appointmentId }
    });

    revalidatePath("/dashboard/appointments");
    revalidatePath("/dashboard/schedule");
    revalidatePath("/dashboard");

    return { success: "Agendamento excluído com sucesso!" };
  } catch (error) {
    console.error("Erro ao deletar agendamento:", error);
    return { error: "Erro interno ao excluir agendamento." };
  }
}