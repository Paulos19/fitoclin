"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Heart, Leaf } from "lucide-react";

interface FinalCtaSectionProps {
  checkoutUrl: string;
}

export default function FinalCtaSection({ checkoutUrl }: FinalCtaSectionProps) {
  const currentYear = new Date().getFullYear();

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-[#020e07] via-[#041a10] to-[#010804] text-white overflow-hidden border-t border-emerald-900/40">
      {/* Luz ambiente forte */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-600/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Tag Superior */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-6"
        >
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span>A Decisão é Sua</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] uppercase mb-8"
        >
          VOCÊ PODE CONTINUAR TENTANDO MUDAR SOZINHA OU{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300">
            PODE SEGUIR UMA ROTA COM DIREÇÃO E ACOMPANHAMENTO.
          </span>
        </motion.h2>

        {/* Textos de Apoio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-lg md:text-xl text-emerald-100/90 font-light max-w-2xl mx-auto leading-relaxed mb-6"
        >
          Durante seis meses, você terá uma jornada organizada para aplicar os cinco pilares do <strong className="text-white font-medium">Método FITOCLIN®</strong> e acompanhar sua evolução dia a dia.
        </motion.p>

        {/* Destaque 3 Ciclos 3 Desafios 5 Pilares */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block p-4 sm:p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 backdrop-blur-md mb-10 text-emerald-200 font-medium text-sm sm:text-base shadow-xl"
        >
          🌿 <strong className="text-white">Três ciclos.</strong> Três desafios. <strong className="text-white">Cinco pilares.</strong> Uma transformação por inteiro. ✨
        </motion.div>

        {/* Botão Final de Ação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <a
            href={checkoutUrl}
            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-10 py-6 sm:px-14 sm:py-7 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 text-white font-bold text-lg sm:text-2xl tracking-wider uppercase shadow-[0_0_60px_-10px_rgba(16,185,129,0.6)] hover:shadow-[0_0_80px_-5px_rgba(16,185,129,0.9)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border-2 border-emerald-300/50"
          >
            <span className="flex items-center gap-3">
              <span>SIM, QUERO COMEÇAR MINHA JORNADA</span>
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </span>
          </a>

          <p className="mt-4 text-xs sm:text-sm text-emerald-300/80 font-medium flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Garantia incondicional de 7 dias • Acesso imediato</span>
          </p>
        </motion.div>

        {/* Footer Institucional */}
        <div className="mt-20 pt-10 border-t border-emerald-900/40 text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-emerald-950 border border-emerald-500/30 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="FITOCLIN"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <span className="text-white font-serif font-bold text-base tracking-wider">
              FITOCLIN<sup className="text-[9px] text-emerald-400 font-sans">®</sup>
            </span>
          </div>

          <p className="text-xs text-emerald-400/60 max-w-xl mx-auto leading-relaxed">
            © {currentYear} FITOCLIN® - Todos os direitos reservados. Dra. Isa Bieski.
            <br />
            Este produto não substitui o parecer médico profissional. Sempre consulte um médico para tratar de assuntos relativos à sua saúde.
          </p>
        </div>
      </div>
    </section>
  );
}
