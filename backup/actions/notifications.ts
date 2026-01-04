"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// 1. Buscar Notificações do Usuário Logado
export async function getNotifications() {
  const session = await auth();
  if (!session) return [];

  return await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 15 // Limita às últimas 15 para não poluir
  });
}

// 2. Marcar uma como lida (ao clicar)
export async function markAsRead(id: string) {
  const session = await auth();
  if (!session) return;

  await prisma.notification.update({
    where: { 
        id, 
        userId: session.user.id // Segurança: só o dono pode marcar
    },
    data: { read: true }
  });

  revalidatePath("/dashboard");
}

// 3. Marcar todas como lidas
export async function markAllAsRead() {
    const session = await auth();
    if (!session) return;

    await prisma.notification.updateMany({
        where: { userId: session.user.id, read: false },
        data: { read: true }
    });

    revalidatePath("/dashboard");
}