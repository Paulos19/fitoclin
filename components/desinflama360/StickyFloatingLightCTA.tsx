"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

interface StickyFloatingLightCTAProps {
  checkoutUrl: string;
}

export default function StickyFloatingLightCTA({
  checkoutUrl,
}: StickyFloatingLightCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 z-40 animate-fade-in-up">
      <Link
        href={checkoutUrl}
        className="group flex items-center justify-between gap-4 px-5 py-3.5 sm:px-6 sm:py-4 rounded-full bg-white/90 backdrop-blur-2xl border border-white/95 shadow-[0_15px_40px_-10px_rgba(16,185,129,0.35)] hover:shadow-[0_20px_50px_-5px_rgba(16,185,129,0.5)] transition-all duration-300 transform hover:scale-[1.03] active:scale-95 text-[#0f2417]"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">
              Clube Desinflama 360
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#0d2618]">
              Garantir Vaga • 12x R$ 61,74
            </span>
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:translate-x-0.5 transition-transform">
          <ArrowRight className="w-4 h-4" />
        </div>
      </Link>
    </div>
  );
}
