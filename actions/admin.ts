"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/mail"; 
import { revalidatePath } from "next/cache";

// A função agora recebe FormData para ser compatível com o formulário do Dialog
export async function grantAccess(formData: FormData) {
  const session = await auth();
  
  // Verifica se é ADMIN
  if (session?.user?.role !== "ADMIN") {
    return { error: "Não autorizado" };
  }

  const email = formData.get("email") as string;
  const accessType = formData.get("accessType") as string; // Pode ser 'COMMUNITY' ou um ID de curso

  if (!email || !accessType) {
    return { error: "Preencha todos os campos." };
  }

  // 1. Buscar Usuário
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return { error: "Usuário não encontrado. Peça para ele se cadastrar na plataforma primeiro." };
  }

  try {
    if (accessType === "COMMUNITY") {
      // --- LÓGICA DE COMUNIDADE ---
      // Verifica se já existe uma assinatura (mesmo que inativa) para atualizar ou cria nova
      const existingSub = await db.subscription.findUnique({
        where: { userId: user.id }
      });

      if (existingSub) {
        await db.subscription.update({
          where: { userId: user.id },
          data: {
            status: "active",
            stripePriceId: "manual_grant",
            stripeCurrentPeriodEnd: new Date("2099-12-31"), // Data distante para acesso vitalício
          }
        });
      } else {
        await db.subscription.create({
          data: {
            userId: user.id,
            status: "active",
            stripePriceId: "manual_grant",
            stripeCurrentPeriodEnd: new Date("2099-12-31"),
          }
        });
      }

      // Enviar Email de notificação
      await sendEmail({
        to: email,
        subject: "🎉 Acesso Liberado: Comunidade Fitoclin",
        html: `<p>Olá ${user.name}, seu acesso à comunidade foi liberado manualmente pela Drª Isa. <a href="${process.env.NEXT_PUBLIC_APP_URL}/community">Clique aqui para acessar</a>.</p>`
      });

    } else {
      // --- LÓGICA DE CURSO ESPECÍFICO ---
      const course = await db.course.findUnique({ where: { id: accessType } });
      if (!course) return { error: "Curso não encontrado" };

      // Verifica se já tem a compra
      const existingPurchase = await db.purchase.findUnique({
        where: { userId_courseId: { userId: user.id, courseId: accessType } }
      });

      if (!existingPurchase) {
        await db.purchase.create({
          data: {
            userId: user.id,
            courseId: accessType,
            isManualGrant: true, // Registra que foi manual
            // REMOVIDO: price: 0 (A tabela Purchase não tem campo price no seu schema)
          }
        });
      }

      // Enviar Email de notificação
      await sendEmail({
        to: email,
        subject: `🎉 Acesso Liberado: ${course.title}`,
        html: `<p>Olá ${user.name}, você recebeu acesso ao curso <strong>${course.title}</strong>. <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/courses/${course.id}">Comece agora</a>.</p>`
      });
    }

    revalidatePath("/dashboard/courses");
    return { success: "Acesso concedido com sucesso!" };

  } catch (error) {
    console.error("Erro no grantAccess:", error);
    return { error: "Erro interno ao processar liberação." };
  }
}