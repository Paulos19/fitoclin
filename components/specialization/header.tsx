"use client";

import { User } from "next-auth";
import { Bell, Search, GraduationCap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function SpecializationHeader({ user }: { user: User }) {
  return (
    <header className="h-20 border-b border-purple-500/20 bg-[#062214]/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
      {/* Lado Esquerdo: Identidade Visual */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-2 rounded-lg shadow-lg shadow-purple-900/20">
            <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col">
            <h1 className="text-lg font-bold text-white tracking-tight">
              Fitoclin <span className="text-purple-400">Academy</span>
            </h1>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
              Área de Especialização
            </span>
        </div>
      </div>

      {/* Centro: Barra de Busca (Opcional) ou Menu Rápido */}
      <div className="hidden md:flex items-center bg-[#0A311D] border border-white/5 rounded-full px-4 py-1.5 w-96">
        <Search className="w-4 h-4 text-gray-500 mr-2" />
        <input 
            type="text" 
            placeholder="Buscar nas aulas avançadas..." 
            className="bg-transparent border-none focus:outline-none text-sm text-gray-300 w-full placeholder:text-gray-600"
        />
      </div>

      {/* Lado Direito: Ações e Perfil */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
        </Button>

        <div className="h-8 w-[1px] bg-white/10 mx-2"></div>

        <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <div className="flex items-center justify-end gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <p className="text-xs text-purple-300 font-medium">Membro Pro</p>
                </div>
            </div>
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="h-10 w-10 border-2 border-purple-500/50 cursor-pointer transition-all hover:border-purple-400">
                        <AvatarImage src={user.image || ""} />
                        <AvatarFallback className="bg-purple-900 text-purple-200">
                            {user.name?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#0A311D] border-purple-500/20 text-white">
                    <DropdownMenuItem className="hover:bg-purple-500/20 cursor-pointer">Meu Perfil</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-purple-500/20 cursor-pointer">Certificados</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-purple-500/20 cursor-pointer text-red-400">Sair</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </header>
  );
}