"use client";

import React from "react";
import Image from "next/image";
import { Instagram, Phone, ShieldCheck } from "lucide-react";

export default function PromoFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[#010904] text-emerald-300/70 text-xs border-t border-emerald-950">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo & Marca */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-emerald-950 border border-emerald-500/30 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="FITOCLIN"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <div>
            <p className="font-serif font-bold text-white text-sm tracking-wide">
              FITOCLIN<sup className="text-[9px] text-emerald-400 font-sans">®</sup> • Dra. Isa Bieski
            </p>
            <p className="text-[11px] text-emerald-400/60">
              © {currentYear} Todos os direitos reservados.
            </p>
          </div>
        </div>

        {/* Canais de Atendimento */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-200">
          <a
            href="https://wa.me/5565998200593"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>(65) 99820-0593</span>
          </a>
          <a
            href="https://instagram.com/dra.isafito"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
          >
            <Instagram className="w-3.5 h-3.5 text-emerald-400" />
            <span>@dra.isafito</span>
          </a>
        </div>

        {/* Termos e Aviso Legal */}
        <div className="max-w-xs text-center md:text-right text-[10px] text-emerald-400/50 leading-relaxed">
          <p>
            Aviso: Este produto possui finalidade educativa. O uso de plantas medicinais deve considerar condições individuais e orientação profissional.
          </p>
        </div>
      </div>
    </footer>
  );
}
