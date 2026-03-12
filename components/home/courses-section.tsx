"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, ExternalLink, Image as ImageIcon, PlayCircle, Lock, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

// Interface atualizada para suportar categorização
interface Course {
  id: string;
  title: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  linkUrl: string | null;
  // Campo opcional para definir o tipo de rota interna (pode vir do banco futuramente)
  category?: 'STANDARD' | 'COMMUNITY' | 'SPECIALIZATION' | 'MEI';
  _count?: {
    modules: number;
  };
}

export function CoursesSection({ courses }: { courses: Course[] }) {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  if (courses.length === 0) return null;

  // Função auxiliar para determinar a rota interna correta
  const getInternalLink = (course: Course) => {
    switch (course.category) {
      case 'COMMUNITY':
        return `/community/course/${course.id}`;
      case 'SPECIALIZATION':
        return `/specialization/courses/${course.id}`;
      default:
        // Padrão para cursos gerais do dashboard
        return `/dashboard/courses/${course.id}`;
    }
  };

  return (
    <section id="cursos" className="py-24 bg-[#04180e] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#76A771]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#76A771] font-semibold tracking-wider uppercase text-sm flex items-center gap-2">
              <PlayCircle className="w-4 h-4" /> Educação Continuada
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
              Aprenda com a <span className="text-[#76A771]">Dra. Isa</span>
            </h2>
            <p className="text-gray-400 mt-4 text-lg">
              Cursos e formações desenvolvidos para aprofundar o seu conhecimento em saúde natural.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => {
            // Definição da lógica do botão principal
            const internalUrl = getInternalLink(course);
            const externalUrl = course.linkUrl || "/register";

            // Se logado: Vai para o curso. Se deslogado: Vai para venda.
            const targetUrl = isAuthenticated ? internalUrl : externalUrl;

            // Texto e Ícone dinâmicos
            const buttonText = isAuthenticated ? "Acessar Aula" : "Matricule-se Agora";
            const ButtonIcon = isAuthenticated ? Play : (course.linkUrl ? ExternalLink : ArrowRight);

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0A311D]/50 border border-[#2A5432] rounded-2xl overflow-hidden hover:border-[#76A771] hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full shadow-lg hover:shadow-[#76A771]/10"
              >
                <div className="relative h-52 w-full bg-[#062214] overflow-hidden">
                  {course.imageUrl ? (
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-[#2A5432]">
                      <ImageIcon className="w-16 h-16 opacity-30" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A311D] to-transparent opacity-60" />

                  {/* Badge de Preço ou Status */}
                  <div className="absolute top-4 right-4 bg-[#062214]/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[#76A771] text-xs font-bold border border-[#76A771]/30 shadow-xl flex items-center gap-2">
                    {!isAuthenticated && <Lock className="w-3 h-3" />}
                    {isAuthenticated
                      ? "Disponível"
                      : (course.price > 0
                        ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(course.price)
                        : "Gratuito")
                    }
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow relative">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#76A771] transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                    {course.description || "Sem descrição disponível."}
                  </p>

                  <div className="flex items-center gap-4 text-gray-500 text-xs mb-6 border-t border-[#2A5432]/50 pt-4 font-medium uppercase tracking-wide">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#76A771]" />
                      {course._count?.modules || 0} Módulos
                    </div>
                    <div className="w-1 h-1 bg-[#2A5432] rounded-full" />
                    <div>100% Online</div>
                  </div>

                  <Link
                    href={targetUrl}
                    target={!isAuthenticated && course.linkUrl ? "_blank" : "_self"}
                    className="w-full mt-auto"
                  >
                    <Button className={`w-full font-bold h-12 shadow-lg transition-all ${isAuthenticated
                        ? "bg-[#2A5432] text-white hover:bg-[#76A771] hover:text-[#062214]"
                        : "bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a] shadow-[#76A771]/20"
                      }`}>
                      {buttonText}
                      <ButtonIcon className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}