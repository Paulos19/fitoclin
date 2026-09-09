"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Gift,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";

interface PromoHowToParticipateProps {
  whatsappUrl: string;
}

export default function PromoHowToParticipate({ whatsappUrl }: PromoHowToParticipateProps) {
  const steps = [
    {
      num: "01",
      title: "Entre gratuitamente no grupo do WhatsApp",
      desc: "Clique no botão abaixo para ingressar no nosso grupo VIP oficial e silencioso.",
      icon: MessageCircle,
    },
    {
      num: "02",
      title: "Receba seu e-book especial sobre chás",
      desc: "Assim que entrar, garanta o seu presente digital gratuito com o guia de preparo e funções.",
      icon: Gift,
    },
    {
      num: "03",
      title: "Aguarde a abertura no dia 17 de setembro",
      desc: "Fique atenta às mensagens e lembretes para não perder o horário de liberação das vagas.",
      icon: Calendar,
    },
    {
      num: "04",
      title: "Conheça a condição especial e os bônus do Clube",
      desc: "Aproveite o desconto inédito de 50% reservado apenas para quem estiver no grupo.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-[#F6F8F7] text-neutral-900 overflow-hidden border-t border-neutral-200/80">
      {/* Luz ambiente sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs sm:text-sm font-semibold tracking-wide mb-3.5">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Passo a Passo Simples</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A1C12] tracking-tight leading-tight uppercase">
            COMO PARTICIPAR
          </h2>

          <p className="mt-3 text-base sm:text-lg text-neutral-600 font-normal">
            Siga os 4 passos abaixo para garantir seu e-book e ter acesso prioritário à condição especial:
          </p>
        </div>

        {/* Grid dos 4 Passos Estilo Linha de Processo da Referência */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl bg-white border border-neutral-200/90 p-5 sm:p-6 flex flex-col justify-between hover:border-emerald-500/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Topo com Número e Ícone */}
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-2xl bg-[#0A1C12] text-white font-mono font-black text-sm flex items-center justify-center shadow-sm">
                    {step.num}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-[#0A1C12] mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-600 font-normal leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-emerald-800 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Etapa {step.num}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-700 transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Box Central com Data & Botão em Contraste Nobre */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-[#0A1C12] text-white border border-emerald-900/40 p-6 sm:p-10 text-center shadow-2xl max-w-3xl mx-auto relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-neutral-950 font-black text-xs sm:text-sm uppercase tracking-widest mb-4 shadow-sm">
              <Calendar className="w-4 h-4 text-neutral-950" />
              <span>17 DE SETEMBRO</span>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">
              SOMENTE NO GRUPO DO WHATSAPP
            </h3>

            <p className="text-xs sm:text-sm text-emerald-200/90 max-w-lg mx-auto mb-8 font-light">
              O link promocional com o desconto de 50% será enviado exclusivamente dentro do grupo.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center w-full max-w-2xl px-6 py-4 sm:px-8 sm:py-5 rounded-2xl bg-white hover:bg-emerald-50 text-[#0A1C12] font-black text-xs sm:text-sm md:text-base tracking-wide uppercase shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 border border-neutral-200 text-center leading-snug"
            >
              <span className="flex items-center justify-center gap-2.5">
                <MessageCircle className="w-5 h-5 fill-[#0A1C12] shrink-0" />
                <span>ENTRE NO GRUPO PARA RECEBER A CONDIÇÃO ESPECIAL E AINDA GANHAR O E-BOOK DE CHÁS COMO PRESENTE</span>
                <ArrowRight className="w-5 h-5 text-emerald-800 group-hover:translate-x-1 transition-transform shrink-0" />
              </span>
            </a>
          </div>
        </motion.div>

        {/* Aviso Educativo Obrigatório */}
        <div className="mt-10 text-center text-xs text-neutral-500 max-w-2xl mx-auto flex items-start justify-center gap-2 bg-white border border-neutral-200/80 p-4 rounded-2xl shadow-sm">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-left leading-relaxed">
            <strong className="text-neutral-700">Aviso:</strong> o conteúdo possui finalidade educativa. O uso de plantas medicinais deve considerar condições individuais, medicamentos em uso, contraindicações e orientação profissional.
          </p>
        </div>
      </div>
    </section>
  );
}
