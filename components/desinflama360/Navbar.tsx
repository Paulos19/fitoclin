"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

interface NavbarProps {
  checkoutUrl: string;
}

export default function DesinflamaNavbar({ checkoutUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#03120b]/95 backdrop-blur-md border-b border-emerald-500/20 py-3 shadow-2xl shadow-emerald-950/40"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo & Marca */}
        <Link href="#inicio" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center group-hover:border-emerald-400 transition-colors">
            <Image
              src="/logo.png"
              alt="FITOCLIN"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-serif font-bold text-lg sm:text-xl tracking-wide flex items-center gap-1.5">
              FITOCLIN<sup className="text-[10px] text-emerald-400 font-sans">®</sup>
            </span>
            <span className="text-[10px] tracking-[0.2em] text-emerald-400/90 uppercase font-semibold">
              Clube Desinflama 360
            </span>
          </div>
        </Link>

        {/* Badges centrais no Desktop */}
        <div className="hidden md:flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/20 rounded-full px-4 py-1.5 backdrop-blur-sm text-xs text-emerald-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium">Inscrições Abertas</span>
          <span className="text-emerald-500/40">•</span>
          <span className="text-emerald-300/80 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Método Exclusivo Dra. Isa
          </span>
        </div>

        {/* CTA do Topo */}
        <div className="flex items-center gap-3">
          <a
            href={checkoutUrl}
            className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full animate-gradient-x opacity-80 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#041a10] text-white text-xs sm:text-sm font-semibold tracking-wide hover:bg-transparent transition-colors">
              <span>Garantir Vaga</span>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
