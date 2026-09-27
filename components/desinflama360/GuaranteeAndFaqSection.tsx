"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import ThreeGlassCard from "./three/ThreeGlassCard";

export default function GuaranteeAndFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Por quanto tempo terei acesso?",
      answer:
        "Você terá acesso completo ao Clube Desinflama 360, incluindo a plataforma de aulas, gravações, pílulas auditivas, bônus e comunidade, durante o período de seis meses.",
    },
    {
      question: "Os encontros ficarão gravados?",
      answer:
        "Sim. Todas as gravações completas dos 6 encontros ao vivo ficarão salvas e disponíveis na área de membros durante todo o seu período de acesso, para você assistir ou rever quantas vezes quiser.",
    },
    {
      question: "Preciso participar ao vivo?",
      answer:
        "A participação ao vivo é altamente recomendada para você interagir e tirar dúvidas em tempo real, mas caso não consiga por conta da sua rotina, você poderá acompanhar tranquilamente todas as gravações disponíveis.",
    },
    {
      question: "O Clube substitui atendimento médico?",
      answer:
        "Não. O Clube oferece educação em saúde integrativa e acompanhamento coletivo baseado em hábitos e fitoterapia. Ele não substitui avaliação médica, diagnóstico clínico ou tratamento médico individual.",
    },
    {
      question: "Receberei uma prescrição personalizada?",
      answer:
        "Sim. A prescrição será elaborada pela Dra. Isa a partir das respostas do MAPA METABÓLICO DESINFLAMA 360, considerando suas necessidades específicas, condições de saúde, sintomas relatados, medicamentos em uso e possíveis contraindicações.",
    },
    {
      question: "Posso participar se uso medicamentos contínuos?",
      answer:
        "Sim, você pode participar perfeitamente. No entanto, você não deverá suspender nem modificar suas medicações por conta própria. Quaisquer alterações em remédios de uso contínuo devem ser alinhadas com o seu médico.",
    },
    {
      question: "Onde acontecerá a comunidade?",
      answer:
        "A comunidade acontecerá no grupo exclusivo de alunas e também dentro da nossa área de membros fechada, onde você poderá trocar experiências, tirar dúvidas e comemorar suas conquistas.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-20 md:py-28 text-[#0f2417] overflow-hidden">
      {/* Luz ambiente botânica */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-r from-emerald-100/40 to-amber-100/30 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Box da Garantia Incondicional de 7 Dias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-8 sm:p-12 bg-white/80 backdrop-blur-2xl border-2 border-emerald-200/80 shadow-[0_20px_50px_-15px_rgba(16,185,129,0.12)] flex flex-col md:flex-row items-center gap-8 text-center md:text-left mb-20"
        >
          {/* Selo 7 Dias Dourado e Esmeralda */}
          <div className="relative shrink-0 flex items-center justify-center">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-amber-400 via-emerald-500 to-teal-600 p-[3px] shadow-[0_10px_35px_-5px_rgba(245,158,11,0.35)]">
              <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-center p-2">
                <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-amber-500 mb-0.5" />
                <span className="font-serif font-black text-2xl sm:text-3xl text-[#0d2618] leading-none">
                  7 DIAS
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-emerald-800 font-bold">
                  Garantia Total
                </span>
              </div>
            </div>
          </div>

          {/* Texto da Garantia */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Risco Zero Para Você</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#0d2618] tracking-tight uppercase">
              VOCÊ TERÁ SETE DIAS PARA CONHECER O CLUBE
            </h3>

            <p className="text-sm text-[#385544] leading-relaxed">
              Após a confirmação da inscrição, você poderá acessar imediatamente a plataforma, assistir às aulas, preencher seu Mapa Metabólico e explorar a comunidade.
            </p>

            <p className="text-xs text-[#50725d] leading-relaxed">
              Caso entenda que o Clube não é para você, basta solicitar o reembolso integral dentro do prazo de 7 dias na plataforma da Hotmart, com 1 clique e sem complicações.
            </p>
          </div>
        </motion.div>

        {/* Cabeçalho do FAQ */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-300/80 shadow-xs text-emerald-950 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4"
          >
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>Perguntas Frequentes</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl font-black text-[#0d2618] tracking-tight leading-tight uppercase"
          >
            DÚVIDAS FREQUENTES
          </motion.h2>

          <p className="mt-3 text-sm sm:text-base text-[#385544]">
            Respostas diretas e transparentes para você começar com total segurança.
          </p>
        </div>

        {/* Accordion do FAQ em Glassmorphism Botânico */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-2xl overflow-hidden border border-white/95 bg-white/75 backdrop-blur-xl shadow-2xs transition-all duration-300 hover:border-emerald-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0d2618] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-emerald-100 text-emerald-800" : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#385544] leading-relaxed border-t border-emerald-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
