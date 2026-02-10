import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CoursesManager } from "@/components/dashboard/settings/courses-manager";
import { GrantAccessDialog } from "@/components/dashboard/courses/grant-access-dialog";
import { CourseCard } from "@/components/community/course-card";
import { GraduationCap, Sparkles, Lock, Library } from "lucide-react";

export default async function CoursesPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) return redirect("/login");

  // ==========================================
  // 🔴 VISÃO DE ADMIN (Gestão)
  // ==========================================
  if (user.role === "ADMIN") {
    // 1. Busca TUDO para gestão (Comunidade e Especialização)
    const rawCourses = await db.course.findMany({
        include: {
        modules: {
            include: {
            lessons: { orderBy: { order: 'asc' } },
            materials: true,
            },
            orderBy: { order: 'asc' }
        }
        },
        orderBy: { createdAt: 'desc' }
    });

    const courses = rawCourses.map((course) => ({
        ...course,
        price: Number(course.price),
    }));

    const simpleCourses = courses.map(c => ({ id: c.id, title: c.title }));

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Gestão de Cursos</h1>
                    <p className="text-gray-400">Crie, edite e gerencie cursos da Comunidade e Especialização.</p>
                </div>
                <GrantAccessDialog courses={simpleCourses} />
            </div>
            {/* O CoursesManager deve ter um select para 'category' agora */}
            <CoursesManager courses={courses} />
        </div>
    );
  }

  // ==========================================
  // 🔵 VISÃO DE ALUNO / PACIENTE (Área de Membros)
  // ==========================================
  if (user.role === "USER" || user.role === "PATIENT") {
      // 1. Buscar Cursos Comprados (Mostra TODOS que eu tenho, independente da categoria)
      const purchases = await db.purchase.findMany({
        where: { userId: user.id },
        include: { 
           course: { 
              include: { 
                 _count: { select: { modules: true } }
              } 
           } 
        }
      });
  
      // 2. Buscar Vitrine: APENAS COMUNIDADE (Active + Category=COMMUNITY)
      // Os de Especialização ficam na página /specialization
      const allCommunityCourses = await db.course.findMany({
        where: { 
            active: true,
            category: "COMMUNITY" // 👈 Filtro Importante
        },
        include: { 
           _count: { select: { modules: true } } 
        },
        orderBy: { createdAt: 'desc' }
      });
  
      // 3. Filtrar para não mostrar o que já comprei
      const purchasedIds = purchases.map(p => p.courseId);
      const availableCourses = allCommunityCourses.filter(c => !purchasedIds.includes(c.id));
  
      return (
        <div className="space-y-10 animate-in fade-in duration-700">
            
           {/* Header da Página */}
           <div className="flex flex-col gap-2 border-b border-[#2A5432]/30 pb-6">
                <h1 className="text-3xl font-bold text-white tracking-tight">Comunidade Fitoclin</h1>
                <p className="text-gray-400">Seus cursos e conteúdos da comunidade.</p>
           </div>
  
           {/* Seção 1: Meus Cursos */}
           <div>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                 <GraduationCap className="w-6 h-6 text-[#76A771]" /> Meus Cursos
              </h2>
              {purchases.length > 0 ? (
                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchases.map((purchase) => (
                       <div key={purchase.id} className="h-full">
                          <CourseCard 
                             course={{
                               ...purchase.course,
                               price: Number(purchase.course.price),
                               _count: purchase.course._count
                             }}
                          />
                       </div>
                    ))}
                 </div>
              ) : (
                 <div className="text-center py-12 bg-[#0A311D]/20 rounded-xl border border-dashed border-[#2A5432]/50">
                    <div className="flex justify-center mb-4">
                        <Library className="w-10 h-10 text-gray-600" />
                    </div>
                    <p className="text-gray-500">Você ainda não está inscrito em nenhum curso.</p>
                 </div>
              )}
           </div>
  
           {/* Seção 2: Vitrine da Comunidade */}
           {availableCourses.length > 0 && (
              <div>
                 <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-yellow-500" /> Disponível na Comunidade
                 </h2>
                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableCourses.map((course) => (
                       <div key={course.id} className="relative">
                          <CourseCard 
                             course={{
                               ...course,
                               price: Number(course.price),
                               _count: course._count
                             }}
                             isLocked={true}
                          />
                          <div className="absolute top-4 right-4 z-20 pointer-events-none">
                             <div className="bg-black/60 p-1.5 rounded-full backdrop-blur-sm border border-white/10">
                                <Lock className="w-4 h-4 text-white/90" />
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           )}
        </div>
      );
  }

  return redirect("/dashboard");
}