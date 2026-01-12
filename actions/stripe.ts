"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { stripe, getAbsoluteUrl } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { PLANS } from "@/config/plans"; // Importamos a config

const settingsUrl = getAbsoluteUrl("/dashboard/settings");

export async function createCheckoutSession(priceId: string) {
  const session = await auth();
  
  if (!session?.user || !session.user.email) {
    return { error: "Usuário não autenticado" }; // Retornar erro para o toast tratar
  }

  // SEGURANÇA: Verificar se o priceId enviado é válido (está na nossa config)
  const planExists = PLANS.find(p => p.priceId === priceId);
  if (!planExists) {
    return { error: "Plano inválido ou indisponível." };
  }

  const userId = session.user.id;
  
  const user = await db.user.findUnique({
    where: { id: userId },
    include: { subscription: true }
  });

  if (!user) return { error: "Usuário não encontrado" };

  // Se já tem assinatura ativa, redireciona para o portal
  if (user.subscription?.stripeSubscriptionId && user.subscription.status === 'active') {
     return await createCustomerPortal();
  }

  let stripeCustomerId = user.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name || undefined,
      metadata: { userId: userId } 
    });
    stripeCustomerId = customer.id;

    await db.user.update({
      where: { id: userId },
      data: { stripeCustomerId }
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: getAbsoluteUrl("/dashboard?success=true"),
    cancel_url: getAbsoluteUrl("/dashboard/subscription?canceled=true"), // Volta para a página de planos
    metadata: {
      userId: userId,
    },
  });

  if (!stripeSession.url) {
     return { error: "Erro ao criar sessão de checkout" };
  }

  redirect(stripeSession.url);
}

export async function createCustomerPortal() {
  const session = await auth();
  if (!session?.user) return { error: "Não autorizado" };

  const user = await db.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user?.stripeCustomerId) {
    return { error: "Nenhuma assinatura encontrada" };
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: settingsUrl,
  });

  redirect(portalSession.url);
}