import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { LessonCheckButton } from "@/components/community/lesson-check-button"; 
import { VideoPlayer } from "@/components/community/video-player"; 

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>; // 👈 Promise com os dois params
}) {
  const session = await auth();
  if (!session) redirect("/login");

  const { courseId, lessonId } = await params; // 👈 Await desestruturando

  // Buscar dados específicos da aula
  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: { include: { course: true } },
      progress: {
        where: { userId: session.user.id }
      }
    }
  });

  if (!lesson) redirect(`/community/course/${courseId}`);

  const isCompleted = lesson.progress.length > 0 && lesson.progress[0].completed;

  return (
    <div className="flex flex-col pb-20">
      {/* Área do Vídeo */}
      <div className="w-full bg-black aspect-video relative shadow-lg">
         <VideoPlayer url={lesson.videoUrl || ""} title={lesson.title} />
      </div>

      <div className="p-6 md:p-8 max-w-5xl mx-auto w-full space-y-6">
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

        {/* Descrição / Conteúdo */}
        <div className="prose prose-green max-w-none text-gray-600 leading-relaxed">
           {lesson.description ? (
             <div dangerouslySetInnerHTML={{ __html: lesson.description }} />
           ) : (
             <p className="italic text-gray-400">Sem descrição adicional para esta aula.</p>
           )}
        </div>
      </div>
    </div>
  );
}