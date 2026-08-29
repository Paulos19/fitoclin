"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Clock, Users, Flame } from "lucide-react";

interface HeroVideoSectionProps {
  checkoutUrl: string;
  videoUrl?: string;
}

export default function HeroVideoSection({
  checkoutUrl,
  videoUrl = "https://drive.google.com/file/d/1Sck3Nc5IRc9expUXNX-c0LQpNn5UdPCt/preview",
}: HeroVideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  const lessonTopics = [
    {
      title: "Por que os sintomas estão conectados",
      desc: "Entenda a raiz oculta por trás de dores, cansaço e inchaço frequentes.",
    },
    {
      title: "O efeito dominó no seu corpo",
      desc: "Como intestino, qualidade do sono, estresse e energia influenciam um ao outro.",
    },
    {
      title: "O erro do cuidado fragmentado",
      desc: "Por que tentar resolver cada desconforto isoladamente não traz resultados duradouros.",
    },
    {
      title: "Os 5 Pilares do Método FITOCLIN®",
      desc: "A rota integrada para desinflamar de dentro para fora com base científica.",
    },
    {
      title: "O primeiro passo viável",
      desc: "Como iniciar uma mudança sustentável sem dietas extremas ou sacrifícios absurdos.",
    },
  ];

  return (
    <section
      id="inicio"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#020d07] via-[#04190e] to-[#020e07] text-white"
    >
      {/* Elementos visuais de fundo / Glows botânicos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-0 w-[350px] h-[350px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-800/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern sutil */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#8bc97d_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tag Superior */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-950/70 border border-emerald-500/40 shadow-lg shadow-emerald-950/50 backdrop-blur-md">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-emerald-300">
              Aula Exclusiva & Gratuita • Dra. Isa Bieski
            </span>
          </div>
        </motion.div>

        {/* 1. Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.18] mb-6 text-white"
        >
          SEU CORPO NÃO ESTÁ FALHANDO.{" "}
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 drop-shadow-sm">
            ELE ESTÁ PEDINDO UM NOVO CAMINHO DE CUIDADO.
          </span>
        </motion.h1>

        {/* 1. Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center text-base sm:text-lg md:text-xl text-emerald-100/90 font-light max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Intestino desregulado, sono ruim, dores, ansiedade, cansaço e falta de disposição{" "}
          <strong className="text-white font-medium">não devem ser tratados como problemas completamente separados</strong>.
          Assista à aula gratuita e descubra por que desinflamar hábitos pode ser o primeiro passo para recuperar seu equilíbrio.
        </motion.p>

        {/* 1. Vídeo Principal (VSL Frame) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative group mb-10"
        >
          {/* Moldura iluminada */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400/80 rounded-2xl sm:rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-300" />

          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#03140b] border border-emerald-400/30 shadow-2xl">
            {/* Header decorativo da aula */}
            <div className="bg-[#020d07] px-4 py-3 border-b border-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-xs text-emerald-400/90 font-medium hidden sm:inline">
                  Aula Oficial: Os sinais de que seus hábitos estão inflamando sua saúde
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-amber-300 bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                <Flame className="w-3.5 h-3.5" />
                <span>Conteúdo Revelador</span>
              </div>
            </div>

            {/* Container do Vídeo 16:9 */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              <iframe
                src={videoUrl}
                title="Aula Oficial Clube Desinflama 360 - Dra. Isa Bieski"
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>

        {/* Resumo dos Tópicos da Aula */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-b from-emerald-950/50 to-[#02130a]/80 border border-emerald-500/25 rounded-2xl p-6 sm:p-8 backdrop-blur-md mb-10 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-500/20">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Nesta aula, a Dra. Isa explica:
              </h3>
              <p className="text-xs sm:text-sm text-emerald-300/80">
                Os fundamentos científicos e práticos do Método FITOCLIN®
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {lessonTopics.map((topic, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/15 hover:border-emerald-400/40 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">{topic.title}</h4>
                  <p className="text-xs text-emerald-200/70 mt-0.5 leading-relaxed">
                    {topic.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 1. Botão Principal & Texto de Apoio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <a
            href={checkoutUrl}
            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-5 sm:px-12 sm:py-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 text-white font-bold text-lg sm:text-xl tracking-wider uppercase shadow-[0_0_50px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-5px_rgba(16,185,129,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-emerald-300/40 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out skew-y-6" />
            <span className="relative z-10 flex items-center gap-3">
              <span>QUERO COMEÇAR MINHA TRANSFORMAÇÃO</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </a>

          {/* Texto de Apoio */}
          <p className="mt-4 text-sm sm:text-base text-emerald-300/90 font-medium max-w-xl">
            Entre para o <span className="text-white font-semibold">Clube Desinflama 360</span> e tenha uma rota prática para os próximos seis meses.
          </p>

          {/* Selos de segurança */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-400/80">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Acesso Imediato & 100% Seguro
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              6 Meses de Acompanhamento
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-400" />
              Comunidade Exclusiva de Alunas
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
