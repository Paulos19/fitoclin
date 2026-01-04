import { auth } from "@/auth";
import { getCourses } from "@/actions/courses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Lock, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function CoursesPage() {
  const session = await auth();
  if (!session) return null;

  const courses = await getCourses();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Área de Cursos</h1>
        <p className="text-gray-400 mt-1">Conteúdos exclusivos para potencializar o seu tratamento.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Card key={course.id} className="bg-[#0A311D]/50 border-[#2A5432]/30 hover:border-[#76A771]/50 transition-all overflow-hidden group flex flex-col">
              {/* Capa do Curso */}
              <div className="relative h-48 w-full bg-[#062214]">
                {course.imageUrl ? (
                  <Image 
                    src={course.imageUrl} 
                    alt={course.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-[#2A5432]">
                    <BookOpen className="w-12 h-12 opacity-50" />
                  </div>
                )}
                {/* Overlay Play */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
              </div>

              <CardContent className="flex-1 flex flex-col p-5">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{course.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">
                  {course.description || "Sem descrição."}
                </p>
                
                <Link href={`/dashboard/courses/${course.id}`} className="mt-auto">
                  <Button className="w-full bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a] font-bold">
                    Acessar Curso
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-3 text-center py-20 bg-[#0A311D]/20 rounded-xl border-2 border-dashed border-[#2A5432]">
            <BookOpen className="w-12 h-12 text-[#76A771] mx-auto mb-4 opacity-50" />
            <p className="text-gray-400">Nenhum curso disponível no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}