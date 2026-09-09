"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Gift, ArrowRight } from "lucide-react";

interface PromoFloatingCTAProps {
  whatsappUrl: string;
}

export default function PromoFloatingCTA({ whatsappUrl }: PromoFloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Oculta a barra ao se aproximar do final da página para não cobrir o rodapé
      const nearBottom = scrollY + windowHeight >= documentHeight - 160;

      setIsVisible(scrollY > 400 && !nearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Aviso de entrada no grupo VIP"
          className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 bg-white/95 backdrop-blur-xl border-t border-neutral-200/90 shadow-[0_-10px_35px_rgba(0,0,0,0.08)]"
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 px-2 sm:px-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 shadow-sm shrink-0">
                <Gift className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-extrabold text-[#0A1C12] leading-tight">
                  Oferta Especial em 17 de Setembro • 50% OFF
                </p>
                <p className="text-[11px] text-neutral-500 font-medium">
                  Entre gratuitamente no grupo e garanta seu e-book de chás como presente.
                </p>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-[#0A1C12] hover:bg-[#064E3B] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-center shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Entrar no Grupo e Receber E-book</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
