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
  User,
  CheckCheck,
  Calendar
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
import { Sidebar } from "./sidebar"; 
import { signOut } from "next-auth/react";
import { markAsRead, markAllAsRead } from "@/actions/notifications"; // Import das actions
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
  notifications?: any[]; // Array de notificações vindo do layout
}

export function Header({ user, notifications = [] }: HeaderProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  
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

  // Contagem de não lidas
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-10 w-full border-b border-[#2A5432]/30 bg-[#062214]/80 backdrop-blur-md h-16 px-6 flex items-center justify-between transition-all duration-300">
      
      {/* --- LADO ESQUERDO --- */}
      <div className="flex items-center gap-4">
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#F1F1F1] hover:bg-[#2A5432]/30">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-r border-[#2A5432] w-72 bg-[#062214]">
               <Sidebar role={user.role === "ADMIN" ? "ADMIN" : "PATIENT"} />
            </SheetContent>
          </Sheet>
        </div>

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

      {/* --- LADO DIREITO --- */}
      <div className="flex items-center gap-4">
        
        {/* Busca (Visual apenas) */}
        <div className="hidden md:flex relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2A5432] group-focus-within:text-[#76A771] transition-colors" />
            <Input 
                placeholder="Buscar..." 
                className="pl-9 h-9 w-64 bg-[#0A311D] border-[#2A5432] text-[#F1F1F1] placeholder:text-[#F1F1F1]/30 focus-visible:ring-[#76A771] rounded-full transition-all"
            />
        </div>

        {/* --- NOTIFICAÇÕES (DROPDOWN) --- */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-[#F1F1F1]/70 hover:text-[#76A771] hover:bg-[#2A5432]/20 rounded-full">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-[#062214]"></span>
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-80 bg-[#0A311D] border-[#2A5432] text-[#F1F1F1] shadow-xl">
             <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A5432]">
                 <span className="font-bold text-white text-sm">Notificações</span>
                 {unreadCount > 0 && (
                     <button 
                        onClick={() => markAllAsRead()}
                        className="text-[10px] uppercase tracking-wider text-[#76A771] hover:underline flex items-center gap-1"
                     >
                        <CheckCheck className="w-3 h-3" /> Marcar lidas
                     </button>
                 )}
             </div>

             <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-sm flex flex-col items-center gap-2">
                        <Bell className="w-8 h-8 opacity-20" />
                        <p>Tudo limpo por aqui!</p>
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <DropdownMenuItem 
                            key={notification.id} 
                            className="p-0 focus:bg-transparent"
                        >
                           <div 
                              className={cn(
                                  "w-full px-4 py-3 border-b border-[#2A5432]/30 hover:bg-[#062214]/50 transition-colors cursor-pointer flex gap-3 items-start",
                                  !notification.read && "bg-[#2A5432]/20"
                              )}
                              onClick={() => {
                                  if (!notification.read) markAsRead(notification.id);
                              }}
                           >
                              {/* Ícone baseado no contexto (pode evoluir depois) */}
                              <div className="mt-1 p-1.5 rounded-full bg-[#062214] border border-[#2A5432] text-[#76A771]">
                                  <Calendar className="w-3 h-3" />
                              </div>

                              <div className="flex-1 space-y-1">
                                  <Link href={notification.link || "#"} className="block group">
                                      <p className={cn("text-sm leading-none group-hover:text-[#76A771] transition-colors", !notification.read ? "text-white font-semibold" : "text-gray-300")}>
                                          {notification.title}
                                      </p>
                                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                                          {notification.message}
                                      </p>
                                  </Link>
                                  <p className="text-[10px] text-gray-500">
                                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true, locale: ptBR })}
                                  </p>
                              </div>
                              
                              {!notification.read && (
                                  <span className="w-2 h-2 rounded-full bg-[#76A771] mt-2 shrink-0" />
                              )}
                           </div>
                        </DropdownMenuItem>
                    ))
                )}
             </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Dropdown (Mantido) */}
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