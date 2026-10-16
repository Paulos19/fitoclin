"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Leaf } from "lucide-react";
import ThreeGlassButton from "./three/ThreeGlassButton";
import { trackInitiateCheckout } from "@/lib/fpixel";

interface FinalLightCtaProps {
  checkoutUrl: string;
}

export default function FinalLightCta({ checkoutUrl }: FinalLightCtaProps) {
  return (
    <footer className="relative pt-20 pb-12 text-[#0f2417] overflow-hidden border-t border-emerald-100 bg-white/50 backdrop-blur-md">
      {/* Luz ambiente botânica */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-emerald-200/40 via-amber-100/30 to-teal-100/30 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-300/80 shadow-xs text-emerald-950 text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>Sua Saúde Merece Este Cuidado</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#0d2618] tracking-tight leading-tight">
            Pronta para desinflamar e dar ao seu corpo uma nova chance?
          </h2>

          <p className="text-base sm:text-lg text-[#324f3e] leading-relaxed">
            Dê o primeiro passo hoje mesmo. Receba seu Mapa Metabólico, sua prescrição personalizada e o acompanhamento de quem entende de você.
          </p>

          <div className="pt-4 flex justify-center">
            <ThreeGlassButton
              href={checkoutUrl}
              onClick={() => {
                trackInitiateCheckout({
                  content_name: "Clube Desinflama 360",
                  value: 597.0,
                  currency: "BRL",
                  content_type: "product",
                  location: "footer_final_cta",
                });
              }}
              variant="primary"
            >
              QUERO ENTRAR PARA O CLUBE DESINFLAMA 360
            </ThreeGlassButton>
          </div>
        </motion.div>

        {/* Linha Divisória */}
        <div className="w-full border-t border-emerald-100 my-10" />

        {/* Rodapé Institucional */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#4f705c]">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-white/90 border border-emerald-200/80 shadow-2xs flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="FITOCLIN"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <div className="text-left">
              <span className="font-bold text-[#0d2618] block">
                FITOCLIN® • Instituto Isa Bieski
              </span>
              <span className="text-[11px] text-[#658a74]">
                Todos os direitos reservados.
              </span>
            </div>
          </div>

          <div className="text-center sm:text-right max-w-md text-[11px] leading-relaxed text-[#658a74]">
            <p>
              Este site oferece conteúdo educativo e acompanhamento em hábitos saudáveis e fitoterapia. Não substitui consulta médica diagnóstica nem aconselhamento individual de emergência.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
