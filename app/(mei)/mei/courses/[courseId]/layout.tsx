import { getCourseContent } from "@/actions/courses";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlayCircle, CheckCircle2, ChevronLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function MeiCourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>; // <-- Tipado como Promise
}) {
  const { courseId } = await params; // <-- Await extraindo o ID
  const course = await getCourseContent(courseId);

  if (!course) {
    redirect("/mei/courses");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] bg-[#04150c]">
      {/* SIDEBAR (Lista de Aulas) */}
      <aside className="w-full md:w-80 lg:w-96 border-r border-[#2A5432] bg-[#0A311D]/30 flex flex-col shrink-0">
        <div className="p-4 border-b border-[#2A5432] bg-[#04150c]/50">
          <Link href="/mei/courses">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-[#2A5432]/30 -ml-2 mb-4">
              <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
            </Button>
          </Link>
          <h2 className="text-lg font-bold text-white leading-tight">{course.title}</h2>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4">
            <Accordion type="multiple" defaultValue={course.modules.map(m => m.id)} className="space-y-3">
              {course.modules.map((module, mIndex) => (
                <AccordionItem key={module.id} value={module.id} className="border border-[#2A5432]/50 rounded-lg bg-[#04150c]/40 overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-[#2A5432]/20 text-white text-sm font-semibold text-left">
                    Módulo {mIndex + 1}: {module.title}
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-2 px-2 space-y-1">
                    {module.lessons.map((lesson, lIndex) => {
                      const isCompleted = lesson.progress?.[0]?.completed;
                      return (
                        <Link key={lesson.id} href={`/mei/courses/${course.id}/lesson/${lesson.id}`}>
                          <div className={`flex items-start gap-3 p-2 rounded-md transition-colors hover:bg-[#2A5432]/30 ${isCompleted ? 'opacity-70' : ''}`}>
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            ) : (
                              <PlayCircle className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className={`text-sm ${isCompleted ? 'text-gray-400' : 'text-gray-200'}`}>
                                {lIndex + 1}. {lesson.title}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                    {module.quiz && (
                        <div className="flex items-start gap-3 p-2 mt-2 rounded-md bg-yellow-900/10 border border-yellow-900/30">
                           <Lock className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
                           <p className="text-sm text-yellow-600">Avaliação do Módulo</p>
                        </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
      </aside>

      {/* ÁREA DO PLAYER (Conteúdo Principal) */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#04150c]">
        {children}
      </main>
    </div>
  );
}