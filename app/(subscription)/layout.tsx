import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Assinatura VIP | Fitoclin",
  description: "Desbloqueie todo o potencial da sua saúde.",
};

export default function SubscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#062214] text-[#F1F1F1] selection:bg-[#76A771] selection:text-[#062214]">
      {/* Header Minimalista de Navegação */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-6 md:px-12">
        <Link href="/dashboard" className="group">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors group-hover:text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:border-white/30 group-hover:bg-white/10">
              <ChevronLeft className="h-4 w-4" />
            </div>
            <span>Voltar ao Dashboard</span>
          </div>
        </Link>

        {/* Logo Centralizado/Discreto */}
        <div className="hidden md:block opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100">
           <Image 
             src="/logo.png" 
             alt="Fitoclin" 
             width={32} 
             height={32} 
             className="object-contain"
           />
        </div>
        
        {/* Espaço vazio para equilibrar o flex ou um link de ajuda */}
        <div className="w-[100px] hidden md:block" />
      </header>

      {/* Conteúdo Principal */}
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        {/* Background Effects (Glows ambientais) */}
        <div className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-[#2A5432]/20 blur-[100px]" />
        <div className="absolute top-[40%] -right-[10%] h-[500px] w-[500px] rounded-full bg-[#D4AF37]/5 blur-[120px]" />
        
        <div className="relative z-10 w-full max-w-7xl px-4 py-24 md:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}