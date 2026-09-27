"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Moon,
  Sun,
  ShieldAlert,
  Apple,
  Sparkles,
  ClipboardCheck,
  CheckCircle2,
  Zap,
  Leaf,
} from "lucide-react";
import ThreeGlassCard from "./three/ThreeGlassCard";
import ThreeGlassButton from "./three/ThreeGlassButton";

interface FirstWeekSectionProps {
  checkoutUrl: string;
}

export default function FirstWeekSection({ checkoutUrl }: FirstWeekSectionProps) {
  const benefits = [
    {
      icon: Moon,
      title: "Melhore o sono",
      desc: "Regule seu ciclo circadiano com chás e fitoterápicos noturnos para noites contínuas de descanso sem acordar exausta.",
      tag: "Sono Reparador",
      gradient: "from-emerald-500/15 via-teal-500/10 to-transparent",
      iconBg: "bg-emerald-100/80 text-emerald-800 border-emerald-200",
    },
    {
      icon: Sun,
      title: "Mais disposição pela manhã",
      desc: "Acorde com energia real para suas atividades diárias, desinflamando as células e eliminando o cansaço crônico.",
      tag: "Energia Solar",
      gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
      iconBg: "bg-amber-100/80 text-amber-800 border-amber-200",
    },
    {
      icon: ShieldAlert,
      title: "Diminua dores",
      desc: "Ação anti-inflamatória botânica sistêmica que ajuda a aliviar dores articulares, musculares e enxaquecas.",
      tag: "Alívio Natural",
      gradient: "from-emerald-600/15 via-lime-500/10 to-transparent",
      iconBg: "bg-lime-100/80 text-lime-900 border-lime-200",
    },
    {
      icon: Apple,
      title: "Diminua a fome",
      desc: "Modulação da saciedade e equilíbrio do intestino para cessar os beliscos descontrolados e a fissura por doces.",
      tag: "Saciedade & Intestino",
      gradient: "from-teal-500/15 via-emerald-500/10 to-transparent",
      iconBg: "bg-teal-100/80 text-teal-800 border-teal-200",
    },
    {
      icon: Zap,
      title: "Ganhe mais força de vontade para mudar sua vida",
      desc: "Ao desinflamar o corpo, sua clareza mental e motivação voltam com toda a força para manter a constância e o autocuidado.",
      tag: "Clareza & Vigor",
      gradient: "from-amber-500/20 via-emerald-500/15 to-transparent",
      iconBg: "bg-amber-100/90 text-amber-900 border-amber-300",
      featured: true,
    },
  ];

  return (
    <section
      id="transformacao"
      className="relative py-20 md:py-28 text-[#0f2417] overflow-hidden"
    >
      {/* Background Glow em Tons de Fitoterapia */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[550px] bg-gradient-to-r from-emerald-200/40 via-lime-100/30 to-amber-200/30 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Layout Side a Side para a 2ª Seção */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Coluna Esquerda: Título, Subtítulo & Mapa Metabólico */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-300/80 shadow-xs text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-900 backdrop-blur-xl">
                <ClipboardCheck className="w-4 h-4 text-emerald-600" />
                <span>Primeiro Passo do Método</span>
              </div>
            </motion.div>

            {/* TÍTULO EXATO */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-[#0d2618] tracking-tight leading-tight"
            >
              A transformação começa já na primeira semana{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500">
                entendendo seus problemas.
              </span>
            </motion.h2>

            {/* SUBTÍTULO EXATO */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base sm:text-lg text-[#324f3e] leading-relaxed font-normal"
            >
              Responda ao <strong className="text-emerald-950 font-bold">MAPA METABÓLICO DESINFLAMA 360</strong> e receba uma prescrição personalizada de fitoterápicos direto com a Dra. Isa.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-4 rounded-2xl bg-white/80 border border-emerald-200/80 shadow-xs flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-xs text-[#385544] leading-relaxed">
                Cada organismo é único. A prescrição considera seu perfil hormonal, digestivo, sono e necessidades individuais.
              </p>
            </motion.div>

            {/* Botão CTA na coluna esquerda */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="pt-2"
            >
              <ThreeGlassButton href={checkoutUrl} variant="primary">
                QUERO MEU MAPA METABÓLICO & PRESCRIÇÃO
              </ThreeGlassButton>
            </motion.div>
          </div>

          {/* Coluna Direita: Os 5 Bullets em Cards 3D de Vidro */}
          <div className="lg:col-span-7 space-y-3.5">
            {benefits.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <ThreeGlassCard
                    intensity={10}
                    gradientAccent={item.gradient}
                    className="p-4 sm:p-5 flex items-start gap-4"
                  >
                    <div
                      className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 shadow-xs mt-0.5 ${item.iconBg}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-base font-bold text-[#0d2618] flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{item.title}</span>
                        </h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 border border-emerald-200/60 text-emerald-900 shadow-2xs">
                          {item.tag}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#385544] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </ThreeGlassCard>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
