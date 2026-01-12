"use client";

import { Course } from "@prisma/client";
import { motion } from "framer-motion";
import { PlayCircle, Clock, BookOpen, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// 👇 CORREÇÃO: Definimos um tipo customizado onde 'price' é number
interface FormattedCourse extends Omit<Course, "price"> {
  price: number;
}

interface FeaturedBannerProps {
  // Usamos o tipo formatado aqui
  course: FormattedCourse & { _count: { modules: number } };
}

export function FeaturedBanner({ course }: FeaturedBannerProps) {
  if (!course) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full overflow-hidden rounded-3xl bg-[#062214] text-white shadow-2xl group"
    >
      {/* Background & Texture Effects */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
      <div className="absolute -right-20 -top-40 h-[500px] w-[500px] rounded-full bg-[#2A5432] blur-[100px] opacity-60" />
      <div className="absolute -left-20 -bottom-40 h-[400px] w-[400px] rounded-full bg-[#76A771] blur-[120px] opacity-20" />

      <div className="relative z-10 grid lg:grid-cols-2 gap-8 p-8 md:p-12 items-center">
        {/* Content Column */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Badge className="bg-[#D4AF37] text-[#062214] hover:bg-[#F3E5AB] font-bold px-3 py-1 mb-4 border-none">
              <Sparkles className="w-3 h-3 mr-2" />
              Lançamento da Semana
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F1F1F1] to-[#76A771]/50">
              {course.title}
            </h2>
          </motion.div>

          <p className="text-gray-300 text-lg line-clamp-3 md:line-clamp-2 max-w-xl leading-relaxed">
            {course.description || "Descubra novas formas de tratar seus pacientes com a metodologia Fitoclin. Módulo completo disponível."}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-medium">
             <div className="flex items-center gap-1.5">
               <BookOpen className="w-4 h-4 text-[#76A771]" />
               {course._count.modules} Módulos
             </div>
             <div className="w-1 h-1 rounded-full bg-gray-600" />
             <div className="flex items-center gap-1.5">
               <Clock className="w-4 h-4 text-[#76A771]" />
               Acesso Imediato
             </div>
          </div>

          <div className="pt-2">
            <Link href={`/community/course/${course.id}`}>
              <Button className="h-12 px-8 rounded-full bg-white text-[#062214] font-bold hover:bg-[#76A771] hover:text-white transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <PlayCircle className="w-5 h-5 mr-2" />
                Assistir Agora
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Column */}
        <div className="hidden lg:flex justify-center items-center">
           {course.imageUrl ? (
             <motion.img 
               src={course.imageUrl} 
               alt={course.title}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.4 }}
               className="rounded-2xl shadow-lg border border-white/10 max-h-[350px] object-cover hover:rotate-1 transition-transform duration-500"
             />
           ) : (
             <div className="w-full h-[300px] rounded-2xl bg-gradient-to-br from-[#2A5432] to-[#0A311D] border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                <PlayCircle className="w-24 h-24 text-white/10 group-hover:text-white/20 transition-colors" />
             </div>
           )}
        </div>
      </div>
    </motion.div>
  );
}