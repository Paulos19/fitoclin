"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const images = [
  "/1.png",
  "/2.png",
  "/3.png",
  "/4.png",
];

const heroContent = {
  badge: "Medicina Integrativa & Fitoterapia",
  title: "A Ciência da Natureza a favor da sua Saúde",
  subtitle: "O Método Fitoclin une a sabedoria ancestral das plantas com a precisão da medicina moderna para tratar a causa, não apenas os sintomas.",
};

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-background">
      
      {/* Background Image Slider */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.5, scale: 1 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[currentImage]}
            alt="Ambiente Fitoclin"
            fill
            className="object-cover"
            priority={true}
          />
        </motion.div>
      </AnimatePresence>

      {/* GRADIENTE DE FADE-IN (Mágico) */}
      {/* Vai do transparente no topo até a cor solida do fundo (#062214) embaixo */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#062214] via-[#062214]/60 to-transparent" />
      
      {/* Overlay radial para focar no centro/texto */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-transparent via-[#062214]/40 to-[#062214]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#2A5432]/30 border border-[#76A771]/30 text-[#76A771] text-sm font-semibold backdrop-blur-md uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> {heroContent.badge}
            </span>
          </motion.div>

          {/* Título com Gradiente */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            <span className="text-gradient block">
              {heroContent.title}
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            {heroContent.subtitle}
          </motion.p>

          {/* Botões */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 pt-6 justify-center"
          >
            {/* Botão Principal com Gradiente Linear */}
            <Button size="lg" className="btn-gradient rounded-full text-lg h-14 px-10">
              Agendar Avaliação
            </Button>
            
            {/* Botão Secundário Outline */}
            <Button size="lg" variant="outline" className="border-[#76A771]/50 text-[#F1F1F1] hover:bg-[#76A771]/10 hover:text-white rounded-full text-lg h-14 px-10 bg-transparent backdrop-blur-sm">
              Conhecer o Método <ArrowRight className="ml-2 w-5 h-5 text-[#76A771]" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}