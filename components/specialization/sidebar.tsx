"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  LayoutDashboard, 
  Video, 
  FileText, 
  Award, 
  Calendar,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/specialization" },
  { icon: BookOpen, label: "Meus Cursos", href: "/specialization/courses" },
  { icon: Video, label: "Mentorias Gravadas", href: "/specialization/mentorships" },
  { icon: FileText, label: "Materiais & PDFs", href: "/specialization/resources" },
  { icon: Calendar, label: "Agenda Ao Vivo", href: "/specialization/schedule" },
  { icon: Award, label: "Meus Certificados", href: "/specialization/certificates" },
];

export function SpecializationSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 hidden md:flex flex-col border-r border-purple-500/10 bg-[#051c10] h-[calc(100vh-80px)] sticky top-20">
      
      <div className="p-6">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">
          Menu Acadêmico
        </h3>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                  isActive 
                    ? "bg-purple-500/10 text-purple-300 border border-purple-500/20" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn(
                    "w-4 h-4 transition-colors",
                    isActive ? "text-purple-400" : "text-gray-500 group-hover:text-white"
                )} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-white/5">
        <div className="bg-gradient-to-b from-purple-900/20 to-transparent p-4 rounded-xl border border-purple-500/20 text-center">
            <p className="text-xs text-purple-200 mb-2">Próxima Mentoria</p>
            <p className="text-sm font-bold text-white">15 OUT - 19:00</p>
            <Button size="sm" variant="outline" className="mt-3 w-full border-purple-500/50 text-purple-300 hover:bg-purple-500 hover:text-white h-7 text-xs">
                Definir Lembrete
            </Button>
        </div>

        <Button asChild variant="ghost" className="w-full mt-4 text-gray-500 hover:text-white gap-2 justify-start px-2">
            <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4" /> Voltar para o App
            </Link>
        </Button>
      </div>
    </aside>
  );
}