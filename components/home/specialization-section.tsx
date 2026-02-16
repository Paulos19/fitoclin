"use client";

import { motion } from "framer-motion";
import { GraduationCap, CheckCircle2, ArrowRight, PlayCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function SpecializationSection() {
  return (
    <section id="especializacao" className="py-24 relative overflow-hidden bg-[#0f0518]">
      {/* Background Gradients - Deep Purple Theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#2e1065] via-[#0f0518] to-[#0f0518] opacity-60" />
      
      {/* Abstract Shapes (Lilac Glows) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#a855f7]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c084fc]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Conteúdo Visual (Imagem) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 w-full relative group"
          >
            {/* Powerful Lilac Glow behind image */}
            <div className="absolute inset-0 bg-[#c084fc] blur-[80px] opacity-20 rounded-full scale-90 group-hover:opacity-40 transition-opacity duration-700" />
            
            <div className="relative rounded-3xl overflow-hidden border border-[#a855f7]/30 shadow-2xl shadow-[#581c87]/30 aspect-[4/3] lg:aspect-square bg-[#1a0b2e]">
               <Image 
                src="/2.png" 
                alt="Especialização Fitoclin" 
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay Gradient Purple */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0518] via-transparent to-transparent opacity-90" />

              {/* Floating Badge - Lilac Theme */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-[#1e1b4b]/80 backdrop-blur-md border border-[#c084fc]/30 p-4 rounded-xl flex items-center gap-4">
                  <div className="bg-[#c084fc] p-3 rounded-full text-[#0f0518] shadow-[0_0_15px_rgba(192,132,252,0.5)]">
                    <Star className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <p className="text-[#e9d5ff] text-xs font-bold uppercase tracking-wider">Certificação de Elite</p>
                    <p className="text-white font-semibold">Mestre em Fitoterapia</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Conteúdo de Texto */}
          <div className="flex-1 space-y-8">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3b0764]/50 border border-[#a855f7]/50 text-[#d8b4fe] text-sm font-semibold mb-6 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Inscrições Abertas 2026</span>
              </motion.div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.1]">
                Sua autoridade clínica <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e879f9] via-[#c084fc] to-[#a855f7]">
                  começa aqui.
                </span>
              </h2>
              
              <p className="text-[#d8b4fe]/80 text-lg leading-relaxed font-light">
                Não é apenas mais um curso. É a <strong>Especialização</strong> definitiva que une a ciência fitoterápica com a prática clínica de alto nível. Diferencie-se no mercado com uma metodologia única.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6">
              {[
                "Conteúdo 100% Baseado em Evidências",
                "Certificação Válida Nacionalmente",
                "Mentoria Mensal com Especialistas",
                "Acesso Vitalício ao Material",
                "Protocolos Prontos para Uso",
                "Grupo de Networking Premium"
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="bg-[#a855f7]/20 p-1 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-[#c084fc] shrink-0" />
                  </div>
                  <span className="text-gray-300 font-medium text-sm">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="/subscription" className="w-full sm:w-auto">
                <Button className="w-full h-14 bg-[#c084fc] text-[#2e1065] hover:bg-[#d8b4fe] font-bold text-lg rounded-xl shadow-[0_0_25px_rgba(192,132,252,0.4)] transition-all hover:scale-105 border border-[#e9d5ff]/20">
                  Quero ser Especialista
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/specialization" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full h-14 border-[#581c87] text-[#e9d5ff] hover:text-white hover:bg-[#581c87]/40 rounded-xl bg-transparent transition-all">
                  Ver Grade Curricular
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}