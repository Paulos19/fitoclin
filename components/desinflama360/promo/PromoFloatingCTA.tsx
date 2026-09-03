"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Gift, ArrowRight } from "lucide-react";

interface PromoFloatingCTAProps {
  whatsappUrl: string;
}

export default function PromoFloatingCTA({ whatsappUrl }: PromoFloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Aviso de entrada no grupo VIP"
      className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 bg-[#03150c]/95 backdrop-blur-lg border-t border-emerald-500/30 shadow-[0_-10px_30px_rgba(0,0,0,0.6)] animate-in slide-in-from-bottom duration-300"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 px-2 sm:px-4">
        <div className="hidden sm:flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Gift className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-white leading-tight">
              Oferta Especial em 10 de Setembro • 50% OFF
            </p>
            <p className="text-[11px] text-emerald-300">
              Entre gratuitamente no grupo e ganhe o e-book sobre chás.
            </p>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all text-center"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Entrar no Grupo e Receber E-book</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </aside>
  );
}
