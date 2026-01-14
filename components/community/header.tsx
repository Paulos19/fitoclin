"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Bell, 
  LayoutDashboard,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import Link from "next/link";
import { CommunitySearch } from "./search-bar"; // Se tiver separado

export function CommunityHeader() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl px-6 py-3"
    >
      <div className="mx-auto max-w-[1600px] flex items-center justify-between gap-4">
        
        {/* Esquerda: Voltar ao Dashboard (CTA Principal) */}
        <div className="flex items-center gap-4">
            <Link href="/dashboard">
                <Button 
                    variant="ghost" 
                    className="gap-2 text-[#062214] hover:bg-[#2A5432]/10 hover:text-[#2A5432] font-medium"
                >
                    <LayoutDashboard className="h-4 w-4" />
                    Voltar ao Painel
                </Button>
            </Link>
            <div className="h-6 w-px bg-gray-200 hidden md:block" />
            <span className="text-lg font-bold tracking-tight text-[#062214] hidden md:block">
                Fitoclin <span className="text-[#2A5432] font-light">Academy</span>
            </span>
        </div>

        {/* Centro: Busca (Opcional aqui ou na página) */}
        <div className="flex-1 max-w-md hidden md:block">
            {/* Você pode mover o input de busca para cá se quiser */}
        </div>

        {/* Direita: Perfil e Notificações */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#2A5432]">
              <Bell className="h-5 w-5" />
          </Button>

          <Avatar className="h-9 w-9 border border-gray-100 cursor-pointer">
              <AvatarImage src="/isa.png" />
              <AvatarFallback className="bg-[#2A5432] text-white">U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </motion.header>
  );
}