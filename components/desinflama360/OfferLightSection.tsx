"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  CreditCard,
  QrCode,
  Clock,
  Flame,
} from "lucide-react";
import ThreeGlassButton from "./three/ThreeGlassButton";

interface OfferLightSectionProps {
  checkoutUrl: string;
}

export default function OfferLightSection({ checkoutUrl }: OfferLightSectionProps) {
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
      className="relative py-20 md:py-28 text-[#0f2417] overflow-hidden"
    >
      {/* Luz ambiente forte na oferta em verde e dourado */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-r from-emerald-300/30 via-amber-200/30 to-teal-200/30 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header da Oferta */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-900 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <Flame className="w-4 h-4 text-amber-600" />
            <span>Condição Especial de Inscrição</span>
          </div>

          {/* TÍTULO EXATO */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#0d2618] tracking-tight leading-tight uppercase">
            COMECE AGORA SUA JORNADA DESINFLAMA 360
          </h2>

          {/* CÓPIAS DE ANCORAGEM EXATAS FORNECIDAS */}
          <div className="mt-5 space-y-2 max-w-2xl mx-auto">
            <p className="text-base sm:text-lg text-[#324f3e] font-normal leading-relaxed">
              Um tratamento como esse pode custar mais de 2 mil reais.
            </p>
            <p className="text-lg sm:text-xl font-bold text-emerald-950 leading-relaxed">
              Mas aqui você tem acesso aos mesmos resultados por menos da metade desse valor.
            </p>
          </div>

          {/* Temporizador de Urgência Suave */}
          <div className="mt-6 inline-flex items-center gap-2 bg-white/90 border border-emerald-200/80 rounded-2xl px-5 py-2.5 shadow-xs backdrop-blur-md">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-[#385544] font-medium">Condição por tempo limitado expira em:</span>
            <div className="flex items-center gap-1 font-mono font-bold text-emerald-900 text-sm">
              <span>{String(timeLeft.hours).padStart(2, "0")}h</span>:
              <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>:
              <span>{String(timeLeft.seconds).padStart(2, "0")}s</span>
            </div>
          </div>
        </div>

        {/* Box da Oferta Premium em Glassmorphism Botânico */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden bg-white/80 backdrop-blur-2xl border-2 border-emerald-300/80 shadow-[0_30px_70px_-15px_rgba(16,185,129,0.2)] p-6 sm:p-10 lg:p-12"
        >
          {/* Faixa Superior Dourada */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 via-amber-400 to-emerald-500 text-emerald-950 font-black text-xs uppercase tracking-widest py-1.5 px-6 rounded-bl-2xl shadow-xs">
            Acesso Completo 6 Meses
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Coluna Esquerda: O que está garantido */}
            <div className="lg:col-span-7 space-y-3.5">
              <h3 className="text-xl font-bold text-[#0d2618] mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Tudo o que está incluso para você:</span>
              </h3>

              <div className="space-y-2.5">
                {offerIncluded.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#385544] leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna Direita: Box de Preço & Checkout Hotmart */}
            <div className="lg:col-span-5 bg-gradient-to-b from-emerald-50/80 via-white to-amber-50/40 rounded-2xl p-6 sm:p-8 border border-emerald-200/90 flex flex-col items-center text-center shadow-xs">
              <span className="text-xs text-emerald-800 uppercase font-extrabold tracking-widest mb-1">
                Investimento Promocional
              </span>

              <h4 className="text-xl sm:text-2xl font-serif font-black text-[#0d2618] uppercase tracking-tight mt-1">
                CLUBE DESINFLAMA 360
              </h4>
              <p className="text-[11px] text-[#4f705c] uppercase tracking-wider font-semibold mt-0.5 mb-3">
                Autor: INSTITUTO ISA
              </p>

              {/* De */}
              <div className="text-sm text-[#7a9985] line-through mb-1.5 font-medium">
                De R$ 997,00
              </div>

              {/* Por */}
              <div className="mb-2">
                <span className="text-xs text-[#385544] block font-medium">
                  Por apenas
                </span>
                <div className="flex items-baseline justify-center gap-1 mt-1">
                  <span className="text-base sm:text-lg font-bold text-emerald-900">12x de</span>
                  <span className="text-xl font-bold text-emerald-600">R$</span>
                  <span className="text-4xl sm:text-5xl font-extrabold font-serif text-[#0d2618] tracking-tight">
                    61,74
                  </span>
                  <span className="text-lg font-bold text-amber-500 ml-0.5">*</span>
                </div>
                <span className="text-xs sm:text-sm text-[#385544] font-medium block mt-1.5">
                  Ou <strong className="text-emerald-950 font-bold">R$ 597,00</strong> à vista
                </span>
              </div>

              <div className="w-full my-6 border-t border-emerald-100" />

              {/* Botão de Compra com Estilo 3D de Vidro Botânico */}
              <ThreeGlassButton
                href={checkoutUrl}
                variant="primary"
                className="w-full text-center text-sm sm:text-base py-4"
              >
                QUERO ENTRAR PARA O CLUBE
              </ThreeGlassButton>

              {/* Texto abaixo do botão */}
              <p className="mt-4 text-xs text-[#42604e] flex items-center justify-center gap-1.5 font-medium">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Compra 100% segura com acesso imediato.</span>
              </p>

              {/* Formas de pagamento */}
              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-[#4f705c]">
                <span className="flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-600" /> Cartão de Crédito
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5 text-emerald-600" /> Pix Imediato
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
