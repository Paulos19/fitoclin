"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Lock, PlayCircle, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ModuleListProps {
  courseId: string;
  modules: any[]; // Tipar conforme seu Prisma
  hasAccess: boolean;
}

export function ModuleList({ courseId, modules, hasAccess }: ModuleListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {modules.map((module, index) => {
        // Lógica de progresso (simplificada para o exemplo)
        const moduleCompleted = module.lessons.filter((l: any) => l.progress?.[0]?.completed).length;
        const totalLessons = module.lessons.length;
        const isModuleComplete = totalLessons > 0 && totalLessons === moduleCompleted;
        const firstLessonId = module.lessons[0]?.id;

        return (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className={cn(
              "group flex flex-col rounded-3xl border border-[#E8F5E9] bg-white p-6 shadow-sm transition-all duration-300",
              hasAccess ? "hover:shadow-lg hover:shadow-[#2A5432]/5 hover:-translate-y-1" : "opacity-80 grayscale-[0.3]"
            )}
          >
            {/* Cabeçalho do Card */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-col gap-1">
                 <span className="text-xs font-bold uppercase tracking-wider text-[#76A771]">
                    Módulo {index + 1}
                 </span>
                 <h3 className="text-lg font-bold text-[#062214] line-clamp-2 leading-tight group-hover:text-[#2A5432] transition-colors">
                    {module.title}
                 </h3>
              </div>
              {isModuleComplete && hasAccess && (
                <div className="p-1 rounded-full bg-green-100 text-green-700">
                    <CheckCircle className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Lista de Aulas (Preview) */}
            <div className="flex-1 space-y-3 mb-6">
                {module.lessons.slice(0, 3).map((lesson: any) => (
                    <div key={lesson.id} className="flex items-center gap-3 text-sm text-gray-500">
                        {hasAccess && lesson.progress?.[0]?.completed ? (
                            <CheckCircle className="w-4 h-4 text-[#76A771] shrink-0" />
                        ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-gray-200 shrink-0" />
                        )}
                        <span className="truncate">{lesson.title}</span>
                    </div>
                ))}
                {totalLessons > 3 && (
                    <p className="text-xs text-gray-400 pl-7 font-medium">
                        + {totalLessons - 3} aulas disponíveis
                    </p>
                )}
            </div>

            {/* Footer / Ação */}
            <div className="mt-auto pt-4 border-t border-gray-50">
               <Button 
                 asChild 
                 className={cn(
                    "w-full rounded-xl font-bold transition-all",
                    hasAccess 
                        ? "bg-[#F1F8F1] text-[#2A5432] hover:bg-[#2A5432] hover:text-white"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                 )}
                 disabled={!hasAccess}
               >
                 <Link href={hasAccess && firstLessonId ? `/community/course/${courseId}/lesson/${firstLessonId}` : "#"}>
                    {hasAccess ? (
                        <span className="flex items-center gap-2">
                            Acessar Módulo <PlayCircle className="w-4 h-4" />
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            Bloqueado <Lock className="w-3 h-3" />
                        </span>
                    )}
                 </Link>
               </Button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}