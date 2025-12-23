"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut,
  Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

// Defina os links para cada tipo de usuário
const adminLinks = [
  { name: "Visão Geral", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pacientes", href: "/dashboard/patients", icon: Users },
  { name: "Agenda", href: "/dashboard/schedule", icon: Calendar },
  { name: "Prontuários", href: "/dashboard/records", icon: FileText },
  { name: "Configurações", href: "/dashboard/settings", icon: Settings },
];

const patientLinks = [
  { name: "Meu Painel", href: "/dashboard", icon: LayoutDashboard },
  { name: "Minhas Consultas", href: "/dashboard/appointments", icon: Calendar },
  { name: "Minhas Prescrições", href: "/dashboard/prescriptions", icon: FileText },
  { name: "Meus Dados", href: "/dashboard/profile", icon: Users },
];

interface SidebarProps {
  role: "ADMIN" | "PATIENT";
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const links = role === "ADMIN" ? adminLinks : patientLinks;

  return (
    <div className="flex flex-col h-full border-r bg-[#062214] text-white w-64">
      {/* Header da Sidebar */}
      <div className="h-16 flex items-center px-6 border-b border-[#2A5432]/30">
        <Link href="/" className="flex items-center gap-2">
           <Leaf className="w-6 h-6 text-[#76A771]" />
           <span className="font-bold text-lg">Fitoclin <span className="text-[#76A771] text-xs uppercase ml-1">Painel</span></span>
        </Link>
      </div>

      {/* Links de Navegação */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive 
                  ? "bg-[#76A771] text-[#062214]" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <link.icon className={cn("w-5 h-5", isActive ? "text-[#062214]" : "text-[#76A771]")} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer da Sidebar (Logout) */}
      <div className="p-4 border-t border-[#2A5432]/30">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20 gap-3"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="w-5 h-5" />
          Sair do Sistema
        </Button>
      </div>
    </div>
  );
}