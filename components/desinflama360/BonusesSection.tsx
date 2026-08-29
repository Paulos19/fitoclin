"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gift, BookOpen, UtensilsCrossed, Headphones, Sparkles, Check } from "lucide-react";

export default function BonusesSection() {
  const bonuses = [
    {
      badge: "BÔNUS 01",
      title: "Guia FITOCLIN dos 30 Chás",
      tagline: "O compêndio prático da fitoterapia diária",
      desc: "Aprenda formas corretas de preparo (infusão, decocção, maceração), os melhores momentos de utilização de cada erva, cuidados essenciais e princípios para um uso consciente, seguro e eficaz.",
      icon: BookOpen,
      items: [
        "Preparo correto para extrair os fitoquímicos ativos",
        "Tabela de horários: manhã, tarde e noite",
        "Interações seguras e dosagens recomendadas",
      ],
      color: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/40",
      badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    },
    {
      badge: "BÔNUS 02",
      title: "Cozinha Desinflama 360",
      tagline: "Praticidade, sabor e desinflamação na sua mesa",
      desc: "Receitas práticas e deliciosas, listas de compras otimizadas e um guia de substituições inteligentes para facilitar a alimentação anti-inflamatória no dia a dia da sua família.",
      icon: UtensilsCrossed,
      items: [
        "Receitas rápidas para rotinas corridas",
        "Lista de compras do supermercado e feira",
        "Substituições inteligentes de ingredientes inflamatórios",
      ],
      color: "from-amber-500/20 to-emerald-500/10",
      border: "border-amber-500/40",
      badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    },
    {
      badge: "BÔNUS 03",
      title: "Biblioteca de Áudios Aceleradores",
      tagline: "Seu suporte mental e espiritual no bolso",
      desc: "Acervo completo de áudios da Dra. Isa Bieski para fortalecer a fé, enfrentar a autossabotagem, recuperar a motivação e manter a constância inabalável em qualquer situação.",
      icon: Headphones,
      items: [
        "Acesso instantâneo pelo celular 24 horas",
        "Reforço contra o desânimo e a procrastinação",
        "Mensagens diárias de fé, propósito e força",
      ],
      color: "from-cyan-500/20 to-emerald-500/10",
      border: "border-cyan-500/40",
      badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-[#020e07] text-white overflow-hidden border-t border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
            <Gift className="w-4 h-4 text-emerald-400" />
            <span>Presentes Especiais</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight uppercase">
            AO ENTRAR PARA O CLUBE, VOCÊ TAMBÉM RECEBERÁ TRÊS BÔNUS
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/80 font-light leading-relaxed">
            Materiais práticos e complementares desenhados para acelerar seus resultados e economizar o seu tempo.
          </p>
        </div>

        {/* Grid dos 3 Bônus */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {bonuses.map((bonus, idx) => {
            const Icon = bonus.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-3xl p-7 sm:p-8 bg-gradient-to-b ${bonus.color} via-[#03180e] to-[#021008] border ${bonus.border} shadow-2xl flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300`}
              >
                <div>
                  {/* Badge do Bônus */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${bonus.badgeBg}`}>
                      {bonus.badge}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
                    {bonus.title}
                  </h3>

                  <p className="text-xs font-semibold text-emerald-300/90 uppercase tracking-wider mb-4">
                    {bonus.tagline}
                  </p>

                  <p className="text-sm text-emerald-100/75 leading-relaxed font-light mb-6">
                    {bonus.desc}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-emerald-500/20">
                    {bonus.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-emerald-100/90 font-light">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300/80">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Incluso Gratuitamente</span>
                  </span>
                  <span className="font-bold text-emerald-400">100% Grátis</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
