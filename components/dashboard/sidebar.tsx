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
const adminLinks = [
  { name: "Visão Geral", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pacientes", href: "/dashboard/patients", icon: Users },
  { name: "Agenda", href: "/dashboard/schedule", icon: Calendar },
  { name: "Prontuários", href: "/dashboard/records", icon: FileText },
  { name: "CRM", href: "/dashboard/crm", icon: BarChart3 },
  { name: "Financeiro", href: "/dashboard/financial", icon: DollarSign },
  { name: "Configurações", href: "/dashboard/settings", icon: Settings },
];

const patientLinks = [
  { name: "Meu Painel", href: "/dashboard", icon: LayoutDashboard },
  { name: "Minhas Consultas", href: "/dashboard/appointments", icon: Calendar },
  { name: "Minhas Prescrições", href: "/dashboard/prescriptions", icon: Pill },
  { name: "Meus Exames", href: "/dashboard/documents", icon: FolderOpen }, // 👈 Novo Link
  { name: "Meus Dados", href: "/dashboard/profile", icon: UserCircle },
];

interface SidebarProps {
  role: "ADMIN" | "PATIENT";
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const links = role === "ADMIN" ? adminLinks : patientLinks;

  const sidebarVariants = {
    expanded: { width: "16rem" }, // w-64
    collapsed: { width: "5rem" }, // w-20
  };

  return (
    <TooltipProvider delayDuration={0}>
      <motion.div
        initial="expanded"
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "relative flex flex-col h-full border-r z-20 shadow-xl",
          "bg-[#062214] border-[#2A5432]/30 text-white"
        )}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "absolute -right-3 top-8 z-30 flex h-6 w-6 items-center justify-center rounded-full border shadow-md transition-colors",
            "bg-[#76A771] border-[#062214] text-[#062214] hover:bg-white"
          )}
        >
          {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>

        {/* Header (Logo) */}
        <div className="flex h-20 items-center px-4 overflow-hidden relative">
          <div className="flex items-center gap-3 w-full">
            <div className="relative shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-[#2A5432]/50 border border-[#2A5432]">
               <Image 
                 src="/logo.png" 
                 alt="Fitoclin Logo" 
                 width={32} 
                 height={32} 
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
                  <span className="text-[10px] uppercase font-semibold text-[#76A771] tracking-widest">
                    {role === "ADMIN" ? "Profissional" : "Paciente"}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Separator */}
        <div className="h-[1px] mx-4 bg-gradient-to-r from-transparent via-[#2A5432] to-transparent mb-4 opacity-50" />

        {/* Navegação */}
        <nav className="flex-1 overflow-y-auto px-3 space-y-2 py-4 custom-scrollbar">
          {links.map((link) => {
            const isActive = pathname === link.href;

            const LinkContent = (
              <Link
                href={link.href}
                className={cn(
                  "relative flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 group overflow-hidden",
                  isActive
                    ? "bg-[#2A5432] text-white shadow-[0_0_15px_rgba(118,167,113,0.15)]"
                    : "text-[#F1F1F1]/70 hover:bg-[#2A5432]/30 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#76A771] rounded-l-full"
                  />
                )}

                <link.icon
                  className={cn(
                    "w-5 h-5 shrink-0 transition-colors duration-300",
                    isActive ? "text-[#76A771]" : "text-[#76A771]/70 group-hover:text-[#76A771]"
                  )}
                />

                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium text-sm whitespace-nowrap"
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
                  <TooltipContent side="right" className="bg-[#0A311D] text-[#F1F1F1] border-[#2A5432]">
                    {link.name}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return <div key={link.href}>{LinkContent}</div>;
          })}
        </nav>

        {/* Footer (Logout) */}
        <div className="p-3 mt-auto">
           <div className="h-[1px] bg-[#2A5432]/30 mb-3" />
           {isCollapsed ? (
             <Tooltip>
               <TooltipTrigger asChild>
                 <Button
                   variant="ghost"
                   size="icon"
                   className="w-full h-10 hover:bg-red-500/10 hover:text-red-400 text-[#F1F1F1]/60"
                   onClick={() => signOut({ callbackUrl: "/login" })}
                 >
                   <LogOut className="w-5 h-5" />
                 </Button>
               </TooltipTrigger>
               <TooltipContent side="right" className="bg-red-900 border-red-800 text-white">Sair</TooltipContent>
             </Tooltip>
           ) : (
             <Button
                variant="ghost"
                className="w-full justify-start gap-3 hover:bg-red-500/10 hover:text-red-400 text-[#F1F1F1]/60"
                onClick={() => signOut({ callbackUrl: "/login" })}
             >
               <LogOut className="w-5 h-5" />
               <span className="font-medium">Sair do Sistema</span>
             </Button>
           )}
        </div>
      </motion.div>
    </TooltipProvider>
  );
}