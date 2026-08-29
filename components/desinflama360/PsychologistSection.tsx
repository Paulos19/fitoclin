"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  Smile,
  Shield,
  RefreshCw,
  Headphones,
  LifeBuoy,
  MessageSquareHeart,
} from "lucide-react";

export default function PsychologistSection() {
  const psychologySupports = [
    {
      icon: MessageSquareHeart,
      title: "Mensagens Motivacionais no Grupo",
      desc: "Incentivo diário e acolhimento direto para blindar seu ânimo e manter sua mente no lugar certo.",
    },
    {
      icon: Smile,
      title: "Reflexões Profundas sobre Autoestima",
      desc: "Ressignifique a sua relação consigo mesma, com seu corpo e com a sua autoimagem.",
    },
    {
      icon: Shield,
      title: "Orientações contra a Autossabotagem",
      desc: "Aprenda a reconhecer os gatilhos mentais que antes te faziam parar e saiba como contorná-los.",
    },
    {
      icon: RefreshCw,
      title: "Incentivos para Recuperar a Constância",
      desc: "Ferramentas práticas de psicologia comportamental para criar hábitos automáticos e sustentáveis.",
    },
    {
      icon: Headphones,
      title: "Áudios sobre Motivação & Mudança",
      desc: "Conteúdos focados no comportamento humano e na neurociência da tomada de decisão diária.",
    },
    {
      icon: LifeBuoy,
      title: "Apoio para Retomada após Dias Difíceis",
      desc: "Sem culpa e sem desespero: saiba exatamente como voltar ao ritmo caso tenha um dia desafiador.",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-[#020e07] text-white overflow-hidden border-t border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>Cuidado Emocional & Mental</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight uppercase">
            PORQUE SABER O QUE FAZER NEM SEMPRE É SUFICIENTE PARA CONSEGUIR CONTINUAR
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/80 font-light leading-relaxed">
            A saúde física começa nas escolhas diárias, e as escolhas dependem do seu estado emocional. Por isso, a <strong className="text-rose-300 font-medium">psicóloga Luciane</strong> estará presente com suporte especializado ao longo de toda a sua jornada no Clube.
          </p>
        </div>

        {/* Grid dos 6 Suportes Psicológicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {psychologySupports.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-rose-950/20 via-[#03150d] to-[#021008] border border-rose-500/20 hover:border-rose-400/40 transition-all duration-300 hover:-translate-y-1 shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-950/70 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
