import { headers } from "next/headers";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { sendEmail, getCRMWelcomeTemplate } from "@/lib/mail";

// Helper robusto para extrair data
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
    // CENÁRIO 1: Checkout Finalizado
    // ======================================================================
    if (event.type === "checkout.session.completed") {

      // ------------------------------------------------------------------
      // CASO A: ASSINATURA (Plano Mensal, CRM ou Especialização)
      // ------------------------------------------------------------------
      if (session.mode === "subscription") {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        if (!session?.metadata?.userId) {
          return new NextResponse("User ID is required in metadata", { status: 400 });
        }

        const userId = session.metadata.userId;
        const priceId = subscription.items.data[0].price.id;

        // --- LÓGICA DE IDENTIFICAÇÃO DO PLANO ---
        const crmPriceId = process.env.STRIPE_PRICE_ID_CRM?.trim();
        const specializationPriceId = process.env.STRIPE_SPECIALIZATION_PRICE_ID?.trim() || process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SPECIALIZATION?.trim();

        const isCRMPlan = priceId === crmPriceId;
        const isSpecializationPlan = priceId === specializationPriceId;

        // Define o Enum do Prisma baseado no preço
        let planType: "COMMUNITY" | "SPECIALIZATION" | "PRO" = "COMMUNITY";
        if (isCRMPlan) {
          planType = "PRO";
        } else if (isSpecializationPlan) {
          planType = "SPECIALIZATION";
        }

        // 1. Salva a assinatura no banco com o PLAN correto
        await db.subscription.upsert({
          where: { userId: userId },
          create: {
            userId: userId,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: priceId,
            stripeCurrentPeriodEnd: getSubscriptionEndDate(subscription),
            status: subscription.status,
            plan: planType, // 👈 Salva o nível da assinatura
          },
          update: {
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: priceId,
            stripeCurrentPeriodEnd: getSubscriptionEndDate(subscription),
            status: subscription.status,
            plan: planType, // 👈 Atualiza caso mude de plano
          },
        });

        // 2. ATUALIZA O USUÁRIO (Role + Stripe ID)
        // Se for CRM, promove para PROFESSIONAL.
        if (isCRMPlan) {
          await db.user.update({
            where: { id: userId },
            data: {
              stripeCustomerId: subscription.customer as string,
              role: "PROFESSIONAL"
            }
          });
          console.log(`🆙 User ${userId} promovido para PROFESSIONAL (Plano CRM)`);

          const user = await db.user.findUnique({
            where: { id: userId },
            select: { name: true, email: true }
          });

          if (user?.email) {
            await sendEmail({
              to: user.email,
              subject: "Bem-vindo ao Fitoclin PRO! 🚀",
              html: getCRMWelcomeTemplate(user.name || "Profissional"),
            });
          }
        } else {
          // Se for Community ou Specialization, apenas garante o ID do cliente
          await db.user.update({
            where: { id: userId },
            data: { stripeCustomerId: subscription.customer as string }
          });
        }

        console.log(`✅ Assinatura processada para User: ${userId} | Plano: ${planType}`);
      }

      // ------------------------------------------------------------------
      // CASO B: COMPRA AVULSA DE CURSO
      // ------------------------------------------------------------------
      if (session.mode === "payment" && session.metadata?.type === "course_purchase") {
        const { userId, courseId } = session.metadata;

        if (userId && courseId) {
          const existingPurchase = await db.purchase.findUnique({
            where: { userId_courseId: { userId, courseId } }
          });

          if (!existingPurchase) {
            await db.purchase.create({
              data: { userId, courseId }
            });

            if (session.customer) {
              await db.user.update({
                where: { id: userId },
                data: { stripeCustomerId: session.customer as string }
              });
            }
            console.log(`✅ Curso ${courseId} comprado por ${userId}`);
          }
        }
      }
    }

    // ======================================================================
    // CENÁRIO 2: Renovação
    // ======================================================================
    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = typeof (invoice as any).subscription === 'string'
        ? (invoice as any).subscription
        : (invoice as any).subscription?.id;

      if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        // Verifica o plano novamente na renovação (caso tenha feito upgrade/downgrade)
        const priceId = subscription.items.data[0].price.id;
        const crmPriceId = process.env.STRIPE_PRICE_ID_CRM?.trim();
        const specializationPriceId = process.env.STRIPE_SPECIALIZATION_PRICE_ID?.trim() || process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SPECIALIZATION?.trim();

        let planType: "COMMUNITY" | "SPECIALIZATION" | "PRO" = "COMMUNITY";
        if (priceId === crmPriceId) {
          planType = "PRO";
        } else if (priceId === specializationPriceId) {
          planType = "SPECIALIZATION";
        }

        await db.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            stripePriceId: priceId,
            stripeCurrentPeriodEnd: getSubscriptionEndDate(subscription),
            status: subscription.status,
            plan: planType, // Atualiza o plano
          },
        });
        console.log(`🔄 Assinatura renovada: ${subscription.id} | Plano: ${planType}`);
      }
    }

    // ======================================================================
    // CENÁRIO 3: Cancelamento / Falha
    // ======================================================================
    if (event.type === "customer.subscription.deleted" || event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;

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
        console.log(`⚠️ Status atualizado: ${subscription.status}`);
      }
    }

  } catch (error: any) {
    console.error("❌ Erro no Webhook:", error);
    return new NextResponse("Webhook processed with errors", { status: 200 });
  }

  return new NextResponse(null, { status: 200 });
}