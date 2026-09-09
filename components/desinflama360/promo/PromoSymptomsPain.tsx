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
  ArrowUpRight,
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
    <section className="relative py-20 md:py-28 bg-[#FFFFFF] text-neutral-900 overflow-hidden">
      {/* Luz ambiente sutil */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Bloco 1: Conexão com os Sintomas */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold tracking-wide mb-3.5">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span>Identificação de Sinais de Inflamação</span>
          </div>

          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-[#0A1C12] tracking-tight leading-tight uppercase">
            VOCÊ DORME MAL, ACORDA CANSADA E PASSA O DIA SEM DISPOSIÇÃO?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 font-normal">
            Talvez você também conviva com um ou mais desses desconfortos diários:
          </p>
        </div>

        {/* Grid de Sintomas inspirado no template de referência */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-14">
          {symptoms.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 rounded-2xl bg-[#F8FAF9] border border-neutral-200/80 hover:border-emerald-500/50 hover:bg-white hover:shadow-[0_12px_30px_-8px_rgba(5,150,105,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-100/80 transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs font-bold text-neutral-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#0A1C12] mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-neutral-400 group-hover:text-emerald-700 transition-colors">
                  <span>Sinal de alerta</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Alerta de Causa Raiz em Card de Alto Impacto Botânico */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-10 rounded-3xl bg-[#0A1C12] text-white text-center max-w-3xl mx-auto shadow-xl border border-emerald-900/40 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-base sm:text-lg text-emerald-200/90 leading-relaxed font-light">
              Esses sinais <strong className="text-amber-300 font-bold underline underline-offset-4">não devem ser ignorados ou tratados de maneira isolada</strong>.
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-sans font-extrabold text-white mt-3 tracking-tight">
              Seu corpo pode estar pedindo uma mudança nos hábitos.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
