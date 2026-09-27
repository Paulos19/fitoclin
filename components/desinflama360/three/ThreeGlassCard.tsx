"use client";

import React, { useRef, useState } from "react";

interface ThreeGlassCardProps {
  children: React.ReactNode;
  className?: string;
  gradientAccent?: string;
  intensity?: number;
}

export default function ThreeGlassCard({
  children,
  className = "",
  gradientAccent = "from-emerald-500/15 via-amber-400/10 to-transparent",
  intensity = 14,
}: ThreeGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glintPos, setGlintPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -intensity;
    const rY = ((x - centerX) / centerX) * intensity;

    setRotateX(rX);
    setRotateY(rY);
    setGlintPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlintPos({ x: 50, y: 50 });
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="relative transition-transform duration-300 ease-out"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${
            isHovered ? 1.015 : 1
          }, ${isHovered ? 1.015 : 1}, 1)`,
          transition: isHovered
            ? "transform 0.1s ease-out"
            : "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        className={`relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_20px_50px_-15px_rgba(16,185,129,0.1)] transition-shadow duration-500 hover:shadow-[0_30px_65px_-10px_rgba(16,185,129,0.2)] ${className}`}
      >
        {/* Specular Highlight / Brilho de Vidro que segue o cursor */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${glintPos.x}% ${glintPos.y}%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.25) 40%, transparent 80%)`,
          }}
        />

        {/* Gradiente sutil interno de profundidade botânica */}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradientAccent} opacity-60`}
        />

        {/* Borda Iluminada Fresnel */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/95 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)]" />

        {/* Conteúdo do Card */}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
