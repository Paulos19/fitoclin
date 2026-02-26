import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";

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
    // Redireciona para a página de vendas do MEI ou dashboard principal caso não tenha acesso
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-white via-green-50/50 to-white">
      {children}
    </div>
  );
}