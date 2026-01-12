import { db } from "@/lib/db";

export async function hasCourseAccess(userId: string, courseId: string) {
  // 1. Verificar se é ADMIN (Dra. Isa sempre tem acesso)
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { role: true }
  });

  if (user?.role === "ADMIN") return true;

  // 2. Verificar Assinatura Ativa (Fitoclin Mensal)
  const subscription = await db.subscription.findUnique({
    where: { userId },
    select: { stripeCurrentPeriodEnd: true }
  });

  const isSubscribed = subscription?.stripeCurrentPeriodEnd
    ? subscription.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now() // +1 dia de margem
    : false;

  if (isSubscribed) return true;

  // 3. Verificar Compra Individual
  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId
      }
    }
  });

  return !!purchase;
}