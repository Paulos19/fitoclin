"use client";

import { motion } from "framer-motion";
import { FileText, ArrowRight, Lock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

// Interface para os materiais vindos do Banco de Dados
// O page.tsx precisará buscar: ModuleMaterial -> Module -> Course
export interface MaterialHighlight {
  id: string;
  title: string; // Nome do arquivo/material
  courseId: string;
  courseTitle: string;
  courseImage: string | null;
  moduleTitle: string;
}

export function MaterialsSection({ materials }: { materials: MaterialHighlight[] }) {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  // Se não houver materiais, não renderiza a seção
  if (!materials || materials.length === 0) return null;

  return (
    <section className="py-24 bg-[#0A311D] relative overflow-hidden">
      {/* Elemento decorativo de fundo */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#76A771]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#76A771] font-semibold tracking-wider uppercase text-sm mb-2 block">
              Biblioteca de Apoio
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Materiais Complementares
            </h2>
            <p className="text-gray-300 text-lg">
              Acesse e-books, planilhas e guias exclusivos disponíveis dentro dos nossos cursos.
            </p>
          </div>
          
          {/* Opcional: Link para ver todos os cursos se quiser */}
          <Link href="/#cursos">
            <Button variant="outline" className="border-[#76A771] text-[#76A771] hover:bg-[#76A771] hover:text-[#062214] transition-colors">
              Ver Cursos Disponíveis
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {materials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-2xl aspect-[21/9] border border-[#2A5432] bg-[#062214]"
            >
              {/* Imagem de Fundo (Capa do Curso) */}
              {item.courseImage ? (
                <Image
                  src={item.courseImage}
                  alt={item.courseTitle}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[#062214]">
                    <BookOpen className="w-16 h-16 text-[#2A5432]" />
                </div>
              )}

              {/* Overlay Gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#062214] via-[#062214]/90 to-transparent p-8 flex flex-col justify-end">
                
                {/* Tag do Curso */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#76A771] text-[#062214] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        Material de Apoio
                    </span>
                    <span className="text-gray-400 text-xs truncate max-w-[200px]">
                        {item.courseTitle}
                    </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-1 line-clamp-1">
                    {item.title}
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                    Módulo: {item.moduleTitle}
                </p>
                
                {/* Botão de Ação */}
                <Link href={`/dashboard/courses/${item.courseId}`}>
                    <Button className="w-fit bg-white/10 hover:bg-[#76A771] text-white hover:text-[#062214] backdrop-blur-sm border border-white/10 hover:border-[#76A771] transition-all h-10 px-6">
                    {isAuthenticated ? (
                        <>
                            <FileText className="mr-2 w-4 h-4" /> Acessar no Curso
                        </>
                    ) : (
                        <>
                            <Lock className="mr-2 w-4 h-4" /> Ver Curso
                        </>
                    )}
                    </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}