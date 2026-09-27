"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Headphones,
  Play,
  Pause,
  Sparkles,
  Zap,
  Flame,
  Heart,
  Moon,
  Clock,
} from "lucide-react";
import ThreeGlassCard from "./three/ThreeGlassCard";

export default function AudioAcceleratorsLight() {
  const [activeTrack, setActiveTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioTracks = [
    {
      title: "Pílula 01: Vencendo o Desânimo Matinal",
      category: "Desânimo & Força",
      duration: "3:45 min",
      desc: "Palavras de coragem e ativação para quando a cama estiver pesada e faltar motivação para iniciar.",
      icon: Flame,
      tagColor: "text-amber-900 bg-amber-100 border-amber-300",
    },
    {
      title: "Pílula 02: Acalmando a Ansiedade Aguda",
      category: "Ansiedade & Serenidade",
      duration: "4:12 min",
      desc: "Técnica guiada de respiração e alinhamento mental para baixar o cortisol e relaxar a mente.",
      icon: Moon,
      tagColor: "text-emerald-900 bg-emerald-100 border-emerald-300",
    },
    {
      title: "Pílula 03: Destravando a Procrastinação",
      category: "Ação Imediata",
      duration: "2:58 min",
      desc: "O comando mental para fazer o que precisa ser feito sem adiar para a próxima segunda-feira.",
      icon: Zap,
      tagColor: "text-teal-900 bg-teal-100 border-teal-300",
    },
    {
      title: "Pílula 04: Blindagem contra a Autossabotagem",
      category: "Mente Forte",
      duration: "3:30 min",
      desc: "Como silenciar a voz interna que tenta justificar excessos e manter o foco nas suas metas.",
      icon: Sparkles,
      tagColor: "text-amber-900 bg-amber-100 border-amber-300",
    },
    {
      title: "Pílula 05: Renovando a Fé e o Propósito",
      category: "Espiritualidade & Fé",
      duration: "4:40 min",
      desc: "Reconecte seu coração com o motivo sagrado pelo qual você escolheu cuidar da sua saúde.",
      icon: Heart,
      tagColor: "text-emerald-900 bg-emerald-100 border-emerald-300",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 text-[#0f2417] overflow-hidden">
      {/* Luz ambiente de fitoterapia */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-emerald-200/40 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho da Seção com a Copy Exata */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-300/80 shadow-xs text-emerald-950 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4"
          >
            <Headphones className="w-4 h-4 text-emerald-600" />
            <span>Pílulas Auditivas Aceleradoras</span>
          </motion.div>

          {/* MANTER/INSERIR EXATO */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#0d2618] tracking-tight leading-tight uppercase"
          >
            APERTE O PLAY QUANDO PENSAR EM DESISTIR
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-[#324f3e] font-normal leading-relaxed"
          >
            Áudios curtos, profundos e diretos ao ponto gravados pela Dra. Isa Bieski para destravar sua mente nos momentos mais desafiadores da sua jornada.
          </motion.p>
        </div>

        {/* Player de Vidro Fosco & Lista de Faixas Side a Side */}
        <div className="grid lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Card do Player Interativo (Esquerda) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <ThreeGlassCard
              intensity={14}
              gradientAccent="from-emerald-500/20 via-amber-400/15 to-transparent"
              className="p-8 text-center flex flex-col items-center justify-center relative"
            >
              {/* Ícone de Fone em Verde Esmeralda e Dourado */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-6">
                <Headphones className="w-10 h-10 animate-pulse" />
              </div>

              <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 mb-2">
                {audioTracks[activeTrack].category}
              </span>

              <h3 className="text-xl font-bold text-[#0d2618] mb-2 leading-snug">
                {audioTracks[activeTrack].title}
              </h3>

              <p className="text-xs text-[#385544] mb-6 max-w-xs">
                {audioTracks[activeTrack].desc}
              </p>

              {/* Barras de Áudio Animadas (Soundwave em Verde e Dourado) */}
              <div className="flex items-center gap-1.5 h-10 mb-6">
                {[12, 24, 38, 20, 44, 30, 16, 40, 26, 34, 18, 28].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      height: isPlaying ? `${Math.max(10, (h * (i % 2 === 0 ? 1 : 0.7)))}px` : "8px",
                      transition: "height 0.2s ease",
                    }}
                    className="w-1.5 bg-gradient-to-t from-emerald-600 to-amber-400 rounded-full"
                  />
                ))}
              </div>

              {/* Botão Play / Pause */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7" />
                ) : (
                  <Play className="w-7 h-7 fill-white ml-1" />
                )}
              </button>

              <span className="text-[11px] text-[#4f705c] font-medium mt-3 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                Duração: {audioTracks[activeTrack].duration}
              </span>
            </ThreeGlassCard>
          </motion.div>

          {/* Lista de Pílulas Auditivas (Direita) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-3"
          >
            {audioTracks.map((track, idx) => {
              const Icon = track.icon;
              const isSelected = activeTrack === idx;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveTrack(idx);
                    setIsPlaying(true);
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-white/95 border-emerald-400 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.2)] scale-[1.01]"
                      : "bg-white/70 border-white/90 hover:bg-white/90 hover:border-emerald-200"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-emerald-600 text-white"
                          : "bg-emerald-50 text-emerald-800 border border-emerald-200/80"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0d2618]">
                        {track.title}
                      </h4>
                      <span className="text-xs text-[#385544]">
                        {track.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#4f705c] font-medium hidden sm:inline">
                      {track.duration}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isSelected
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
