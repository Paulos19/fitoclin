"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpenCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function SpecializationSection() {
  return (
    <section id="especializacao" className="py-24 bg-[#0A311D] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute left-[-10%] top-[20%] w-[500px] h-[500px] bg-[#76A771] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Conteúdo Visual (Imagem ou Mockup) */}
          <div className="flex-1 w-full relative">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#2A5432] shadow-2xl shadow-[#76A771]/10">
               {/* Substitua pelo banner real da especialização se tiver */}
               <div className="absolute inset-0 bg-[#062214] flex items-center justify-center">
                  <GraduationCap className="w-24 h-24 text-[#76A771] opacity-20" />
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#062214] to-transparent opacity-80" />
               
               <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline-flex items-center gap-2 bg-[#76A771] text-[#062214] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                    <Award className="w-4 h-4" /> Formação Certificada
                  </div>
                  <h3 className="text-2xl font-bold text-white">Fitoterapia Clínica Integrativa</h3>
               </div>
            </div>
            
            {/* Stats Flutuantes */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-6 -right-6 bg-[#062214] border border-[#2A5432] p-4 rounded-xl shadow-xl hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#2A5432]/30 p-2 rounded-lg">
                  <BookOpenCheck className="w-6 h-6 text-[#76A771]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">120h</p>
                  <p className="text-xs text-gray-400 uppercase">Carga Horária</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Conteúdo de Texto (Copywriting) */}
          <div className="flex-1 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Eleve sua carreira com a <br/>
                <span className="text-[#76A771]">Especialização Fitoclin</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Não é apenas um curso, é uma jornada completa para profissionais de saúde que desejam dominar a prescrição de fitoterápicos com segurança, embasamento científico e prática clínica.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                "Metodologia validada com casos clínicos reais",
                "Certificado reconhecido e válido em todo território nacional",
                "Acesso a mentorias exclusivas com a Dra. Isa",
                "Material didático completo e atualizado"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#2A5432] flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#76A771]" />
                  </div>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/subscription" className="flex-1">
                <Button className="w-full h-12 bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a] font-bold text-base shadow-lg shadow-[#76A771]/20">
                  Quero ser Especialista
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/specialization" className="flex-1">
                <Button variant="outline" className="w-full h-12 border-[#2A5432] text-[#76A771] hover:bg-[#2A5432] hover:text-white bg-transparent font-bold text-base">
                  Ver Dashboard
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}