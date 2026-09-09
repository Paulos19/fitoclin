"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  Award,
  BookOpen,
  GraduationCap,
  Microscope,
  ArrowUpRight,
} from "lucide-react";

export default function PromoAuthorityIsa() {
  const credentials = [
    {
      icon: GraduationCap,
      title: "Doutora em Ciências da Saúde",
      desc: "Pesquisadora dedicada com produção científica em fitoterapia e saúde integral.",
    },
    {
      icon: Microscope,
      title: "Farmacêutica Clínica",
      desc: "Especialista em interações medicamentosas, plantas medicinais e segurança do paciente.",
    },
    {
      icon: BookOpen,
      title: "+20 Anos de Pesquisa",
      desc: "Duas décadas resgatando e validando cientificamente o poder curativo da natureza.",
    },
    {
      icon: Award,
      title: "Criadora do Método FITOCLIN®",
      desc: "Mais de 10.000 vidas transformadas através de rotinas integrativas e individualizadas.",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-white text-neutral-900 overflow-hidden">
      {/* Glows de fundo sutis */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Coluna da Imagem */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-[360px] lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden bg-neutral-50 border border-neutral-200/90 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)]">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/isa.jpeg"
                    alt="Dra. Isa Bieski"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Badge flutuante na foto */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-md">
                  <p className="text-sm font-extrabold text-[#0A1C12] flex items-center justify-between">
                    <span>Dra. Isa Bieski</span>
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                  </p>
                  <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                    Farmacêutica Clínica • Doutora em Ciências da Saúde
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Coluna da Biografia e Mensagem */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs sm:text-sm font-semibold tracking-wide">
              <Award className="w-4 h-4 text-emerald-700" />
              <span>Sua Mentora e Guia Científica</span>
            </div>

            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A1C12] tracking-tight leading-tight uppercase">
              EU VOU ACOMPANHAR VOCÊ NESTA JORNADA
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
              <p>
                Eu sou a <strong className="text-[#0A1C12] font-semibold">Dra. Isa Bieski</strong>, farmacêutica clínica, doutora em Ciências da Saúde e pesquisadora de plantas medicinais há mais de 20 anos.
              </p>
              <p>
                Criei o <strong className="text-emerald-800 font-semibold">Clube Desinflama 360</strong> para ajudar você a compreender os sinais do seu corpo e transformar conhecimento em cuidados possíveis para a sua rotina.
              </p>
              <p className="text-sm sm:text-base text-neutral-600">
                Você não precisa mais adivinhar qual chá tomar ou seguir dietas que não fazem sentido para o seu momento. Estarei ao seu lado para trazer clareza, ciência e acolhimento.
              </p>
            </div>

            {/* Credenciais em Grid Estilo Card Clínico */}
            <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
              {credentials.map((cred, idx) => {
                const IconC = cred.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#F8FAF9] border border-neutral-200/80 hover:border-emerald-500/40 hover:bg-white hover:shadow-sm transition-all duration-300 flex items-start gap-3.5 group"
                  >
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0 group-hover:bg-emerald-100/80 transition-colors">
                      <IconC className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-bold text-[#0A1C12]">{cred.title}</h4>
                      </div>
                      <p className="text-[11px] text-neutral-500 leading-relaxed mt-1">
                        {cred.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
