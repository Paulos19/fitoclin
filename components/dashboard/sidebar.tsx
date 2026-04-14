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
  Library,
  Lock,
  Video, // Novo ícone para mentorias
  Crown  // Novo ícone para área de especialização
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

// === ATUALIZAÇÃO NO MENU ADMIN ===
const adminLinks = [
  { name: "Visão Geral", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pacientes", href: "/dashboard/patients", icon: Users },
  { name: "Agenda", href: "/dashboard/schedule", icon: Calendar },
  { name: "Prontuários", href: "/dashboard/records", icon: FileText },

  // Seção Acadêmica
  { name: "Gestão de Cursos", href: "/dashboard/courses", icon: Library },
  { name: "Gestão de Mentorias", href: "/dashboard/mentorships", icon: Video }, // [NOVO]

  { name: "CRM", href: "/dashboard/crm", icon: BarChart3 },
  { name: "Financeiro", href: "/dashboard/financial", icon: DollarSign },
  { name: "Configurações", href: "/dashboard/settings", icon: Settings },

  // Acesso Direto às Áreas (Opcional, mas útil para ver como está ficando)
  { name: "Ver Especialização", href: "/specialization", icon: Crown }, // [NOVO]
];

const secretaryLinks = [
  { name: "Visão Geral", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pacientes", href: "/dashboard/patients", icon: Users },
  { name: "Agenda", href: "/dashboard/schedule", icon: Calendar },
  { name: "Prontuários", href: "/dashboard/records", icon: FileText },
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

const userLinks = [
  { name: "Meu Painel", href: "/dashboard", icon: LayoutDashboard },
  { name: "Meus Cursos", href: "/dashboard/courses", icon: GraduationCap },
  { name: "Certificados", href: "/dashboard/certificates", icon: FileText },
  { name: "Meu Perfil", href: "/dashboard/profile", icon: UserCircle },
];

interface SidebarProps {
  role: "ADMIN" | "PATIENT" | "PROFESSIONAL" | "SECRETARY" | "USER";
  isCommunitySubscribed?: boolean;
  hasCourses?: boolean;
  isTrial?: boolean;
  trialDaysLeft?: number;
}

export function Sidebar({ role, isCommunitySubscribed = false, hasCourses = false, isTrial = false, trialDaysLeft = 0 }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"community" | "specialization">("community");

  let links = patientLinks;
  if (role === "ADMIN") links = adminLinks;
  if (role === "PROFESSIONAL") links = professionalLinks;
  if (role === "SECRETARY") links = secretaryLinks;
  if (role === "USER") links = userLinks;

  const sidebarVariants = {
    expanded: { width: "16rem" },
    collapsed: { width: "5rem" },
  };

  const getRoleLabel = () => {
    switch (role) {
      case "ADMIN": return "Admin";
      case "PROFESSIONAL": return "Profissional";
      case "SECRETARY": return "Secretária";
      case "USER": return "Aluno";
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
              <Image src="/logo.png" alt="Fitoclin Logo" width={28} height={28} className="object-contain" />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col whitespace-nowrap"
                >
                  <span className="font-bold text-lg tracking-tight text-[#F1F1F1]">Fitoclin</span>
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
            const isActive = link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === link.href || pathname.startsWith(`${link.href}/`);

            const LinkContent = (
              <Link
                href={link.href}
                className={cn(
                  "relative flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 group overflow-hidden",
                  isActive ? "bg-[#2A5432] text-white shadow-[0_4px_20px_-5px_rgba(118,167,113,0.3)]" : "text-[#F1F1F1]/70 hover:bg-[#2A5432]/30 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div layoutId="active-pill" className="absolute left-0 top-2 bottom-2 w-1 bg-[#76A771] rounded-r-full" />
                )}
                <link.icon className={cn("w-5 h-5 shrink-0 transition-colors duration-300", isActive ? "text-[#76A771]" : "text-[#76A771]/60 group-hover:text-[#76A771]")} />
                {!isCollapsed && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-medium text-sm whitespace-nowrap truncate">
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

        {/* --- CARDS DE ACESSO (COMUNIDADE & ESPECIALIZAÇÃO) --- */}
        <div className="px-3 mb-2 mt-2 space-y-2">
          {!isCollapsed ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="relative rounded-xl overflow-hidden shadow-lg p-1 bg-gradient-to-br from-[#0A311D] to-[#072415] border border-[#2A5432] group">

                {/* Switch Segmentado */}
                <div className="flex relative bg-[#04140b] rounded-lg p-1 mb-2">
                  <div className="absolute inset-y-1 left-1 right-1 pointer-events-none">
                    <motion.div
                      className="h-full rounded-md shadow-sm bg-gradient-to-r from-[#2A5432] to-[#16a34a]/30"
                      initial={false}
                      animate={{
                        x: activeTab === "community" ? "0%" : "100%",
                        width: "50%"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  </div>

                  <button
                    onClick={() => setActiveTab("community")}
                    className={cn(
                      "relative z-10 flex-1 py-1.5 text-[10px] uppercase font-bold tracking-wider rounded-md transition-colors",
                      activeTab === "community" ? "text-white" : "text-gray-400 hover:text-gray-200"
                    )}
                  >
                    Comunidade
                  </button>
                  <button
                    onClick={() => setActiveTab("specialization")}
                    className={cn(
                      "relative z-10 flex-1 py-1.5 text-[10px] uppercase font-bold tracking-wider rounded-md transition-colors",
                      activeTab === "specialization" ? "text-white" : "text-gray-400 hover:text-gray-200"
                    )}
                  >
                    Especialização
                  </button>
                </div>

                {/* Conteúdo do Switch */}
                <div className="relative h-[5rem] overflow-hidden rounded-lg">
                  <AnimatePresence mode="wait">
                    {activeTab === "community" ? (
                      <motion.div
                        key="community"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0"
                      >
                        <Link href={isCommunitySubscribed ? "/community" : "/subscription"} className="block h-full cursor-pointer group/link">
                          <div className={cn(
                            "h-full flex items-center px-4 transition-all",
                            isCommunitySubscribed
                              ? "bg-linear-to-r from-[#D4AF37]/20 to-transparent group-hover/link:from-[#D4AF37]/30"
                              : "bg-linear-to-r from-red-500/10 to-transparent group-hover/link:from-red-500/20"
                          )}>
                            <div className="flex items-center gap-3">
                              <div className={cn("p-2 rounded-md", isCommunitySubscribed ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "bg-red-500/10 border border-red-500/30 text-red-400 group-hover/link:text-red-300")}>
                                {isCommunitySubscribed ? <Sparkles className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                              </div>
                              <div className="flex flex-col">
                                <span className={cn("text-xs font-bold leading-none mb-1", isCommunitySubscribed ? "text-[#D4AF37]" : "text-red-400 group-hover/link:text-red-300")}>
                                  Comunidade
                                </span>
                                <span className={cn("text-[9px] uppercase tracking-wider", isCommunitySubscribed ? "text-[#F3E5AB]/70" : "text-gray-500 group-hover/link:text-white")}>
                                  {isCommunitySubscribed ? "Acesso VIP" : "Bloqueado • Assinar"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="specialization"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0"
                      >
                        <Link href={hasCourses ? "/specialization" : "/subscription/pro"} className="block h-full cursor-pointer group/link">
                          <div className={cn(
                            "h-full flex items-center px-4 transition-all",
                            hasCourses
                              ? "bg-linear-to-r from-purple-500/20 to-transparent group-hover/link:from-purple-500/30"
                              : "bg-linear-to-r from-orange-500/10 to-transparent group-hover/link:from-orange-500/20"
                          )}>
                            <div className="flex items-center gap-3">
                              <div className={cn("p-2 rounded-md", hasCourses ? "bg-purple-500/20 text-purple-400" : "bg-orange-500/10 border border-orange-500/30 text-orange-400 group-hover/link:text-orange-300")}>
                                {hasCourses ? <Crown className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                              </div>
                              <div className="flex flex-col">
                                <span className={cn("text-xs font-bold leading-none mb-1", hasCourses ? "text-purple-300" : "text-orange-400 group-hover/link:text-orange-300")}>
                                  Especialização
                                </span>
                                <span className={cn("text-[9px] uppercase tracking-wider", hasCourses ? "text-purple-400/80" : "text-gray-500 group-hover/link:text-white")}>
                                  {hasCourses ? "Área do Aluno" : "Bloqueado • Fator PRO"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-2 w-full items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={isCommunitySubscribed ? "/community" : "/subscription"} className="flex justify-center w-full">
                    <div className={cn(
                      "h-10 w-10 flex items-center justify-center rounded-xl shadow-lg transition-colors",
                      isCommunitySubscribed ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30" : "bg-red-500/10 text-red-400 border border-red-500/30 hover:border-red-300 hover:text-red-300"
                    )}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className={cn("font-bold border-none ml-2", isCommunitySubscribed ? "bg-[#D4AF37] text-[#051F12]" : "bg-red-950 text-red-200")}>
                  {isCommunitySubscribed ? "Comunidade Fitoclin" : "Comunidade: Bloqueado"}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={hasCourses ? "/specialization" : "/subscription/pro"} className="flex justify-center w-full">
                    <div className={cn(
                      "h-10 w-10 flex items-center justify-center rounded-xl shadow-lg transition-colors",
                      hasCourses ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "bg-orange-500/10 text-orange-400 border border-orange-500/30 hover:border-orange-400 hover:text-orange-400"
                    )}>
                      <Crown className="w-4 h-4" />
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className={cn("font-bold border-none ml-2", hasCourses ? "bg-purple-900 text-white" : "bg-orange-950 text-orange-200")}>
                  {hasCourses ? "Especialização Fitoclin" : "Especialização: Bloqueado"}
                </TooltipContent>
              </Tooltip>
            </div>
          )}

          {/* AVISO DE TRIAL PROFISSIONAL */}
          {role === "PROFESSIONAL" && isTrial && !isCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3 flex items-start gap-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/20 blur-xl rounded-full" />
                <Crown className="w-5 h-5 text-orange-400 shrink-0" />
                <div className="flex flex-col relative z-10">
                  <span className="text-orange-400 font-bold text-xs">Período de Teste</span>
                  <span className="text-orange-200/80 text-[11px] leading-snug mt-1">
                    Seu trial expira em <strong className="text-white">{trialDaysLeft} dias</strong>.
                  </span>
                  <Link href="/subscription/pro" className="text-orange-300 font-bold text-[10px] uppercase tracking-wider mt-2 hover:text-orange-100 flex items-center gap-1 transition-colors">
                    Assinar o PRO <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {role === "PROFESSIONAL" && isTrial && isCollapsed && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/subscription/pro" className="flex justify-center w-full mt-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    <Crown className="w-4 h-4" />
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-orange-950 text-orange-200 font-bold border-orange-900 ml-2">
                Trial: {trialDaysLeft} dias restantes
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        <div className="p-3 mt-auto">
          <div className="h-[1px] bg-[#2A5432]/30 mb-3" />
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="w-full h-10 hover:bg-red-500/10 hover:text-red-400 text-[#F1F1F1]/50 hover:border hover:border-red-900/30 transition-all" onClick={() => signOut({ callbackUrl: "/login" })}>
                  <LogOut className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-red-950 border-red-900 text-red-100 ml-2">Sair</TooltipContent>
            </Tooltip>
          ) : (
            <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-red-500/10 hover:text-red-400 text-[#F1F1F1]/60 transition-all group" onClick={() => signOut({ callbackUrl: "/login" })}>
              <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <span className="font-medium">Sair do Sistema</span>
            </Button>
          )}
        </div>
      </motion.div>
    </TooltipProvider>
  );
}