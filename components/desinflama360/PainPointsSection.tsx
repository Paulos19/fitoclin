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
  HeartPulse,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface PainPointsSectionProps {
  checkoutUrl: string;
}

export default function PainPointsSection({ checkoutUrl }: PainPointsSectionProps) {
  const painPoints = [
    {
      icon: Activity,
      title: "Sinais de Inflamação Persistente",
      desc: "Pessoas que apresentam sinais de inflamação persistente, como dores frequentes, cansaço, inchaço, alterações intestinais e indisposição constante.",
      tag: "Corpo & Vitalidade",
      color: "from-emerald-500/20 to-teal-500/10",
      borderColor: "border-emerald-500/30",
    },
    {
      icon: Moon,
      title: "Insônia e Noites Mal Dormidas",
      desc: "Pessoas que convivem com insônia, sono leve, despertares noturnos frequentes ou que acordam exaustas mesmo depois de várias horas na cama.",
      tag: "Sono & Repouso",
      color: "from-indigo-500/20 to-purple-500/10",
      borderColor: "border-indigo-500/30",
    },
    {
      icon: Brain,
      title: "Ansiedade e Mente Acelerada",
      desc: "Pessoas que sentem ansiedade, mente acelerada, irritabilidade ou dificuldade para relaxar e desejam construir uma rotina de maior equilíbrio emocional.",
      tag: "Mente & Emoções",
      color: "from-teal-500/20 to-emerald-500/10",
      borderColor: "border-teal-500/30",
    },
    {
      icon: Sparkles,
      title: "Intestino Desregulado e Estufamento",
      desc: "Pessoas que sofrem com intestino desregulado, gases, estufamento ou dificuldade para evacuar e desejam cuidar do organismo de forma integrada.",
      tag: "Saúde Intestinal",
      color: "from-amber-500/20 to-emerald-500/10",
      borderColor: "border-amber-500/30",
    },
    {
      icon: RefreshCw,
      title: "Falta de Constância e Direção",
      desc: "Pessoas que começam mudanças saudáveis, mas não conseguem manter a constância e precisam de direção clara, acompanhamento e motivação contínua.",
      tag: "Acompanhamento",
      color: "from-emerald-500/20 to-cyan-500/10",
      borderColor: "border-emerald-500/30",
    },
    {
      icon: Leaf,
      title: "Fitoterapia com Segurança e Base",
      desc: "Pessoas que desejam utilizar alimentação inteligente, movimento, fé e plantas medicinais com mais consciência, segurança e responsabilidade.",
      tag: "Ciência & Plantas",
      color: "from-emerald-600/20 to-lime-500/10",
      borderColor: "border-emerald-500/30",
    },
    {
      icon: HeartPulse,
      title: "Rotina Possível e Sustentável",
      desc: "Pessoas que querem desinflamar hábitos e construir uma rotina viável no dia a dia para favorecer o sono restaurador, a energia, a disposição e o bem-estar duradouro.",
      tag: "Transformação 360",
      color: "from-teal-500/20 to-emerald-600/10",
      borderColor: "border-teal-500/30",
      fullWidth: true,
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-[#031109] text-white overflow-hidden border-t border-emerald-900/30">
      {/* Luzes decorativas */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Identificação e Diagnóstico</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
          >
            Para quem é o{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300">
              Clube Desinflama 360?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-emerald-100/70 font-light"
          >
            Se você se identifica com um ou mais pontos abaixo, o Clube foi planejado especialmente para a sua realidade:
          </motion.p>
        </div>

        {/* Grid dos 7 Pontos de Conexão */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {painPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`relative group rounded-2xl p-6 sm:p-7 bg-gradient-to-b ${item.color} to-[#02140a]/90 border ${item.borderColor} backdrop-blur-md hover:border-emerald-400/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/40 ${
                  item.fullWidth ? "md:col-span-2 lg:col-span-3 lg:max-w-3xl lg:mx-auto" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/20 text-emerald-300/80">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-emerald-100/80 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Botão abaixo da Seção 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <a
            href={checkoutUrl}
            className="group relative inline-flex items-center justify-center text-center px-8 py-5 sm:px-10 sm:py-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 text-white font-bold text-base sm:text-lg tracking-wide uppercase shadow-[0_0_40px_-5px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_-5px_rgba(16,185,129,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-emerald-300/40"
          >
            <span className="flex items-center gap-3">
              <span>Quero desinflamar meus hábitos e recuperar meu equilíbrio</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
