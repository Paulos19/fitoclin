"use client";

import Link from "next/link";
import { FileText, Image as ImageIcon, FileSpreadsheet, File, Lock, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
  material: any; // Tipagem inferida do Prisma
  hasAccess: boolean;
}

export function ResourceCard({ material, hasAccess }: ResourceCardProps) {
  const course = material.module.course;

  // Ícone dinâmico baseado no tipo
  const getIcon = () => {
    if (material.type === "PDF") return <FileText className="w-8 h-8 text-red-400" />;
    if (material.type === "IMAGE") return <ImageIcon className="w-8 h-8 text-blue-400" />;
    if (material.type === "XLS") return <FileSpreadsheet className="w-8 h-8 text-green-400" />;
    return <File className="w-8 h-8 text-gray-400" />;
  };

  // Link de destino (Curso ou Aula)
  // Se for especialização, usa a rota /specialization, senão a rota padrão
  const courseLink = course.category === "SPECIALIZATION" 
    ? `/specialization/courses/${course.id}` 
    : `/community/course/${course.id}`;

  return (
    <div className={cn(
        "group relative flex flex-col p-5 rounded-xl border transition-all duration-300",
        hasAccess 
            ? "bg-[#0A311D]/40 border-purple-500/20 hover:border-purple-500/50 hover:bg-[#0A311D]/60" 
            : "bg-[#0A311D]/20 border-white/5 opacity-80 hover:opacity-100"
    )}>
      
      {/* Header do Card */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-white/5 rounded-lg border border-white/5 group-hover:scale-110 transition-transform duration-300">
            {getIcon()}
        </div>
        {!hasAccess && (
            <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/10 gap-1">
                <Lock className="w-3 h-3" /> Premium
            </Badge>
        )}
      </div>

      {/* Info Principal */}
      <div className="space-y-2 flex-1">
        <h3 className="font-bold text-white line-clamp-1 group-hover:text-purple-300 transition-colors">
            {material.title}
        </h3>
        <div className="text-xs text-gray-400 space-y-1">
            <p className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                Curso: <span className="text-gray-300">{course.title}</span>
            </p>
            <p className="pl-2.5 border-l border-white/10 ml-0.5">
                Módulo: {material.module.title}
            </p>
        </div>
      </div>

      {/* Ações */}
      <div className="mt-6 flex gap-2">
        {hasAccess ? (
            <>
                <Button asChild size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-900/20">
                    <a href={material.url} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" /> Baixar
                    </a>
                </Button>
                <Button asChild size="icon" variant="outline" className="border-purple-500/20 text-purple-300 hover:bg-purple-500/10">
                    <Link href={courseLink} title="Ir para o Curso">
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                </Button>
            </>
        ) : (
            <Button asChild size="sm" variant="outline" className="w-full border-white/10 text-gray-400 hover:text-white hover:bg-white/5">
                <Link href={courseLink}>
                    Ver Curso
                </Link>
            </Button>
        )}
      </div>
    </div>
  );
}