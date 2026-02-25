import { getCourseContent } from "@/actions/courses";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Play, Leaf } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function MeiCourseHomePage({ 
  params 
}: { 
  params: Promise<{ courseId: string }> 
}) {
  const { courseId } = await params; // <-- Await aqui também
  const course = await getCourseContent(courseId);

  if (!course) redirect("/mei/courses");

  const firstModule = course.modules[0];
  const firstLesson = firstModule?.lessons[0];

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-12 flex items-center justify-center">
      <div className="max-w-2xl w-full text-center space-y-6">
        
        {course.imageUrl ? (
            <div className="relative w-full max-w-md mx-auto aspect-video rounded-xl overflow-hidden border border-[#2A5432] shadow-2xl mb-8">
                <Image src={course.imageUrl} alt={course.title} fill className="object-cover" />
            </div>
        ) : (
            <div className="w-24 h-24 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
            <Leaf className="w-10 h-10 text-green-400" />
            </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Bem-vinda a <span className="text-green-400">{course.title}</span>
        </h1>
        
        <p className="text-gray-400 text-lg leading-relaxed">
          {course.description || "Este é o seu ambiente seguro para aprender e executar o Método. Selecione uma aula no menu lateral ou clique no botão abaixo para iniciar."}
        </p>

        {firstLesson ? (
          <Link href={`/mei/courses/${course.id}/lesson/${firstLesson.id}`} className="inline-block mt-8">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 h-14 text-lg">
              <Play className="w-5 h-5 mr-2" fill="currentColor" /> Começar Primeira Aula
            </Button>
          </Link>
        ) : (
          <p className="text-yellow-500 mt-8 border border-yellow-500/30 bg-yellow-500/10 py-3 rounded-lg">
            Nenhuma aula cadastrada neste módulo ainda.
          </p>
        )}
      </div>
    </div>
  );
}