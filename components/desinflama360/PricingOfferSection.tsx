"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Zap,
  ArrowRight,
  Sparkles,
  CreditCard,
  QrCode,
  Clock,
  Flame,
} from "lucide-react";

interface PricingOfferSectionProps {
  checkoutUrl: string;
}

export default function PricingOfferSection({ checkoutUrl }: PricingOfferSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const offerIncluded = [
    "Acesso Completo por 6 Meses ao Clube Desinflama 360",
    "Mapa FITOCLIN 360 + Prescrição de Fitoterápicos Personalizada",
    "3 Ciclos de Implementação de 2 meses cada",
    "3 Desafios Práticos de 21 Dias com acompanhamento",
    "6 Encontros Mensais ao Vivo com a Dra. Isa Bieski",
    "Gravações de todos os encontros disponíveis na plataforma",
    "Comunidade Exclusiva de Alunas por 6 meses",
    "Acompanhamento com a Psicóloga Luciane",
    "Pílulas Auditivas Aceleradoras (Aperte o Play)",
    "Metas e Check-ins Semanais de Evolução",
    "Jornada das Folhas (Gamificação e Premiações)",
    "BÔNUS 1: Guia FITOCLIN dos 30 Chás",
    "BÔNUS 2: Cozinha Desinflama 360 (Receitas & Substituições)",
    "BÔNUS 3: Biblioteca Completa de Áudios Aceleradores",
  ];

  return (
    <section
      id="oferta"
      className="relative py-20 md:py-28 bg-gradient-to-b from-[#020e07] via-[#041a10] to-[#020d06] text-white overflow-hidden border-t border-emerald-900/30"
    >
      {/* Luz ambiente forte na oferta */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-600/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Condição Especial de Inscrição</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight uppercase">
            COMECE AGORA SUA JORNADA DESINFLAMA 360
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/80 font-light">
            Dê ao seu corpo a direção, o método e o acompanhamento que ele precisa para se regenerar.
          </p>

          {/* Temporizador de Urgência Suave */}
          <div className="mt-6 inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/30 rounded-2xl px-5 py-2.5 backdrop-blur-md">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-emerald-200">Condição por tempo limitado:</span>
            <div className="flex items-center gap-1 font-mono font-bold text-amber-300 text-sm">
              <span>{String(timeLeft.hours).padStart(2, "0")}h</span>:
              <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>:
              <span>{String(timeLeft.seconds).padStart(2, "0")}s</span>
            </div>
          </div>
        </div>

        {/* Box da Oferta Premium */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden bg-[#03180f] border-2 border-emerald-400/50 shadow-[0_0_80px_-20px_rgba(16,185,129,0.4)] p-6 sm:p-10 lg:p-12"
        >
          {/* Faixa Superior */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-emerald-400 text-black font-extrabold text-xs uppercase tracking-widest py-1.5 px-6 rounded-bl-2xl shadow-md">
            Acesso Completo 6 Meses
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Coluna Esquerda: O que está incluso */}
            <div className="lg:col-span-7 space-y-3.5">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>Tudo o que está garantido para você:</span>
              </h3>

              <div className="space-y-2.5">
                {offerIncluded.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-emerald-100/90 font-light">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna Direita: Preço & Botão */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#020f08] to-[#010904] rounded-2xl p-6 sm:p-8 border border-emerald-500/30 flex flex-col items-center text-center shadow-xl">
              <span className="text-xs text-emerald-400/80 uppercase font-semibold tracking-widest mb-1">
                Investimento Promocional
              </span>

              <h4 className="text-xl sm:text-2xl font-serif font-black text-white uppercase tracking-tight mt-1">
                CLUBE DESINFLAMA 360
              </h4>
              <p className="text-xs text-emerald-300/80 uppercase tracking-wider font-semibold mt-0.5 mb-3">
                Autor: INSTITUTO ISA
              </p>

              {/* De */}
              <div className="text-sm text-emerald-400/60 line-through mb-2 font-medium">
                De R$ 797,00
              </div>

              {/* Por */}
              <div className="mb-2">
                <span className="text-xs text-emerald-300 block font-medium">
                  Por apenas
                </span>
                <div className="flex items-baseline justify-center gap-1 mt-1">
                  <span className="text-base sm:text-lg font-bold text-emerald-300">12x de</span>
                  <span className="text-xl font-bold text-emerald-400">R$</span>
                  <span className="text-4xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
                    30,72
                  </span>
                  <span className="text-lg font-bold text-amber-300 ml-0.5">*</span>
                </div>
                <span className="text-xs sm:text-sm text-emerald-200/90 font-medium block mt-1.5">
                  Ou <strong className="text-amber-300 font-bold">R$ 297,00</strong> à vista
                </span>
              </div>

              <div className="w-full my-6 border-t border-emerald-500/20" />

              {/* Botão de Compra */}
              <a
                href={checkoutUrl}
                className="group relative w-full inline-flex items-center justify-center px-6 py-5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 text-white font-bold text-base sm:text-lg tracking-wide uppercase shadow-[0_0_40px_-5px_rgba(16,185,129,0.5)] hover:shadow-[0_0_50px_-5px_rgba(16,185,129,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-emerald-300/40"
              >
                <span className="flex items-center gap-2 text-center">
                  <span>QUERO ENTRAR PARA O CLUBE DESINFLAMA 360</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
                </span>
              </a>

              {/* Texto abaixo do botão */}
              <p className="mt-4 text-xs text-emerald-300/80 flex items-center justify-center gap-1.5 font-medium">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Compra segura e acesso enviado para o e-mail cadastrado.</span>
              </p>

              {/* Formas de pagamento */}
              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-emerald-400/70">
                <span className="flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5" /> Cartão de Crédito
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5" /> Pix Imediato
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
