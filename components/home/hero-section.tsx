"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const images = [
  "/1.png",
  "/2.png",
  "/3.png",
  "/4.png",
];

const heroContent = {
  title: "Saúde Integrativa & Fitoterapia Avançada",
  subtitle: "Descubra o poder da natureza aliado à ciência com o Método Fitoclin da Dra. Isa. Tratamentos personalizados para o seu bem-estar pleno.",
};

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-play do slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
      
      {/* Background Image Slider */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }} // Opacity 0.6 para dar contraste com o texto branco
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[currentImage]}
            alt="Ambiente Fitoclin"
            fill
            className="object-cover"
            priority={true} // Importante para LCP (Largest Contentful Paint)
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay Gradiente para legibilidade extra */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center md:text-left">
        <div className="max-w-3xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-secondary/30 border border-secondary/50 text-secondary-foreground text-sm font-semibold mb-4 backdrop-blur-sm">
              Bem-vindo à Fitoclin
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {heroContent.title}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-200 max-w-xl"
          >
            {heroContent.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full text-lg h-14 px-8">
              Agendar Avaliação
            </Button>
            <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white hover:text-primary rounded-full text-lg h-14 px-8 backdrop-blur-sm bg-white/10">
              Conhecer o Método <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Indicadores do Slider */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImage ? "bg-primary w-8" : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}