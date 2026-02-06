"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Pill,
  BarChart3,
  DollarSign,
  FolderOpen,
  GraduationCap,
  Sparkles,
  Wallet2,
  Library // Novo ícone para biblioteca/cursos admin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// --- Definição dos Menus ---

// Menu Completo da Dra. Isa (Admin)
const adminLinks = [
  { name: "Visão Geral", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pacientes", href: "/dashboard/patients", icon: Users },
  { name: "Agenda", href: "/dashboard/schedule", icon: Calendar },
  { name: "Prontuários", href: "/dashboard/records", icon: FileText },
  { name: "Gestão de Cursos", href: "/dashboard/courses", icon: Library },
  { name: "CRM", href: "/dashboard/crm", icon: BarChart3 },
  { name: "Financeiro", href: "/dashboard/financial", icon: DollarSign },
  { name: "Configurações", href: "/dashboard/settings", icon: Settings },
];

// 👇 NOVO MENU: Secretária (Igual ao Admin, exceto Cursos)
const secretaryLinks = [
  { name: "Visão Geral", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pacientes", href: "/dashboard/patients", icon: Users },
  { name: "Agenda", href: "/dashboard/schedule", icon: Calendar },
  { name: "Prontuários", href: "/dashboard/records", icon: FileText },
  // Sem acesso a Gestão de Cursos
  { name: "CRM", href: "/dashboard/crm", icon: BarChart3 },
  { name: "Financeiro", href: "/dashboard/financial", icon: DollarSign },
  { name: "Configurações", href: "/dashboard/settings", icon: Settings },
];

const professionalLinks = [
  { name: "Visão Geral", href: "/dashboard", icon: LayoutDashboard },
  { name: "Meus Pacientes", href: "/dashboard/patients", icon: Users },
  { name: "Minha Agenda", href: "/dashboard/schedule", icon: Calendar },
  { name: "Prontuários", href: "/dashboard/records", icon: FileText },
  { name: "Meu CRM", href: "/dashboard/crm", icon: BarChart3 },
  { name: "Meu Financeiro", href: "/dashboard/financial", icon: DollarSign },
];

const patientLinks = [
  { name: "Meu Painel", href: "/dashboard", icon: LayoutDashboard },
  { name: "Minhas Consultas", href: "/dashboard/appointments", icon: Calendar },
  { name: "Meus Cursos", href: "/dashboard/courses", icon: GraduationCap },
  { name: "Minhas Prescrições", href: "/dashboard/prescriptions", icon: Pill },
  { name: "Meus Exames", href: "/dashboard/documents", icon: FolderOpen },
  { name: "Meus Dados", href: "/dashboard/profile", icon: UserCircle },
  { name: "Meu Plano", href: "/subscription", icon: Wallet2 },
];

interface SidebarProps {
  // 👇 Adicionado SECRETARY ao tipo
  role: "ADMIN" | "PATIENT" | "PROFESSIONAL" | "SECRETARY";
  isSubscribed?: boolean;
}

export function Sidebar({ role, isSubscribed = false }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // 👇 Lógica de seleção do menu atualizada
  let links = patientLinks;
  if (role === "ADMIN") links = adminLinks;
  if (role === "PROFESSIONAL") links = professionalLinks;
  if (role === "SECRETARY") links = secretaryLinks;

  const sidebarVariants = {
    expanded: { width: "16rem" },
    collapsed: { width: "5rem" },
  };

  // Helper para exibir o nome da role na UI
  const getRoleLabel = () => {
    switch (role) {
      case "ADMIN": return "Admin";
      case "PROFESSIONAL": return "Profissional";
      case "SECRETARY": return "Secretária";
      default: return "Paciente";
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <motion.div
        initial="expanded"
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "relative flex flex-col h-full border-r z-20 shadow-2xl",
          "bg-[#051F12] border-[#2A5432]/40 text-white"
        )}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "absolute -right-3 top-8 z-30 flex h-6 w-6 items-center justify-center rounded-full border shadow-md transition-all hover:scale-110",
            "bg-[#76A771] border-[#062214] text-[#062214] hover:bg-white"
          )}
        >
          {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>

        <div className="flex h-20 items-center px-4 overflow-hidden relative">
          <div className="flex items-center gap-3 w-full">
            <div className="relative shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#2A5432] to-[#1a3821] border border-[#2A5432] shadow-inner">
               <Image 
                 src="/logo.png" 
                 alt="Fitoclin Logo" 
                 width={28} 
                 height={28} 
                 className="object-contain"
               />
            </div>

            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col whitespace-nowrap"
                >
                  <span className="font-bold text-lg tracking-tight text-[#F1F1F1]">
                    Fitoclin
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#76A771] tracking-widest">
                    {getRoleLabel()}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="h-[1px] mx-4 bg-gradient-to-r from-transparent via-[#2A5432] to-transparent mb-4 opacity-50" />

        <nav className="flex-1 overflow-y-auto px-3 space-y-2 py-2 custom-scrollbar">
          {links.map((link) => {
            const isActive = 
              link.href === "/dashboard" 
                ? pathname === "/dashboard"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            const LinkContent = (
              <Link
                href={link.href}
                className={cn(
                  "relative flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 group overflow-hidden",
                  isActive
                    ? "bg-[#2A5432] text-white shadow-[0_4px_20px_-5px_rgba(118,167,113,0.3)]"
                    : "text-[#F1F1F1]/70 hover:bg-[#2A5432]/30 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute left-0 top-2 bottom-2 w-1 bg-[#76A771] rounded-r-full"
                  />
                )}

                <link.icon
                  className={cn(
                    "w-5 h-5 shrink-0 transition-colors duration-300",
                    isActive ? "text-[#76A771]" : "text-[#76A771]/60 group-hover:text-[#76A771]"
                  )}
                />

                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium text-sm whitespace-nowrap truncate"
                  >
                    {link.name}
                  </motion.span>
                )}
              </Link>
            );

            if (isCollapsed) {
              return (
                <Tooltip key={link.href}>
                  <TooltipTrigger asChild>{LinkContent}</TooltipTrigger>
                  <TooltipContent side="right" className="bg-[#0A311D] text-[#F1F1F1] border-[#2A5432] font-medium ml-2">
                    {link.name}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return <div key={link.href}>{LinkContent}</div>;
          })}
        </nav>

        {role === "PATIENT" && isSubscribed && (
          <div className="px-3 mb-2 mt-2">
            {!isCollapsed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link href="/community">
                  <div className="relative overflow-hidden group rounded-xl p-[1px] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">
                    <div className="relative flex items-center gap-3 bg-[#051F12] group-hover:bg-gradient-to-r group-hover:from-[#D4AF37]/20 group-hover:to-[#051F12] rounded-[11px] px-3 py-3 transition-all duration-300">
                      <div className="p-1.5 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37]">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#D4AF37] leading-none">Comunidade</span>
                        <span className="text-[10px] text-[#F3E5AB]/80 uppercase tracking-wider">Acesso VIP</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/community" className="flex justify-center w-full">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8C7321] text-[#051F12] shadow-lg hover:scale-105 transition-transform">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-[#D4AF37] text-[#051F12] font-bold border-none ml-2">
                  Acessar Comunidade VIP
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        )}

        <div className="p-3 mt-auto">
           <div className="h-[1px] bg-[#2A5432]/30 mb-3" />
           {isCollapsed ? (
             <Tooltip>
               <TooltipTrigger asChild>
                 <Button
                   variant="ghost"
                   size="icon"
                   className="w-full h-10 hover:bg-red-500/10 hover:text-red-400 text-[#F1F1F1]/50 hover:border hover:border-red-900/30 transition-all"
                   onClick={() => signOut({ callbackUrl: "/login" })}
                 >
                   <LogOut className="w-5 h-5" />
                 </Button>
               </TooltipTrigger>
               <TooltipContent side="right" className="bg-red-950 border-red-900 text-red-100 ml-2">Sair</TooltipContent>
             </Tooltip>
           ) : (
             <Button
                variant="ghost"
                className="w-full justify-start gap-3 hover:bg-red-500/10 hover:text-red-400 text-[#F1F1F1]/60 transition-all group"
                onClick={() => signOut({ callbackUrl: "/login" })}
             >
               <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               <span className="font-medium">Sair do Sistema</span>
             </Button>
           )}
        </div>
      </motion.div>
    </TooltipProvider>
  );
}