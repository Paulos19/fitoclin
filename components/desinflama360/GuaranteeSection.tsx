"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Check, Sparkles } from "lucide-react";

export default function GuaranteeSection() {
  return (
    <section className="relative py-16 md:py-24 bg-[#020c06] text-white overflow-hidden border-t border-emerald-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-emerald-950/40 via-[#03190f] to-[#020e07] border-2 border-emerald-500/30 shadow-2xl flex flex-col md:flex-row items-center gap-8 text-center md:text-left"
        >
          {/* Selo 7 Dias Dourado */}
          <div className="relative shrink-0 flex items-center justify-center">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-amber-400 via-emerald-500 to-teal-600 p-[3px] shadow-[0_0_40px_-5px_rgba(245,158,11,0.4)]">
              <div className="w-full h-full rounded-full bg-[#020e07] flex flex-col items-center justify-center text-center p-2">
                <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 mb-0.5" />
                <span className="font-serif font-black text-2xl sm:text-3xl text-white leading-none">
                  7 DIAS
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-emerald-300 font-bold">
                  Garantia Total
                </span>
              </div>
            </div>
          </div>

          {/* Texto da Garantia */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Risco Zero para Você</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight uppercase">
              VOCÊ TERÁ SETE DIAS PARA CONHECER O CLUBE
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/80 font-light leading-relaxed">
              Após a confirmação da inscrição, você poderá acessar imediatamente a plataforma, assistir às aulas, conhecer a proposta e explorar a comunidade.
            </p>

            <p className="text-xs sm:text-sm text-emerald-200/70 font-light leading-relaxed">
              Caso entenda que o Clube não corresponde ao que foi apresentado, poderá solicitar o cancelamento integral dentro do prazo de 7 dias informado na página e nos termos da compra, sem qualquer complicação.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
