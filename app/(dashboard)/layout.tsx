import { auth } from "@/auth"; // Certifique-se que o caminho do auth está correto
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Define a role baseado na sessão (ajuste conforme seu schema do Prisma/NextAuth)
  const role = session.user.role as "ADMIN" | "PATIENT" || "PATIENT";

  return (
    <div className="flex h-screen w-full bg-[#062214] overflow-hidden">
      {/* SIDEBAR (Desktop) 
        A sidebar controla sua própria largura (retrátil), 
        então apenas a renderizamos aqui. Hidden no mobile.
      */}
      <aside className="hidden lg:block h-full z-20">
        <Sidebar role={role} />
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* TOPBAR (Header) */}
        <Header user={session.user} />

        {/* CONTEÚDO DA PÁGINA (Scrollável) */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#062214] p-6 scroll-smooth">
          {/* Container centralizado para evitar que o conteúdo estique demais em telas ultrawide
            Mantém o "Fitoclin Premium" focado.
          */}
          <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 slide-in-from-bottom-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}