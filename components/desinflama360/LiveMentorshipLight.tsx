"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Video,
  CalendarCheck,
  HelpCircle,
  Sparkles,
  Target,
  Award,
  CheckCircle2,
  Radio,
} from "lucide-react";
import ThreeGlassCard from "./three/ThreeGlassCard";

export default function LiveMentorshipLight() {
  const meetingItems = [
    {
      icon: Target,
      title: "Compreender o Tema Central do Mês",
      desc: "Imersão profunda na temática específica para direcionar seus esforços com máxima clareza.",
    },
    {
      icon: Sparkles,
      title: "Aplicar os 5 Pilares no Dia a Dia",
      desc: "Orientações práticas de como encaixar plantas medicinais, alimentação, movimento, motivação e fé na sua rotina real.",
    },
    {
      icon: CheckCircle2,
      title: "Corrigir os Principais Erros",
      desc: "Identifique rapidamente ajustes finos para não perder tempo com hábitos que travam seu metabolismo.",
    },
    {
      icon: HelpCircle,
      title: "Apresentar Dúvidas Coletivas",
      desc: "Momento exclusivo para responder às maiores perguntas e desafios enfrentados pelas participantes.",
    },
    {
      icon: CalendarCheck,
      title: "Conhecer a Missão Mensal",
      desc: "Receba tarefas claras e focadas para dar o próximo passo com segurança e determinação.",
    },
    {
      icon: Award,
      title: "Celebrar a Evolução & Preparar o Futuro",
      desc: "Reconhecimento das suas vitórias e alinhamento do próximo ciclo de saúde e rejuvenescimento.",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 text-[#0f2417] overflow-hidden">
      {/* Luz ambiente botânica */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-200/40 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-100/40 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Coluna Esquerda: Texto Principal */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-300/80 shadow-xs text-emerald-950 text-xs sm:text-sm font-semibold uppercase tracking-wider"
            >
              <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>Acompanhamento Próximo</span>
            </motion.div>

            {/* MANTER/INSERIR EXATO */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-[#0d2618] tracking-tight leading-tight uppercase"
            >
              SEIS ENCONTROS AO VIVO PARA ORIENTAR SUA EVOLUÇÃO
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base sm:text-lg text-[#324f3e] leading-relaxed font-normal"
            >
              Você não estará sozinha. A cada mês, você terá um encontro ao vivo e direto com a <strong className="text-emerald-950 font-bold">Dra. Isa Bieski</strong> para calibrar sua conduta, tirar dúvidas e consolidar cada ciclo de transformação.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-emerald-200/80 shadow-xs flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-800 flex items-center justify-center shrink-0">
                <Video className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0d2618]">
                  Gravações Disponíveis 24h por dia
                </h4>
                <p className="text-xs text-[#385544] mt-0.5">
                  Não pôde participar ao vivo? Todos os encontros são gravados e disponibilizados na íntegra na área de membros.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Coluna Direita: Grid dos 6 Tópicos dos Encontros em Side a Side */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
            {meetingItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <ThreeGlassCard
                    intensity={10}
                    gradientAccent="from-emerald-500/15 via-amber-400/10 to-transparent"
                    className="p-5 h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-700 mb-3 shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-[#0d2618] mb-1.5 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#385544] leading-relaxed">
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
