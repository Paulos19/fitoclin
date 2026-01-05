"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Interface alinhada com o objeto convertido
interface Plan {
  id: string;
  name: string;
  price: number; // 👈 Espera number
  period: string;
  features: string; 
  highlight: boolean;
  buttonText: string; // Obrigatório no banco, garantido no page ou default
  buttonLink: string | null;
}

export function PricingSection({ plans }: { plans: Plan[] }) {
  if (plans.length === 0) return null;

  return (
    <section id="planos" className="py-24 bg-[#062214] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#76A771]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Invista na sua <span className="text-[#76A771]">Longevidade</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Escolha o modelo de acompanhamento ideal para transformar a sua saúde.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const featuresList = plan.features.split(';').map(f => f.trim()).filter(Boolean);

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`relative rounded-3xl p-8 border flex flex-col h-full transition-all duration-300 ${
                  plan.highlight 
                    ? "bg-[#0A311D] border-[#76A771] shadow-2xl shadow-[#76A771]/15 scale-105 z-10" 
                    : "bg-[#062214]/50 border-[#2A5432] hover:border-[#76A771]/50 hover:bg-[#0A311D]/30"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#76A771] text-[#062214] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg">
                    <ShieldCheck className="w-3.5 h-3.5" /> Recomendado
                  </div>
                )}

                <div className="mb-6 text-center md:text-left">
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <div className="h-1 w-12 bg-[#2A5432] rounded-full mx-auto md:mx-0 mt-3" />
                </div>

                <div className="mb-8 flex items-baseline justify-center md:justify-start gap-1">
                  <span className="text-sm text-gray-400 font-medium">R$</span>
                  <span className="text-5xl font-bold text-white tracking-tighter">
                    {/* Formatação correta de número */}
                    {plan.price.toFixed(0)}
                  </span>
                  <span className="text-gray-500 text-sm font-medium">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {featuresList.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                      <div className={`mt-0.5 p-0.5 rounded-full shrink-0 ${plan.highlight ? 'bg-[#76A771] text-[#062214]' : 'bg-[#2A5432] text-white'}`}>
                         <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.buttonLink || "/register"} className="w-full mt-auto">
                  <Button 
                    className={`w-full h-12 rounded-xl font-bold text-base transition-all duration-300 ${
                      plan.highlight 
                        ? "bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a] shadow-lg shadow-[#76A771]/20 hover:shadow-[#76A771]/40" 
                        : "bg-transparent border border-[#76A771]/30 text-[#76A771] hover:bg-[#76A771] hover:text-[#062214]"
                    }`}
                  >
                    {plan.buttonText || "Assinar Agora"}
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>
        
        <p className="text-center text-gray-500 text-xs mt-16 opacity-60">
          * Valores sujeitos a alteração sem aviso prévio. Planos corporativos sob consulta.
        </p>

      </div>
    </section>
  );
}