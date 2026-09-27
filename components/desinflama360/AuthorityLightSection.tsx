"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award,
  GraduationCap,
  Microscope,
  Users,
  Sparkles,
  ShieldCheck,
  Leaf,
} from "lucide-react";
import ThreeGlassCard from "./three/ThreeGlassCard";

export default function AuthorityLightSection() {
  const credentials = [
    {
      icon: GraduationCap,
      title: "Formação Multidisciplinar",
      desc: "Farmacêutica Clínica Integrativa, Bióloga e Química.",
    },
    {
      icon: Microscope,
      title: "Doutorado e Pós-Doutorado",
      desc: "Dra. em Ciências da Saúde e Pós-Doutora em Plantas Medicinais e Etnobotânica.",
    },
    {
      icon: Award,
      title: "+20 Anos de Dedicação",
      desc: "Mais de duas décadas dedicadas à pesquisa, comprovação e prática da fitoterapia científica.",
    },
    {
      icon: Users,
      title: "+6.000 Atendimentos Clínicos",
      desc: "Milhares de mulheres e famílias transformadas através do cuidado integrativo e natural.",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 text-[#0f2417] overflow-hidden">
      {/* Luz ambiente botânica */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-emerald-200/40 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Coluna Esquerda: Retrato Profissional em Moldura de Vidro Botânico */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-md rounded-3xl overflow-hidden bg-white/80 backdrop-blur-2xl border-2 border-white/95 p-4 shadow-[0_25px_60px_-15px_rgba(16,185,129,0.2)] group"
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-emerald-50">
                <Image
                  src="/banner-desinflama360.jpeg"
                  alt="Dra. Isa Bieski - Clube Desinflama 360 - Criadora do Método FITOCLIN"
                  fill
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/80 text-center shadow-xs">
                  <p className="font-serif text-lg font-bold text-[#0d2618]">
                    Dra. Isa Bieski
                  </p>
                  <p className="text-xs text-emerald-800 font-semibold tracking-wide flex items-center justify-center gap-1 mt-0.5">
                    <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                    <span>CRF-MT 1515 • Criadora do Método FITOCLIN®</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Coluna Direita: Bio e Credenciais Side a Side */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-300/80 shadow-xs text-emerald-950 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4"
            >
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Autoridade Científica e Clínica</span>
            </motion.div>

            {/* MANTER EXATO */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#0d2618] tracking-tight leading-tight uppercase"
            >
              QUEM GUIARÁ VOCÊ NESSA JORNADA
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 text-base sm:text-lg text-[#324f3e] leading-relaxed font-normal"
            >
              A <strong className="text-emerald-950 font-bold">Dra. Isa Bieski</strong> uniu duas décadas de pesquisa acadêmica, pós-doutorado e milhares de atendimentos clínicos para criar um método prático e seguro que trata a causa real da inflamação, e não apenas mascara os sintomas com medicamentos temporários.
            </motion.p>

            {/* Grid de 4 Credenciais em Vidro Fosco */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {credentials.map((c, idx) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                  >
                    <ThreeGlassCard
                      intensity={10}
                      gradientAccent="from-emerald-500/15 to-transparent"
                      className="p-5 h-full flex items-start gap-3.5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-100/80 border border-emerald-200/80 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#0d2618] mb-1">
                          {c.title}
                        </h4>
                        <p className="text-xs text-[#385544] leading-relaxed">
                          {c.desc}
                        </p>
                      </div>
                    </ThreeGlassCard>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-emerald-950 bg-emerald-50/90 border border-emerald-200/80 p-3.5 rounded-2xl">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Método registrado e comprovado cientificamente pelo Instituto Isa.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
