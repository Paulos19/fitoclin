import { auth } from "@/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Proteção extra (caso o middleware falhe ou para tipagem)
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Fixa (Desktop) */}
      <aside className="hidden md:flex h-full flex-col fixed inset-y-0 z-50">
        <Sidebar role={session.user.role} />
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 md:ml-64 h-full overflow-y-auto">
        <div className="container mx-auto p-8 max-w-7xl">
           {/* Header Mobile poderia entrar aqui se necessário */}
           {children}
        </div>
      </main>
    </div>
  );
}