"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Compass,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Flame,
  Award,
} from "lucide-react";
import ThreeGlassCard from "./three/ThreeGlassCard";
import ThreeGlassButton from "./three/ThreeGlassButton";

interface JourneyCyclesSectionProps {
  checkoutUrl: string;
}

export default function JourneyCyclesSection({ checkoutUrl }: JourneyCyclesSectionProps) {
  const cycles = [
    {
      cycle: "Ciclo 01 • Meses 1 e 2",
      stage: "APRENDER & DESPERTAR",
      title: "Desinflamação Inicial e Sono Reparador",
      desc: "Neste primeiro ciclo você aprende a identificar o que realmente inflama o seu organismo. Recebe sua prescrição personalizada de fitoterápicos, desincha o corpo e conquista as primeiras noites de sono contínuo.",
      challenge: "Desafio 21 Dias: Despertar Metabólico",
      items: [
        "Preenchimento do Mapa Metabólico",
        "Prescrição fitoterápica individual",
        "Regulação do intestino e alívio do inchaço",
        "Higiene do sono e primeiros chás noturnos",
      ],
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-200",
    },
    {
      cycle: "Ciclo 02 • Meses 3 e 4",
      stage: "APLICAR & FORTALECER",
      title: "Rotina Anti-inflamatória e Vitalidade Diária",
      desc: "Com o corpo menos inflamado, você aplica mudanças práticas sem radicalismos. Fortalece o metabolismo, queima gordura acumulada, reduz a ansiedade e adquire disposição real do acordar ao dormir.",
      challenge: "Desafio 21 Dias: Energia e Movimento Possível",
      items: [
        "Alimentação inteligente sem passar fome",
        "Modulação de ansiedade e compulsão",
        "Movimento suave adaptado à sua rotina",
        "Reavaliação e rota de manutenção metabólica",
      ],
      gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
      badgeBg: "bg-amber-100 text-amber-900 border-amber-200",
    },
    {
      cycle: "Ciclo 03 • Meses 5 e 6",
      stage: "CONSOLIDAR & PERDURAR",
      title: "Autonomia, Longevidade e Blindagem 360",
      desc: "A etapa onde os resultados viram o seu novo estilo de vida. Você consolida seus hábitos, aprende a manter sua saúde sem depender de remédios e garante décadas a mais de vida com energia e bem-estar.",
      challenge: "Desafio 21 Dias: Autonomia Fitoterápica",
      items: [
        "Domínio das plantas medicinais no dia a dia",
        "Imunidade blindada e prevenção ativa",
        "Autonomia para viver sem dor e sem medo",
        "Premiação da Jornada das Folhas",
      ],
      gradient: "from-teal-500/20 via-emerald-600/10 to-transparent",
      badgeBg: "bg-teal-100 text-teal-900 border-teal-200",
    },
  ];

  return (
    <section
      id="jornada"
      className="relative py-20 md:py-28 text-[#0f2417] overflow-hidden"
    >
      {/* Luz ambiente de profundidade botânica */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-gradient-to-r from-emerald-100/50 via-amber-100/40 to-teal-100/30 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho da Quarta Seção com a Nova Copy */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-300/80 shadow-xs text-emerald-950 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4"
          >
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Estrutura dos 6 Meses</span>
          </motion.div>

          {/* TÍTULO EXATO */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#0d2618] tracking-tight leading-tight uppercase"
          >
            UMA JORNADA COM COMEÇO, DIREÇÃO E CONTINUIDADE
          </motion.h2>

          {/* TEXTO EXATO: Parágrafo 1 e Parágrafo 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 space-y-3 max-w-3xl mx-auto"
          >
            <p className="text-lg sm:text-xl text-emerald-950 font-bold leading-relaxed">
              Comece uma jornada de 6 meses que te dará décadas a mais na sua vida.
            </p>
            <p className="text-base sm:text-lg text-[#324f3e] font-normal leading-relaxed">
              O Clube será organizado em três ciclos de dois meses. Em cada ciclo, você irá aprender, aplicar e consolidar uma nova etapa do seu autocuidado.
            </p>
          </motion.div>
        </div>

        {/* Grid dos 3 Ciclos em Cards 3D de Vidro Botânico */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {cycles.map((c, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
            >
              <ThreeGlassCard
                intensity={14}
                gradientAccent={c.gradient}
                className="p-6 sm:p-8 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs ${c.badgeBg}`}>
                      {c.cycle}
                    </span>
                    <span className="text-xs font-bold uppercase text-[#42604e]">
                      {c.stage}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0d2618] mb-3 leading-snug">
                    {c.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#385544] leading-relaxed mb-6">
                    {c.desc}
                  </p>

                  {/* Desafio de 21 Dias */}
                  <div className="p-3.5 rounded-2xl bg-white/80 border border-emerald-100 shadow-2xs mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Flame className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#4f705c] block">
                        Ação Direcionada
                      </span>
                      <span className="text-xs font-bold text-[#0d2618]">
                        {c.challenge}
                      </span>
                    </div>
                  </div>

                  {/* Lista de Entregas do Ciclo */}
                  <div className="space-y-2.5">
                    {c.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-2.5 text-xs text-[#2c4736]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-emerald-100 flex items-center justify-between text-xs font-semibold text-emerald-900">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    2 Meses de Imersão Prática
                  </span>
                  <Award className="w-4 h-4 text-emerald-600" />
                </div>
              </ThreeGlassCard>
            </motion.div>
          ))}
        </div>

        {/* Botão de Inscrição */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <ThreeGlassButton href={checkoutUrl} variant="primary">
            QUERO ENTRAR NESSA JORNADA DE 6 MESES
          </ThreeGlassButton>
        </motion.div>
      </div>
    </section>
  );
}
