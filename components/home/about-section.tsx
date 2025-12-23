"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Award, BookOpen, Globe, GraduationCap } from "lucide-react";
import Image from "next/image";

interface AboutProps {
  aboutText?: string | null;
  whatsapp?: string | null;
  instagram?: string | null;
}

export function AboutSection({ aboutText, whatsapp, instagram }: AboutProps) {
  // Texto padrão se não houver no banco
  const displayText = aboutText || "Com mais de 15 anos dedicados à medicina e ao ensino, minha missão é elevar o padrão da prática médica através da educação continuada de excelência. Cada curso e tratamento é desenvolvido com base em evidências científicas rigorosas e experiência clínica real.";

  const highlights = [
    { icon: GraduationCap, text: "Doutora em Medicina pela USP" },
    { icon: Award, text: "15+ anos de experiência clínica" },
    { icon: Globe, text: "Palestrante Internacional" },
    { icon: BookOpen, text: "Autora de 50+ artigos científicos" },
  ];

  const stats = [
    { value: "15+", label: "Anos de Experiência" },
    { value: "50+", label: "Artigos Publicados" },
    { value: "3+", label: "Cursos Criados" },
    { value: "5k+", label: "Vidas Transformadas" },
  ];

  return (
    <section id="sobre" className="py-24 bg-[#062214] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2A5432]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* FOTO */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-[#76A771]/20 shadow-2xl shadow-[#000000]/50 group">
              <Image
                src="/isa.png"
                alt="Dra. Isa"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062214]/80 via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-6 left-6 bg-[#062214]/90 backdrop-blur-md py-3 px-5 rounded-lg border-l-4 border-[#76A771] shadow-lg z-10">
                <p className="text-white font-bold text-lg">Dra. Isa</p>
                <p className="text-[#76A771] text-xs uppercase tracking-widest">Medicina pela USP</p>
              </div>
            </div>
          </motion.div>

          {/* TEXTO */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-[#76A771] font-semibold tracking-wider uppercase text-sm">
                Sobre a Especialista
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#F1F1F1] mt-2 leading-tight">
                Transformando a Medicina através da <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#76A771] to-[#2A5432]">Ciência e Educação</span>.
              </h2>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
              {displayText}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-[#0A311D]/50 border border-[#2A5432]/30 hover:border-[#76A771]/50 transition-colors">
                  <div className="p-2 bg-[#2A5432]/20 rounded-full text-[#76A771]">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-gray-200 text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 border-t border-[#2A5432]/30 pt-8">
              {stats.map((stat, index) => (
                <div key={index}>
                  <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Botão para Instagram ou Bio */}
            <div className="pt-4">
              <a href={instagram ? `https://instagram.com/${instagram.replace('@','')}` : "#"} target="_blank">
                <Button className="btn-gradient rounded-full px-8 h-12 text-base shadow-lg shadow-[#76A771]/20 hover:shadow-[#76A771]/40 transition-all">
                   Acompanhar no Instagram <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}