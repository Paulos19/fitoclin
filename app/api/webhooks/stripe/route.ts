import { headers } from "next/headers";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

// Helper robusto para extrair data (previne erros de tipagem do SDK)
function getSubscriptionEndDate(subscription: Stripe.Subscription): Date {
  const sub = subscription as any;
  const periodEnd = sub.currentPeriodEnd ?? sub.current_period_end;

  if (!periodEnd) {
    console.warn("⚠️ Data de expiração não encontrada, adicionando 30 dias de margem.");
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
    // ======================================================================
    // CENÁRIO 1: Checkout Finalizado (Pode ser Assinatura OU Compra Avulsa)
    // ======================================================================
    if (event.type === "checkout.session.completed") {
      
      // ------------------------------------------------------------------
      // CASO A: ASSINATURA RECORRENTE (Plano Mensal)
      // ------------------------------------------------------------------
      if (session.mode === "subscription") {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        if (!session?.metadata?.userId) {
          return new NextResponse("User ID is required in metadata", { status: 400 });
        }

        const userId = session.metadata.userId;

        // Salva/Atualiza na tabela Subscription
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

        // Vincula Customer ID ao User
        await db.user.update({
          where: { id: userId },
          data: { stripeCustomerId: subscription.customer as string }
        });

        console.log(`✅ Assinatura ativada para User: ${userId}`);
      }

      // ------------------------------------------------------------------
      // CASO B: COMPRA AVULSA DE CURSO (Pagamento Único)
      // ------------------------------------------------------------------
      // Verificamos se é 'payment' E se o tipo (que passamos na action) é 'course_purchase'
      if (session.mode === "payment" && session.metadata?.type === "course_purchase") {
        const { userId, courseId } = session.metadata;

        if (userId && courseId) {
          // Cria o registro de compra vitalícia
          // Usamos upsert ou ignore para evitar erro se o webhook bater 2x
          const existingPurchase = await db.purchase.findUnique({
             where: { userId_courseId: { userId, courseId } }
          });

          if (!existingPurchase) {
             await db.purchase.create({
                data: {
                   userId: userId,
                   courseId: courseId
                }
             });
             
             // Opcional: Salvar stripeCustomerId se for a primeira compra
             if (session.customer) {
                await db.user.update({
                   where: { id: userId },
                   data: { stripeCustomerId: session.customer as string }
                });
             }
             
             console.log(`✅ Curso ${courseId} comprado com sucesso por ${userId}`);
          }
        }
      }
    }

    // ======================================================================
    // CENÁRIO 2: Renovação Automática de Assinatura
    // ======================================================================
    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as Stripe.Invoice;
      
      // Tratamento seguro para pegar o ID da subscription
      const subscriptionId = typeof (invoice as any).subscription === 'string'
        ? (invoice as any).subscription
        : (invoice as any).subscription?.id;

      if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        // Atualiza apenas a data de expiração
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

    // ======================================================================
    // CENÁRIO 3: Cancelamento ou Falha na Assinatura
    // ======================================================================
    if (event.type === "customer.subscription.deleted" || event.type === "customer.subscription.updated") {
       const subscription = event.data.object as Stripe.Subscription;
       
       // Verifica se existe no banco antes de tentar atualizar (evita erros em subs antigas)
       const existingSub = await db.subscription.findUnique({
          where: { stripeSubscriptionId: subscription.id }
       });

       if (existingSub) {
          await db.subscription.update({
            where: { stripeSubscriptionId: subscription.id },
            data: { 
               status: subscription.status,
               stripeCurrentPeriodEnd: getSubscriptionEndDate(subscription) 
            }
          });
          console.log(`⚠️ Status da assinatura atualizado: ${subscription.status}`);
       }
    }

  } catch (error: any) {
    console.error("❌ Erro no processamento do Webhook:", error);
    // Retornamos 200 para evitar loop de retentativas do Stripe se for erro lógico nosso
    return new NextResponse("Webhook processed with errors", { status: 200 });
  }

  return new NextResponse(null, { status: 200 });
}