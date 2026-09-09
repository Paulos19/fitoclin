"use client";

import React from "react";
import Image from "next/image";
import { Instagram, Phone, ShieldCheck } from "lucide-react";

export default function PromoFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-16 pb-36 sm:pb-44 px-4 sm:px-6 lg:px-8 bg-[#F9FAF9] text-neutral-600 text-xs border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between pb-8 border-b border-neutral-200/70">
          {/* Logo & Marca */}
          <div className="md:col-span-4 flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl overflow-hidden bg-[#0A1C12] border border-neutral-200 flex items-center justify-center shadow-sm shrink-0">
              <Image
                src="/logo.png"
                alt="FITOCLIN"
                width={26}
                height={26}
                className="object-contain brightness-110"
              />
            </div>
            <div>
              <p className="font-sans font-extrabold text-[#0A1C12] text-sm tracking-tight">
                FITOCLIN<sup className="text-[9px] text-emerald-700 font-bold">®</sup> • Dra. Isa Bieski
              </p>
              <p className="text-[11px] text-emerald-800 font-medium mt-0.5">
                Clube Desinflama 360
              </p>
            </div>
          </div>

          {/* Canais de Atendimento */}
          <div className="md:col-span-4 flex flex-wrap items-center justify-start md:justify-center gap-3 text-xs text-neutral-700">
            <a
              href="https://wa.me/5565998200593"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-emerald-800 transition-colors font-medium bg-white px-3.5 py-2 rounded-full border border-neutral-200/80 shadow-sm hover:shadow"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>(65) 99820-0593</span>
            </a>
            <a
              href="https://instagram.com/dra.isafito"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-emerald-800 transition-colors font-medium bg-white px-3.5 py-2 rounded-full border border-neutral-200/80 shadow-sm hover:shadow"
            >
              <Instagram className="w-3.5 h-3.5 text-emerald-700" />
              <span>@dra.isafito</span>
            </a>
          </div>

          {/* Termos e Aviso Legal */}
          <div className="md:col-span-4 text-left md:text-right text-[11px] text-neutral-400 leading-relaxed">
            <p>
              Aviso: Este produto possui finalidade educativa. O uso de plantas medicinais deve considerar condições individuais e orientação profissional.
            </p>
          </div>
        </div>

        {/* Linha Inferior de Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400">
          <p>© {currentYear} FITOCLIN® • Dra. Isa Bieski. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Ambiente Seguro e Oficial</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
