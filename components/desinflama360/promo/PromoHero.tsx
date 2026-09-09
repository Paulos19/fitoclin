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
  ArrowUpRight,
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
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-[#F9FAF9] via-white to-[#F6F8F7] text-neutral-900 overflow-hidden">
      {/* Luzes ambiente botânicas sutis (clean shaders/glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-400/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-amber-300/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-400/8 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid sutil técnico de fundo */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#064e3b_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Tags Superiores estilo template minimalista */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/90 text-amber-900 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>OFERTA ESPECIAL EM 17 DE SETEMBRO</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-900 text-xs sm:text-sm font-semibold shadow-sm">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Condição liberada somente no grupo do WhatsApp</span>
          </div>
        </motion.div>

        {/* Headline Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-10 sm:mb-12"
        >
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[#0A1C12] tracking-tight leading-[1.12]">
            Dia 17 de setembro:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700">
              50% de desconto no Clube Desinflama 360,
            </span>{" "}
            somente dentro do grupo de WhatsApp.
          </h1>

          <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Entre no grupo para receber a condição especial e ainda ganhar o e-book de chás como presente.
          </p>
        </motion.div>

        {/* Card Principal: Visual Clean Elevado com Imagem Oficial + 4 Tópicos */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-white border border-neutral-200/90 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] p-6 sm:p-8 lg:p-12 mb-10 overflow-hidden"
        >
          {/* Luz sutil interna do card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50 rounded-full blur-3xl pointer-events-none -z-0 opacity-70" />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Coluna Esquerda: Imagem Oficial do E-book */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[360px] sm:max-w-[400px] rounded-3xl overflow-hidden bg-[#0A1C12] border-2 border-neutral-100 shadow-[0_15px_35px_-10px_rgba(10,28,18,0.18)] group transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src="/oferta-17-setembro-ebook.jpeg"
                  alt="Oferta Especial 17 de Setembro • Clube Desinflama 360 e E-book Os 30 Chás Que Transformam Sua Rotina - Dra. Isa Bieski"
                  width={1254}
                  height={1254}
                  priority
                  className="w-full h-auto object-cover rounded-3xl"
                />

                {/* Badge flutuante sobre a imagem */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-neutral-200/80 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                    <span className="text-[11px] font-bold text-neutral-900 uppercase tracking-wider">
                      E-book Oficial Incluso
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-800 uppercase bg-emerald-50 px-2 py-0.5 rounded-md">
                    100% Grátis
                  </span>
                </div>
              </div>

              <span className="mt-3.5 text-xs text-neutral-600 font-medium flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-amber-600" />
                Liberado gratuitamente assim que entrar no grupo
              </span>
            </div>

            {/* Coluna Direita: O que você vai conhecer no E-book */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-800 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Seu Presente Exclusivo de Boas-Vindas</span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0A1C12] leading-snug tracking-tight">
                  Ao entrar no grupo, você já garante gratuitamente um e-book para conhecer:
                </h2>
              </div>

              {/* Lista dos 4 Tópicos com Design Inspirado na Referência (01, 02, 03, 04) */}
              <div className="grid sm:grid-cols-2 gap-3">
                {ebookTopics.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between p-4 rounded-2xl bg-[#F8FAF9] border border-neutral-200/70 hover:border-emerald-500/50 hover:bg-white hover:shadow-[0_8px_20px_-6px_rgba(5,150,105,0.12)] transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="font-mono text-xs font-extrabold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                        0{index + 1}
                      </span>
                      <Leaf className="w-3.5 h-3.5 text-emerald-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Entre agora, receba seu presente e aguarde a condição especial do{" "}
                <strong className="text-[#0A1C12] font-semibold">Clube Desinflama 360</strong>.
              </p>

              {/* Botão de Entrada no WhatsApp */}
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center w-full py-4 sm:py-5 px-6 sm:px-8 rounded-2xl bg-[#0A1C12] hover:bg-[#064E3B] text-white font-bold text-xs sm:text-sm md:text-base tracking-wide uppercase shadow-[0_12px_30px_-8px_rgba(10,28,18,0.35)] hover:shadow-[0_16px_36px_-8px_rgba(6,78,59,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 border border-emerald-900/30 text-center leading-snug"
                >
                  <span className="flex items-center justify-center gap-2.5">
                    <MessageCircle className="w-5 h-5 fill-white shrink-0" />
                    <span>ENTRE NO GRUPO PARA RECEBER A CONDIÇÃO ESPECIAL E AINDA GANHAR O E-BOOK DE CHÁS COMO PRESENTE</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                  </span>
                </a>

                {/* Selos abaixo do CTA */}
                <div className="mt-3.5 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-600 font-medium">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Grupo silencioso e seguro
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-amber-600" />
                    E-book 100% gratuito
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-700" />
                    50% de desconto no dia 17
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
