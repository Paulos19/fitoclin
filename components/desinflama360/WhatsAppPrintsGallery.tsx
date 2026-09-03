"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";

export interface WhatsAppPrintItem {
  id: string;
  src: string;
  title: string;
  tag: string;
  highlight: string;
}

export const WHATSAPP_PRINTS: WhatsAppPrintItem[] = [
  {
    id: "print-1",
    src: "/testemunhos/WhatsApp Image 2026-09-02 at 13.35.03.jpeg",
    title: "Sono Regulado e Noites Tranquilas",
    tag: "Sono Reparador",
    highlight: "Aluna dormindo a noite toda sem acordar e com o ciclo de sono regulado.",
  },
  {
    id: "print-2",
    src: "/testemunhos/WhatsApp Image 2026-09-02 at 13.35.04.jpeg",
    title: "Glicemia Normalizada e Mais Saúde",
    tag: "Controle da Glicemia",
    highlight: "Glicemia que estava acima de 200 normalizou para 100 com o direcionamento e chás.",
  },
  {
    id: "print-3",
    src: "/testemunhos/WhatsApp Image 2026-09-02 at 13.35.30.jpeg",
    title: "Desinflamação Diária e Equilíbrio dos Pilares",
    tag: "Transformação de Vida",
    highlight: "Corpo, mente e fé em equilíbrio, aplicando os cinco pilares e desinflamando diariamente.",
  },
  {
    id: "print-4",
    src: "/testemunhos/WhatsApp Image 2026-09-02 at 13.36.03.jpeg",
    title: "Pressão, Metabolismo e Vitalidade",
    tag: "Saúde Integral",
    highlight: "Qualidade de vida no controle da pressão, metabolismo ativo e redução de medicamentos.",
  },
];

interface WhatsAppPrintsGalleryProps {
  title?: string;
  subtitle?: string;
  showHeading?: boolean;
}

export default function WhatsAppPrintsGallery({
  title = "Prints e Mensagens Reais de Alunas no WhatsApp",
  subtitle = "Veja conversas espontâneas compartilhadas diretamente em nossos grupos e atendimentos.",
  showHeading = true,
}: WhatsAppPrintsGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const handleOpenLightbox = (index: number) => {
    setSelectedIdx(index);
    setZoomLevel(1);
  };

  const handleCloseLightbox = () => {
    setSelectedIdx(null);
    setZoomLevel(1);
  };

  const handlePrev = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : WHATSAPP_PRINTS.length - 1));
    setZoomLevel(1);
  }, [selectedIdx]);

  const handleNext = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev !== null && prev < WHATSAPP_PRINTS.length - 1 ? prev + 1 : 0));
    setZoomLevel(1);
  }, [selectedIdx]);

  // Teclado (Esc, Setas)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === "Escape") handleCloseLightbox();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, handlePrev, handleNext]);

  return (
    <div className="w-full">
      {showHeading && (
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Mensagens Espontâneas</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
            {title}
          </h3>
          <p className="mt-3 text-sm sm:text-base text-emerald-100/80 font-light">
            {subtitle}
          </p>
        </div>
      )}

      {/* Grid de Prints Estilo Card Elegante */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {WHATSAPP_PRINTS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            onClick={() => handleOpenLightbox(idx)}
            className="group relative cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-b from-[#041d11] to-[#020f08] border border-emerald-500/30 hover:border-emerald-400/80 shadow-lg hover:shadow-emerald-900/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Bar do Card com Tag */}
            <div className="p-3 pb-2 flex items-center justify-between border-b border-emerald-500/20 bg-[#02130a]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30">
                {item.tag}
              </span>
              <span className="text-[11px] text-emerald-400/80 font-mono">
                #{idx + 1}
              </span>
            </div>

            {/* Imagem do Print */}
            <div className="relative w-full aspect-[4/5] bg-[#020c06] overflow-hidden p-2 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Overlay suave com ícone de ampliar */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity pointer-events-none" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                <div className="px-3.5 py-2 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xl shadow-emerald-950/80 scale-95 group-hover:scale-100 transition-transform">
                  <Maximize2 className="w-4 h-4" />
                  <span>Clique para ampliar</span>
                </div>
              </div>
            </div>

            {/* Rodapé do Card */}
            <div className="p-3 bg-[#021008] border-t border-emerald-500/20">
              <h4 className="text-xs font-bold text-white truncate mb-1">
                {item.title}
              </h4>
              <p className="text-[11px] text-emerald-200/70 line-clamp-2 leading-relaxed font-light">
                {item.highlight}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selo de Verificação de Prova Social */}
      <div className="mt-8 text-center text-xs text-emerald-300/80 flex items-center justify-center gap-2 bg-emerald-950/40 border border-emerald-500/20 py-2.5 px-4 rounded-xl max-w-xl mx-auto">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Prints 100% reais retirados de conversas com participantes do Método FITOCLIN®.</span>
      </div>

      {/* Lightbox Modal com Zoom e Navegação */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6"
            onClick={handleCloseLightbox}
          >
            {/* Header do Lightbox */}
            <div
              className="w-full max-w-5xl flex items-center justify-between text-white z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-300 text-xs font-bold">
                  {selectedIdx + 1}/{WHATSAPP_PRINTS.length}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {WHATSAPP_PRINTS[selectedIdx].title}
                  </h3>
                  <span className="text-xs text-emerald-400 font-medium">
                    {WHATSAPP_PRINTS[selectedIdx].tag}
                  </span>
                </div>
              </div>

              {/* Controles de Zoom e Fechar */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.3, 2.5))}
                  title="Aumentar Zoom"
                  className="p-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 hover:text-white transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.3, 0.8))}
                  title="Diminuir Zoom"
                  className="p-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 hover:text-white transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  title="Resetar Zoom"
                  className="p-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCloseLightbox}
                  title="Fechar (Esc)"
                  className="p-2 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-red-300 hover:text-white transition-colors ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Container Central da Imagem com Zoom */}
            <div
              className="relative flex-1 w-full max-w-4xl flex items-center justify-center overflow-auto my-3 p-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão Anterior */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 sm:left-4 z-30 p-3 rounded-full bg-emerald-950/90 hover:bg-emerald-800 border border-emerald-400/40 text-white shadow-2xl transition-transform hover:scale-110"
                aria-label="Print anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Imagem Ampliada */}
              <div
                className="relative max-h-[78vh] w-auto transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <img
                  src={WHATSAPP_PRINTS[selectedIdx].src}
                  alt={WHATSAPP_PRINTS[selectedIdx].title}
                  className="max-h-[78vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain border border-emerald-500/30"
                />
              </div>

              {/* Botão Próximo */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:right-4 z-30 p-3 rounded-full bg-emerald-950/90 hover:bg-emerald-800 border border-emerald-400/40 text-white shadow-2xl transition-transform hover:scale-110"
                aria-label="Próximo print"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Rodapé do Lightbox com Legenda e Dica */}
            <div
              className="w-full max-w-2xl text-center z-20 text-xs text-emerald-200/80 bg-emerald-950/60 border border-emerald-500/20 py-2 px-4 rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <span>{WHATSAPP_PRINTS[selectedIdx].highlight}</span>
              <span className="hidden sm:inline text-emerald-400/60 ml-2">
                • Use as setas do teclado (← / →) para navegar ou Esc para fechar
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
