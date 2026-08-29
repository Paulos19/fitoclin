"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MessageCircle,
  Quote,
  Sparkles,
  Play,
  Pause,
  Volume2,
  Video,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

export default function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState<"videos" | "relatos" | "prints">("videos");
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const videoTestimonials = [
    {
      id: "video-1",
      src: "/WhatsApp Video 2026-08-29 at 18.45.22.mp4",
      name: "Depoimento de Aluna FITOCLIN",
      tag: "Sono, Intestino & Energia",
      desc: "Veja como a aplicação do Método FITOCLIN® transformou a rotina, o bem-estar e o equilíbrio do corpo.",
    },
    {
      id: "video-2",
      src: "/WhatsApp Video 2026-08-29 at 18.46.06.mp4",
      name: "Depoimento de Aluna FITOCLIN",
      tag: "Desinflamação & Vitalidade",
      desc: "Relato real sobre a recuperação da constância, desinchaço e melhora significativa na qualidade de vida.",
    },
  ];

  const textTestimonials = [
    {
      name: "Maria Helena S.",
      age: "52 anos",
      role: "Aluna FITOCLIN",
      tag: "Sono & Dores",
      stars: 5,
      headline: "“Pela primeira vez em anos, durmo a noite toda e acordo com disposição!”",
      text: "Eu vivia com dores no corpo e acordava exausta. Tomava remédios para dormir que me deixavam dopada. Com o método da Dra. Isa, aprendi a usar os chás no momento certo e a organizar minha alimentação sem sofrimento. Em 3 semanas, meu intestino regulou e hoje durmo em paz sem remédios pesados.",
      metrics: "Sem remédios para dormir • Intestino 100% regulado",
    },
    {
      name: "Cláudia M. Rezende",
      age: "46 anos",
      role: "Aluna FITOCLIN",
      tag: "Intestino & Desinchaço",
      stars: 5,
      headline: "“Desinchei 4kg em poucas semanas e a barriga estufada sumiu.”",
      text: "Eu comia qualquer coisa e parecia que tinha engolido um balão. Vivia com gases e constipação crônica. A prescrição personalizada e a rota dos 21 dias me deram uma clareza incrível. Não é dieta maluca, é cuidar de verdade dos órgãos e da mente.",
      metrics: "-4kg de inchaço inflamatório • Fim do estufamento",
    },
    {
      name: "Renata Fagundes",
      age: "39 anos",
      role: "Aluna FITOCLIN",
      tag: "Ansiedade & Constância",
      stars: 5,
      headline: "“Os áudios e a comunidade me impediram de desistir no primeiro obstáculo.”",
      text: "Sempre começava na segunda-feira e parava na quarta. O apoio da psicóloga Luciane e os áudios da Dra. Isa para combater a autossabotagem mudaram minha chave mental. Ter o acompanhamento mensal faz toda diferença para manter a constância.",
      metrics: "6 meses de constância • Ansiedade sob controle",
    },
    {
      name: "Patrícia V. Guimarães",
      age: "58 anos",
      role: "Aluna FITOCLIN",
      tag: "Energia & Vitalidade",
      stars: 5,
      headline: "“Minha disposição aos 58 anos é maior do que quando eu tinha 40!”",
      text: "Sentia um cansaço absurdo às duas da tarde, parecia que a bateria acabava. Seguir os cinco pilares restaurou minha vitalidade. Até meus exames de sangue melhoraram e meu médico elogiou a evolução.",
      metrics: "Exames normalizados • Disposição o dia todo",
    },
  ];

  const whatsappPrints = [
    {
      src: "/WhatsApp Image 2026-07-20 at 18.23.30.jpeg",
      alt: "Relato no WhatsApp - Melhora no sono e disposição",
      caption: "Aluna compartilhando melhora imediata no sono e alívio de queimação",
    },
    {
      src: "/WhatsApp Image 2026-07-20 at 19.36.24.jpeg",
      alt: "Depoimento de aluna sobre intestino e bem-estar",
      caption: "Evolução digestiva e alívio de estufamento",
    },
    {
      src: "/WhatsApp Image 2026-07-20 at 19.36.52.jpeg",
      alt: "Depoimento de aluna sobre energia e constância",
      caption: "Celebração de metas alcançadas na comunidade",
    },
    {
      src: "/WhatsApp Image 2026-04-19 at 13.42.34.jpeg",
      alt: "Feedback sobre prescrição e chás",
      caption: "Prescrição personalizada com resultados na 1ª semana",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-[#020e07] text-white overflow-hidden border-t border-emerald-900/30">
      {/* Glows de fundo */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Transformações Reais</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Veja o que falam sobre o{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300">
              Clube Desinflama 360
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/70 font-light">
            Mulheres que decidiram desinflamar hábitos e hoje vivem com mais energia, sono reparador e intestino equilibrado.
          </p>

          {/* Seletor de 3 visualizações: Vídeos, Relatos, Prints */}
          <div className="mt-8 inline-flex flex-wrap justify-center p-1.5 rounded-2xl bg-emerald-950/70 border border-emerald-500/30 gap-1">
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "videos"
                  ? "bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
                  : "text-emerald-300/70 hover:text-white"
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Vídeos dos Testemunhos</span>
            </button>
            <button
              onClick={() => setActiveTab("relatos")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "relatos"
                  ? "bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
                  : "text-emerald-300/70 hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Relatos em Detalhes</span>
            </button>
            <button
              onClick={() => setActiveTab("prints")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "prints"
                  ? "bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
                  : "text-emerald-300/70 hover:text-white"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Prints da Comunidade</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Vídeos dos Testemunhos */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {videoTestimonials.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-emerald-950/60 via-[#031c10] to-[#021008] border-2 border-emerald-500/30 shadow-2xl p-5 sm:p-6 flex flex-col justify-between group hover:border-emerald-400/60 transition-all"
              >
                {/* Header do card de vídeo */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      Vídeo Depoimento Real
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-900/50 border border-emerald-500/20 text-emerald-300">
                    {item.tag}
                  </span>
                </div>

                {/* Player de Vídeo MP4 nativo com controles amigáveis */}
                <div className="relative w-full aspect-[9/16] max-h-[520px] rounded-2xl overflow-hidden bg-black shadow-inner border border-emerald-500/20 mb-4 mx-auto flex items-center justify-center">
                  <video
                    src={item.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain bg-black"
                  />
                </div>

                {/* Descrição abaixo do vídeo */}
                <div className="pt-2 border-t border-emerald-500/20">
                  <h4 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                    <span>{item.name}</span>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </h4>
                  <p className="text-xs text-emerald-100/75 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tab 2: Cards de Relatos Escritos com Grid */}
        {activeTab === "relatos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {textTestimonials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-3xl p-7 sm:p-8 bg-gradient-to-b from-emerald-950/40 via-[#041a10]/80 to-[#02130a] border border-emerald-500/25 shadow-xl flex flex-col justify-between hover:border-emerald-400/50 transition-all duration-300"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-emerald-500/15 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-500/20 text-emerald-300">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 leading-snug">
                    {item.headline}
                  </h3>

                  <p className="text-sm text-emerald-100/80 leading-relaxed font-light mb-6">
                    {item.text}
                  </p>
                </div>

                <div className="pt-4 border-t border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.name}</h4>
                    <p className="text-xs text-emerald-400/80">
                      {item.age} • {item.role}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs text-teal-300 bg-teal-950/40 px-3 py-1 rounded-lg border border-teal-500/20">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>{item.metrics}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tab 3: Prints de WhatsApp */}
        {activeTab === "prints" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatsappPrints.map((print, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative rounded-2xl overflow-hidden border border-emerald-500/30 bg-[#03150c] shadow-2xl group flex flex-col justify-between"
              >
                <div className="relative w-full aspect-[9/16] max-h-[480px] bg-black/40 overflow-hidden">
                  <Image
                    src={print.src}
                    alt={print.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <div className="p-4 bg-[#020e07] border-t border-emerald-500/20">
                  <p className="text-xs text-emerald-200/90 font-medium">
                    {print.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Disclaimer ético */}
        <div className="mt-12 text-center text-xs text-emerald-400/60 max-w-2xl mx-auto">
          * Os depoimentos em vídeo, áudio e texto expressam experiências individuais de participantes do Método FITOCLIN®. Os resultados podem variar conforme a resposta biológica, histórico e dedicação de cada participante.
        </div>
      </div>
    </section>
  );
}

