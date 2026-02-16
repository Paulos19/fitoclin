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
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface SpecializationSidebarProps {
  isCollapsed?: boolean;
  toggleSidebar?: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/specialization" },
  { icon: BookOpen, label: "Meus Cursos", href: "/specialization/courses" },
  { icon: Video, label: "Mentorias Gravadas", href: "/specialization/mentorships" },
  { icon: FileText, label: "Materiais & PDFs", href: "/specialization/resources" },
  { icon: Calendar, label: "Agenda Ao Vivo", href: "/specialization/schedule" },
  { icon: Award, label: "Meus Certificados", href: "/specialization/certificates" },
];

export function SpecializationSidebar({ isCollapsed = false, toggleSidebar }: SpecializationSidebarProps) {
  const pathname = usePathname();

  return (
    <aside 
      className={cn(
        "relative hidden md:flex flex-col border-r border-purple-500/10 bg-[#062214] transition-all duration-300 ease-in-out h-full z-30",
        isCollapsed ? "w-[80px]" : "w-72"
      )}
    >
      
      {/* Botão de Colapsar (Desktop) */}
      <div 
        onClick={toggleSidebar}
        className="absolute -right-3 top-10 bg-purple-600 hover:bg-purple-500 text-white rounded-full p-1 cursor-pointer border-2 border-[#062214] shadow-md z-50 transition-colors"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </div>

      {/* Área do Logo */}
      <div className={cn("flex items-center h-20 border-b border-purple-500/10 px-6", isCollapsed && "justify-center px-0")}>
        <Link href="/specialization" className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-2 rounded-lg shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          
          {/* Animação do Texto do Logo */}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <h1 className="text-lg font-bold text-white tracking-tight leading-none">
                  Fitoclin <span className="text-purple-400">Academy</span>
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Menu de Navegação */}
      <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-900/50">
        {!isCollapsed && (
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-3 animate-in fade-in slide-in-from-left-4 duration-500">
            Menu Acadêmico
          </h3>
        )}

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                  isActive 
                    ? "bg-purple-500/10 text-purple-300 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5",
                  isCollapsed && "justify-center px-2"
                )}
              >
                {/* Indicador lateral ativo */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-r-full" />
                )}

                <item.icon className={cn(
                  "shrink-0 transition-colors",
                  isCollapsed ? "w-6 h-6" : "w-5 h-5",
                  isActive ? "text-purple-400" : "text-gray-500 group-hover:text-purple-400"
                )} />

                {!isCollapsed && (
                  <span className="whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                    {item.label}
                  </span>
                )}
                
                {/* Tooltip para modo colapsado */}
                {isCollapsed && (
                  <div className="absolute left-14 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap border border-gray-700">
                    {item.label}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer / Card de Próxima Mentoria */}
      <div className="p-4 border-t border-purple-500/10 bg-[#051c10]">
        
        {/* Card de Mentoria - Só aparece se expandido */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gradient-to-b from-purple-900/20 to-transparent p-4 rounded-xl border border-purple-500/20 text-center mb-4 overflow-hidden"
            >
              <div className="flex justify-center mb-2">
                 <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                 </span>
              </div>
              <p className="text-xs text-purple-200 mb-1">Próxima Mentoria</p>
              <p className="text-sm font-bold text-white mb-3">15 OUT - 19:00</p>
              <Button size="sm" variant="outline" className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-600 hover:border-purple-600 hover:text-white h-8 text-xs bg-transparent transition-all">
                Definir Lembrete
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botão Voltar */}
        <Button 
          asChild 
          variant="ghost" 
          className={cn(
            "w-full text-gray-500 hover:text-white hover:bg-white/5 transition-all",
            !isCollapsed ? "justify-start gap-2" : "justify-center p-0"
          )}
        >
          <Link href="/dashboard">
            <ArrowLeft className="w-5 h-5" /> 
            {!isCollapsed && <span>Voltar para o App</span>}
          </Link>
        </Button>
      </div>
    </aside>
  );
}