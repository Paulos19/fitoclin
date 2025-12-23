"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data - Futuramente virá do banco de dados
const courses = [
  {
    id: 1,
    title: "Fitoterapia Clínica Baseada em Evidências",
    category: "Formação Profissional",
    students: "1.2k+ Alunos",
    rating: 4.9,
    description: "Domine a prescrição de fitoterápicos com segurança e fundamentação científica para aplicar no consultório.",
    status: "Inscrições Abertas",
  },
  {
    id: 2,
    title: "Suplementação Inteligente",
    category: "Curso Avançado",
    students: "850+ Alunos",
    rating: 5.0,
    description: "Aprenda a modular a bioquímica do paciente através da suplementação assertiva e personalizada.",
    status: "Lista de Espera",
  },
  {
    id: 3,
    title: "Gestão de Carreira Médica",
    category: "Mentoria",
    students: "300+ Alunos",
    rating: 4.8,
    description: "Estratégias para médicos que desejam elevar o valor do seu atendimento e fidelizar pacientes.",
    status: "Vagas Limitadas",
  },
];

export function CoursesSection() {
  return (
    <section id="cursos" className="py-24 bg-[#04180e] relative"> {/* Fundo levemente mais escuro para contraste */}
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
              Cursos desenvolvidos para profissionais de saúde e pacientes que buscam conhecimento profundo e aplicável.
            </p>
          </div>
          <Button variant="link" className="text-[#76A771] hover:text-white transition-colors p-0 text-base">
            Ver todos os cursos <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0A311D] border border-[#2A5432] rounded-2xl overflow-hidden hover:border-[#76A771] transition-all duration-300 group flex flex-col h-full"
            >
              {/* Header do Card */}
              <div className="p-1 h-2 bg-gradient-to-r from-[#2A5432] to-[#76A771]" />
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-[#062214] text-[#76A771] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-[#2A5432]">
                    {course.category}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                    <Star className="w-4 h-4 fill-current" /> {course.rating}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#76A771] transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 text-gray-500 text-sm mb-6 border-t border-[#2A5432]/50 pt-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> {course.students}
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Online
                  </div>
                </div>

                <Button className={`w-full ${course.status === 'Inscrições Abertas' ? 'btn-gradient' : 'bg-[#2A5432]/20 text-gray-300 hover:bg-[#2A5432]/40'}`}>
                  {course.status === 'Inscrições Abertas' ? 'Inscreva-se Agora' : course.status}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}