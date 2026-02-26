// app/(mei)/mei/layout.tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { MeiNavbar } from "@/components/mei/navbar";

export default async function MeiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Busca a assinatura do usuário
  const subscription = await db.subscription.findUnique({
    where: { userId: session.user.id }
  });

  // Regra de Acesso: O usuário precisa ser ADMIN ou ter a assinatura do plano MEI
  const hasAccess = session.user.role === "ADMIN" || subscription?.plan === "MEI";

  if (!hasAccess) {
    redirect("/dashboard"); // Se não tiver acesso, manda pro dashboard genérico ou para uma página de vendas
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-white via-green-50/50 to-white">
      <MeiNavbar userRole={session.user.role} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}