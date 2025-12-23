"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Bell, 
  ChevronRight, 
  Menu, 
  Search, 
  Settings, 
  LogOut, 
  User 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar"; // Reutilizamos a sidebar no mobile
import { signOut } from "next-auth/react";

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  
  // Gera breadcrumbs baseados na URL (Ex: /dashboard/patients -> Dashboard > Pacientes)
  const segments = pathname.split("/").filter(Boolean);
  
  // Mapa de tradução para ficar bonito na UI
  const pathMap: Record<string, string> = {
    dashboard: "Visão Geral",
    patients: "Pacientes",
    schedule: "Agenda",
    records: "Prontuários",
    settings: "Configurações",
    profile: "Meu Perfil",
    appointments: "Consultas",
    prescriptions: "Prescrições"
  };

  return (
    <header className="sticky top-0 z-10 w-full border-b border-[#2A5432]/30 bg-[#062214]/80 backdrop-blur-md h-16 px-6 flex items-center justify-between transition-all duration-300">
      
      {/* --- LADO ESQUERDO: Mobile Trigger & Breadcrumbs --- */}
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar (Só aparece em telas pequenas) */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#F1F1F1] hover:bg-[#2A5432]/30">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-r border-[#2A5432] w-72 bg-[#062214]">
               {/* Passamos role como prop (ajuste conforme sua lógica de auth) */}
               <Sidebar role={user.role === "ADMIN" ? "ADMIN" : "PATIENT"} />
            </SheetContent>
          </Sheet>
        </div>

        {/* Breadcrumbs Estilizados */}
        <nav className="hidden md:flex items-center text-sm font-medium">
          <span className="text-[#76A771]">Fitoclin</span>
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1;
            const title = pathMap[segment] || segment;
            
            return (
              <React.Fragment key={segment}>
                <ChevronRight className="w-4 h-4 mx-2 text-[#2A5432]" />
                <span className={isLast ? "text-[#F1F1F1]" : "text-[#F1F1F1]/50"}>
                  {title}
                </span>
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* --- LADO DIREITO: Ações & Perfil --- */}
      <div className="flex items-center gap-4">
        
        {/* Barra de Busca Rápida (Opcional, mas útil) */}
        <div className="hidden md:flex relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2A5432] group-focus-within:text-[#76A771] transition-colors" />
            <Input 
                placeholder="Buscar..." 
                className="pl-9 h-9 w-64 bg-[#0A311D] border-[#2A5432] text-[#F1F1F1] placeholder:text-[#F1F1F1]/30 focus-visible:ring-[#76A771] rounded-full transition-all"
            />
        </div>

        {/* Notificações */}
        <Button variant="ghost" size="icon" className="relative text-[#F1F1F1]/70 hover:text-[#76A771] hover:bg-[#2A5432]/20 rounded-full">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-[#2A5432] hover:ring-[#76A771] transition-all p-0 overflow-hidden">
              <Avatar className="h-full w-full">
                <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                <AvatarFallback className="bg-[#0A311D] text-[#76A771] font-bold">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className="w-56 bg-[#0A311D] border-[#2A5432] text-[#F1F1F1]" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-white">{user.name}</p>
                <p className="text-xs leading-none text-[#F1F1F1]/50">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#2A5432]/50" />
            
            <DropdownMenuItem className="focus:bg-[#2A5432] focus:text-white cursor-pointer">
              <User className="mr-2 h-4 w-4 text-[#76A771]" />
              <span>Meu Perfil</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="focus:bg-[#2A5432] focus:text-white cursor-pointer">
              <Settings className="mr-2 h-4 w-4 text-[#76A771]" />
              <span>Configurações</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="bg-[#2A5432]/50" />
            
            <DropdownMenuItem 
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-red-400 focus:bg-red-900/20 focus:text-red-300 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}