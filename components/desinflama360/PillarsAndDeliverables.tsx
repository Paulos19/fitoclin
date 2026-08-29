"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Salad,
  Footprints,
  HeartHandshake,
  Sparkle,
  FileCheck2,
  CalendarDays,
  Target,
  Video,
  Users,
  Compass,
  CheckSquare,
  Headphones,
  Trophy,
  Gift,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface PillarsAndDeliverablesProps {
  checkoutUrl: string;
}

export default function PillarsAndDeliverables({ checkoutUrl }: PillarsAndDeliverablesProps) {
  const pillars = [
    {
      icon: Leaf,
      name: "Plantas Medicinais",
      desc: "Uso seguro, consciente e baseado em evidências científicas para regular sono, digestão e inflamação.",
      color: "from-emerald-600/30 to-emerald-950/40",
      border: "border-emerald-500/40",
      iconColor: "text-emerald-400",
      emoji: "🌿",
    },
    {
      icon: Salad,
      name: "Alimentação Inteligente",
      desc: "Estratégia anti-inflamatória prática, saborosa e sem restrições extremas ou contagem de calorias.",
      color: "from-teal-600/30 to-emerald-950/40",
      border: "border-teal-500/40",
      iconColor: "text-teal-400",
      emoji: "🥗",
    },
    {
      icon: Footprints,
      name: "Movimento",
      desc: "Atividade física possível dentro da sua rotina real para oxigenar o corpo e ativar sua energia.",
      color: "from-amber-600/30 to-emerald-950/40",
      border: "border-amber-500/40",
      iconColor: "text-amber-400",
      emoji: "🚶",
    },
    {
      icon: HeartHandshake,
      name: "Motivação",
      desc: "Apoio emocional e comportamental contínuo para vencer a autossabotagem e manter a constância.",
      color: "from-rose-600/30 to-emerald-950/40",
      border: "border-rose-500/40",
      iconColor: "text-rose-400",
      emoji: "💚",
    },
    {
      icon: Sparkle,
      name: "Fé",
      desc: "Alinhamento espiritual, propósito e serenidade interior como alicerces de cura e perseverança.",
      color: "from-cyan-600/30 to-emerald-950/40",
      border: "border-cyan-500/40",
      iconColor: "text-cyan-400",
      emoji: "🙏",
    },
  ];

  const deliverables = [
    {
      icon: FileCheck2,
      title: "Mapa FITOCLIN 360 + Prescrição de Fitoterápicos Personalizada",
      desc: "Avaliação do seu perfil de saúde com prescrição elaborada pela Dra. Isa Bieski.",
      highlight: true,
    },
    {
      icon: CalendarDays,
      title: "3 Ciclos de Implementação Estruturados",
      desc: "Metodologia em blocos de 2 meses para aprender, aplicar e consolidar seus hábitos.",
    },
    {
      icon: Target,
      title: "3 Desafios de 21 Dias",
      desc: "Passo a passo diário e prático para virar a chave sem sobrecarga.",
    },
    {
      icon: Video,
      title: "6 Encontros Mensais ao Vivo com a Dra. Isa",
      desc: "Tire dúvidas coletivas, receba orientações diretas e celebre sua evolução.",
    },
    {
      icon: Users,
      title: "6 Meses de Comunidade Exclusiva de Alunas",
      desc: "Ambiente seguro, acolhedor e motivador para você nunca se sentir sozinha.",
    },
    {
      icon: Compass,
      title: "Rota de Autocuidado 360",
      desc: "Guia passo a passo com o direcionamento exato do que priorizar a cada semana.",
    },
    {
      icon: CheckSquare,
      title: "Metas e Check-ins Semanais",
      desc: "Acompanhamento estruturado para manter sua disciplina e ritmo constante.",
    },
    {
      icon: Headphones,
      title: "Pílulas Auditivas Aceleradoras",
      desc: "Áudios curtos de apoio rápido para momentos de ansiedade, cansaço e desânimo.",
    },
    {
      icon: Trophy,
      title: "Gamificação e Premiações por Constância",
      desc: "Acumule Folhas da Transformação e receba consultorias, e-books e presentes.",
    },
    {
      icon: Gift,
      title: "3 Bônus Especiais Inclusos",
      desc: "Guia dos 30 Chás, Cozinha Desinflama 360 e Biblioteca de Áudios.",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#020e07] via-[#03150c] to-[#020e07] text-white overflow-hidden border-t border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span>Conteúdo Completo & Estrutura</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight uppercase">
            VEJA TUDO O QUE VOCÊ TERÁ ACESSO:
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/80 font-light leading-relaxed">
            O <strong className="text-white font-semibold">Clube Desinflama 360</strong> é uma jornada prática de seis meses para ajudar você a desinflamar hábitos, recuperar o equilíbrio e construir uma rotina mais saudável por meio dos cinco pilares do <strong className="text-emerald-300">Método FITOCLIN®</strong>.
          </p>
        </div>

        {/* Os 5 Pilares */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
              O Alicerce da Metodologia
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Os Cinco Pilares do Método FITOCLIN®
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`rounded-2xl p-6 bg-gradient-to-b ${pillar.color} border ${pillar.border} backdrop-blur-sm flex flex-col items-center text-center group hover:-translate-y-1.5 transition-all duration-300 shadow-lg`}
                >
                  <div className="text-3xl mb-3">{pillar.emoji}</div>
                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {pillar.name}
                  </h4>
                  <p className="text-xs text-emerald-100/70 leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Você Receberá (Grid de Entregáveis) */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
              Entrega Completa de 6 Meses
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Você Receberá em Sua Área de Membros:
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {deliverables.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`p-5 sm:p-6 rounded-2xl border flex items-start gap-4 transition-all duration-300 ${
                    item.highlight
                      ? "bg-gradient-to-r from-emerald-950/90 via-[#032314] to-emerald-950/70 border-emerald-400 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]"
                      : "bg-[#03150c]/80 border-emerald-500/20 hover:border-emerald-500/40 hover:bg-[#041c10]"
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      item.highlight
                        ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/30"
                        : "bg-emerald-950/80 border border-emerald-500/30 text-emerald-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4
                      className={`text-base font-bold mb-1 ${
                        item.highlight ? "text-emerald-200" : "text-white"
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Botão de Ação */}
        <div className="flex justify-center">
          <a
            href={checkoutUrl}
            className="group relative inline-flex items-center justify-center px-10 py-5 sm:px-12 sm:py-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 text-white font-bold text-lg sm:text-xl tracking-wider uppercase shadow-[0_0_40px_-5px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_-5px_rgba(16,185,129,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-emerald-300/40"
          >
            <span className="flex items-center gap-3">
              <span>QUERO PARTICIPAR DO CLUBE</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
