import { auth } from "@/auth";
import { getCourseContent } from "@/actions/courses";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

export default async function CourseIndexPage({
  params
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await getCourseContent(courseId);

  if (!course || course.modules.length === 0 || course.modules[0].lessons.length === 0) {
      return (
          <div className="flex items-center justify-center h-full text-gray-500">
              Este curso ainda não possui conteúdo.
          </div>
      );
  }

  // Lógica para encontrar onde o usuário parou (A primeira aula NÃO concluída)
  let targetLessonId = course.modules[0].lessons[0].id; // Default: primeira aula absoluta

  // Achatar a estrutura para buscar linearmente
  const allLessons = course.modules.flatMap((m: any) => m.lessons);
  
  // Encontra a primeira aula que NÃO está completada
  const firstIncomplete = allLessons.find((l: any) => !l.progress?.[0]?.completed);

  if (firstIncomplete) {
      targetLessonId = firstIncomplete.id;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6">
        <div className="w-full max-w-2xl space-y-6">
            <h1 className="text-4xl font-bold text-white">{course.title}</h1>
            <p className="text-xl text-gray-400">{course.description}</p>
            
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-purple-600 hover:bg-purple-700 text-white shadow-xl shadow-purple-900/40 rounded-full transition-all hover:scale-105">
                <a href={`/specialization/courses/${courseId}/lesson/${targetLessonId}`}>
                    <PlayCircle className="w-6 h-6 mr-3" />
                    {targetLessonId === course.modules[0].lessons[0].id ? "Iniciar Curso" : "Continuar de onde parou"}
                </a>
            </Button>
        </div>
    </div>
  );
}