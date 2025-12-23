"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, ExternalLink, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Interface para os dados que vêm do Prisma
interface Course {
  id: string;
  title: string;
  description: string;
  price?: string | null;
  imageUrl?: string | null;
  linkUrl?: string | null;
}

export function CoursesSection({ courses }: { courses: Course[] }) {
  if (courses.length === 0) return null; // Não mostra a seção se não houver cursos

  return (
    <section id="cursos" className="py-24 bg-[#04180e] relative">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#76A771] font-semibold tracking-wider uppercase text-sm">
              Educação Continuada
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Aprenda com a <span className="text-[#76A771]">Dra. Isa</span>
            </h2>
            <p className="text-gray-400 mt-4 text-lg">
              Cursos e formações desenvolvidos para profissionais e pacientes.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0A311D] border border-[#2A5432] rounded-2xl overflow-hidden hover:border-[#76A771] transition-all duration-300 group flex flex-col h-full"
            >
              {/* Imagem de Capa do Curso */}
              <div className="relative h-48 w-full bg-[#062214]">
                {course.imageUrl ? (
                  <Image 
                    src={course.imageUrl} 
                    alt={course.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-[#2A5432]">
                    <ImageIcon className="w-12 h-12 opacity-20" />
                  </div>
                )}
                {/* Badge de Preço */}
                <div className="absolute top-4 right-4 bg-[#062214]/90 backdrop-blur px-3 py-1 rounded-full text-[#76A771] text-xs font-bold border border-[#76A771]/30">
                   {course.price || "Grátis"}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#76A771] transition-colors line-clamp-2">
                  {course.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 text-gray-500 text-sm mb-6 border-t border-[#2A5432]/50 pt-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> 100% Online
                  </div>
                </div>

                {course.linkUrl ? (
                  <a href={course.linkUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full btn-gradient">
                      Inscreva-se Agora <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                ) : (
                  <Button disabled className="w-full bg-[#2A5432]/20 text-gray-500">
                    Em Breve
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}