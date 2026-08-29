"use client";

import React from "react";
import { motion } from "framer-motion";
import { XCircle, ShieldAlert } from "lucide-react";

export default function NotForWhoSection() {
  const notForItems = [
    {
      title: "Procura uma solução milagrosa do dia para a noite",
      desc: "Desinflamar o organismo exige processo biológico, respeito ao tempo celular e construção de novos hábitos.",
    },
    {
      title: "Deseja resultados sem aplicar as atividades propostas",
      desc: "O Clube entrega a rota e o suporte, mas a transformação depende da sua decisão em colocar as práticas em ação.",
    },
    {
      title: "Não está disposta a rever seus hábitos atuais",
      desc: "Não é possível colher resultados diferentes mantendo exatamente os mesmos comportamentos que inflamaram seu corpo.",
    },
    {
      title: "Procura substituir acompanhamento médico ou tratamento individual",
      desc: "O Clube oferece educação em saúde integrativa e acompanhamento coletivo. Não substitui consultas, diagnósticos ou tratamentos médicos.",
    },
    {
      title: "Deseja apenas acumular conteúdos sem colocá-los em prática",
      desc: "Nosso foco é ação simples e aplicável. Não queremos que você fique sobrecarregada de teoria sem viver a mudança.",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-[#020a05] text-white overflow-hidden border-t border-emerald-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/30 text-red-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>Alinhamento & Transparência</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight uppercase">
            PARA QUEM NÃO É O CLUBE
          </h2>

          <p className="mt-3 text-sm sm:text-base text-emerald-100/70 font-light">
            Presamos pela verdade e pela responsabilidade com a sua saúde. O Clube <strong className="text-white">NÃO</strong> é indicado para quem:
          </p>
        </div>

        <div className="space-y-4">
          {notForItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-5 rounded-2xl bg-red-950/20 border border-red-500/20 flex items-start gap-4 hover:border-red-500/40 transition-colors"
            >
              <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-emerald-100/70 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
