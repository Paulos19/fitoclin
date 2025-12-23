"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Consulta Avulsa",
    price: "R$ 650",
    period: "/sessão",
    description: "Para quem busca uma avaliação pontual ou segunda opinião especializada.",
    features: [
      "Anamnese completa (1h30)",
      "Análise de exames laboratoriais",
      "Prescrição Fitoterápica Personalizada",
      "Retorno em até 30 dias",
      "Acesso ao App Fitoclin (30 dias)",
    ],
    highlight: false,
    cta: "Agendar Consulta",
  },
  {
    name: "Acompanhamento Semestral",
    price: "R$ 290",
    period: "/mês",
    description: "O plano ideal para tratar condições crônicas e garantir evolução constante.",
    features: [
      "3 Consultas Completas (a cada 2 meses)",
      "Ajustes de prescrição ilimitados",
      "Canal direto com a Dra. Isa (WhatsApp)",
      "Desconto em Suplementos Parceiros",
      "Acesso Vitalício aos Materiais Educativos",
      "Monitoramento de exames contínuo",
    ],
    highlight: true, // Destaque visual
    cta: "Começar Acompanhamento",
  },
  {
    name: "Protocolo Anual VIP",
    price: "R$ 450",
    period: "/mês",
    description: "Gestão total da sua saúde e longevidade com prioridade máxima.",
    features: [
      "6 Consultas (Bimestrais + Emergenciais)",
      "Concierge de Saúde Exclusivo",
      "Avaliação Genética (Kit incluso)",
      "Consultas para familiares (2 vouchers)",
      "Acesso VIP a todos os Cursos",
      "Priority Pass na agenda",
    ],
    highlight: false,
    cta: "Aplicar para VIP",
  },
];

export function PricingSection() {
  return (
    <section id="planos" className="py-24 bg-[#062214] relative">
      {/* Detalhe de fundo central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#76A771]/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Invista na sua <span className="text-[#76A771]">Longevidade</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Escolha o modelo de cuidado que melhor se adapta ao seu momento de vida.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-8 border flex flex-col h-full ${
                plan.highlight 
                  ? "bg-[#0A311D]/80 border-[#76A771] shadow-2xl shadow-[#76A771]/10 scale-105 z-10" 
                  : "bg-[#062214] border-[#2A5432] hover:border-[#76A771]/50"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#76A771] text-[#062214] text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Mais Escolhido
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm h-10">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-500 text-sm font-medium">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className={`w-5 h-5 shrink-0 ${plan.highlight ? 'text-[#76A771]' : 'text-gray-500'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full h-12 rounded-full font-bold ${
                  plan.highlight 
                    ? "btn-gradient shadow-lg" 
                    : "bg-transparent border border-[#76A771]/30 text-[#76A771] hover:bg-[#76A771] hover:text-white"
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
        
        <p className="text-center text-gray-500 text-sm mt-12">
          * Os valores podem sofrer alterações. Para planos familiares ou corporativos, entre em contato.
        </p>

      </div>
    </section>
  );
}