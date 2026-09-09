"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ArrowUpRight,
  Layers,
} from "lucide-react";

interface PromoPillarsAndMethodProps {
  whatsappUrl: string;
}

export default function PromoPillarsAndMethod({ whatsappUrl }: PromoPillarsAndMethodProps) {
  const pillars = [
    {
      name: "Plantas medicinais",
      icon: "🌿",
      desc: "Fitoterapia baseada em evidências para modular o sistema imunológico, digestivo e metabólico.",
    },
    {
      name: "Alimentação inteligente",
      icon: "🥗",
      desc: "Comida de verdade que nutre e desinflama, sem restrições severas ou culpas alimentares.",
    },
    {
      name: "Fé e espiritualidade",
      icon: "🙏",
      desc: "Cuidado da mente e do coração para desacelerar o cortisol e encontrar serenidade diária.",
    },
    {
      name: "Movimento com propósito",
      icon: "🏃",
      desc: "Estímulos físicos adequados para destravar o metabolismo e lubrificar as articulações.",
    },
    {
      name: "Motivação e mentalidade",
      icon: "🧠",
      desc: "Acompanhamento e comunidade para transformar motivação temporária em constância real.",
    },
  ];

  const deliverables = [
    "Mapa FITOCLIN 360",
    "Rota de cuidado personalizada",
    "Três ciclos de acompanhamento",
    "Três Desafios de 21 Dias",
    "Orientações sobre alimentação e plantas medicinais",
    "Estratégias para sono, ansiedade e intestino",
    "Grupo exclusivo",
    "Áudios aceleradores",
    "Materiais práticos para aplicar na rotina",
  ];

  return (
    <section className="relative py-20 md:py-28 bg-[#F8FAF9] text-neutral-900 overflow-hidden border-t border-b border-neutral-200/80">
      {/* Luzes ambiente */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Bloco 1: Conheça o Clube Desinflama 360 */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs sm:text-sm font-semibold tracking-wide mb-3.5">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Jornada de 6 Meses de Acompanhamento</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A1C12] tracking-tight leading-tight uppercase">
            CONHEÇA O CLUBE DESINFLAMA 360
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            Uma jornada de <strong className="text-[#0A1C12] font-semibold">seis meses</strong> para ajudar você a desinflamar seus hábitos e cuidar do intestino, do sono, da ansiedade, das dores e da disposição.
          </p>

          <p className="mt-2.5 text-sm sm:text-base text-emerald-800 font-medium">
            Tudo por meio dos cinco pilares do Método FITOCLIN®:
          </p>
        </div>

        {/* Grid dos 5 Pilares no Estilo do Template de Referência */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mb-20">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 rounded-3xl bg-white border border-neutral-200/90 hover:border-emerald-500/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_-10px_rgba(5,150,105,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/70">
                    Pilar 0{idx + 1}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <div className="w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>

                <h3 className="text-base font-extrabold text-[#0A1C12] mb-2 leading-snug">
                  {pillar.name}
                </h3>
                <p className="text-xs text-neutral-600 font-normal leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-neutral-100 flex items-baseline justify-between">
                <span className="font-mono text-3xl font-black text-neutral-200 group-hover:text-emerald-700/80 transition-colors">
                  0{idx + 1}
                </span>
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  FITOCLIN®
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bloco 2: O Que Você Receberá (Checklist dos Entregáveis em Card Clean) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-white border border-neutral-200/90 p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.07)]"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-800 font-semibold mb-3">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>Estrutura Completa de Acompanhamento</span>
            </div>
            <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A1C12] tracking-tight uppercase">
              O QUE VOCÊ RECEBERÁ
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Tudo o que você precisa para aplicar o método na sua rotina com segurança e resultados práticos:
            </p>
          </div>

          {/* Grid de Entregáveis */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-10">
            {deliverables.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-2xl bg-[#F8FAF9] border border-neutral-200/80 hover:border-emerald-500/40 hover:bg-white hover:shadow-sm transition-all duration-300"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-neutral-800">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Intermediário */}
          <div className="text-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-[#0A1C12] hover:bg-[#064E3B] text-white font-extrabold text-xs sm:text-sm md:text-base uppercase tracking-wider shadow-[0_12px_30px_-8px_rgba(10,28,18,0.35)] hover:shadow-[0_16px_36px_-8px_rgba(6,78,59,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 border border-emerald-900/30"
            >
              <span>QUERO CONHECER A CONDIÇÃO ESPECIAL</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="mt-3 text-xs text-neutral-500 font-medium">
              Condição especial com 50% OFF divulgada exclusivamente no WhatsApp em 17 de Setembro.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
