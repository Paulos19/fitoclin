import { getCourseContent } from "@/actions/courses";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

// Importando o novo player que não trava a tela cheia
import { MeiVideoPlayer } from "@/components/mei/mei-video-player"; 
import { LessonCheckButton } from "@/components/community/lesson-check-button";

export default async function MeiLessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;
  const course = await getCourseContent(courseId);
  
  if (!course) redirect("/mei/courses");

  let currentLesson = null;
  let currentModule = null;

  for (const mod of course.modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      currentLesson = lesson;
      currentModule = mod;
      break;
    }
  }

  if (!currentLesson) redirect(`/mei/courses/${course.id}`);

  const isCompleted = currentLesson.progress?.[0]?.completed || false;
  const materials = currentModule?.materials || [];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full p-4 md:p-6 lg:p-8 space-y-8">
        
        {/* PLAYER DE VÍDEO ATUALIZADO (MeiVideoPlayer) */}
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden border border-[#2A5432] shadow-2xl relative">
          {currentLesson.videoUrl ? (
            <MeiVideoPlayer url={currentLesson.videoUrl} title={currentLesson.title} />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
              <FileText className="w-12 h-12 mb-2 opacity-50" />
              <p>Aula em texto ou vídeo não disponível.</p>
            </div>
          )}
        </div>

        {/* INFORMAÇÕES DA AULA */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2 flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-white">{currentLesson.title}</h1>
            <p className="text-green-400 font-medium">Módulo: {currentModule?.title}</p>
            {currentLesson.description && (
              <div className="mt-6 text-gray-300 whitespace-pre-wrap leading-relaxed bg-[#0A311D]/30 p-6 rounded-xl border border-[#2A5432]/50">
                {currentLesson.description}
              </div>
            )}
          </div>

          {/* BOTÃO DE CONCLUÍDO (Corrigido o nome da propriedade para 'completed') */}
          <div className="shrink-0 w-full md:w-auto">
            <LessonCheckButton 
               lessonId={currentLesson.id} 
               completed={isCompleted} 
            />
          </div>
        </div>

        {/* MATERIAIS DE APOIO */}
        {materials.length > 0 && (
          <Card className="bg-[#0A311D]/40 border-[#2A5432]/60 mt-8">
            <CardHeader className="pb-3 border-b border-[#2A5432]/40">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-400" />
                Materiais de Apoio do Módulo
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 grid gap-3">
              {materials.map((mat) => (
                <div key={mat.id} className="flex items-center justify-between p-3 rounded-lg bg-[#04150c]/60 border border-[#2A5432]/40 hover:border-green-500/50 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-[#2A5432]/30 rounded text-green-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-200 truncate">{mat.title}</p>
                      <p className="text-xs text-gray-500 uppercase">{mat.type}</p>
                    </div>
                  </div>
                  <a href={mat.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300 hover:bg-green-900/30">
                      <Download className="w-4 h-4 mr-2" /> Baixar
                    </Button>
                  </a>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}