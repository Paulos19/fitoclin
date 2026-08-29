"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Headphones,
  Play,
  Pause,
  Sparkles,
  Volume2,
  Zap,
  Flame,
  Heart,
  Moon,
  Clock,
} from "lucide-react";

export default function AudioAcceleratorsSection() {
  const [activeTrack, setActiveTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioTracks = [
    {
      title: "Pílula 01: Vencendo o Desânimo Matinal",
      category: "Desânimo & Força",
      duration: "3:45 min",
      desc: "Palavras de coragem e ativação para quando a cama estiver pesada demais.",
      icon: Flame,
      tagColor: "text-amber-400 border-amber-500/30 bg-amber-950/40",
    },
    {
      title: "Pílula 02: Acalmando a Ansiedade Aguda",
      category: "Ansiedade & Serenidade",
      duration: "4:12 min",
      desc: "Técnica guiada de respiração e alinhamento mental para baixar o estresse.",
      icon: Moon,
      tagColor: "text-indigo-400 border-indigo-500/30 bg-indigo-950/40",
    },
    {
      title: "Pílula 03: Destravando a Procrastinação",
      category: "Ação Imediata",
      duration: "2:58 min",
      desc: "O comando mental para fazer o que precisa ser feito sem adiar para amanhã.",
      icon: Zap,
      tagColor: "text-emerald-400 border-emerald-500/30 bg-emerald-950/40",
    },
    {
      title: "Pílula 04: Blindagem contra a Autossabotagem",
      category: "Mente Forte",
      duration: "3:30 min",
      desc: "Como calar a voz interna que sussurra que 'um dia só não faz mal'.",
      icon: Sparkles,
      tagColor: "text-teal-400 border-teal-500/30 bg-teal-950/40",
    },
    {
      title: "Pílula 05: Renovando a Fé e o Propósito",
      category: "Espiritualidade & Fé",
      duration: "4:40 min",
      desc: "Reconecte seu coração com o motivo pelo qual você começou a se cuidar.",
      icon: Heart,
      tagColor: "text-rose-400 border-rose-500/30 bg-rose-950/40",
    },
    {
      title: "Pílula 06: Recomeçando sem Culpa após um Deslize",
      category: "Retomada Rápida",
      duration: "3:15 min",
      desc: "Instrução acolhedora para voltar aos trilhos no minuto seguinte sem autopunição.",
      icon: Headphones,
      tagColor: "text-cyan-400 border-cyan-500/30 bg-cyan-950/40",
    },
  ];

  const handlePlayToggle = (index: number) => {
    if (activeTrack === index && isPlaying) {
      setIsPlaying(false);
    } else {
      setActiveTrack(index);
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative py-20 md:py-28 bg-[#03130a] text-white overflow-hidden border-t border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
            <Headphones className="w-4 h-4 text-emerald-400" />
            <span>Pílulas Auditivas 24h</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight uppercase">
            APERTE O PLAY QUANDO PENSAR EM DESISTIR
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/80 font-light leading-relaxed">
            Você terá acesso a áudios curtos e profundos diretamente no seu celular para momentos de <strong className="text-white font-medium">desânimo, ansiedade, procrastinação, autossabotagem, falta de fé e cansaço</strong>.
          </p>
        </div>

        {/* Layout do Player & Faixas */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Player Interativo em Destaque */}
          <div className="lg:col-span-5 bg-gradient-to-b from-emerald-950/80 via-[#041a10] to-[#020e07] rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Pílula em Execução
              </span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/30">
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Áudio de Bolso</span>
              </div>
            </div>

            <div className="w-full aspect-[16/10] rounded-2xl bg-[#020c06] border border-emerald-500/20 flex flex-col items-center justify-center p-6 text-center mb-6 relative overflow-hidden">
              {/* Equalizador animado */}
              <div className="flex items-end gap-1.5 h-12 mb-4">
                {[40, 70, 30, 90, 60, 100, 45, 80, 50, 95, 65, 30].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1.5 rounded-full bg-gradient-to-t from-emerald-500 to-teal-300 transition-all duration-300 ${
                      isPlaying ? "animate-pulse" : "opacity-40"
                    }`}
                    style={{ height: isPlaying ? `${h}%` : "20%" }}
                  />
                ))}
              </div>

              <h4 className="text-base font-bold text-white mb-1">
                {audioTracks[activeTrack].title}
              </h4>
              <p className="text-xs text-emerald-300/80 mb-2">
                Dra. Isa Bieski & Equipe
              </p>
              <span className="text-[11px] text-emerald-400 font-mono">
                {audioTracks[activeTrack].duration}
              </span>
            </div>

            {/* Controles */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() =>
                  setActiveTrack(
                    (prev) => (prev - 1 + audioTracks.length) % audioTracks.length
                  )
                }
                className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-300 hover:text-white hover:border-emerald-400 transition-colors text-xs font-bold"
              >
                ◀◀
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-black flex items-center justify-center shadow-lg shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black ml-0.5" />}
              </button>

              <button
                onClick={() =>
                  setActiveTrack((prev) => (prev + 1) % audioTracks.length)
                }
                className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-300 hover:text-white hover:border-emerald-400 transition-colors text-xs font-bold"
              >
                ▶▶
              </button>
            </div>
          </div>

          {/* Lista de Áudios Disponíveis */}
          <div className="lg:col-span-7 space-y-3.5">
            {audioTracks.map((track, idx) => {
              const TrackIcon = track.icon;
              const isSelected = activeTrack === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handlePlayToggle(idx)}
                  className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-emerald-950/90 border-emerald-400 shadow-lg shadow-emerald-950/50"
                      : "bg-[#020f08]/80 border-emerald-500/20 hover:border-emerald-500/40 hover:bg-[#03150c]"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <button
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                        isSelected
                          ? "bg-emerald-500 text-black font-bold"
                          : "bg-emerald-950 border border-emerald-500/30 text-emerald-400"
                      }`}
                    >
                      {isSelected && isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${track.tagColor}`}>
                          {track.category}
                        </span>
                        <span className="text-[11px] text-emerald-400/70 font-mono">
                          {track.duration}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-0.5">
                        {track.title}
                      </h4>
                      <p className="text-xs text-emerald-100/70 font-light">
                        {track.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
