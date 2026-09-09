"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, MessageCircle, Clock, ArrowUpRight } from "lucide-react";

interface PromoNavbarProps {
  whatsappUrl: string;
}

export default function PromoNavbar({ whatsappUrl }: PromoNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Banner Fixo de Urgência */}
      <div className="bg-amber-400 text-neutral-950 py-2.5 px-3 text-center text-xs sm:text-sm font-black tracking-wide uppercase shadow-sm relative z-50 flex items-center justify-center gap-2 border-b border-amber-500/30">
        <Sparkles className="w-3.5 h-3.5 fill-neutral-950 shrink-0 animate-pulse" />
        <span className="leading-tight">
          OFERTA ESPECIAL EM 17 DE SETEMBRO • 50% DE DESCONTO SOMENTE NO WHATSAPP
        </span>
      </div>

      {/* Navbar Principal com Visual Clean Minimalista */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-neutral-200/80 py-3 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.06)]"
            : "bg-white/80 backdrop-blur-sm border-b border-neutral-100 py-3.5 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Dra. Isa / FITOCLIN */}
          <Link href="/grupooferta" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-2xl overflow-hidden bg-[#0A1C12] border border-emerald-900/20 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
              <Image
                src="/logo.png"
                alt="FITOCLIN"
                width={28}
                height={28}
                className="object-contain brightness-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-extrabold text-base sm:text-lg text-[#0A1C12] tracking-tight flex items-center gap-1">
                FITOCLIN<sup className="text-[10px] text-emerald-700 font-bold">®</sup>
              </span>
              <span className="text-[11px] text-emerald-800 font-semibold tracking-wide uppercase -mt-0.5">
                Clube Desinflama 360
              </span>
            </div>
          </Link>

          {/* Tag de Data & Botão WhatsApp */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-700 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-emerald-700" />
              <span>
                Abertura: <strong className="text-[#0A1C12] font-semibold">17 de Setembro</strong>
              </span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#0A1C12] hover:bg-[#064E3B] text-white font-bold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow-[0_10px_20px_-5px_rgba(6,78,59,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span className="hidden sm:inline">Entrar no Grupo VIP</span>
              <span className="sm:hidden">Grupo VIP</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
