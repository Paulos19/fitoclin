import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { getNotifications } from "@/actions/notifications"; // <--- Importe a action

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const role = (session.user.role as "ADMIN" | "PATIENT") || "PATIENT";
  
  // Buscar notificações no servidor
  const notifications = await getNotifications();

  return (
    <div className="flex h-screen w-full bg-[#062214] overflow-hidden">
      <aside className="hidden lg:block h-full z-20">
        <Sidebar role={role} />
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Passamos as notificações para o Header */}
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