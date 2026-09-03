"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Activity,
  Brain,
  ShieldAlert,
  TrendingDown,
  BatteryLow,
  RotateCcw,
  HeartCrack,
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
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-[#042415] to-emerald-950/80 border-2 border-emerald-500/40 text-center max-w-3xl mx-auto shadow-xl"
        >
          <p className="text-base sm:text-xl font-medium text-emerald-100 leading-relaxed">
            Esses sinais <strong className="text-amber-300 underline underline-offset-4 font-bold">não devem ser ignorados ou tratados de maneira isolada</strong>.
          </p>
          <p className="text-lg sm:text-2xl font-serif font-extrabold text-white mt-2">
            Seu corpo pode estar pedindo uma mudança nos hábitos.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
