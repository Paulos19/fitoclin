import { auth } from "@/auth";
import { getCourses } from "@/actions/courses";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CourseCardPro } from "@/components/specialization/course-card-pro";
import { Search, Filter, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function SpecializationCoursesPage() {
  const session = await auth();
  if (!session) return redirect("/login");

  // 1. Verificação de Acesso (Reutilizando lógica ou criando um gate)
  const subscription = await db.subscription.findUnique({
    where: { userId: session.user.id },
  });

  const hasAccess = 
    session.user.role === "ADMIN" || 
    subscription?.plan === "SPECIALIZATION" ||
    session.user.email === "admin@fitoclin.com";

  // 2. Buscar Cursos da Categoria Especialização
  // @ts-ignore
  const courses = await getCourses("SPECIALIZATION");

  return (
    <div className="p-8 min-h-screen space-y-8 animate-in fade-in duration-500">
      
      {/* Header da Seção */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-purple-500/10 pb-6">
        <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <BookOpen className="w-6 h-6 text-purple-400" />
                </div>
                Catálogo Acadêmico
            </h1>
            <p className="text-gray-400 mt-2 max-w-xl">
                Explore todos os cursos, certificações e módulos avançados disponíveis na sua formação.
            </p>
        </div>

        {/* Filtros e Busca (Visual por enquanto) */}
        <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative group flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                <Input 
                    placeholder="Filtrar por tema..." 
                    className="pl-10 bg-[#0A311D] border-white/10 text-white focus:border-purple-500/50 transition-all"
                />
            </div>
            <Button variant="outline" size="icon" className="border-white/10 bg-[#0A311D] text-gray-400 hover:text-white hover:bg-white/5">
                <Filter className="w-4 h-4" />
            </Button>
        </div>
      </div>

      {/* Grid de Cursos */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
                <CourseCardPro 
                    key={course.id} 
                    course={course}
                    isLocked={!hasAccess} 
                />
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-[#0A311D]/30 rounded-2xl border border-dashed border-white/5">
            <div className="p-4 bg-white/5 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-300">Nenhum curso encontrado</h3>
            <p className="text-sm text-gray-500 mt-1">
                Não há cursos de especialização disponíveis no momento.
            </p>
        </div>
      )}
    </div>
  );
}