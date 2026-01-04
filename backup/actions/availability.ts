"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { addMinutes, format, parse, isBefore, startOfDay, isEqual } from "date-fns";

const prisma = new PrismaClient();

export async function getAvailableSlots(dateStr: string) {
  const session = await auth();
  if (!session) return { error: "Não autorizado" };

  // 1. Identificar o dia da semana (0 = Domingo, ..., 6 = Sábado)
  // dateStr vem como "YYYY-MM-DD"
  // Adicionamos 'T12:00:00' para garantir que o fuso horário não mude o dia ao converter
  const selectedDate = new Date(`${dateStr}T12:00:00`); 
  const dayOfWeek = selectedDate.getDay();

  // 2. Buscar a configuração de horário da Dra. para esse dia da semana
  // Assumimos que a Dra. é o ADMIN. Em sistema multi-médico, receberíamos o doctorId.
  const adminUser = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!adminUser) return { error: "Agenda médica não configurada." };

  const schedule = await prisma.doctorSchedule.findUnique({
    where: {
      userId_dayOfWeek: {
        userId: adminUser.id,
        dayOfWeek: dayOfWeek,
      },
    },
  });

  // Se não houver horário configurado ou estiver desativado nesse dia
  if (!schedule || !schedule.isEnabled) {
    return { slots: [], message: "Não há atendimento neste dia." };
  }

  // 3. Gerar todos os slots possíveis do dia (ex: 09:00, 10:00...)
  const slots: string[] = [];
  const duration = 60; // Duração fixa de 1h (pode vir do banco depois)
  
  // Converter strings "09:00" para objetos Date auxiliares no dia selecionado
  let currentTime = parse(schedule.startTime, "HH:mm", selectedDate);
  const endTime = parse(schedule.endTime, "HH:mm", selectedDate);

  // Loop para criar os horários
  while (isBefore(currentTime, endTime)) {
    slots.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, duration);
  }

  // 4. Buscar agendamentos já ocupados nesse dia
  const startOfDayDate = new Date(`${dateStr}T00:00:00`);
  const endOfDayDate = new Date(`${dateStr}T23:59:59`);

  const existingAppointments = await prisma.appointment.findMany({
    where: {
      doctorId: adminUser.id,
      date: {
        gte: startOfDayDate,
        lte: endOfDayDate,
      },
      status: { not: "CANCELED" }, // Ignora cancelados
    },
    select: { date: true },
  });

  // 5. Filtrar slots ocupados
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