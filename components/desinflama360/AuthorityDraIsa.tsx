"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, GraduationCap, Microscope, HeartHandshake, Users, Sparkles, CheckCircle2 } from "lucide-react";

export default function AuthorityDraIsa() {
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
      desc: "Mais de duas décadas dedicadas ao estudo e aplicação da fitoterapia científica.",
    },
    {
      icon: Users,
      title: "+6.000 Atendimentos Clínicos",
      desc: "Milhares de vidas transformadas através da integração entre ciência e natureza.",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-[#020d06] text-white overflow-hidden border-t border-emerald-900/30">
      {/* Luz ambiente */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Coluna Esquerda: Foto Profissional da Dra. Isa */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-md rounded-3xl overflow-hidden bg-gradient-to-b from-emerald-950/80 via-[#041a10] to-[#021008] border border-emerald-500/40 p-4 shadow-2xl group"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-emerald-950/40">
                <Image
                  src="/banner-desinflama360.jpeg"
                  alt="Dra. Isa Bieski - Clube Desinflama 360 - Criadora do Método FITOCLIN"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021008] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-emerald-950/90 backdrop-blur-md p-4 rounded-xl border border-emerald-500/30 text-center">
                  <p className="font-serif text-lg font-bold text-white">
                    Dra. Isa Bieski
                  </p>
                  <p className="text-xs text-emerald-300 font-medium">
                    Criadora do Método FITOCLIN®
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Coluna Direita: Biografia e Credenciais */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Mentoria & Autoridade Científica</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight uppercase mb-6"
            >
              QUEM GUIARÁ VOCÊ NESSA JORNADA
            </motion.h2>

            <div className="space-y-4 text-base text-emerald-100/80 font-light leading-relaxed mb-8">
              <p>
                <strong className="text-white font-semibold">Dra. Isa Bieski</strong> é Farmacêutica clínica integrativa, bióloga, química, doutora em Ciências da Saúde e pós-doutora em Plantas Medicinais e Etnobotânica.
              </p>
              <p>
                Há mais de <strong className="text-emerald-300 font-semibold">20 anos</strong>, dedica sua trajetória ao estudo profundo da saúde, da fitoterapia e do cuidado integral do corpo humano.
              </p>
              <p>
                Criadora do consagrado <strong className="text-white font-semibold">Método FITOCLIN®</strong>, já realizou mais de <strong className="text-amber-300 font-semibold">6 mil atendimentos</strong>, integrando com maestria ciência, plantas medicinais, alimentação inteligente, movimento, motivação e fé.
              </p>
            </div>

            {/* Grid de Credenciais */}
            <div className="grid sm:grid-cols-2 gap-4">
              {credentials.map((cred, cIdx) => {
                const Icon = cred.icon;
                return (
                  <motion.div
                    key={cIdx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: cIdx * 0.08 }}
                    className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/20 hover:border-emerald-400/40 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white">{cred.title}</h4>
                    </div>
                    <p className="text-xs text-emerald-100/70 leading-relaxed pl-11">
                      {cred.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
