"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Leaf } from "lucide-react";

interface LightNavbarProps {
  checkoutUrl: string;
}

export default function LightNavbar({ checkoutUrl }: LightNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-2xl border-b border-emerald-100/80 py-3 shadow-[0_10px_35px_-10px_rgba(16,185,129,0.08)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo & Marca FITOCLIN® */}
        <Link href="#inicio" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-2xl overflow-hidden bg-white/90 border border-emerald-200/80 shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/logo.png"
              alt="FITOCLIN"
              width={30}
              height={30}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[#064e3b] font-serif font-bold text-lg sm:text-xl tracking-tight flex items-center gap-1">
              FITOCLIN<sup className="text-[10px] text-amber-500 font-sans font-extrabold">®</sup>
            </span>
            <span className="text-[10px] tracking-[0.2em] text-emerald-700 uppercase font-semibold">
              Clube Desinflama 360
            </span>
          </div>
        </Link>

        {/* Links de ancoragem no desktop */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#2d4a38]">
          <Link href="#aula" className="hover:text-emerald-700 transition-colors">
            Aula Gratuita
          </Link>
          <Link href="#transformacao" className="hover:text-emerald-700 transition-colors">
            1ª Semana
          </Link>
          <Link href="#depoimentos" className="hover:text-emerald-700 transition-colors">
            Resultados
          </Link>
          <Link href="#jornada" className="hover:text-emerald-700 transition-colors">
            A Jornada
          </Link>
          <Link href="#faq" className="hover:text-emerald-700 transition-colors">
            Dúvidas
          </Link>
        </nav>

        {/* CTA do Topo */}
        <div className="flex items-center gap-3">
          <Link
            href={checkoutUrl}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-[#064e3b] text-xs sm:text-sm font-bold tracking-wide border border-emerald-300/80 shadow-xs hover:shadow-md transition-all duration-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Garantir Vaga</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
