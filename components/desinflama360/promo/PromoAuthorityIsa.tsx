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
  ShieldCheck,
  Heart,
  CheckCircle2,
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
    <section className="relative py-20 md:py-28 bg-[#020e07] text-white overflow-hidden border-t border-emerald-900/30">
      {/* Glows de fundo */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Coluna da Imagem */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-[380px] lg:max-w-none">
              {/* Moldura iluminada */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/40 via-amber-400/40 to-teal-500/40 rounded-3xl blur-xl opacity-75" />

              <div className="relative rounded-3xl overflow-hidden bg-[#031c10] border-2 border-emerald-500/40 shadow-2xl">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/isa.jpeg"
                    alt="Dra. Isa Bieski"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020d07] via-transparent to-transparent opacity-70" />
                </div>

                {/* Badge inferior na foto */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[#02130a]/90 backdrop-blur-md border border-emerald-500/30">
                  <p className="text-sm font-bold text-white flex items-center justify-between">
                    <span>Dra. Isa Bieski</span>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </p>
                  <p className="text-xs text-emerald-300 font-medium">
                    Farmacêutica Clínica • Doutora em Ciências da Saúde
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Coluna da Biografia e Mensagem */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-widest">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Sua Mentora e Guia</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase">
              EU VOU ACOMPANHAR VOCÊ NESTA JORNADA
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-emerald-100/90 font-light leading-relaxed">
              <p>
                Eu sou a <strong className="text-white font-semibold">Dra. Isa Bieski</strong>, farmacêutica clínica, doutora em Ciências da Saúde e pesquisadora de plantas medicinais há mais de 20 anos.
              </p>
              <p>
                Criei o <strong className="text-amber-300 font-semibold">Clube Desinflama 360</strong> para ajudar você a compreender os sinais do seu corpo e transformar conhecimento em cuidados possíveis para a sua rotina.
              </p>
              <p className="text-sm sm:text-base text-emerald-200/80">
                Você não precisa mais adivinhar qual chá tomar ou seguir dietas que não fazem sentido para o seu momento. Estarei ao seu lado para trazer clareza, ciência e acolhimento.
              </p>
            </div>

            {/* Credenciais em Grid */}
            <div className="grid sm:grid-cols-2 gap-3.5 pt-4">
              {credentials.map((cred, idx) => {
                const IconC = cred.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 flex items-start gap-3"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                      <IconC className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{cred.title}</h4>
                      <p className="text-[11px] text-emerald-200/70 leading-tight mt-0.5">
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
