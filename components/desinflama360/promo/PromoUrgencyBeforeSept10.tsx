"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Clock,
  MessageCircle,
  Gift,
  ArrowRight,
  ShieldCheck,
  Calendar,
  ExternalLink,
} from "lucide-react";

interface PromoUrgencyBeforeSept10Props {
  whatsappUrl: string;
  checkoutUrl: string;
}

export default function PromoUrgencyBeforeSept10({
  whatsappUrl,
  checkoutUrl,
}: PromoUrgencyBeforeSept10Props) {
  // Timer de Contagem Regressiva para 17 de Setembro
  const [timeLeft, setTimeLeft] = useState({
    days: 8,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    // Alvo: 17 de Setembro
    const targetDate = new Date("2026-09-17T08:00:00-03:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 md:py-28 bg-[#F6F8F7] text-neutral-900 overflow-hidden border-t border-b border-neutral-200/80">
      {/* Luz ambiente dourada/esmeralda sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Tag Superior */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/90 text-amber-900 text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-6 shadow-sm"
        >
          <Flame className="w-4 h-4 text-amber-600 fill-amber-600" />
          <span>ANTES DO DIA 17</span>
        </motion.div>

        {/* Headline Principal de Urgência */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0A1C12] tracking-tight leading-[1.12] uppercase mb-6"
        >
          DEPOIS QUE PASSAR, NÃO ADIANTA{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700">
            DESCOBRIR A OFERTA
          </span>
        </motion.h2>

        {/* Textos de Apoio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 text-base sm:text-lg md:text-xl text-neutral-600 font-normal max-w-2xl mx-auto leading-relaxed mb-10"
        >
          <p>
            Se você já estava pensando em cuidar do intestino, melhorar o sono, recuperar a disposição e transformar os hábitos que podem estar prejudicando seu corpo, este é o momento de entrar no grupo e acompanhar a abertura de perto.
          </p>
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-sm sm:text-base text-emerald-950 font-medium">
            Ao entrar gratuitamente, você já garante um e-book especial sobre chás, com suas funções, formas corretas de preparo e cuidados importantes para o uso consciente.
          </div>
        </motion.div>

        {/* Cronômetro Visual para 17 de Setembro estilo cartão métrico limpo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex flex-col items-center p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.07)] mb-10 max-w-xl w-full"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-800 font-bold mb-4 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200/70">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span>17 DE SETEMBRO • SOMENTE PELO WHATSAPP</span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center w-full">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F9FAF9] border border-neutral-200/80">
              <span className="font-mono text-3xl sm:text-5xl font-black text-amber-600 block">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-500 uppercase font-semibold">Dias</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F9FAF9] border border-neutral-200/80">
              <span className="font-mono text-3xl sm:text-5xl font-black text-[#0A1C12] block">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-500 uppercase font-semibold">Horas</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F9FAF9] border border-neutral-200/80">
              <span className="font-mono text-3xl sm:text-5xl font-black text-[#0A1C12] block">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-500 uppercase font-semibold">Min</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F9FAF9] border border-neutral-200/80">
              <span className="font-mono text-3xl sm:text-5xl font-black text-emerald-700 block">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-500 uppercase font-semibold">Seg</span>
            </div>
          </div>
        </motion.div>

        {/* Botão Final Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center w-full max-w-2xl px-6 py-4 sm:px-8 sm:py-5 rounded-2xl bg-[#0A1C12] hover:bg-[#064E3B] text-white font-black text-xs sm:text-sm md:text-base tracking-wide uppercase shadow-[0_15px_35px_-10px_rgba(10,28,18,0.35)] hover:shadow-[0_20px_45px_-10px_rgba(6,78,59,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 border border-emerald-900/30 text-center leading-snug"
          >
            <span className="flex items-center justify-center gap-3 text-center">
              <MessageCircle className="w-5 h-5 fill-white shrink-0" />
              <span>ENTRE NO GRUPO PARA RECEBER A CONDIÇÃO ESPECIAL E AINDA GANHAR O E-BOOK DE CHÁS COMO PRESENTE</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform shrink-0" />
            </span>
          </a>

          <p className="mt-4 text-xs sm:text-sm text-neutral-600 font-medium flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-600" />
            <span>Acesso 100% gratuito ao grupo e download do e-book imediato</span>
          </p>

          {/* Link Alternativo para Compra Direta na Hotmart */}
          <div className="mt-8 pt-6 border-t border-neutral-200/80 w-full max-w-md">
            <p className="text-xs text-neutral-500 mb-2">
              Deseja entrar diretamente no Clube Desinflama 360 hoje mesmo?
            </p>
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-4 transition-colors"
            >
              <span>Acessar inscrição imediata na Hotmart</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
