"use client";

import { useState } from "react";
import { SpecializationSidebar } from "./sidebar";
import { SpecializationHeader } from "./header";
import { cn } from "@/lib/utils";
import { User } from "next-auth";

interface SpecializationShellProps {
  children: React.ReactNode;
  user: User;
}

export function SpecializationShell({ children, user }: SpecializationShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#062214]">
      {/* Sidebar Fixa (Esquerda) */}
      <SpecializationSidebar 
        isCollapsed={isCollapsed} 
        toggleSidebar={() => setIsCollapsed(!isCollapsed)} 
      />

      {/* Área de Conteúdo (Direita) */}
      <div className="flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out">
        {/* Header Fixo no Topo da área de conteúdo */}
        <SpecializationHeader 
          user={user} 
          isCollapsed={isCollapsed}
          toggleSidebar={() => setIsCollapsed(!isCollapsed)}
        />

        {/* Conteúdo com Scroll Independente */}
        <main 
          className={cn(
            "flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2A5432] scrollbar-track-transparent p-6",
            "transition-all duration-300"
          )}
        >
          <div className="max-w-7xl mx-auto animate-in fade-in zoom-in duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}