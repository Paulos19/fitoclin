"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { addMinutes, format, parse, isBefore, startOfDay, isEqual } from "date-fns";

export async function getAvailableSlots(dateStr: string) {
  const session = await auth();
  if (!session) return { error: "Não autorizado" };

  // 1. Identificar o dia da semana (0 = Domingo, ..., 6 = Sábado)
  // dateStr vem como "YYYY-MM-DD"
  // Adicionamos 'T12:00:00' para garantir que o fuso horário não mude o dia ao converter
  const selectedDate = new Date(`${dateStr}T12:00:00`); 
  const dayOfWeek = selectedDate.getDay();

  // 2. Definir de QUAL MÉDICO estamos buscando a agenda
  let targetDoctorId = "";

  const role = session.user.role;

  // @ts-ignore: Lidando com a role SECRETARY
  if (role === "PROFESSIONAL") {
      // Profissional vê a sua própria agenda
      targetDoctorId = session.user.id;
  } else if (role === "ADMIN" || role === "SECRETARY") {
      // Admin e Secretária veem a agenda da Dra. Principal (Admin)
      const adminUser = await db.user.findFirst({ where: { role: "ADMIN" } });
      if (!adminUser) return { error: "Agenda principal não configurada." };
      targetDoctorId = adminUser.id;
  } else {
      // Role: PATIENT
      // Busca o médico vinculado ao paciente
      const patient = await db.patient.findUnique({ where: { userId: session.user.id } });
      
      if (patient?.professionalId) {
          targetDoctorId = patient.professionalId;
      } else {
          // Fallback: Se não tiver médico vinculado, usa a agenda da Admin (Dra. Isa)
          const adminUser = await db.user.findFirst({ where: { role: "ADMIN" } });
          if (!adminUser) return { error: "Médico não encontrado." };
          targetDoctorId = adminUser.id;
      }
  }

  // 3. Buscar a configuração de horário do médico alvo
  const schedule = await db.doctorSchedule.findUnique({
    where: {
      userId_dayOfWeek: {
        userId: targetDoctorId,
        dayOfWeek: dayOfWeek,
      },
    },
  });

  // Se não houver horário configurado ou estiver desativado nesse dia
  if (!schedule || !schedule.isEnabled) {
    return { slots: [], message: "Não há atendimento neste dia." };
  }

  // 4. Gerar todos os slots possíveis do dia (ex: 09:00, 10:00...)
  const slots: string[] = [];
  const duration = 60; // Duração fixa de 1h
  
  // Converter strings "09:00" para objetos Date auxiliares no dia selecionado
  let currentTime = parse(schedule.startTime, "HH:mm", selectedDate);
  const endTime = parse(schedule.endTime, "HH:mm", selectedDate);

  // Loop para criar os horários
  while (isBefore(currentTime, endTime)) {
    slots.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, duration);
  }

  // 5. Buscar agendamentos já ocupados nesse dia PARA ESSE MÉDICO
  const startOfDayDate = new Date(`${dateStr}T00:00:00`);
  const endOfDayDate = new Date(`${dateStr}T23:59:59`);

  const existingAppointments = await db.appointment.findMany({
    where: {
      doctorId: targetDoctorId, // <--- Importante: Filtra pelo médico correto
      date: {
        gte: startOfDayDate,
        lte: endOfDayDate,
      },
      status: { not: "CANCELED" }, // Ignora cancelados
    },
    select: { date: true },
  });

  // 6. Filtrar slots ocupados
  const busyTimes = existingAppointments.map((apt) => 
    format(apt.date, "HH:mm")
  );

  const availableSlots = slots.filter((slot) => !busyTimes.includes(slot));

  // Opcional: Filtrar horários passados se o dia for "hoje"
  const now = new Date();
  const isToday = isEqual(startOfDay(now), startOfDay(selectedDate));
  
  let finalSlots = availableSlots;
  
  if (isToday) {
    const currentHourStr = format(now, "HH:mm");
    finalSlots = availableSlots.filter(slot => slot > currentHourStr);
  }

  return { slots: finalSlots };
}