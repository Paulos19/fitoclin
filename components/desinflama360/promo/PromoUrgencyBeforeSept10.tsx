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
  AlertCircle,
  Calendar,
  Lock,
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
  // Timer de Contagem Regressiva para 10 de Setembro
  const [timeLeft, setTimeLeft] = useState({
    days: 8,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    // Alvo: 10 de Setembro
    const targetDate = new Date("2026-09-10T08:00:00-03:00").getTime();

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
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-[#020e07] via-[#052112] to-[#010904] text-white overflow-hidden border-t border-emerald-900/40">
      {/* Luz ambiente dourada/esmeralda */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-emerald-600/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Tag Superior */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-6"
        >
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>ANTES DO DIA 10</span>
        </motion.div>

        {/* Headline Principal de Urgência */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] uppercase mb-6"
        >
          DEPOIS QUE PASSAR, NÃO ADIANTA{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200">
            DESCOBRIR A OFERTA
          </span>
        </motion.h2>

        {/* Textos de Apoio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4 text-base sm:text-lg md:text-xl text-emerald-100/90 font-light max-w-2xl mx-auto leading-relaxed mb-8"
        >
          <p>
            Se você já estava pensando em cuidar do intestino, melhorar o sono, recuperar a disposição e transformar os hábitos que podem estar prejudicando seu corpo, este é o momento de entrar no grupo e acompanhar a abertura de perto.
          </p>
          <p className="text-sm sm:text-base text-amber-300/90 font-medium">
            Ao entrar gratuitamente, você já garante um e-book especial sobre chás, com suas funções, formas corretas de preparo e cuidados importantes para o uso consciente.
          </p>
        </motion.div>

        {/* Cronômetro Visual para 10 de Setembro */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex flex-col items-center p-5 sm:p-6 rounded-3xl bg-emerald-950/80 border-2 border-emerald-500/40 backdrop-blur-md mb-10 shadow-2xl"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-300 font-bold mb-3">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>10 DE SETEMBRO • SOMENTE PELO WHATSAPP</span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            <div className="p-3 sm:p-4 rounded-xl bg-[#02140a] border border-emerald-500/30 min-w-[65px] sm:min-w-[85px]">
              <span className="font-mono text-2xl sm:text-4xl font-extrabold text-amber-300 block">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-emerald-300/70 uppercase">Dias</span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-[#02140a] border border-emerald-500/30 min-w-[65px] sm:min-w-[85px]">
              <span className="font-mono text-2xl sm:text-4xl font-extrabold text-white block">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-emerald-300/70 uppercase">Horas</span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-[#02140a] border border-emerald-500/30 min-w-[65px] sm:min-w-[85px]">
              <span className="font-mono text-2xl sm:text-4xl font-extrabold text-white block">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-emerald-300/70 uppercase">Min</span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-[#02140a] border border-emerald-500/30 min-w-[65px] sm:min-w-[85px]">
              <span className="font-mono text-2xl sm:text-4xl font-extrabold text-emerald-400 block">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-emerald-300/70 uppercase">Seg</span>
            </div>
          </div>
        </motion.div>

        {/* Botão Final Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-10 py-6 sm:px-14 sm:py-7 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-base sm:text-xl tracking-wider uppercase shadow-[0_0_60px_-10px_rgba(16,185,129,0.7)] hover:shadow-[0_0_80px_-5px_rgba(16,185,129,0.95)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border-2 border-emerald-300/50"
          >
            <span className="flex items-center gap-3 text-center">
              <MessageCircle className="w-6 h-6 fill-white shrink-0" />
              <span>SIM, QUERO ENTRAR NO GRUPO E RECEBER MEU E-BOOK</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform shrink-0" />
            </span>
          </a>

          <p className="mt-4 text-xs sm:text-sm text-emerald-300/80 font-medium flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-400" />
            <span>Acesso 100% gratuito ao grupo e download do e-book imediato</span>
          </p>

          {/* Link Alternativo para Compra Direta na Hotmart se a pessoa já quiser adquirir agora */}
          <div className="mt-8 pt-6 border-t border-emerald-900/40 w-full max-w-md">
            <p className="text-xs text-emerald-400/80 mb-2">
              Deseja entrar diretamente no Clube Desinflama 360 hoje mesmo?
            </p>
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 underline underline-offset-4 transition-colors"
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
