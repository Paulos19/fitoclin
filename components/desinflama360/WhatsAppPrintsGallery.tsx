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
  ArrowUpRight,
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
  title = "Veja os Resultados e Relatos de Quem Já Aplica o Método",
  subtitle = "Conversas reais e espontâneas de mulheres que desinflamaram o corpo, recuperaram a energia e o sono com o direcionamento da Dra. Isa Bieski.",
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
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs sm:text-sm font-semibold tracking-wide mb-3.5">
            <MessageCircle className="w-4 h-4 text-emerald-700" />
            <span>Mensagens Espontâneas de Alunas</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A1C12] tracking-tight">
            {title}
          </h3>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 font-normal max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
      )}

      {/* Grid de Prints em Cartões Elevados Claros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {WHATSAPP_PRINTS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => handleOpenLightbox(idx)}
            className="group relative cursor-pointer rounded-2xl overflow-hidden bg-white border border-neutral-200/90 hover:border-emerald-500/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_-10px_rgba(5,150,105,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Bar do Card com Tag & Número */}
            <div className="p-3 pb-2.5 flex items-center justify-between border-b border-neutral-100 bg-[#F9FAF9]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/70">
                {item.tag}
              </span>
              <span className="text-xs font-mono font-bold text-neutral-400">
                0{idx + 1}
              </span>
            </div>

            {/* Imagem do Print em Fundo Claro */}
            <div className="relative w-full aspect-[4/5] bg-neutral-50/60 overflow-hidden p-2.5 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Overlay suave com botão de zoom */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#0A1C12]/40 backdrop-blur-[2px]">
                <div className="px-4 py-2 rounded-full bg-white text-[#0A1C12] text-xs font-bold flex items-center gap-1.5 shadow-xl scale-95 group-hover:scale-100 transition-transform">
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Clique para ampliar</span>
                </div>
              </div>
            </div>

            {/* Rodapé do Card */}
            <div className="p-3.5 bg-white border-t border-neutral-100">
              <div className="flex items-center justify-between gap-1 mb-1">
                <h4 className="text-xs font-extrabold text-[#0A1C12] truncate">
                  {item.title}
                </h4>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </div>
              <p className="text-[11px] text-neutral-600 line-clamp-2 leading-relaxed font-normal">
                {item.highlight}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selo de Verificação de Prova Social */}
      <div className="mt-8 text-center text-xs text-neutral-600 flex items-center justify-center gap-2 bg-white border border-neutral-200/80 py-3 px-5 rounded-2xl shadow-sm max-w-xl mx-auto">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Prints 100% reais retirados de conversas com participantes do Método FITOCLIN®.</span>
      </div>

      {/* Lightbox Modal com Zoom e Navegação */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6"
            onClick={handleCloseLightbox}
          >
            {/* Header do Lightbox */}
            <div
              className="w-full max-w-5xl flex items-center justify-between text-white z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-emerald-400 text-xs font-bold">
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
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5))}
                  title="Aumentar Zoom"
                  className="p-2 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75))}
                  title="Diminuir Zoom"
                  className="p-2 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  title="Redefinir Zoom"
                  className="p-2 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCloseLightbox}
                  title="Fechar (Esc)"
                  className="p-2 rounded-lg bg-red-950/80 border border-red-500/40 text-red-300 hover:text-white hover:bg-red-900 transition-colors ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Imagem Ampliada com Controles Laterais */}
            <div
              className="relative w-full max-w-4xl h-[70vh] flex items-center justify-center overflow-hidden my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ scale: zoomLevel }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <Image
                  src={WHATSAPP_PRINTS[selectedIdx].src}
                  alt={WHATSAPP_PRINTS[selectedIdx].title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Botões Próximo / Anterior */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-900/80 border border-neutral-700 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-900/80 border border-neutral-700 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Footer do Lightbox */}
            <div
              className="w-full max-w-3xl text-center text-xs text-neutral-400 bg-neutral-900/60 backdrop-blur-sm p-3 rounded-xl border border-neutral-800"
              onClick={(e) => e.stopPropagation()}
            >
              <p>{WHATSAPP_PRINTS[selectedIdx].highlight}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
