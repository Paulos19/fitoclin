"use client";

import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Lock, Award, BookOpen, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CourseCardProProps {
  course: {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    _count?: { modules: number };
  };
  isLocked?: boolean;
}

export function CourseCardPro({ course, isLocked = false }: CourseCardProProps) {
  return (
    <div className="group relative flex flex-col h-full rounded-xl overflow-hidden border border-purple-500/20 bg-[#0A311D]/40 hover:bg-[#0A311D]/60 hover:border-purple-500/40 transition-all duration-300 shadow-lg hover:shadow-purple-900/20">
      
      {/* Imagem de Capa com Overlay */}
      <div className="relative h-48 w-full overflow-hidden">
        {course.imageUrl ? (
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-105",
              isLocked && "grayscale opacity-50"
            )}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-purple-900/40 to-[#062214] flex items-center justify-center">
            <Award className="w-12 h-12 text-purple-500/30" />
          </div>
        )}
        
        {/* Overlay Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#062214] via-transparent to-transparent opacity-90" />

        {/* Badges Flutuantes */}
        <div className="absolute top-3 right-3 flex gap-2">
            {isLocked ? (
                <Badge variant="secondary" className="bg-black/60 backdrop-blur-md text-gray-300 border border-white/10">
                    <Lock className="w-3 h-3 mr-1" /> Bloqueado
                </Badge>
            ) : (
                <Badge className="bg-purple-600/90 backdrop-blur-md text-white border-none shadow-lg">
                    <Award className="w-3 h-3 mr-1 text-yellow-300" /> Certificação
                </Badge>
            )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        <div className="space-y-2 flex-1">
            <h3 className={cn("text-xl font-bold text-white line-clamp-2 leading-tight group-hover:text-purple-300 transition-colors", isLocked && "text-gray-400")}>
                {course.title}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-2">
                {course.description || "Curso avançado de especialização em fitoterapia clínica."}
            </p>
        </div>

        {/* Metadados */}
        <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-white/5 pt-4">
            <div className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                <span>{course._count?.modules || 0} Módulos</span>
            </div>
            <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>+20 Horas</span>
            </div>
        </div>

        {/* Ação */}
        <div className="pt-2">
            {isLocked ? (
                <Button disabled variant="outline" className="w-full border-white/10 text-gray-500 bg-transparent">
                    Disponível no Plano Pro
                </Button>
            ) : (
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-900/20 group-hover:shadow-purple-900/40 transition-all">
                    <Link href={`/specialization/courses/${course.id}`}>
                        <PlayCircle className="w-4 h-4 mr-2" /> Acessar Conteúdo
                    </Link>
                </Button>
            )}
        </div>
      </div>
    </div>
  );
}