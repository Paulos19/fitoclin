"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Leaf,
  Apple,
  Heart,
  Activity,
  Brain,
  Layers,
  Award,
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
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#020e07] via-[#041a10] to-[#020d06] text-white overflow-hidden border-t border-emerald-900/30">
      {/* Glows de fundo */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Bloco 1: Conheça o Clube Desinflama 360 */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Jornada de Transformação</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase">
            CONHEÇA O CLUBE DESINFLAMA 360
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/90 font-light leading-relaxed">
            Uma jornada de <strong className="text-white font-semibold">seis meses</strong> para ajudar você a desinflamar seus hábitos e cuidar do intestino, do sono, da ansiedade, das dores e da disposição.
          </p>

          <p className="mt-3 text-sm sm:text-base text-amber-300/90 font-medium">
            Tudo por meio dos cinco pilares do Método FITOCLIN®:
          </p>
        </div>

        {/* Grid dos 5 Pilares */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-5 rounded-2xl bg-gradient-to-b from-[#031d10] to-[#021008] border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {pillar.name}
                </h3>
                <p className="text-xs text-emerald-200/70 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-500/20 text-[10px] text-emerald-400 font-medium uppercase tracking-wider">
                Pilar {idx + 1}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bloco 2: O Que Você Receberá (Checklist dos Entregáveis) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-b from-[#031d10] via-[#02180d] to-[#010e07] border-2 border-emerald-500/35 p-6 sm:p-10 lg:p-12 shadow-2xl"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">
              Estrutura Completa de Acompanhamento
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
              O QUE VOCÊ RECEBERÁ
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-emerald-200/80">
              Tudo o que você precisa para aplicar o método na sua rotina com segurança e resultados práticos:
            </p>
          </div>

          {/* Grid de Entregáveis */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {deliverables.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 hover:border-emerald-400/40 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-emerald-100">
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
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 text-black font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-[0_0_40px_-5px_rgba(245,158,11,0.5)] hover:shadow-[0_0_50px_-5px_rgba(245,158,11,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>QUERO CONHECER A CONDIÇÃO ESPECIAL</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="mt-3 text-xs text-emerald-300/80">
              Condição especial com 30% a 50% OFF divulgada exclusivamente no WhatsApp em 10 de Setembro.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
