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

interface HeroProps {
  title?: string | null;
  subtitle?: string | null;
}

export function HeroSection({ title, subtitle }: HeroProps) {
  const [currentImage, setCurrentImage] = useState(0);

  // Defaults caso o banco esteja vazio
  const displayTitle = title || "A Ciência da Natureza a favor da sua Saúde";
  const displaySubtitle = subtitle || "O Método Fitoclin une a sabedoria ancestral das plantas com a precisão da medicina moderna para tratar a causa, não apenas os sintomas.";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-background">
      
      {/* Slider de Imagens */}
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

      <div className="absolute inset-0 bg-gradient-to-t from-[#062214] via-[#062214]/60 to-transparent" />
      <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-transparent via-[#062214]/40 to-[#062214]" />

      <div className="relative z-10 container mx-auto px-6 pt-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#2A5432]/30 border border-[#76A771]/30 text-[#76A771] text-sm font-semibold backdrop-blur-md uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Medicina Integrativa & Fitoterapia
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            <span className="text-gradient block">
              {displayTitle}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            {displaySubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 pt-6 justify-center"
          >
            <Button size="lg" className="btn-gradient rounded-full text-lg h-14 px-10">
              Agendar Avaliação
            </Button>
            
            <Button size="lg" variant="outline" className="border-[#76A771]/50 text-[#F1F1F1] hover:bg-[#76A771]/10 hover:text-white rounded-full text-lg h-14 px-10 bg-transparent backdrop-blur-sm">
              Conhecer o Método <ArrowRight className="ml-2 w-5 h-5 text-[#76A771]" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}