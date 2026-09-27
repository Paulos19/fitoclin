"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileCheck2,
  Users,
  Compass,
  Headphones,
  Trophy,
  Gift,
  HeartHandshake,
  Sparkles,
  BookOpen,
  Utensils,
} from "lucide-react";
import ThreeGlassCard from "./three/ThreeGlassCard";
import ThreeGlassButton from "./three/ThreeGlassButton";

interface DeliverablesSupportSectionProps {
  checkoutUrl: string;
}

export default function DeliverablesSupportSection({
  checkoutUrl,
}: DeliverablesSupportSectionProps) {
  const materials = [
    {
      icon: FileCheck2,
      title: "Mapa FITOCLIN 360 + Prescrição Individual",
      desc: "Avaliação completa do seu metabolismo com prescrição personalizada de fitoterápicos elaborada pela Dra. Isa Bieski.",
      highlight: true,
      tag: "Exclusivo",
    },
    {
      icon: Compass,
      title: "Rota de Autocuidado 360",
      desc: "Guia passo a passo com o direcionamento exato do que priorizar a cada semana para você nunca ficar perdida.",
      tag: "Direcionamento",
    },
    {
      icon: HeartHandshake,
      title: "Acompanhamento com a Psicóloga Luciane",
      desc: "Apoio emocional estruturado para desatar nós mentais, vencer a autossabotagem e a ansiedade alimentar.",
      highlight: true,
      tag: "Suporte Emocional",
    },
    {
      icon: Users,
      title: "6 Meses de Comunidade Exclusiva",
      desc: "Espaço acolhedor com outras mulheres que vivem os mesmos desafios para trocar experiências e vencer juntas.",
      tag: "Comunidade",
    },
    {
      icon: Trophy,
      title: "Gamificação: Jornada das Folhas",
      desc: "Sistema gamificado onde sua constância gera pontos (Folhas) que são trocados por consultorias, presentes e e-books.",
      tag: "Premiações",
    },
    {
      icon: BookOpen,
      title: "BÔNUS 1: Guia FITOCLIN dos 30 Chás",
      desc: "Manual prático com o preparo e a indicação das plantas medicinais mais potentes para desinflamar e dormir bem.",
      tag: "Bônus Especial",
    },
    {
      icon: Utensils,
      title: "BÔNUS 2: Cozinha Desinflama 360",
      desc: "Receitas saborosas, fáceis e anti-inflamatórias para transformar sua alimentação sem passar fome nem gastar rios de dinheiro.",
      tag: "Bônus Especial",
    },
    {
      icon: Headphones,
      title: "BÔNUS 3: Biblioteca de Áudios Aceleradores",
      desc: "Acesso permanente a todas as pílulas auditivas para ouvir no fone a qualquer hora do dia ou da noite.",
      tag: "Bônus Especial",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 text-[#0f2417] overflow-hidden">
      {/* Luz ambiente de fitoterapia */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-gradient-to-r from-emerald-100/40 via-amber-100/30 to-teal-100/30 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho da Sétima Seção com o Texto Exato */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-300/80 shadow-xs text-emerald-950 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4"
          >
            <Gift className="w-4 h-4 text-emerald-600" />
            <span>Entregas Completas & Suporte</span>
          </motion.div>

          {/* SUBSTITUIR POR EXATO */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#0d2618] tracking-tight leading-tight"
          >
            Receba todo o material e suporte que precisa{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500">
              em sua jornada de transformação.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-[#324f3e] font-normal leading-relaxed"
          >
            Tudo o que você precisa reunido em uma área de membros moderna, intuitiva e acessível pelo celular, tablet ou computador.
          </motion.p>
        </div>

        {/* Grid dos Materiais & Suporte */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {materials.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className={item.highlight ? "md:col-span-2 lg:col-span-2" : ""}
              >
                <ThreeGlassCard
                  intensity={12}
                  gradientAccent={
                    item.highlight
                      ? "from-emerald-500/20 via-amber-400/10 to-transparent"
                      : "from-emerald-500/10 to-transparent"
                  }
                  className="p-6 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xs ${
                          item.highlight
                            ? "bg-gradient-to-br from-emerald-600 to-teal-700 text-white"
                            : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 border border-emerald-200/60 text-emerald-950 shadow-2xs">
                        {item.tag}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#0d2618] mb-2 leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#385544] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-emerald-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-900">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Incluso na sua inscrição</span>
                  </div>
                </ThreeGlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Botão de Ação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <ThreeGlassButton href={checkoutUrl} variant="primary">
            QUERO ACESSO A TODO O MATERIAL E SUPORTE
          </ThreeGlassButton>
        </motion.div>
      </div>
    </section>
  );
}
