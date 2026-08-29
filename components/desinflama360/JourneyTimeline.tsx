"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Compass,
  CheckCircle2,
  Sparkles,
  Flame,
  Moon,
  Zap,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface JourneyTimelineProps {
  checkoutUrl: string;
}

export default function JourneyTimeline({ checkoutUrl }: JourneyTimelineProps) {
  const cycles = [
    {
      number: "01",
      months: "Meses 1 e 2",
      title: "Desinflame de Dentro para Fora",
      subtitle: "A base de tudo: restaurando o intestino e o equilíbrio celular",
      intro: "Nos dois primeiros meses, você começará pela base sólida da saúde.",
      color: "from-emerald-500/20 via-[#031c10] to-[#021109]",
      accentBorder: "border-emerald-500/40",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      icon: Flame,
      foci: [
        "Intestino e microbiota saudável",
        "Alimentação inteligente anti-inflamatória",
        "Hidratação correta e otimização hídrica",
        "Rotina estratégica de chás medicinais",
        "Organização alimentar no dia a dia",
        "Hábitos que favorecem o equilíbrio do organismo",
      ],
      challengeTitle: "Desafio Desinflama 21 Dias",
      challengeDesc:
        "Durante 21 dias, você receberá pequenas ações diárias e práticas para começar a transformar sua rotina de maneira viável e sem sobrecarga.",
      challengeTag: "Desafio Prático #1",
    },
    {
      number: "02",
      months: "Meses 3 e 4",
      title: "Mente Serena e Sono Restaurador",
      subtitle: "Cuidando das emoções, da mente e da arquitetura do sono",
      intro: "Nos meses três e quatro, o cuidado será direcionado à mente, ao sono e à organização da rotina noturna.",
      color: "from-indigo-500/20 via-[#03151c] to-[#021109]",
      accentBorder: "border-indigo-500/40",
      badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      icon: Moon,
      foci: [
        "Qualidade e profundidade do sono",
        "Redução do estresse e cortisol",
        "Manejo da ansiedade diária",
        "Fortalecimento da Fé e propósito",
        "Motivação e acolhimento emocional",
        "Estratégias contra a autossabotagem",
        "Ritual e higiene da rotina noturna",
      ],
      challengeTitle: "Desafio Mente Serena 21 Dias",
      challengeDesc:
        "Uma sequência de práticas para desenvolver serenidade, melhorar a organização noturna e recuperar a constância nas noites de sono reparador.",
      challengeTag: "Desafio Prático #2",
    },
    {
      number: "03",
      months: "Meses 5 e 6",
      title: "Energia, Movimento e Vitalidade",
      subtitle: "Consolidação dos hábitos, disposição duradoura e liberdade",
      intro: "Nos dois últimos meses, o foco será consolidar os hábitos e construir uma rotina com mais movimento e disposição.",
      color: "from-amber-500/20 via-[#1c1803]/40 to-[#021109]",
      accentBorder: "border-amber-500/40",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      icon: Zap,
      foci: [
        "Movimento possível e prazeroso",
        "Ativação da energia e vitalidade",
        "Fim do cansaço e da moleza diária",
        "Ferramentas práticas contra a procrastinação",
        "Constância inabalável a longo prazo",
        "Manutenção sustentável dos hábitos",
        "Prevenção do abandono e do efeito rebote",
      ],
      challengeTitle: "Desafio Energia em Movimento 21 Dias",
      challengeDesc:
        "Uma jornada progressiva para incorporar o movimento físico dentro da sua realidade, sem exigir horas de academia ou metas inatingíveis.",
      challengeTag: "Desafio Prático #3",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-[#020e07] text-white overflow-hidden border-t border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 5. Apresentação da Jornada */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Estrutura Pedagógica de 6 Meses</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight uppercase">
            UMA JORNADA COM COMEÇO, DIREÇÃO E CONTINUIDADE
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/80 font-light leading-relaxed">
            O Clube será organizado em <strong className="text-white font-medium">três ciclos de dois meses</strong>. Em cada ciclo, você irá <span className="text-emerald-300 font-semibold">aprender</span>, <span className="text-emerald-300 font-semibold">aplicar</span> e <span className="text-emerald-300 font-semibold">consolidar</span> uma nova etapa do seu autocuidado.
          </p>
        </div>

        {/* 6, 7 e 8: Cards dos Ciclos */}
        <div className="space-y-12 mb-16">
          {cycles.map((cycle, index) => {
            const CycleIcon = cycle.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-3xl p-6 sm:p-10 bg-gradient-to-b ${cycle.color} border ${cycle.accentBorder} shadow-2xl backdrop-blur-md overflow-hidden`}
              >
                {/* Destaque numérico de fundo */}
                <span className="absolute -top-6 -right-4 font-serif font-extrabold text-8xl sm:text-9xl text-white/5 pointer-events-none select-none">
                  {cycle.number}
                </span>

                <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-start">
                  {/* Coluna Esquerda: Cabeçalho do Ciclo */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${cycle.badgeColor}`}>
                          Ciclo {cycle.number} • {cycle.months}
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                          <CycleIcon className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2 leading-tight">
                        {cycle.title}
                      </h3>

                      <p className="text-sm text-emerald-300/90 font-medium mb-4">
                        {cycle.subtitle}
                      </p>

                      <p className="text-sm text-emerald-100/70 font-light leading-relaxed mb-6">
                        {cycle.intro}
                      </p>
                    </div>

                    {/* Desafio de 21 Dias deste Ciclo */}
                    <div className="p-5 rounded-2xl bg-[#020e07]/90 border border-amber-500/30 shadow-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                          {cycle.challengeTag}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-1">
                        {cycle.challengeTitle}
                      </h4>
                      <p className="text-xs text-emerald-100/80 font-light leading-relaxed">
                        {cycle.challengeDesc}
                      </p>
                    </div>
                  </div>

                  {/* Coluna Direita: Focos do Ciclo */}
                  <div className="lg:col-span-7 bg-[#020d07]/60 rounded-2xl p-6 sm:p-8 border border-white/10">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>O que você vai dominar neste ciclo:</span>
                    </h4>

                    <div className="grid sm:grid-cols-2 gap-3.5">
                      {cycle.foci.map((focus, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/30 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-emerald-100/90 font-medium">
                            {focus}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Intermediário */}
        <div className="flex justify-center">
          <a
            href={checkoutUrl}
            className="group relative inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 text-white font-bold text-base sm:text-lg tracking-wide uppercase shadow-[0_0_40px_-5px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-emerald-300/40"
          >
            <span className="flex items-center gap-3">
              <span>Quero viver essa jornada de 6 meses</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
