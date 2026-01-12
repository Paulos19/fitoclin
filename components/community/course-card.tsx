"use client";

import { Course } from "@prisma/client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PlayCircle, BookOpen, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// 👇 DEFINIÇÃO CORRETA DE TIPAGEM
// Omitimos o 'price' original (Decimal) e redefinimos como 'number'
export interface CommunityCourse extends Omit<Course, 'price'> {
  price: number;
  _count: { modules: number };
}

interface CourseCardProps {
  course: CommunityCourse;
  isLocked?: boolean;
}

export function CourseCard({ course, isLocked = false }: CourseCardProps) {
  return (
    <Link href={`/community/course/${course.id}`} className={cn("block h-full", isLocked && "pointer-events-none opacity-80")}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-[#E8F5E9] bg-white shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300"
      >
        {/* Imagem de Capa */}
        <div className="relative aspect-video w-full overflow-hidden bg-gray-50">
          {course.imageUrl ? (
            <Image
              src={course.imageUrl}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#F1F8F1] via-[#E2EFE3] to-[#CDE4CF] flex items-center justify-center">
               <Image src="/logo.png" alt="Logo" width={40} height={40} className="opacity-20 grayscale" />
            </div>
          )}
          
          <div className="absolute top-3 left-3 flex gap-2">
             <Badge className={cn(
               "backdrop-blur-md border-0 px-3 py-1",
               isLocked 
                ? "bg-gray-900/80 text-white" 
                : "bg-[#2A5432]/90 text-white group-hover:bg-[#2A5432]"
             )}>
                {isLocked ? <Lock size={12} className="mr-1"/> : "Exclusivo"}
             </Badge>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-5 bg-gradient-to-b from-white to-[#FAFCFA]">
          <h3 className="font-bold text-lg text-[#062214] mb-2 line-clamp-1 group-hover:text-[#2A5432] transition-colors">
            {course.title}
          </h3>
          
          <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-1 leading-relaxed">
            {course.description || "Descrição breve do conteúdo e objetivos deste curso."}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-green-50/50">
             <div className="flex items-center text-xs font-medium text-gray-400 gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#76A771]" />
                {course._count.modules} Módulos
             </div>
             
             <div className="flex items-center gap-2 text-sm font-semibold text-[#2A5432] group-hover:translate-x-1 transition-transform">
                Acessar
                <PlayCircle className="w-5 h-5 fill-[#2A5432] text-white" />
             </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}