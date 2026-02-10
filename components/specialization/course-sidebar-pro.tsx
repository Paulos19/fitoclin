"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CheckCircle2, PlayCircle, Lock, ChevronDown } from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";

interface CourseSidebarProProps {
  course: any;
  progressCount: number;
}

export function CourseSidebarPro({ course, progressCount }: CourseSidebarProProps) {
  const pathname = usePathname();

  // Calcular progresso total
  const totalLessons = course.modules.reduce((acc: number, mod: any) => acc + mod.lessons.length, 0);
  const progressPercentage = totalLessons === 0 ? 0 : Math.round((progressCount / totalLessons) * 100);

  return (
    <div className="h-full flex flex-col bg-[#051c10] border-r border-purple-500/10 w-80 shrink-0">
      
      {/* Header da Sidebar */}
      <div className="p-6 border-b border-purple-500/10">
        <h2 className="font-bold text-white line-clamp-2 mb-2">{course.title}</h2>
        <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
                <span>{progressPercentage}% Concluído</span>
                <span>{progressCount}/{totalLessons} Aulas</span>
            </div>
            <Progress value={progressPercentage} className="h-1.5 bg-white/10" indicatorClassName="bg-gradient-to-r from-purple-500 to-yellow-500" />
        </div>
      </div>

      {/* Lista de Módulos */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <Accordion type="multiple" defaultValue={course.modules.map((m: any) => m.id)} className="w-full">
            {course.modules.map((module: any, index: number) => (
                <AccordionItem key={module.id} value={module.id} className="border-b border-white/5">
                    <AccordionTrigger className="px-6 py-4 hover:bg-white/5 text-gray-200 hover:text-white hover:no-underline transition-all">
                        <div className="flex flex-col items-start text-left">
                            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-1">
                                Módulo {index + 1}
                            </span>
                            <span className="text-sm font-medium">{module.title}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-0">
                        <div className="flex flex-col">
                            {module.lessons.map((lesson: any) => {
                                const isCompleted = lesson.progress?.[0]?.completed;
                                const isActive = pathname?.includes(lesson.id);
                                
                                return (
                                    <Link
                                        key={lesson.id}
                                        href={`/specialization/courses/${course.id}/lesson/${lesson.id}`}
                                        className={cn(
                                            "flex items-center gap-3 px-6 py-3 text-sm transition-all border-l-2",
                                            isActive 
                                                ? "bg-purple-500/10 text-white border-purple-500" 
                                                : "text-gray-400 hover:text-gray-200 hover:bg-white/5 border-transparent"
                                        )}
                                    >
                                        <div className={cn("shrink-0", isActive ? "text-purple-400" : isCompleted ? "text-green-500" : "text-gray-600")}>
                                            {isCompleted ? (
                                                <CheckCircle2 className="w-4 h-4" />
                                            ) : (
                                                <PlayCircle className="w-4 h-4" />
                                            )}
                                        </div>
                                        <span className="line-clamp-2">{lesson.title}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
}