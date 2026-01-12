import { headers } from "next/headers";
import Stripe from "stripe";
import { db } from "@/lib/db"; // 👈 Adaptado para nossa lib
import { stripe } from "@/lib/stripe";
import { PLANS } from "@/config/plans"; // 👈 Adaptado para nossa config
import { NextResponse } from "next/server";

// Função robusta para extrair a data, independente da config do Stripe
function getSubscriptionEndDate(subscription: Stripe.Subscription): Date {
  // Acessamos via 'any' para evitar o erro de tipagem TS2339 se a config mudar
  const sub = subscription as any;
  
  // Tenta ler camelCase (padrão typescript: true) ou snake_case (padrão API)
  const periodEnd = sub.currentPeriodEnd ?? sub.current_period_end;

  if (!periodEnd) {
    console.warn("⚠️ Data de expiração não encontrada, adicionando 30 dias.");
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date;
  }

  return new Date(periodEnd * 1000);
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error(`❌ Erro de Assinatura Webhook: ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  try {
    // ----------------------------------------------------------------------
    // CENÁRIO 1: Checkout Finalizado (Nova Assinatura)
    // ----------------------------------------------------------------------
    if (event.type === "checkout.session.completed") {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      if (!session?.metadata?.userId) {
        return new NextResponse("User ID is required", { status: 400 });
      }

      const userId = session.metadata.userId;

      // Cria ou atualiza a assinatura na tabela dedicada 'Subscription'
      await db.subscription.upsert({
        where: { userId: userId },
        create: {
          userId: userId,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: getSubscriptionEndDate(subscription),
          status: subscription.status,
        },
        update: {
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: getSubscriptionEndDate(subscription),
          status: subscription.status,
        },
      });

      // Garante que o stripeCustomerId também esteja no User (para referência rápida)
      await db.user.update({
        where: { id: userId },
        data: { stripeCustomerId: subscription.customer as string }
      });

      console.log(`✅ Assinatura criada para User: ${userId}`);
    }

    // ----------------------------------------------------------------------
    // CENÁRIO 2: Renovação Mensal (Pagamento da Fatura)
    // ----------------------------------------------------------------------
    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = typeof invoice.subscription === 'string' 
        ? invoice.subscription 
        : (invoice.subscription as Stripe.Subscription)?.id;

      if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        // Atualiza a data de expiração no banco
        await db.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: getSubscriptionEndDate(subscription),
            status: subscription.status,
          },
        });
        
        console.log(`🔄 Assinatura renovada: ${subscription.id}`);
      }
    }

    // ----------------------------------------------------------------------
    // CENÁRIO 3: Cancelamento ou Falha
    // ----------------------------------------------------------------------
    if (event.type === "customer.subscription.deleted" || event.type === "customer.subscription.updated") {
       const subscription = event.data.object as Stripe.Subscription;
       
       // Se o status mudou para algo que não seja 'active' ou 'trialing', atualizamos
       await db.subscription.update({
         where: { stripeSubscriptionId: subscription.id },
         data: { 
            status: subscription.status,
            stripeCurrentPeriodEnd: getSubscriptionEndDate(subscription) 
         }
       });
       console.log(`⚠️ Status da assinatura atualizado: ${subscription.status}`);
    }

  } catch (error: any) {
    console.error("❌ Erro no processamento do Webhook:", error);
    // Retornamos 200 para o Stripe não ficar tentando reenviar infinitamente em caso de erro lógico nosso
    return new NextResponse("Webhook processed with errors", { status: 200 });
  }

  return new NextResponse(null, { status: 200 });
}