"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Play,
  Star,
  Quote,
  CheckCircle2,
  HeartHandshake,
  MessageSquare,
  Video,
} from "lucide-react";
import ThreeGlassCard from "./three/ThreeGlassCard";
import WhatsAppPrintsGallery from "./WhatsAppPrintsGallery";

export default function TestimonialsLightSection() {
  const [activeTab, setActiveTab] = useState<"videos" | "prints">("videos");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const videoTestimonials = [
    {
      id: "youtube-zenobia",
      name: "Zenóbia Carvalho",
      tag: "–4 kg em 15 dias",
      badge: "Sono & Desinflamação",
      youtubeId: "XQrWkq3uQcs",
      embedUrl: "https://www.youtube-nocookie.com/embed/XQrWkq3uQcs?autoplay=1&rel=0",
      desc: "Veja como a rota prática do Método FITOCLIN® transformou a rotina da Zenóbia, eliminando 4 kg em 15 dias com desinchaço e sono reparador.",
      quote: "Voltei a dormir a noite toda e a acordar leve, sem aquele inchaço que me travava.",
    },
    {
      id: "youtube-lilinha",
      name: "Marylilia (Lilinha)",
      tag: "–3 kg em 7 dias",
      badge: "Fim das Dores & Vitalidade",
      youtubeId: "4PI-eGS3hds",
      embedUrl: "https://www.youtube-nocookie.com/embed/4PI-eGS3hds?autoplay=1&rel=0",
      desc: "Lilinha sofria com dores crônicas há anos. Em apenas 7 dias eliminou 3 kg e conquistou leveza e disposição diária renovadas.",
      quote: "Eu não conseguia nem caminhar sem dor. Hoje tenho disposição de sobra para viver.",
    },
    {
      id: "youtube-shorts",
      name: "Aluna FITOCLIN",
      tag: "Intestino & Energia",
      badge: "Transformação 360",
      youtubeId: "aPsoROWcE1k",
      embedUrl: "https://www.youtube-nocookie.com/embed/aPsoROWcE1k?autoplay=1&rel=0",
      desc: "Depoimento compartilhando a rápida regulação intestinal, desinflamação e clareza mental alcançados com as orientações da Dra. Isa.",
      quote: "O intestino começou a funcionar como um relógio e a barriga estufada desapareceu.",
    },
  ];

  return (
    <section
      id="depoimentos"
      className="relative py-20 md:py-28 text-[#0f2417] overflow-hidden"
    >
      {/* Luz ambiente de fitoterapia */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-emerald-200/40 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho com o Texto Exato */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-300/80 shadow-xs text-emerald-950 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>Resultados e Provas Reais</span>
          </motion.div>

          {/* Texto Exato Fornecido na Orientação */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#0d2618] tracking-tight leading-tight"
          >
            Histórias reais de mulheres que desinflamaram hábitos,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500">
              recuperaram o sono, o intestino e a energia diária
            </span>{" "}
            com a orientação da Dra. Isa Bieski.
          </motion.h2>

          {/* Métricas de Sucesso */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-[#385544]"
          >
            <div className="flex items-center gap-2 bg-white/80 border border-emerald-100 px-4 py-2 rounded-2xl shadow-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-[#0d2618]">4.9 / 5</span>
              <span>satisfação das alunas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 border border-emerald-100 px-4 py-2 rounded-2xl shadow-xs">
              <HeartHandshake className="w-4 h-4 text-emerald-600" />
              <span>Mais de <strong>10.000 vidas</strong> impactadas</span>
            </div>
          </motion.div>

          {/* Abas Alternadoras (Vídeos vs Prints) */}
          <div className="mt-10 flex justify-center">
            <div className="p-1 rounded-full bg-white/80 border border-emerald-200/80 shadow-xs inline-flex gap-2">
              <button
                onClick={() => setActiveTab("videos")}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                  activeTab === "videos"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                    : "text-[#42604e] hover:text-[#0d2618]"
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Depoimentos em Vídeo</span>
              </button>
              <button
                onClick={() => setActiveTab("prints")}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                  activeTab === "prints"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                    : "text-[#42604e] hover:text-[#0d2618]"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Prints do WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Conteúdo da Aba de Vídeos */}
        {activeTab === "videos" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {videoTestimonials.map((v, idx) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <ThreeGlassCard
                  intensity={12}
                  gradientAccent="from-emerald-500/15 via-amber-400/10 to-transparent"
                  className="p-5 flex flex-col h-full justify-between"
                >
                  <div>
                    {/* Player ou Thumbnail com Botão Play */}
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-emerald-950 mb-4 shadow-xs group">
                      {playingVideoId === v.id ? (
                        <iframe
                          src={v.embedUrl}
                          title={v.name}
                          className="w-full h-full border-0"
                          allow="autoplay; fullscreen"
                          allowFullScreen
                        />
                      ) : (
                        <button
                          onClick={() => setPlayingVideoId(v.id)}
                          className="w-full h-full relative block cursor-pointer"
                        >
                          <img
                            src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                            alt={v.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-emerald-950/30 group-hover:bg-emerald-950/20 transition-colors" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-white/95 text-emerald-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <Play className="w-6 h-6 fill-emerald-600 ml-1" />
                            </div>
                          </div>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-emerald-900 bg-emerald-100/90 border border-emerald-200 px-3 py-0.5 rounded-full">
                        {v.tag}
                      </span>
                      <span className="text-[11px] text-[#4f705c] font-medium">
                        {v.badge}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#0d2618] mb-2">{v.name}</h4>
                    <p className="text-xs text-[#385544] leading-relaxed mb-4">{v.desc}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100/80">
                    <p className="text-xs italic text-[#2c4736] flex items-start gap-1.5">
                      <Quote className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{v.quote}</span>
                    </p>
                  </div>
                </ThreeGlassCard>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Aba de Prints do WhatsApp */
          <div className="rounded-3xl p-6 sm:p-8 bg-white/70 backdrop-blur-2xl border border-emerald-100 shadow-sm mb-16">
            <WhatsAppPrintsGallery />
          </div>
        )}
      </div>
    </section>
  );
}
