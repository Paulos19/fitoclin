"use client";

import { motion } from "framer-motion";
import { ArrowRight, Leaf, Droplets, Brain, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: 1,
    title: "Consulta Fitoterápica",
    description: "Avaliação completa para prescrição de plantas medicinais e fitofármacos personalizados.",
    icon: Leaf,
  },
  {
    id: 2,
    title: "Detox & Desinflamação",
    description: "Protocolos naturais de 21 dias para limpeza hepática e redução de inflamação crônica.",
    icon: Droplets,
  },
  {
    id: 3,
    title: "Saúde Mental Natural",
    description: "Tratamento integrativo para ansiedade, insônia e estresse sem dependência química.",
    icon: Brain,
  },
  {
    id: 4,
    title: "Reeducação Alimentar",
    description: "Planos alimentares anti-inflamatórios focados na sua bioquímica individual.",
    icon: Utensils,
  },
];

export function ServicesSection() {
  return (
    <section id="servicos" className="py-24 bg-[#062214] relative">
      {/* Detalhe de fundo */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2A5432]/50 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#76A771] font-semibold tracking-wider uppercase text-sm">
            Nossos Tratamentos
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#F1F1F1] mt-2">
            Como podemos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#76A771] to-[#2A5432]">ajudar você?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-[#0A311D] border border-[#2A5432] p-6 rounded-2xl hover:border-[#76A771] transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-12 h-12 bg-[#2A5432]/30 rounded-full flex items-center justify-center mb-6 text-[#76A771] group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>
              
              <a href="#" className="inline-flex items-center text-[#76A771] text-sm font-semibold hover:text-white transition-colors group-hover:translate-x-1 duration-300">
                Saiba mais <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}