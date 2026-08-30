"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  Play,
  Video,
  FileText,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Flame,
  Award,
} from "lucide-react";

export default function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState<"videos" | "confissoes">("videos");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const videoTestimonials = [
    {
      id: "youtube-zenobia",
      type: "youtube" as const,
      name: "Zenóbia Carvalho",
      title: "Depoimento Clube Desinflama 360 - Zenóbia",
      tag: "–4 kg em 15 dias",
      badge: "Sono & Desinflamação",
      youtubeId: "XQrWkq3uQcs",
      youtubeUrl: "https://youtu.be/XQrWkq3uQcs?is=ZV9yFY5J5yQXokrf",
      embedUrl: "https://www.youtube-nocookie.com/embed/XQrWkq3uQcs?autoplay=1&rel=0&modestbranding=1",
      desc: "Veja como a rota prática do Método FITOCLIN® transformou a rotina da Zenóbia, eliminando 4 kg em 15 dias com desinchaço e qualidade de vida.",
      highlights: [
        "Eliminou 4 kg em 15 dias",
        "Corpo desinflamado e leve",
        "Recuperou a autoestima e fé",
      ],
    },
    {
      id: "youtube-lilinha",
      type: "youtube" as const,
      name: "Marylilia (Lilinha)",
      title: "Depoimento Clube Desinflama 360 - Lilinha",
      tag: "–3 kg em 7 dias",
      badge: "Fim das Dores & Vitalidade",
      youtubeId: "4PI-eGS3hds",
      youtubeUrl: "https://youtu.be/4PI-eGS3hds?is=DWiABHr0NpxPgop3",
      embedUrl: "https://www.youtube-nocookie.com/embed/4PI-eGS3hds?autoplay=1&rel=0&modestbranding=1",
      desc: "Lilinha sofria com dores há anos e mal conseguia se movimentar. Em apenas 7 dias eliminou 3 kg e conquistou leveza e disposição diária.",
      highlights: [
        "Eliminou 3 kg em 7 dias",
        "Alívio de dores crônicas",
        "Esperança e ânimo renovados",
      ],
    },
    {
      id: "whatsapp-video-2",
      type: "mp4" as const,
      src: "/WhatsApp Video 2026-08-29 at 18.46.06.mp4",
      name: "Depoimento Aluna FITOCLIN",
      title: "Relato em Vídeo - Transformação Real",
      tag: "Constância & Desinchaço",
      badge: "Vídeo Aluna",
      desc: "Depoimento em vídeo gravado por aluna compartilhando a superação de sintomas inflamatórios e a conquista de bem-estar com o Método.",
      highlights: [
        "Rotina com leveza e clareza",
        "Acompanhamento acolhedor",
        "Resultados visíveis no corpo",
      ],
    },
    {
      id: "youtube-shorts",
      type: "youtube" as const,
      name: "Aluna FITOCLIN",
      title: "Depoimento Clube Desinflama 360",
      tag: "Resultado Prático",
      badge: "Vídeo Destaque",
      youtubeId: "aPsoROWcE1k",
      youtubeUrl: "https://youtube.com/shorts/aPsoROWcE1k?is=4VCKsnViIYvkJKqW",
      embedUrl: "https://www.youtube-nocookie.com/embed/aPsoROWcE1k?autoplay=1&rel=0&modestbranding=1",
      desc: "Depoimento espontâneo em vídeo compartilhando a evolução real na saúde, energia e desinflamação com a Dra. Isa Bieski.",
      highlights: [
        "Desinflamação prática",
        "Mais disposição no dia a dia",
        "Método direto ao ponto",
      ],
    },
    {
      id: "whatsapp-video-1",
      type: "mp4" as const,
      src: "/WhatsApp Video 2026-08-29 at 18.45.22.mp4",
      name: "Depoimento Aluna FITOCLIN",
      title: "Relato em Vídeo - Vitalidade e Sono",
      tag: "Sono & Intestino",
      badge: "Vídeo Aluna",
      desc: "Relato emocionante sobre a recuperação do sono profundo, equilíbrio do intestino e restauração do equilíbrio do organismo.",
      highlights: [
        "Equilíbrio intestinal",
        "Sono reparador à noite",
        "Disposição prolongada",
      ],
    },
  ];

  const confessions = [
    {
      name: "Zenóbia Carvalho",
      metric: "–4 kg em 15 dias",
      tag: "Participante MEI",
      initials: "ZC",
      headline: "Voltei a acreditar em mim",
      quote:
        "“Depois de tanto tempo acima dos 100 kg e sem conseguir emagrecer, finalmente vi resultado. Em apenas 15 dias eliminei 4 kg e ainda senti meu corpo desinchar. Voltei a acreditar em mim.”",
    },
    {
      name: "Marylilia (Lilinha)",
      metric: "–3 kg em 7 dias",
      tag: "Participante MEI",
      initials: "ML",
      headline: "Alívio de dores crônicas",
      quote:
        "“Eu sofria com dores há anos e mal conseguia me movimentar. Em 7 dias eliminei 3 kg e me senti mais leve, mais disposta e com esperança de viver melhor.”",
    },
    {
      name: "Marineid Marchezini",
      metric: "–5 kg em 7 dias",
      tag: "Participante MEI",
      initials: "MM",
      headline: "Método, direção e estratégia",
      quote:
        "“Perdi 5 kg em apenas 7 dias. O que mais me impressionou foi perceber que existe método, direção e estratégia. Isso é inovador.”",
    },
    {
      name: "Maria de Lourdes",
      metric: "–2,5 kg",
      tag: "Participante MEI",
      initials: "ML",
      headline: "Recuperei alegria e vontade de viver",
      quote:
        "“Eliminei 2,5 kg e voltei a sorrir. Mais do que peso, recuperei alegria e vontade de viver.”",
    },
    {
      name: "Maria Eni Isolan",
      metric: "–3,4 kg em 7 dias",
      tag: "Participante MEI",
      initials: "ME",
      headline: "Corpo mais leve e dores sumiram",
      quote:
        "“Em apenas 7 dias perdi 3,4 kg. Meu corpo ficou mais leve, minhas dores melhoraram e minha motivação voltou.”",
    },
    {
      name: "Aline",
      metric: "–5 kg em 30 dias",
      tag: "Participante MEI",
      initials: "A",
      headline: "Resultados mesmo na rotina corrida",
      quote:
        "“Em 30 dias eliminei 5 kg, mesmo sem conseguir aplicar tudo perfeitamente. Imagine agora fazendo certo e com acompanhamento.”",
    },
  ];

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = 420;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="depoimentos"
      className="relative py-20 md:py-28 bg-[#020e07] text-white overflow-hidden border-t border-emerald-900/30"
    >
      {/* Luzes ambiente de fundo */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            <span>Transformações Reais</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Veja o que nossas alunas dizem sobre o{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300">
              Clube Desinflama 360
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/75 font-light">
            Histórias reais de mulheres que desinflamaram hábitos, recuperaram o sono, o intestino e a energia diária com a orientação da Dra. Isa Bieski.
          </p>

          {/* Abas: Vídeos Reais e Confissões das Alunas */}
          <div className="mt-8 inline-flex flex-wrap justify-center p-1.5 rounded-2xl bg-emerald-950/70 border border-emerald-500/30 gap-1.5">
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "videos"
                  ? "bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
                  : "text-emerald-300/70 hover:text-white"
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Vídeos dos Testemunhos ({videoTestimonials.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("confissoes")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "confissoes"
                  ? "bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
                  : "text-emerald-300/70 hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Confissões & Resultados ({confessions.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Carrossel Horizontal Scroll de Vídeos */}
        {activeTab === "videos" && (
          <div className="relative">
            {/* Controles de Navegação do Carrossel */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-300/80 font-medium">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Arraste ou use as setas para ver todos os depoimentos</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollCarousel("left")}
                  aria-label="Depoimento anterior"
                  className="w-10 h-10 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 hover:border-emerald-400 text-emerald-200 hover:text-white flex items-center justify-center transition-all shadow-lg shadow-emerald-950/50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  aria-label="Próximo depoimento"
                  className="w-10 h-10 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 hover:border-emerald-400 text-emerald-200 hover:text-white flex items-center justify-center transition-all shadow-lg shadow-emerald-950/50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Container do Carrossel Horizontal Scroll */}
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-emerald-600/40 scrollbar-track-emerald-950/20"
              style={{ scrollbarWidth: "thin" }}
            >
              {videoTestimonials.map((item, index) => {
                const isPlaying = playingVideoId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="min-w-[320px] sm:min-w-[380px] md:min-w-[420px] max-w-[430px] snap-start flex-shrink-0 relative rounded-3xl overflow-hidden bg-gradient-to-b from-emerald-950/60 via-[#031c10] to-[#021008] border-2 border-emerald-500/30 shadow-2xl p-5 flex flex-col justify-between group hover:border-emerald-400/60 transition-all"
                  >
                    {/* Header do Card */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                          {item.badge}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300">
                        {item.tag}
                      </span>
                    </div>

                    {/* Player de Vídeo: YouTube Embed ou Player Nativo MP4 */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner border border-emerald-500/25 mb-4 group/player">
                      {item.type === "youtube" ? (
                        isPlaying ? (
                          <iframe
                            src={item.embedUrl}
                            title={item.title}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        ) : (
                          <div
                            onClick={() => setPlayingVideoId(item.id)}
                            className="relative w-full h-full cursor-pointer overflow-hidden flex items-center justify-center group/cover"
                          >
                            <img
                              src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 group-hover/cover:bg-black/20 transition-colors" />

                            <div className="relative z-10 w-14 h-14 rounded-full bg-emerald-500/90 text-white flex items-center justify-center shadow-xl shadow-emerald-950/80 border-2 border-emerald-300 group-hover/cover:scale-110 group-hover/cover:bg-emerald-400 transition-all duration-300">
                              <Play className="w-6 h-6 fill-white translate-x-0.5" />
                            </div>

                            <div className="absolute bottom-2 left-2 right-2 text-center">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-emerald-500/30 text-[10px] font-medium text-emerald-200">
                                <Play className="w-2.5 h-2.5 fill-emerald-300" />
                                Clique para assistir
                              </span>
                            </div>
                          </div>
                        )
                      ) : (
                        <video
                          src={item.src}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-contain bg-black"
                        />
                      )}
                    </div>

                    {/* Descrição e destaques */}
                    <div className="flex-1 flex flex-col justify-between pt-2 border-t border-emerald-500/20">
                      <div>
                        <h4 className="text-base font-bold text-white mb-1.5 flex items-center justify-between">
                          <span>{item.name}</span>
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                        </h4>
                        <p className="text-xs text-emerald-100/75 leading-relaxed font-light mb-3">
                          {item.desc}
                        </p>

                        <div className="space-y-1.5 mb-4">
                          {item.highlights.map((hl, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-emerald-200/90">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {item.type === "youtube" ? (
                        <a
                          href={item.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/20 text-xs font-semibold text-emerald-300 hover:text-white transition-colors"
                        >
                          <span>Assistir no YouTube</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <div className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 text-xs text-emerald-300/80">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Depoimento Gravado por Aluna</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Confissões Reais das Alunas */}
        {activeTab === "confissoes" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {confessions.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-emerald-950/40 via-[#041a10]/80 to-[#02130a] border border-emerald-500/25 shadow-xl flex flex-col justify-between hover:border-emerald-400/50 transition-all duration-300 group"
              >
                <Quote className="absolute top-5 right-5 w-8 h-8 text-emerald-500/15 group-hover:text-emerald-400/25 transition-colors pointer-events-none" />

                <div>
                  {/* Topo do card: Avatar + Nome + Tag */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-bold text-sm flex items-center justify-center shadow-md border border-emerald-400/30 shrink-0">
                      {item.initials}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-emerald-400/80 font-medium">
                        {item.tag} • Método FITOCLIN®
                      </p>
                    </div>
                  </div>

                  {/* Métrica de resultado em destaque */}
                  <div className="flex items-center justify-between gap-2 mb-4 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/20">
                    <span className="text-xs sm:text-sm font-extrabold text-amber-300 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-400" />
                      {item.metric}
                    </span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, sIdx) => (
                        <Star key={sIdx} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Texto do depoimento / confissão */}
                  <p className="text-xs sm:text-sm text-emerald-100/85 leading-relaxed font-light mb-6 italic">
                    {item.quote}
                  </p>
                </div>

                {/* Footer do card */}
                <div className="pt-3 border-t border-emerald-500/20 flex items-center justify-between text-[11px] text-emerald-400/80">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Depoimento Verificado
                  </span>
                  <span className="text-teal-300 font-medium">
                    Transformação Real
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Disclaimer ético */}
        <div className="mt-12 text-center text-xs text-emerald-400/60 max-w-2xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400/80 shrink-0" />
          <span>
            Os depoimentos e relatos expressam experiências reais de participantes do Método FITOCLIN®. Os resultados podem variar conforme a resposta individual, rotina e adesão de cada participante.
          </span>
        </div>
      </div>
    </section>
  );
}



