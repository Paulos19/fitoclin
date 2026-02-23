import { auth } from "@/auth";
import { getCourseContent } from "@/actions/courses";
import { redirect } from "next/navigation";
import { LessonCheckButton } from "@/components/community/lesson-check-button"; 
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText, Download } from "lucide-react";
import Link from "next/link";
import { ModuleQuiz } from "@/components/community/module-quiz"; // [NOVO] Importação do componente

export default async function LessonPage({
  params
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;
  const course = await getCourseContent(courseId);

  if (!course) return redirect("/specialization");

  // Encontrar a aula atual e o módulo
  let currentLesson: any = null;
  let currentModule: any = null;
  let nextLessonId: string | null = null;
  let prevLessonId: string | null = null;

  // Planificar todas as aulas para facilitar navegação
  const flatLessons: any[] = [];
  course.modules.forEach((mod: any) => {
      mod.lessons.forEach((lesson: any) => {
          flatLessons.push({ ...lesson, moduleId: mod.id });
          if (lesson.id === lessonId) {
              currentLesson = lesson;
              currentModule = mod;
          }
      });
  });

  if (!currentLesson) return redirect(`/specialization/courses/${courseId}`);

  // Calcular Prev/Next
  const currentIndex = flatLessons.findIndex(l => l.id === lessonId);
  if (currentIndex > 0) prevLessonId = flatLessons[currentIndex - 1].id;
  if (currentIndex < flatLessons.length - 1) nextLessonId = flatLessons[currentIndex + 1].id;

  // [NOVO] Verifica se esta é a última aula deste módulo específico
  const isLastLessonOfModule = currentModule?.lessons?.[currentModule.lessons.length - 1]?.id === currentLesson.id;

  // Helper de Embed (Simples)
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("vimeo")) {
        const id = url.split("/").pop();
        return `https://player.vimeo.com/video/${id}`;
    }
    if (url.includes("youtube") || url.includes("youtu.be")) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        const id = (match && match[2].length === 11) ? match[2] : null;
        return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    return url;
  };

  const isCompleted = currentLesson.progress?.[0]?.completed || false;

  return (
    <div className="flex flex-col min-h-full">
      
      {/* 1. PLAYER DE VÍDEO (Estilo Cinema) */}
      <div className="w-full bg-black aspect-video max-h-[70vh] relative shadow-2xl">
        {currentLesson.videoUrl ? (
             <iframe 
                src={getEmbedUrl(currentLesson.videoUrl)} 
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             />
        ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 bg-[#0A0A0A]">
                <p>Esta aula não possui vídeo.</p>
            </div>
        )}
      </div>

      {/* 2. BARRA DE CONTROLE E NAVEGAÇÃO */}
      <div className="border-b border-white/10 bg-[#0A311D] p-4 flex items-center justify-between sticky top-0 z-10">
         <div className="flex items-center gap-4">
             <div className="scale-110">
                <LessonCheckButton 
                    lessonId={currentLesson.id} 
                    initialIsCompleted={isCompleted} 
                />
             </div>
             <span className="text-gray-400 text-sm hidden md:inline">Marcar como vista</span>
         </div>

         <div className="flex items-center gap-2">
             <Button asChild variant="outline" size="sm" disabled={!prevLessonId} className="border-white/10 text-gray-300 hover:text-white hover:bg-white/5">
                <Link href={prevLessonId ? `/specialization/courses/${courseId}/lesson/${prevLessonId}` : "#"}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
                </Link>
             </Button>
             <Button asChild variant="default" size="sm" disabled={!nextLessonId} className="bg-purple-600 hover:bg-purple-700 text-white">
                <Link href={nextLessonId ? `/specialization/courses/${courseId}/lesson/${nextLessonId}` : "#"}>
                    Próxima <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
             </Button>
         </div>
      </div>

      {/* 3. CONTEÚDO DA AULA E MATERIAIS */}
      <div className="p-8 max-w-4xl mx-auto w-full space-y-8 pb-20">
         <div>
             <div className="text-sm text-purple-400 font-bold uppercase tracking-wider mb-2">
                 Módulo: {currentModule?.title}
             </div>
             <h1 className="text-3xl font-bold text-white mb-4">{currentLesson.title}</h1>
             <p className="text-gray-400 leading-relaxed text-lg">
                Nesta aula, abordaremos os conceitos fundamentais do módulo, preparando você para as aplicações práticas da fitoterapia.
             </p>
         </div>

         <Separator className="bg-white/10" />

         {/* Materiais de Apoio (Exibidos aqui se houver) */}
         {currentModule?.materials && currentModule.materials.length > 0 && (
             <div className="space-y-4">
                 <h3 className="text-lg font-bold text-white flex items-center gap-2">
                     <FileText className="w-5 h-5 text-yellow-500" /> Materiais de Apoio
                 </h3>
                 <div className="grid gap-3 md:grid-cols-2">
                     {currentModule.materials.map((mat: any) => (
                         <a 
                            key={mat.id} 
                            href={mat.url} 
                            target="_blank" 
                            className="flex items-center justify-between p-4 rounded-lg bg-[#0A311D]/50 border border-white/5 hover:border-purple-500/50 hover:bg-[#0A311D] transition-all group"
                         >
                             <div className="flex items-center gap-3">
                                 <div className="p-2 bg-purple-500/10 rounded-md text-purple-400 group-hover:text-purple-300">
                                     <Download className="w-4 h-4" />
                                 </div>
                                 <span className="text-sm font-medium text-gray-300 group-hover:text-white">{mat.title}</span>
                             </div>
                         </a>
                     ))}
                 </div>
             </div>
         )}

         {/* [NOVO] RENDERIZAÇÃO DO QUESTIONÁRIO SE FOR A ÚLTIMA AULA DO MÓDULO */}
         {isLastLessonOfModule && currentModule?.quiz && currentModule.quiz.questions.length > 0 && (
            <ModuleQuiz quiz={currentModule.quiz} />
         )}
      </div>
    </div>
  );
}