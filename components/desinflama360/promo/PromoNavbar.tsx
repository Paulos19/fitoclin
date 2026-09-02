"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, MessageCircle, Clock, ArrowRight } from "lucide-react";

interface PromoNavbarProps {
  whatsappUrl: string;
}

export default function PromoNavbar({ whatsappUrl }: PromoNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Banner Fixo de Urgência */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 text-black py-2 px-3 text-center text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-md relative z-50 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 fill-black shrink-0 animate-pulse" />
        <span>OFERTA ESPECIAL EM 10 DE SETEMBRO • 30% A 50% DE DESCONTO SOMENTE NO WHATSAPP</span>
      </div>

      {/* Navbar Principal */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#020e07]/95 backdrop-blur-md border-b border-emerald-500/30 py-3 shadow-xl shadow-emerald-950/40"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Dra. Isa / FITOCLIN */}
          <Link href="/grupooferta" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-emerald-950 border border-emerald-500/40 flex items-center justify-center group-hover:border-emerald-400 transition-colors shadow-md">
              <Image
                src="/logo.png"
                alt="FITOCLIN"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base sm:text-lg text-white tracking-wide flex items-center gap-1">
                FITOCLIN<sup className="text-[10px] text-emerald-400 font-sans">®</sup>
              </span>
              <span className="text-[10px] text-emerald-300/80 font-medium tracking-wider uppercase -mt-0.5">
                Clube Desinflama 360
              </span>
            </div>
          </Link>

          {/* Tag de Data & Botão WhatsApp */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs text-emerald-200">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Abertura: <strong>10 de Setembro</strong></span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-900/40 hover:scale-105 active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span className="hidden sm:inline">Entrar no Grupo VIP</span>
              <span className="sm:hidden">Grupo VIP</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
