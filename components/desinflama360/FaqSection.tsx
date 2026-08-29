"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, CheckCircle2 } from "lucide-react";

export default function FaqSection() {
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
        "Sim. A prescrição será elaborada pela Dra. Isa a partir das respostas do Mapa FITOCLIN 360, considerando suas necessidades específicas, condições de saúde, sintomas relatados, medicamentos em uso e possíveis contraindicações. Quando necessário, poderão ser solicitadas informações complementares para garantir uma orientação mais segura e individualizada.",
    },
    {
      question: "Posso participar se uso medicamentos contínuos?",
      answer:
        "Sim, você pode participar perfeitamente. No entanto, você não deverá suspender nem modificar suas medicações por conta própria. Quaisquer alterações em remédios de uso contínuo devem ser alinhadas com o médico responsável.",
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
    <section className="relative py-20 md:py-28 bg-[#020e07] text-white overflow-hidden border-t border-emerald-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>Tire Suas Dúvidas</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight uppercase">
            PERGUNTAS FREQUENTES
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/80 font-light">
            Tudo o que você precisa saber sobre o Clube Desinflama 360 antes de iniciar.
          </p>
        </div>

        {/* Lista Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-emerald-950/50 border-emerald-400/60 shadow-lg shadow-emerald-950/50"
                    : "bg-[#03150c]/80 border-emerald-500/20 hover:border-emerald-500/40"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-emerald-500 text-black rotate-180"
                        : "bg-emerald-950 border border-emerald-500/30 text-emerald-300"
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
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-emerald-100/80 font-light leading-relaxed border-t border-emerald-500/15">
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
