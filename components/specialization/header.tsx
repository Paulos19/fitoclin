"use client";

import { User } from "next-auth";
import { 
  Bell, 
  Search, 
  GraduationCap, 
  Star, 
  LogOut, 
  User as UserIcon, 
  Settings, 
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SpecializationHeaderProps {
  user: User;
  isCollapsed?: boolean;
  toggleSidebar?: () => void;
}

export function SpecializationHeader({ user, isCollapsed, toggleSidebar }: SpecializationHeaderProps) {
  
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <header className="h-20 border-b border-purple-500/20 bg-[#062214]/90 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between shadow-lg shadow-[#000]/20 transition-all duration-300">
      
      {/* Lado Esquerdo: Toggle & Identidade (Mobile/Desktop) */}
      <div className="flex items-center gap-4">
        {/* Botão Hambúrguer para controlar a Sidebar */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="text-gray-400 hover:text-white hover:bg-white/10 md:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Identidade Visual - Exibida apenas se a sidebar estiver colapsada ou em mobile */}
        <div className={cn("flex items-center gap-3 transition-opacity duration-300", !isCollapsed && "md:hidden")}>
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-2 rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.3)]">
             <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
             <h1 className="text-base font-bold text-white tracking-tight leading-none">
               Fitoclin <span className="text-purple-400">Academy</span>
             </h1>
             <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
               Área de Especialização
             </span>
          </div>
        </div>
      </div>

      {/* Centro: Barra de Busca (Desktop) */}
      <div className="hidden md:flex flex-1 max-w-xl mx-8 relative group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
           <Search className="w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
        </div>
        <input 
           type="text" 
           placeholder="Buscar aulas, materiais ou mentorias..." 
           className="w-full bg-[#0A311D] border border-white/5 rounded-full pl-10 pr-4 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all shadow-inner shadow-[#000]/20"
        />
      </div>

      {/* Lado Direito: Ações e Perfil */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Notificações */}
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5 relative rounded-full">
           <Bell className="w-5 h-5" />
           <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_#a855f7]"></span>
        </Button>

        <div className="h-8 w-[1px] bg-white/10 mx-2 hidden md:block"></div>

        <div className="flex items-center gap-3">
           <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-white leading-tight">{user.name}</p>
              <div className="flex items-center justify-end gap-1 mt-0.5">
                 <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 drop-shadow-[0_0_3px_rgba(234,179,8,0.5)]" />
                 <p className="text-[10px] text-purple-300 font-medium uppercase tracking-wide">Membro Pro</p>
              </div>
           </div>
           
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden ring-2 ring-transparent hover:ring-purple-500/50 transition-all">
                    <Avatar className="h-10 w-10 border-2 border-[#2A5432]">
                       <AvatarImage src={user.image || ""} alt={user.name || "User"} className="object-cover" />
                       <AvatarFallback className="bg-gradient-to-br from-purple-900 to-[#062214] text-purple-200 font-bold">
                          {user.name?.charAt(0).toUpperCase()}
                       </AvatarFallback>
                    </Avatar>
                 </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-56 bg-[#0A311D] border border-purple-500/20 text-gray-200 shadow-xl shadow-[#000]/50 backdrop-blur-xl">
                 <DropdownMenuLabel className="text-purple-400 font-normal text-xs uppercase tracking-wider">Minha Conta</DropdownMenuLabel>
                 <DropdownMenuSeparator className="bg-purple-500/20" />
                 
                 <Link href="/dashboard/profile">
                    <DropdownMenuItem className="cursor-pointer hover:bg-purple-500/20 hover:text-white focus:bg-purple-500/20 focus:text-white transition-colors gap-2">
                       <UserIcon className="w-4 h-4" /> Perfil
                    </DropdownMenuItem>
                 </Link>
                 
                 <Link href="/specialization/certificates">
                    <DropdownMenuItem className="cursor-pointer hover:bg-purple-500/20 hover:text-white focus:bg-purple-500/20 focus:text-white transition-colors gap-2">
                       <GraduationCap className="w-4 h-4" /> Meus Certificados
                    </DropdownMenuItem>
                 </Link>

                 <Link href="/dashboard/settings">
                    <DropdownMenuItem className="cursor-pointer hover:bg-purple-500/20 hover:text-white focus:bg-purple-500/20 focus:text-white transition-colors gap-2">
                       <Settings className="w-4 h-4" /> Configurações
                    </DropdownMenuItem>
                 </Link>
                 
                 <DropdownMenuSeparator className="bg-purple-500/20" />
                 
                 <DropdownMenuItem 
                    onClick={handleLogout}
                    className="cursor-pointer text-red-400 hover:bg-red-500/10 hover:text-red-300 focus:bg-red-500/10 focus:text-red-300 transition-colors gap-2"
                 >
                    <LogOut className="w-4 h-4" /> Sair
                 </DropdownMenuItem>
              </DropdownMenuContent>
           </DropdownMenu>
        </div>
      </div>
    </header>
  );
}