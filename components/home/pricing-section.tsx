"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string; // "item 1; item 2; item 3"
  highlight: boolean;
  buttonText: string;
  buttonLink?: string | null;
}

export function PricingSection({ plans }: { plans: Plan[] }) {
  if (plans.length === 0) return null;

  return (
    <section id="planos" className="py-24 bg-[#062214] relative">
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

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => {
            // Converte a string "feat1; feat2" em array
            const featuresList = plan.features.split(';').map(f => f.trim()).filter(Boolean);

            return (
              <motion.div
                key={plan.id}
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
                    <ShieldCheck className="w-3 h-3" /> Recomendado
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                </div>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-500 text-sm font-medium ml-1">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {featuresList.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className={`w-5 h-5 shrink-0 ${plan.highlight ? 'text-[#76A771]' : 'text-gray-500'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.buttonLink ? (
                  <a href={plan.buttonLink} target="_blank" className="w-full">
                    <Button 
                      className={`w-full h-12 rounded-full font-bold ${
                        plan.highlight 
                          ? "btn-gradient shadow-lg" 
                          : "bg-transparent border border-[#76A771]/30 text-[#76A771] hover:bg-[#76A771] hover:text-white"
                      }`}
                    >
                      {plan.buttonText || "Assinar Agora"}
                    </Button>
                  </a>
                ) : (
                  <Button disabled className="w-full h-12 rounded-full border border-gray-700 text-gray-500 bg-transparent">
                    Indisponível
                  </Button>
                )}
              </motion.div>
            );
          })}
        </div>
        
        <p className="text-center text-gray-500 text-sm mt-12">
          * Valores sujeitos a alteração. Planos corporativos sob consulta.
        </p>

      </div>
    </section>
  );
}