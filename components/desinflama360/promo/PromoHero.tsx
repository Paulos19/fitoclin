"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Gift,
  Calendar,
  MessageCircle,
  Tag,
  Leaf,
} from "lucide-react";

interface PromoHeroProps {
  whatsappUrl: string;
}

export default function PromoHero({ whatsappUrl }: PromoHeroProps) {
  const ebookTopics = [
    { text: "A função de cada chá no organismo" },
    { text: "Como preparar corretamente para extrair os princípios ativos" },
    { text: "Como utilizar de forma consciente no dia a dia" },
    { text: "Cuidados importantes antes do consumo e contraindicações" },
  ];

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-[#020d07] via-[#041a10] to-[#020e07] text-white overflow-hidden">
      {/* Luzes ambiente botânicas */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[550px] bg-emerald-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-teal-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#8bc97d_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Tag Superior de Lançamento */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-amber-950/50">
            <Calendar className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>OFERTA ESPECIAL EM 10 DE SETEMBRO</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Condição liberada somente no grupo do WhatsApp</span>
          </div>
        </motion.div>

        {/* Headline Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto mb-6"
        >
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Dia 10 de setembro:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200">
              50% de desconto no Clube Desinflama 360,
            </span>{" "}
            somente dentro do grupo de WhatsApp.
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-emerald-100/90 max-w-2xl mx-auto font-medium leading-relaxed">
            Entre no grupo para receber a condição especial e ainda ganhar o e-book de chás como presente.
          </p>
        </motion.div>

        {/* Card Principal: Mockup do E-book + Conteúdo dos 4 Tópicos */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#031d10] via-[#02180d] to-[#010e07] border-2 border-emerald-500/35 shadow-[0_0_60px_-15px_rgba(16,185,129,0.3)] p-6 sm:p-8 lg:p-10 mb-10"
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Coluna Esquerda: Mockup Visual do E-book */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-950 via-[#032213] to-black border-2 border-emerald-400/40 shadow-2xl group flex flex-col justify-between p-6">
                {/* Efeito Glow Interno */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-36 h-36 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

                {/* Topo do E-book */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-amber-500/20 border border-amber-500/40 text-[10px] font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1">
                    <Gift className="w-3 h-3" />
                    Presente Gratuito
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                    FITOCLIN®
                  </span>
                </div>

                {/* Miolo do E-book */}
                <div className="relative z-10 text-center my-auto py-4">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-inner">
                    <Leaf className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-white leading-tight mb-1">
                    GUIA ESPECIAL DE CHÁS
                  </h3>
                  <p className="text-xs text-amber-300 font-medium">
                    Preparo Correto, Funções e Uso Consciente
                  </p>
                  <p className="text-[11px] text-emerald-200/80 mt-2">
                    Dra. Isa Bieski
                  </p>
                </div>

                {/* Rodapé do E-book */}
                <div className="relative z-10 pt-3 border-t border-emerald-500/30 flex items-center justify-between text-[11px] text-emerald-300/80">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    E-book Digital em PDF
                  </span>
                  <span className="font-bold text-emerald-400">100% Grátis</span>
                </div>
              </div>

              <span className="mt-3 text-xs text-emerald-300/80 flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-amber-400" />
                Liberado gratuitamente assim que entrar no grupo
              </span>
            </div>

            {/* Coluna Direita: O que você vai conhecer no E-book */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Seu Presente Exclusivo de Boas-Vindas</span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug">
                  Ao entrar no grupo, você já garante gratuitamente um e-book para conhecer:
                </h2>
              </div>

              {/* Lista dos 4 Tópicos do E-book */}
              <div className="space-y-3">
                {ebookTopics.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 hover:border-emerald-400/40 transition-colors"
                  >
                    <span className="text-lg leading-none mt-0.5 select-none">🌿</span>
                    <span className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-emerald-200/90 font-light leading-relaxed">
                Entre agora, receba seu presente e aguarde a condição especial do{" "}
                <strong className="text-white font-semibold">Clube Desinflama 360</strong>.
              </p>

              {/* Botão de Entrada no WhatsApp */}
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center w-full py-4 sm:py-5 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-base sm:text-lg tracking-wide uppercase shadow-[0_0_40px_-5px_rgba(16,185,129,0.6)] hover:shadow-[0_0_50px_-5px_rgba(16,185,129,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-emerald-300/40 text-center"
                >
                  <span className="flex items-center justify-center gap-2.5">
                    <MessageCircle className="w-5 h-5 fill-white shrink-0" />
                    <span>QUERO ENTRAR NO GRUPO E RECEBER O E-BOOK</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
                  </span>
                </a>

                {/* Selos abaixo do CTA */}
                <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-[11px] text-emerald-400/80">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Grupo silencioso e seguro
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5 text-amber-400" />
                    E-book 100% gratuito
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-teal-300" />
                    Desconto de 30% a 50% no dia 10
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
