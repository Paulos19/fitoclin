"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Moon,
  Activity,
  Brain,
  ShieldAlert,
  TrendingDown,
  BatteryLow,
  RotateCcw,
  Sparkles,
  HeartCrack,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function PromoSymptomsPain() {
  const symptoms = [
    {
      title: "Intestino desregulado",
      desc: "Prisão de ventre, distensão abdominal e desconfortos frequentes após as refeições.",
      icon: Activity,
    },
    {
      title: "Inchaço frequente",
      desc: "Sensação constante de peso no corpo, retenção de líquidos e roupas que apertam.",
      icon: ShieldAlert,
    },
    {
      title: "Ansiedade e irritabilidade",
      desc: "Mente acelerada, sobrecarga emocional e alterações repentinas de humor.",
      icon: Brain,
    },
    {
      title: "Dores pelo corpo",
      desc: "Dores musculares, articulações inflamadas e cansaço físico persistente.",
      icon: HeartCrack,
    },
    {
      title: "Dificuldade para emagrecer",
      desc: "Metabolismo travado por inflamações crônicas de baixo grau e desequilíbrios.",
      icon: TrendingDown,
    },
    {
      title: "Falta de energia",
      desc: "Sensação de que a bateria nunca recarrega, mesmo após passar a noite na cama.",
      icon: BatteryLow,
    },
    {
      title: "Sensação de que o corpo não funciona como antes",
      desc: "A sensação incômoda de estar refém de remédios pontuais para tentar mascarar cada sintoma.",
      icon: RotateCcw,
    },
  ];

  const failedAttempts = [
    "Começou dietas restritivas e difíceis de sustentar",
    "Tomou chás sem saber a planta certa e a dose correta",
    "Comprou suplementos caros sem orientação individual",
    "Tentou mudar tudo de uma vez só e se sobrecarregou",
  ];

  return (
    <section className="relative py-16 md:py-24 bg-[#020e07] text-white overflow-hidden border-t border-emerald-900/30">
      {/* Luzes ambiente */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-700/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Bloco 1: Conexão com os Sintomas */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/30 text-red-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span>Identificação de Sinais</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase">
            VOCÊ DORME MAL, ACORDA CANSADA E PASSA O DIA SEM DISPOSIÇÃO?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/80 font-light">
            Talvez você também conviva com um ou mais desses desconfortos diários:
          </p>
        </div>

        {/* Grid de Sintomas */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-12">
          {symptoms.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-5 rounded-2xl bg-gradient-to-b from-emerald-950/40 via-[#031c10]/60 to-[#021109] border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 flex items-start gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0 group-hover:bg-red-500/20 transition-colors">
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                    • {item.title}
                  </h3>
                  <p className="text-xs text-emerald-200/70 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Alerta de Causa Raiz */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-[#042415] to-emerald-950/80 border-2 border-emerald-500/40 text-center max-w-3xl mx-auto mb-20 shadow-xl"
        >
          <p className="text-base sm:text-xl font-medium text-emerald-100 leading-relaxed">
            Esses sinais <strong className="text-amber-300 underline underline-offset-4 font-bold">não devem ser ignorados ou tratados de maneira isolada</strong>.
          </p>
          <p className="text-lg sm:text-2xl font-serif font-extrabold text-white mt-2">
            Seu corpo pode estar pedindo uma mudança nos hábitos.
          </p>
        </motion.div>

        {/* Bloco 2: Quebra de Objeções & Por que falhou antes */}
        <div className="rounded-3xl bg-gradient-to-b from-[#031d10] to-[#011107] border border-emerald-500/30 p-6 sm:p-10 lg:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>O Real Motivo</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
              VOCÊ JÁ TENTOU MUDAR, MAS NÃO CONSEGUIU MANTER?
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/80 font-light leading-relaxed">
              Talvez você já tenha começado dietas, tomado chás, comprado suplementos ou tentado mudar tudo de uma vez.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5 max-w-2xl mx-auto mb-8">
            {failedAttempts.map((attempt, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs sm:text-sm text-emerald-200/80"
              >
                <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                <span>{attempt}</span>
              </div>
            ))}
          </div>

          <div className="text-center max-w-2xl mx-auto space-y-4 pt-4 border-t border-emerald-500/20">
            <p className="text-sm sm:text-base text-emerald-100 font-light leading-relaxed">
              Mas, sem compreender o que o seu corpo precisa e sem uma estratégia possível de seguir, a frustração volta.
            </p>
            <p className="text-base sm:text-lg font-bold text-amber-300">
              O problema não é apenas falta de força de vontade.
            </p>
            <div className="inline-flex flex-wrap justify-center items-center gap-2 p-3 sm:p-4 rounded-2xl bg-emerald-950/80 border border-emerald-400/40 text-sm sm:text-base font-bold text-white">
              <span>Você precisa de:</span>
              <span className="px-3 py-1 rounded-lg bg-emerald-600/40 text-emerald-200">🌿 Orientação</span>
              <span className="px-3 py-1 rounded-lg bg-emerald-600/40 text-emerald-200">🤝 Acompanhamento</span>
              <span className="px-3 py-1 rounded-lg bg-emerald-600/40 text-emerald-200">⏳ Constância</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
