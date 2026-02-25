// app/(mei)/mei/courses/page.tsx
import { getCourses } from "@/actions/courses";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Leaf, Clock, BookOpen } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default async function MeiCoursesPage() {
  // Busca apenas os cursos da categoria MEI
  const courses = await getCourses("MEI");
  const activeCourses = courses.filter((c) => c.active);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl min-h-[80vh]">
      <div className="mb-10">
        <Badge className="bg-green-600/20 text-green-400 border border-green-500/30 mb-4 px-3 py-1 text-xs">
          MEUS CURSOS
        </Badge>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          Jornada de Aulas MEI
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Acesse o conteúdo passo a passo para a sua reorganização metabólica.
        </p>
      </div>

      {activeCourses.length === 0 ? (
        <div className="text-center py-20 bg-[#0A311D]/30 border border-[#2A5432] rounded-xl">
          <Leaf className="w-12 h-12 text-green-900 mx-auto mb-4" />
          <h2 className="text-xl text-gray-300">Nenhum curso disponível no momento.</h2>
          <p className="text-gray-500">Em breve novos conteúdos serão liberados aqui.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCourses.map((course) => (
            <Card key={course.id} className="bg-[#0A311D]/40 border-[#2A5432]/60 overflow-hidden flex flex-col hover:border-green-500/50 transition-all group">
              <div className="relative h-48 w-full bg-[#04150c] overflow-hidden">
                {course.imageUrl ? (
                  <Image 
                    src={course.imageUrl} 
                    alt={course.title} 
                    fill 
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-500" 
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Leaf className="w-12 h-12 text-[#2A5432]" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                    <Badge className="bg-green-500 text-white border-none shadow-lg backdrop-blur-md bg-opacity-80">
                        {course._count.modules} Módulos
                    </Badge>
                </div>
              </div>
              
              <CardHeader className="flex-1">
                <CardTitle className="text-white text-xl line-clamp-2 group-hover:text-green-400 transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-gray-400 line-clamp-2 mt-2">
                  {course.description || "Inicie sua jornada neste módulo."}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0 mt-auto">
                <Link href={`/mei/courses/${course.id}`}>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg">
                    <PlayCircle className="w-4 h-4 mr-2" /> Acessar Aulas
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}