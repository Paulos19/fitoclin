"use client";

import { CheckCircle, PlayCircle, Lock } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area"; // Se não tiver, use uma div com overflow-y-auto

// Tipagem baseada no retorno do seu backend
interface Lesson {
  id: string;
  title: string;
  duration?: number | null;
  progress: { completed: boolean }[];
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface CourseSidebarProps {
  courseId: string;
  modules: Module[];
}

export function LmsSidebar({ courseId, modules }: CourseSidebarProps) {
  const params = useParams();
  const currentLessonId = params.lessonId as string;

  return (
    <div className="flex flex-col h-full border-r border-gray-100 bg-white">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-semibold text-[#062214]">Conteúdo do Curso</h2>
        <p className="text-xs text-gray-500 mt-1">
          {modules.reduce((acc, m) => acc + m.lessons.length, 0)} aulas
        </p>
      </div>

      <ScrollArea className="flex-1">
        <Accordion type="multiple" defaultValue={modules.map((m) => m.id)} className="w-full">
          {modules.map((module, index) => (
            <AccordionItem key={module.id} value={module.id} className="border-b-0">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 text-[#062214] font-medium text-sm">
                <span className="text-left">
                  {index + 1}. {module.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-0 pb-0">
                <div className="flex flex-col">
                  {module.lessons.map((lesson) => {
                    const isActive = currentLessonId === lesson.id;
                    const isCompleted = lesson.progress?.[0]?.completed;

                    return (
                      <Link
                        key={lesson.id}
                        href={`/community/course/${courseId}/lesson/${lesson.id}`}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 text-sm transition-colors border-l-2",
                          isActive
                            ? "bg-[#E8F5E9] text-[#2A5432] border-[#2A5432] font-medium"
                            : "text-gray-600 hover:bg-gray-50 border-transparent hover:text-[#062214]"
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4 text-[#76A771]" />
                        ) : isActive ? (
                          <PlayCircle className="w-4 h-4 text-[#2A5432]" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-gray-300" />
                        )}
                        <span className="line-clamp-1">{lesson.title}</span>
                      </Link>
                    );
                  })}
                  {module.lessons.length === 0 && (
                    <div className="px-8 py-2 text-xs text-gray-400 italic">
                      Em breve...
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  );
}