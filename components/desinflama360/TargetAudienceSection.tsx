"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Moon,
  Brain,
  Sparkles,
  RefreshCw,
  Leaf,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";
import ThreeGlassCard from "./three/ThreeGlassCard";
import ThreeGlassButton from "./three/ThreeGlassButton";

interface TargetAudienceSectionProps {
  checkoutUrl: string;
}

export default function TargetAudienceSection({ checkoutUrl }: TargetAudienceSectionProps) {
  const targetProfiles = [
    {
      icon: Activity,
      title: "Sinais de Inflamação Persistente",
      desc: "Pessoas que apresentam sinais de inflamação persistente, como dores frequentes, cansaço, inchaço, alterações intestinais e indisposição constante.",
      tag: "Corpo & Vitalidade",
    },
    {
      icon: Moon,
      title: "Insônia e Noites Mal Dormidas",
      desc: "Pessoas que convivem com insônia, sono leve, despertares noturnos frequentes ou que acordam exaustas mesmo depois de várias horas na cama.",
      tag: "Sono & Repouso",
    },
    {
      icon: Brain,
      title: "Ansiedade e Mente Acelerada",
      desc: "Pessoas que sentem ansiedade, mente acelerada, irritabilidade ou dificuldade para relaxar e desejam construir uma rotina de maior equilíbrio emocional.",
      tag: "Mente & Emoções",
    },
    {
      icon: Sparkles,
      title: "Intestino Desregulado e Estufamento",
      desc: "Pessoas que sofrem com intestino desregulado, gases, estufamento ou dificuldade para evacuar e desejam cuidar do organismo de forma integrada.",
      tag: "Saúde Intestinal",
    },
    {
      icon: RefreshCw,
      title: "Falta de Constância e Direção",
      desc: "Pessoas que começam mudanças saudáveis, mas não conseguem manter a constância e precisam de direção clara, acompanhamento e motivação contínua.",
      tag: "Acompanhamento",
    },
    {
      icon: Leaf,
      title: "Fitoterapia com Segurança e Base Científica",
      desc: "Pessoas que desejam utilizar alimentação inteligente, movimento, fé e plantas medicinais com mais consciência, segurança e responsabilidade.",
      tag: "Ciência & Plantas",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 text-[#0f2417] overflow-hidden">
      {/* Luz ambiente botânica */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-200/40 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-100/40 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho da Oitava Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-300/80 shadow-xs text-emerald-950 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4"
          >
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>Perfil e Identificação</span>
          </motion.div>

          {/* MANTER EXATO */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#0d2618] tracking-tight leading-tight"
          >
            Para quem é o{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500">
              Clube Desinflama 360?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-[#324f3e] font-normal leading-relaxed"
          >
            Se você se identifica com uma ou mais situações abaixo, este método foi desenhado exatamente para o seu corpo e rotina:
          </motion.p>
        </div>

        {/* Grid dos Perfis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {targetProfiles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <ThreeGlassCard
                  intensity={12}
                  gradientAccent="from-emerald-500/15 to-transparent"
                  className="p-6 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-800 shadow-2xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/90 border border-emerald-200/60 text-emerald-950 shadow-2xs">
                        {p.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0d2618] mb-2 leading-snug">
                      {p.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#385544] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-emerald-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Feito para sua realidade</span>
                  </div>
                </ThreeGlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Box: Para quem NÃO é o Clube (Transparência) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 bg-amber-50/70 backdrop-blur-xl border border-amber-200 shadow-xs mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0">
              <XCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="text-base font-bold text-amber-950">
                Para quem NÃO é o Clube Desinflama 360?
              </h4>
              <p className="text-xs text-amber-800">
                Prezamos pela transparência e pelo compromisso com o seu resultado real.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-amber-900">
            <div className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span>Quem procura pílulas milagrosas ou promessas irreais de perder peso em 24h sem mudar nada.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span>Quem não está disposta a reservar 15 minutos por semana para cuidar da própria saúde e ouvir as orientações.</span>
            </div>
          </div>
        </motion.div>

        {/* Botão de Inscrição */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <ThreeGlassButton href={checkoutUrl} variant="primary">
            ME IDENTIFIQUEI E QUERO ENTRAR PARA O CLUBE
          </ThreeGlassButton>
        </motion.div>
      </div>
    </section>
  );
}
