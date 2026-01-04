import { auth } from "@/auth";
import { getCourseContent, toggleLessonProgress } from "@/actions/courses";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Play, ChevronLeft } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LessonCheckButton } from "./lesson-check-button";

type Props = {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ lessonId?: string }>;
};

export default async function CoursePlayerPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const session = await auth();
  if (!session) redirect("/login");

  const course = await getCourseContent(resolvedParams.courseId);
  if (!course) return <div>Curso não encontrado.</div>;

  // Determinar qual aula exibir
  // 1. Se veio na URL (?lessonId=...), usa essa.
  // 2. Se não, tenta pegar a primeira aula do primeiro módulo.
  const activeLessonId = resolvedSearchParams.lessonId;
  
  let activeLesson = null;
  
  if (activeLessonId) {
    // Busca nos módulos
    for (const mod of course.modules) {
        const found = mod.lessons.find(l => l.id === activeLessonId);
        if (found) { activeLesson = found; break; }
    }
  } else if (course.modules.length > 0 && course.modules[0].lessons.length > 0) {
      activeLesson = course.modules[0].lessons[0];
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] animate-in fade-in">
      
      {/* Topo: Voltar */}
      <div className="mb-4">
        <Link href="/dashboard/courses" className="inline-flex items-center text-sm text-gray-400 hover:text-[#76A771] transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Voltar para Cursos
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full">
        
        {/* --- ÁREA PRINCIPAL (VÍDEO) --- */}
        <div className="flex-1 flex flex-col min-h-0">
            {activeLesson ? (
                <div className="space-y-4">
                    {/* Player Wrapper (16:9) */}
                    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-[#2A5432] shadow-2xl">
                        {activeLesson.videoUrl ? (
                            <iframe 
                                src={activeLesson.videoUrl} 
                                className="absolute inset-0 w-full h-full"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <p>Esta aula não possui vídeo.</p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-white">{activeLesson.title}</h2>
                            <p className="text-gray-400 mt-2 text-sm max-w-2xl">{activeLesson.description}</p>
                        </div>
                        <LessonCheckButton 
                            lessonId={activeLesson.id} 
                            initialCompleted={activeLesson.progress.length > 0 && activeLesson.progress[0].completed} 
                        />
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-full bg-[#0A311D]/30 rounded-xl border border-[#2A5432]">
                    <p className="text-gray-400">Selecione uma aula para começar.</p>
                </div>
            )}
        </div>

        {/* --- SIDEBAR DE CONTEÚDO (MÓDULOS) --- */}
        <div className="w-full lg:w-80 flex-shrink-0 bg-[#062214] border border-[#2A5432] rounded-xl overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-[#2A5432] bg-[#0A311D]/50">
                <h3 className="font-bold text-white truncate">{course.title}</h3>
                <p className="text-xs text-gray-400 mt-1">Conteúdo do Curso</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                <Accordion type="single" collapsible defaultValue={activeLesson?.moduleId} className="space-y-2">
                    {course.modules.map((module) => (
                        <AccordionItem key={module.id} value={module.id} className="border border-[#2A5432]/50 rounded-lg overflow-hidden bg-[#0A311D]/20">
                            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-[#2A5432]/30 text-white text-sm font-medium">
                                {module.title}
                            </AccordionTrigger>
                            <AccordionContent className="pt-0 pb-0">
                                <div className="flex flex-col">
                                    {module.lessons.map((lesson) => {
                                        const isActive = lesson.id === activeLesson?.id;
                                        const isCompleted = lesson.progress.length > 0 && lesson.progress[0].completed;

                                        return (
                                            <Link 
                                                key={lesson.id} 
                                                href={`/dashboard/courses/${course.id}?lessonId=${lesson.id}`}
                                                className={cn(
                                                    "flex items-center gap-3 px-4 py-3 text-sm transition-colors border-l-2",
                                                    isActive 
                                                        ? "bg-[#2A5432]/40 border-[#76A771] text-white" 
                                                        : "border-transparent text-gray-400 hover:bg-[#2A5432]/20 hover:text-gray-200"
                                                )}
                                            >
                                                {isCompleted ? (
                                                    <CheckCircle2 className="w-4 h-4 text-[#76A771] flex-shrink-0" />
                                                ) : isActive ? (
                                                    <Play className="w-4 h-4 text-white flex-shrink-0" fill="currentColor" />
                                                ) : (
                                                    <Circle className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                                )}
                                                <span className="line-clamp-1">{lesson.title}</span>
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

      </div>
    </div>
  );
}