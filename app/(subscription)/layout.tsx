import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Fitoclin Premium | Assinatura",
  description: "Eleve sua carreira e saúde ao próximo nível.",
};

export default function SubscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#051F12] text-[#F1F1F1] overflow-x-hidden selection:bg-[#D4AF37]/30 selection:text-white font-sans">

      {/* --- BACKGROUND AMBIENTE (Otimizado) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Luz Superior Esquerda (Verde) */}
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#2A5432]/20 rounded-full blur-[120px] opacity-60" />
        {/* Luz Inferior Direita (Dourada) */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[100px] opacity-50" />
        {/* Texture Overlay (Opcional para dar textura de papel/ruído) */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
      </div>

      {/* --- HEADER FLUTUANTE --- */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 transition-all duration-300">

        {/* Botão Voltar (Estilo Glass) */}
        <Link href="/dashboard" className="group">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/10 hover:scale-105">
            <ChevronLeft className="w-4 h-4 text-[#76A771] group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium text-gray-300 group-hover:text-white">Voltar</span>
          </div>
        </Link>
      </header>

      {/* --- CONTEÚDO --- */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4 pt-28 pb-12 md:pt-0">
        <div className="w-full max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}