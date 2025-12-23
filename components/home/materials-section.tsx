"use client";

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Mocks - Futuramente virão do banco de dados
const materials = [
  {
    id: 1,
    title: "Guia de Chás Medicinais",
    category: "E-book Gratuito",
    image: "/1.png", // Placeholder, idealmente seria a capa do ebook
  },
  {
    id: 2,
    title: "Manual do Sono Reparador",
    category: "Checklist",
    image: "/2.png",
  },
];

export function MaterialsSection() {
  return (
    <section className="py-24 bg-[#0A311D] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Materiais Exclusivos
            </h2>
            <p className="text-gray-300 text-lg">
              Conteúdos preparados com carinho pela Dra. Isa para você começar sua jornada de saúde hoje mesmo.
            </p>
          </div>
          <Button variant="outline" className="border-[#76A771] text-[#76A771] hover:bg-[#76A771] hover:text-white transition-colors">
            Ver Biblioteca Completa
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {materials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-2xl aspect-[21/9] border border-[#2A5432]"
            >
              {/* Imagem de Fundo com Overlay */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062214] via-[#062214]/80 to-transparent p-8 flex flex-col justify-end">
                <span className="text-[#76A771] text-xs font-bold uppercase tracking-wider mb-2">
                  {item.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                
                <Button className="w-fit bg-white/10 hover:bg-white text-white hover:text-[#062214] backdrop-blur-sm border-0 transition-all">
                  <Download className="mr-2 w-4 h-4" /> Baixar Agora
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}