"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { stripe, getAbsoluteUrl } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { PLANS } from "@/config/plans";

const settingsUrl = getAbsoluteUrl("/dashboard/settings");

// --- 1. Checkout de Assinatura (Planos Mensais) ---
export async function createCheckoutSession(priceId: string) {
  const session = await auth();
  
  if (!session?.user || !session.user.email) {
    return { error: "Usuário não autenticado" };
  }

  // Validação: O plano existe na config?
  const planExists = PLANS.find(p => p.priceId === priceId);
  if (!planExists) {
    return { error: "Plano inválido ou indisponível." };
  }

  const userId = session.user.id;
  
  // Buscamos o usuário no banco para garantir dados frescos
  const user = await db.user.findUnique({
    where: { id: userId },
    include: { subscription: true }
  });

  if (!user) return { error: "Usuário não encontrado" };

  // Se já tem assinatura ativa, manda para o portal
  if (user.subscription?.stripeSubscriptionId && user.subscription.status === 'active') {
     return await createCustomerPortal();
  }

  // Garante tipagem (undefined vira null)
  let stripeCustomerId = user.stripeCustomerId ?? null;

  // Se não tem ID do Stripe, cria o cliente lá
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
    cancel_url: getAbsoluteUrl("/dashboard/subscription?canceled=true"),
    metadata: {
      userId: userId,
    },
  });

  if (!stripeSession.url) {
     return { error: "Erro ao criar sessão de checkout" };
  }

  redirect(stripeSession.url);
}

// --- 2. Portal do Cliente (Gerenciar Assinatura) ---
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

// --- 3. Checkout de Curso Avulso (Parcelado) ---
export async function createCourseCheckout(courseId: string) {
  const session = await auth();
  
  if (!session?.user || !session.user.email) {
    return { error: "Usuário não autenticado" };
  }

  const userId = session.user.id;

  // A. Buscar o Curso e Preço
  const course = await db.course.findUnique({
    where: { id: courseId }
  });

  if (!course || !course.price) {
    return { error: "Curso não encontrado ou sem preço definido." };
  }

  // B. Verificar se já comprou
  const existingPurchase = await db.purchase.findUnique({
    where: {
      userId_courseId: { userId, courseId }
    }
  });

  if (existingPurchase) {
     return { error: "Você já possui este curso." };
  }

  // C. Preparar Cliente Stripe
  // Pegamos da sessão, pois não fizemos query no banco 'user' nesta função
  let stripeCustomerId = session.user.stripeCustomerId; 
  
  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: session.user.email, // 👈 CORRIGIDO: Usando session.user
      name: session.user.name || undefined, // 👈 CORRIGIDO: Usando session.user
      metadata: { userId: userId } 
    });
    stripeCustomerId = customer.id;

    await db.user.update({
      where: { id: userId },
      data: { stripeCustomerId }
    });
  }

  // D. Criar Sessão de Pagamento
  const stripeSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerId as string, // Forçamos string pois garantimos a criação acima
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "BRL",
          product_data: {
            name: course.title,
            description: course.description?.substring(0, 200),
            images: course.imageUrl ? [course.imageUrl] : [],
          },
          unit_amount: Math.round(Number(course.price) * 100),
        },
      },
    ],
    mode: "payment",
    success_url: getAbsoluteUrl(`/community/course/${course.id}?success=true`),
    cancel_url: getAbsoluteUrl(`/community/course/${course.id}?canceled=true`),
    metadata: {
      courseId: course.id,
      userId: userId,
      type: "course_purchase"
    },
    payment_method_options: {
      card: {
        installments: {
          enabled: true,
        },
      },
    },
  });

  if (!stripeSession.url) {
     return { error: "Erro ao criar checkout." };
  }

  redirect(stripeSession.url);
}