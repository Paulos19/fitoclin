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
} from "lucide-react";

interface PromoHowToParticipateProps {
  whatsappUrl: string;
}

export default function PromoHowToParticipate({ whatsappUrl }: PromoHowToParticipateProps) {
  const steps = [
    {
      num: "1",
      title: "Entre gratuitamente no grupo do WhatsApp",
      desc: "Clique no botão abaixo para ingressar no nosso grupo VIP oficial e silencioso.",
      icon: MessageCircle,
    },
    {
      num: "2",
      title: "Receba seu e-book especial sobre chás",
      desc: "Assim que entrar, garanta o seu presente digital gratuito com o guia de preparo e funções.",
      icon: Gift,
    },
    {
      num: "3",
      title: "Aguarde a abertura no dia 10 de setembro",
      desc: "Fique atenta às mensagens e lembretes para não perder o horário de liberação das vagas.",
      icon: Calendar,
    },
    {
      num: "4",
      title: "Conheça a condição especial e os bônus do Clube",
      desc: "Aproveite o desconto inédito de 30% a 50% reservado apenas para quem estiver no grupo.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#020e07] via-[#041a10] to-[#020d06] text-white overflow-hidden border-t border-emerald-900/30">
      {/* Luz ambiente */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Passo a Passo Simples</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase">
            COMO PARTICIPAR
          </h2>

          <p className="mt-3 text-base sm:text-lg text-emerald-100/80 font-light">
            Siga os 4 passos abaixo para garantir seu e-book e ter acesso prioritário à condição especial:
          </p>
        </div>

        {/* Grid dos 4 Passos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative rounded-2xl bg-gradient-to-b from-[#031d10] to-[#021008] border border-emerald-500/30 p-5 flex flex-col justify-between hover:border-emerald-400/60 transition-all shadow-lg group"
              >
                {/* Número do Passo em Destaque */}
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-serif font-black text-lg flex items-center justify-center shadow-md">
                    {step.num}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-emerald-200/70 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Etapa {step.num}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Box Central com Data & Botão */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-emerald-950 via-[#042415] to-emerald-950 border-2 border-emerald-400/40 p-6 sm:p-10 text-center shadow-2xl max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-extrabold text-xs sm:text-sm uppercase tracking-widest mb-3">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>10 DE SETEMBRO</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2">
            SOMENTE NO GRUPO DO WHATSAPP
          </h3>

          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-lg mx-auto mb-6">
            O link promocional com o desconto de 30% a 50% será enviado exclusivamente dentro do grupo.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center w-full max-w-2xl px-6 py-4 sm:px-8 sm:py-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm sm:text-base md:text-lg tracking-wide uppercase shadow-[0_0_40px_-5px_rgba(16,185,129,0.6)] hover:shadow-[0_0_50px_-5px_rgba(16,185,129,0.9)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-emerald-300/40 text-center leading-snug"
          >
            <span className="flex items-center justify-center gap-2.5">
              <MessageCircle className="w-5 h-5 fill-white shrink-0" />
              <span>ENTRE NO GRUPO PARA RECEBER A CONDIÇÃO ESPECIAL E AINDA GANHAR O E-BOOK DE CHÁS COMO PRESENTE</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
            </span>
          </a>
        </motion.div>

        {/* Aviso Educativo Obrigatório */}
        <div className="mt-10 text-center text-xs text-emerald-300/70 max-w-2xl mx-auto flex items-start justify-center gap-2 bg-[#02120a] border border-emerald-500/20 p-4 rounded-2xl">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-left">
            <strong>Aviso:</strong> o conteúdo possui finalidade educativa. O uso de plantas medicinais deve considerar condições individuais, medicamentos em uso, contraindicações e orientação profissional.
          </p>
        </div>
      </div>
    </section>
  );
}
