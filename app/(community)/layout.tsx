import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { CommunityHeader } from "@/components/community/header";

export default async function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // 1. Verificação de Autenticação
  if (!session || !session.user) {
    redirect("/login");
  }

  // 2. Verificação de Assinatura (Mantenha sua lógica de segurança aqui)
  const subscription = await db.subscription.findUnique({
    where: { userId: session.user.id },
    select: { stripeCurrentPeriodEnd: true }
  });

  const isAdmin = session.user.role === "ADMIN";
  const hasActiveSubscription = subscription?.stripeCurrentPeriodEnd
    ? subscription.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
    : false;

  if (!isAdmin && !hasActiveSubscription) {
    redirect("/dashboard?error=subscription_required");
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans">
      <CommunityHeader user={session.user} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}