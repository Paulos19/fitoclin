"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Video,
  CalendarCheck,
  HelpCircle,
  Sparkles,
  Target,
  Award,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function LiveMentorshipSection() {
  const meetingItems = [
    {
      icon: Target,
      title: "Compreender o Tema Central do Mês",
      desc: "Imersão profunda na temática específica para direcionar seus esforços com máxima clareza.",
    },
    {
      icon: Sparkles,
      title: "Aplicar os 5 Pilares no Dia a Dia",
      desc: "Orientações práticas de como encaixar plantas, alimentação, movimento, motivação e fé na sua rotina.",
    },
    {
      icon: CheckCircle2,
      title: "Corrigir os Principais Erros",
      desc: "Identifique rapidamente ajustes finos para não perder tempo com hábitos que não funcionam.",
    },
    {
      icon: HelpCircle,
      title: "Apresentar Dúvidas Coletivas",
      desc: "Momento exclusivo para responder às maiores perguntas e desafios enfrentados pelas alunas.",
    },
    {
      icon: CalendarCheck,
      title: "Conhecer a Missão Mensal",
      desc: "Receba tarefas claras e focadas para dar o próximo passo com segurança e determinação.",
    },
    {
      icon: Award,
      title: "Celebrar a Evolução & Preparar o Futuro",
      desc: "Reconhecimento das suas vitórias e alinhamento do próximo ciclo de crescimento.",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-[#03140b] text-white overflow-hidden border-t border-emerald-900/30">
      {/* Luz ambiente */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Coluna Esquerda: Texto e Lista */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4"
            >
              <Video className="w-4 h-4 text-emerald-400" />
              <span>Acompanhamento Próximo</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight uppercase mb-6"
            >
              SEIS ENCONTROS AO VIVO PARA ORIENTAR SUA EVOLUÇÃO
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base sm:text-lg text-emerald-100/80 font-light mb-8 leading-relaxed"
            >
              Você terá <strong className="text-white font-medium">um encontro por mês com a Dra. Isa</strong> diretamente pela plataforma para receber direção, tirar dúvidas e ajustar sua rota.
            </motion.p>

            {/* Grid dos Itens */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {meetingItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/20 hover:border-emerald-400/40 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    </div>
                    <p className="text-xs text-emerald-100/70 leading-relaxed pl-11">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Aviso sobre Gravações */}
            <div className="p-4 rounded-xl bg-[#020e07] border border-emerald-500/30 flex items-center gap-3 text-xs sm:text-sm text-emerald-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                <strong>Não pode estar ao vivo?</strong> Fique tranquila: todas as gravações completas ficarão disponíveis na área de membros durante todo o período do seu acesso.
              </span>
            </div>
          </div>

          {/* Coluna Direita: Card Visual com Foto da Dra. Isa */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-md rounded-3xl overflow-hidden bg-gradient-to-b from-emerald-950/80 via-[#041a10] to-[#021008] border border-emerald-500/30 p-6 shadow-2xl"
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-emerald-950/50">
                <Image
                  src="/isa.png"
                  alt="Dra. Isa Bieski - Mentora do Clube Desinflama 360"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021008] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-emerald-950/90 backdrop-blur-md p-3.5 rounded-xl border border-emerald-500/30">
                  <p className="text-xs font-bold text-white uppercase tracking-wider">
                    Dra. Isa Bieski
                  </p>
                  <p className="text-[11px] text-emerald-300">
                    Mentoria Mensal Ao Vivo com Você
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-emerald-100/80">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/20">
                  <span className="text-emerald-300 font-medium">Frequência:</span>
                  <span className="font-bold text-white">1 Encontro Mensal (6 no total)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/20">
                  <span className="text-emerald-300 font-medium">Formato:</span>
                  <span className="font-bold text-white">Online & Ao Vivo com Gravação</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/20">
                  <span className="text-emerald-300 font-medium">Acesso:</span>
                  <span className="font-bold text-emerald-400">Exclusivo para Alunas</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
