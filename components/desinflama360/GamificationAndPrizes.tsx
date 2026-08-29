"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  Sparkles,
  CheckCircle2,
  Gift,
  Sprout,
  TreeDeciduous,
  Flower2,
  Leaf,
  Users,
  ShieldCheck,
  Star,
} from "lucide-react";

export default function GamificationAndPrizes() {
  const levels = [
    {
      level: "Nível 1",
      name: "Semente da Decisão",
      icon: Sprout,
      desc: "O momento em que você dá o primeiro passo e assume o compromisso com o seu corpo.",
      color: "from-amber-600/30 to-emerald-950/40",
      border: "border-amber-500/30",
    },
    {
      level: "Nível 2",
      name: "Raiz da Constância",
      icon: Leaf,
      desc: "Os primeiros hábitos começam a se fixar na sua rotina diária sem esforço forçado.",
      color: "from-emerald-600/30 to-emerald-950/40",
      border: "border-emerald-500/30",
    },
    {
      level: "Nível 3",
      name: "Folha da Transformação",
      icon: Leaf,
      desc: "O corpo responde visivelmente: o sono melhora, o intestino destrava e o inchaço diminui.",
      color: "from-teal-600/30 to-emerald-950/40",
      border: "border-teal-500/30",
    },
    {
      level: "Nível 4",
      name: "Flor do Equilíbrio",
      icon: Flower2,
      desc: "Mente serena, energia ativa e autocuidado integrado aos cinco pilares.",
      color: "from-rose-600/30 to-emerald-950/40",
      border: "border-rose-500/30",
    },
    {
      level: "Nível 5",
      name: "Jardim da Vitalidade",
      icon: TreeDeciduous,
      desc: "Consolidação total: uma mulher desinflamada, confiante e inspirando quem está ao seu redor.",
      color: "from-emerald-400/30 to-teal-950/40",
      border: "border-emerald-400/40",
      isMaster: true,
    },
  ];

  const waysToEarnLeaves = [
    "Cumprir as metas semanais de autocuidado",
    "Participar dos check-ins na plataforma",
    "Estar presente nos encontros ao vivo",
    "Concluir os desafios de 21 dias",
    "Compartilhar aprendizados na comunidade",
    "Celebrar conquistas individuais e coletivas",
    "Apoiar e incentivar outras participantes",
  ];

  const prizeItems = [
    { title: "E-books Exclusivos", desc: "Guias avançados de fitoterapia e desintoxicação" },
    { title: "Receitas Especiais", desc: "Pratos funcionais para ocasiões especiais" },
    { title: "Áudios Secretos", desc: "Reflexões inéditas da Dra. Isa para momentos chave" },
    { title: "Aulas Extras", desc: "Workshops temáticos de aprofundamento" },
    { title: "Análise Educativa da Rotina", desc: "Feedback especializado sobre o seu mapa" },
    { title: "Consulta com a Dra. Isa", desc: "Atendimento exclusivo para alunas mais constantes" },
    { title: "Cupons de Parceiros", desc: "Descontos especiais em produtos naturais e chás" },
    { title: "Participação em Sorteios", desc: "Prêmios surpresa ao longo dos 6 meses" },
    { title: "Sessões Individuais de Orientação", desc: "Alinhamento com profissionais da equipe" },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-[#03150c] text-white overflow-hidden border-t border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 14. Gamificação */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Jornada das Folhas</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight uppercase">
            SUA CONSTÂNCIA SERÁ RECONHECIDA
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/80 font-light leading-relaxed">
            Na <strong className="text-emerald-300 font-medium">Jornada das Folhas</strong>, você acumulará <strong className="text-white">Folhas da Transformação</strong> ao se dedicar ao seu processo.
          </p>
        </div>

        {/* Níveis da Gamificação */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {levels.map((lvl, index) => {
            const Icon = lvl.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`rounded-2xl p-6 bg-gradient-to-b ${lvl.color} border ${lvl.border} backdrop-blur-md flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-xl ${
                  lvl.isMaster ? "ring-2 ring-emerald-400/50 shadow-emerald-500/20" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 text-emerald-300">
                      {lvl.level}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {lvl.name}
                  </h3>

                  <p className="text-xs text-emerald-100/70 font-light leading-relaxed">
                    {lvl.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Como Acumular Folhas */}
        <div className="bg-[#020e07]/80 rounded-3xl p-6 sm:p-10 border border-emerald-500/25 mb-20 shadow-2xl">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span>Como você acumulará Folhas da Transformação:</span>
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {waysToEarnLeaves.map((way, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/15"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-emerald-100/90 font-medium">
                  {way}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 15. Premiações */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
            <Gift className="w-4 h-4 text-amber-400" />
            <span>Reconhecimento Real</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight uppercase">
            AQUI, O COMPROMETIMENTO VALE MAIS DO QUE A PERFEIÇÃO
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/80 font-light leading-relaxed">
            As participantes mais comprometidas poderão receber premiações especiais baseadas na sua constância e aplicação prática:
          </p>
        </div>

        {/* Grid de Premiações */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {prizeItems.map((prize, pIdx) => (
            <motion.div
              key={pIdx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: pIdx * 0.05 }}
              className="p-5 rounded-2xl bg-gradient-to-b from-amber-950/20 via-[#041a10] to-[#021008] border border-amber-500/20 hover:border-amber-400/40 transition-colors flex items-start gap-3.5"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Star className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-0.5">
                  {prize.title}
                </h4>
                <p className="text-xs text-emerald-100/70 font-light">
                  {prize.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Alerta de Ética */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#020d07] border border-emerald-500/30 text-center text-xs sm:text-sm text-emerald-300/90 max-w-3xl mx-auto">
          💡 <strong className="text-white">Importante:</strong> A premiação será baseada na <span className="underline">constância, na participação e na aplicação das atividades</span>, valorizando o seu esforço e respeito ao seu próprio ritmo, e não apenas números na balança.
        </div>
      </div>
    </section>
  );
}
