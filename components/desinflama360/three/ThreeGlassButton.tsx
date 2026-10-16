"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ThreeGlassButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "subtle";
  icon?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function ThreeGlassButton({
  href,
  children,
  className = "",
  variant = "primary",
  icon = true,
  onClick,
}: ThreeGlassButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 text-white shadow-[0_15px_35px_-8px_rgba(16,185,129,0.45)] hover:shadow-[0_20px_45px_-5px_rgba(16,185,129,0.65)] border-white/40";
      case "secondary":
        return "bg-white/90 text-[#064e3b] backdrop-blur-xl border-white/95 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.15)] hover:bg-white hover:text-emerald-700";
      case "subtle":
        return "bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100";
      default:
        return "";
    }
  };

  return (
    <Link
      ref={buttonRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-base sm:text-lg tracking-wide uppercase transition-all duration-300 transform active:scale-95 border overflow-hidden select-none ${getVariantStyles()} ${className}`}
    >
      {/* Specular Glint de Vidro 3D Dinâmico */}
      <div
        className="pointer-events-none absolute -inset-full transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.65 : 0,
          background: `radial-gradient(150px circle at ${coords.x}% ${coords.y}%, rgba(255, 255, 255, 0.85), transparent 70%)`,
        }}
      />

      {/* Reflexo luminoso animado no topo da pílula */}
      <div className="pointer-events-none absolute inset-x-4 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

      {/* Rótulo e Ícone */}
      <span className="relative z-10 flex items-center gap-2.5">
        <span>{children}</span>
        {icon && (
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
        )}
      </span>
    </Link>
  );
}
