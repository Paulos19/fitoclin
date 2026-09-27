"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Users,
  Leaf,
  HeartPulse,
} from "lucide-react";
import ThreeGlassCard from "./three/ThreeGlassCard";
import ThreeGlassButton from "./three/ThreeGlassButton";

interface HeroSectionProps {
  checkoutUrl: string;
  videoUrl?: string;
}

export default function HeroSection({
  checkoutUrl,
  videoUrl = "https://drive.google.com/file/d/1Sck3Nc5IRc9expUXNX-c0LQpNn5UdPCt/preview",
}: HeroSectionProps) {
  const bulletTopics = [
    {
      title: "Entenda a raiz oculta",
      text: "Entenda a raiz oculta por trás de dores, cansaço e inchaço frequentes.",
    },
    {
      title: "O erro do sintoma isolado",
      text: "Por que tentar resolver cada desconforto isoladamente não traz resultados duradouros.",
    },
    {
      title: "Mudança viável e sustentável",
      text: "Como iniciar uma mudança sustentável sem dietas extremas ou sacrifícios absurdos.",
    },
  ];

  return (
    <section
      id="inicio"
      className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden text-[#0f2417]"
    >
      {/* Luz ambiente de fitoterapia (verde esmeralda e amarelo âmbar) */}
      <div className="absolute top-16 left-1/4 w-[600px] h-[500px] bg-emerald-200/40 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-28 right-10 w-[550px] h-[450px] bg-amber-200/40 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Layout Side a Side (2 Colunas) para Máximo Impacto Visual */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Coluna Esquerda: Copywriting Principal & Bullets */}
          <div className="lg:col-span-6 space-y-6">
            {/* Selo Fitoclin */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-300/80 shadow-xs text-xs sm:text-sm font-semibold tracking-wide text-emerald-950 backdrop-blur-xl">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-bold text-emerald-800">Método FITOCLIN®</span>
                <span className="text-emerald-400">•</span>
                <span className="text-[#355240] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Dra. Isa Bieski
                </span>
              </div>
            </motion.div>

            {/* Headline Principal Exata */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-[1.18] text-[#0d2618]"
            >
              Tomar remédios não resolve seus problemas de peso, dores e indisposição{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500">
                porque tratam apenas os sintomas.
              </span>
            </motion.h1>

            {/* Subheadline Exata */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base sm:text-lg text-[#324f3e] leading-relaxed font-normal"
            >
              Assista à aula gratuita ao lado e descubra um método prático para mudar de vez sem sacrifícios absurdos e dietas malucas.
            </motion.p>

            {/* 3 Bullets Abaixo do Vídeo / Copy em Cards de Vidro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3 pt-2"
            >
              {bulletTopics.map((item, index) => (
                <div
                  key={index}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-emerald-100 shadow-[0_4px_20px_-5px_rgba(16,185,129,0.08)] flex items-start gap-3 hover:border-emerald-300 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-100/90 border border-emerald-200/80 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#385544] leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Botão de Ação Side a Side */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <ThreeGlassButton href={checkoutUrl} variant="primary">
                QUERO COMEÇAR MINHA TRANSFORMAÇÃO
              </ThreeGlassButton>
            </motion.div>

            {/* Selos de Confiança */}
            <div className="flex flex-wrap items-center gap-5 text-xs text-[#4a6b57] pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Acesso Imediato
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-amber-500" />
                6 Meses de Acompanhamento
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Users className="w-4 h-4 text-emerald-600" />
                Comunidade Exclusiva
              </span>
            </div>
          </div>

          {/* Coluna Direita: Vídeo Principal VSL com Moldura de Vidro 3D */}
          <div id="aula" className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative group"
            >
              {/* Brilho ao redor da moldura em verde e dourado */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/40 via-amber-300/40 to-teal-400/40 rounded-[2.2rem] blur-xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none" />

              <div className="relative rounded-[2rem] overflow-hidden bg-white/85 backdrop-blur-2xl border-2 border-white/95 shadow-[0_25px_60px_-15px_rgba(16,185,129,0.22)] p-2.5 sm:p-3.5">
                {/* Header da Barra do Vídeo com Thumbnail Badge Exata */}
                <div className="px-4 py-2.5 mb-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-100/90 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                    <span className="ml-2 text-xs font-bold text-emerald-950 hidden sm:inline">
                      Aula Oficial • Fitoclin
                    </span>
                  </div>

                  {/* Thumbnail Badge Exata Fornecida */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300/60 text-xs font-bold text-amber-900 shadow-2xs">
                    <HeartPulse className="w-3.5 h-3.5 text-amber-600" />
                    <span>“Eu apliquei esse método e diminui a ansiedade, a gastrite e ainda perdi 34 kg.”</span>
                  </div>
                </div>

                {/* Frame do Vídeo 16:9 */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#041a0e] shadow-inner">
                  <iframe
                    src={videoUrl}
                    title="Aula Oficial Clube Desinflama 360 - Dra. Isa Bieski"
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                </div>

                {/* Rodapé da Moldura com Apoio */}
                <div className="mt-2.5 px-3 py-1.5 rounded-xl bg-white/70 border border-white/80 flex items-center justify-between text-[11px] text-[#42604e]">
                  <span className="flex items-center gap-1 font-semibold text-emerald-800">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Método FITOCLIN®
                  </span>
                  <span>Jornada de 6 Meses com Dra. Isa Bieski</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
