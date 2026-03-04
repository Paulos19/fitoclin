import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { getNotifications } from "@/actions/notifications";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const role = (session.user.role as "ADMIN" | "PATIENT" | "PROFESSIONAL" | "SECRETARY" | "USER") || "PATIENT";

  // Fetch user subscriptions
  const [purchases, subscription] = await Promise.all([
    prisma.purchase.count({ where: { userId: session.user.id } }).catch(() => 0),
    prisma.subscription.findUnique({ where: { userId: session.user.id } }).catch(() => null)
  ]);

  const isCommunitySubscribed = subscription?.plan === "COMMUNITY" && subscription?.stripeCurrentPeriodEnd
    ? subscription.stripeCurrentPeriodEnd.getTime() + 86400000 > Date.now()
    : false;

  const isSpecializationSubscribed = subscription?.plan === "SPECIALIZATION" && subscription?.stripeCurrentPeriodEnd
    ? subscription.stripeCurrentPeriodEnd.getTime() + 86400000 > Date.now()
    : false;

  const hasCourses = purchases > 0 || isSpecializationSubscribed;

  // Buscar notificações no servidor
  const notifications = await getNotifications().catch(() => []);

  return (
    <div className="flex h-screen w-full bg-[#062214] overflow-hidden">
      <aside className="hidden lg:block h-full z-20">
        <Sidebar role={role} isCommunitySubscribed={isCommunitySubscribed} hasCourses={hasCourses} />
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header user={session.user} notifications={notifications} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#062214] p-6 scroll-smooth">
          <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 slide-in-from-bottom-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}