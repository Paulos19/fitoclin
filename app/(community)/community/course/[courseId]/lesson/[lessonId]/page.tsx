import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { LessonCheckButton } from "@/components/community/lesson-check-button"; 
import { VideoPlayer } from "@/components/community/video-player"; 
import { hasCourseAccess } from "@/lib/access";
// 👇 Novos imports para ícones e UI
import { FileText, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  const { courseId, lessonId } = await params;

  // 1. BLINDAGEM DE SEGURANÇA 🔒
  const canAccess = await hasCourseAccess(session.user.id, courseId);
  
  if (!canAccess) {
    redirect(`/community/course/${courseId}`);
  }

  // 2. Buscar dados da aula + MATERIAIS DO MÓDULO
  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: { 
        include: { 
          course: true,
          // 👇 AQUI: Carregamos os materiais vinculados a este módulo
          materials: true 
        } 
      },
      progress: {
        where: { userId: session.user.id }
      }
    }
  });

  if (!lesson) redirect(`/community/course/${courseId}`);

  const isCompleted = lesson.progress.length > 0 && lesson.progress[0].completed;
  const materials = lesson.module.materials; // Atalho para facilitar leitura

  return (
    <div className="flex flex-col pb-20">
      {/* Área do Vídeo */}
      <div className="w-full bg-black aspect-video relative shadow-lg">
         <VideoPlayer url={lesson.videoUrl || ""} title={lesson.title} />
      </div>

      <div className="p-6 md:p-8 max-w-5xl mx-auto w-full space-y-8">
        {/* Cabeçalho da Aula */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
             <h1 className="text-2xl md:text-3xl font-bold text-[#062214]">{lesson.title}</h1>
             <p className="text-sm text-[#2A5432] font-medium mt-1">
                {lesson.module.course.title} • Módulo: {lesson.module.title}
             </p>
          </div>
          
          <LessonCheckButton 
             lessonId={lesson.id} 
             initialIsCompleted={isCompleted} 
          />
        </div>

        <Separator className="bg-gray-100" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Esquerda: Descrição */}
            <div className="lg:col-span-2 space-y-4">
                <h3 className="font-semibold text-lg text-[#062214]">Sobre a aula</h3>
                <div className="prose prose-green max-w-none text-gray-600 leading-relaxed">
                    {lesson.description ? (
                    <div dangerouslySetInnerHTML={{ __html: lesson.description }} />
                    ) : (
                    <p className="italic text-gray-400">Sem descrição adicional para esta aula.</p>
                    )}
                </div>
            </div>

            {/* Coluna Direita: Materiais de Apoio (Downloads) */}
            <div className="lg:col-span-1">
                {materials && materials.length > 0 ? (
                    <Card className="border-[#2A5432]/20 bg-[#F5FDF7] shadow-sm">
                        <CardContent className="p-5 space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText className="w-5 h-5 text-[#76A771]" />
                                <h3 className="font-bold text-[#062214]">Materiais Complementares</h3>
                            </div>
                            <p className="text-xs text-gray-500 mb-4">
                                Arquivos disponíveis para este módulo.
                            </p>
                            
                            <div className="space-y-2">
                                {materials.map((material) => (
                                    <a 
                                        key={material.id} 
                                        href={material.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="block group"
                                    >
                                        <div className="flex items-center justify-between p-3 bg-white border border-[#2A5432]/10 rounded-lg hover:border-[#76A771] hover:shadow-md transition-all">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="bg-[#E8F5E9] p-2 rounded text-[#2A5432]">
                                                    <FileText className="w-4 h-4" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-sm font-medium text-gray-700 truncate group-hover:text-[#2A5432] transition-colors">
                                                        {material.title}
                                                    </span>
                                                    <span className="text-[10px] text-gray-400 uppercase">
                                                        {material.type}
                                                    </span>
                                                </div>
                                            </div>
                                            <Download className="w-4 h-4 text-gray-400 group-hover:text-[#76A771]" />
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                   /* Estado Vazio Opcional ou apenas null */
                   <div className="p-4 rounded-lg bg-gray-50 border border-dashed border-gray-200 text-center">
                       <p className="text-sm text-gray-400">Nenhum material neste módulo.</p>
                   </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}