"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Sparkles, Star, TrendingUp, Moon, Activity, ArrowRight } from "lucide-react";

interface TransformationStoriesProps {
  checkoutUrl: string;
}

export default function TransformationStories({ checkoutUrl }: TransformationStoriesProps) {
  const stories = [
    {
      name: "Solange A.",
      age: "49 anos",
      badge: "Sono & Ansiedade",
      before: "Acordava 4 a 5 vezes na noite, mente em turbilhão, dependência de café e calmantes.",
      after: "Noites de 7 a 8 horas de sono profundo ininterrupto, mente calma e sensação de paz ao acordar.",
      quote: "O Clube me devolveu a paz noturna. Eu achei que a menopausa tinha acabado com meu sono, mas a Dra. Isa me mostrou como desinflamar meu corpo com as plantas certas.",
    },
    {
      name: "Beatriz M.",
      age: "42 anos",
      badge: "Intestino & Desinchaço",
      before: "Intestino preso por até 5 dias, barriga dolorida e estufada, roupas apertadas.",
      after: "Intestino funcionando todos os dias como um relógio, digestão leve e barriga desinflamada.",
      quote: "Nunca mais precisei de laxantes. O mapa personalizado me deu exatamente a combinação de chás e alimentos que meu organismo precisava.",
    },
    {
      name: "Teresa C.",
      age: "55 anos",
      badge: "Dores no Corpo & Energia",
      before: "Dores articulares nas pernas e costas, cansaço extremo ao levantar do sofá.",
      after: "Voltou a fazer caminhadas diárias sem dor, energia constante do início da manhã até a noite.",
      quote: "Minha médica ficou surpresa com a melhora dos meus marcadores inflamatórios. O método cuida de verdade de dentro para fora.",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-[#031108] text-white overflow-hidden border-t border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Resultados e Evolução</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight uppercase">
            PESSOAS REAIS. MUDANÇAS CONSTRUÍDAS COM DIREÇÃO E CONSTÂNCIA.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/80 font-light leading-relaxed">
            Veja a evolução de mulheres que decidiram não aceitar o cansaço e o mal-estar como o seu "novo normal".
          </p>
        </div>

        {/* Grid das Histórias */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {stories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl p-7 bg-gradient-to-b from-emerald-950/30 via-[#041a10] to-[#021008] border border-emerald-500/25 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-500/30 text-emerald-300">
                    {story.badge}
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {story.name}
                </h3>
                <p className="text-xs text-emerald-400/80 mb-5">
                  {story.age} • Aluna do Clube
                </p>

                {/* Antes e Depois */}
                <div className="space-y-3 mb-6">
                  <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 text-xs">
                    <span className="font-bold text-red-400 block mb-0.5">Antes do Clube:</span>
                    <span className="text-emerald-100/70">{story.before}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs">
                    <span className="font-bold text-emerald-400 block mb-0.5">Após a Jornada:</span>
                    <span className="text-emerald-100/90">{story.after}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-emerald-100/80 italic font-light leading-relaxed">
                  "{story.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-500/20 flex items-center gap-2 text-xs text-emerald-400">
                <Sparkles className="w-4 h-4 text-teal-300" />
                <span className="font-medium">Transformação Sustentável</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="text-center text-xs text-emerald-400/60 max-w-2xl mx-auto">
          * Os relatos apresentados refletem experiências pessoais e não constituem garantia de resultados idênticos para todos os participantes. Cada organismo possui particularidades e respostas individuais.
        </div>
      </div>
    </section>
  );
}
