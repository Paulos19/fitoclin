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
    // 1. Busca os dados completos para gestão
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

    // 2. Serialização para evitar erros de Decimal
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
                    <p className="text-gray-400">Crie, edite e gerencie o acesso aos seus conteúdos.</p>
                </div>
                <GrantAccessDialog courses={simpleCourses} />
            </div>
            <CoursesManager courses={courses} />
        </div>
    );
  }

  // ==========================================
  // 🔵 VISÃO DE ALUNO / PACIENTE (Área de Membros)
  // ==========================================
  // Verifica se é USER ou PATIENT (ambos podem consumir cursos)
  if (user.role === "USER" || user.role === "PATIENT") {
      // 1. Buscar Cursos Comprados
      const purchases = await db.purchase.findMany({
        where: { userId: user.id },
        include: { 
           course: { 
              include: { 
                 _count: { select: { modules: true } } // Necessário para o card
              } 
           } 
        }
      });
  
      // 2. Buscar Todos os Cursos Ativos (Vitrine)
      const allCourses = await db.course.findMany({
        where: { active: true },
        include: { 
           _count: { select: { modules: true } } 
        },
        orderBy: { createdAt: 'desc' }
      });
  
      // 3. Filtrar para saber quais estão disponíveis para compra
      const purchasedIds = purchases.map(p => p.courseId);
      const availableCourses = allCourses.filter(c => !purchasedIds.includes(c.id));
  
      return (
        <div className="space-y-10 animate-in fade-in duration-700">
           
           {/* Header da Página */}
           <div className="flex flex-col gap-2 border-b border-[#2A5432]/30 pb-6">
                <h1 className="text-3xl font-bold text-white tracking-tight">Centro de Aprendizado</h1>
                <p className="text-gray-400">Gerencie seus estudos e descubra novos conteúdos.</p>
           </div>
  
           {/* Seção 1: Meus Cursos (Já comprados) */}
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
  
           {/* Seção 2: Vitrine (Disponíveis para compra) */}
           {availableCourses.length > 0 && (
              <div>
                 <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-yellow-500" /> Explore Novos Conhecimentos
                 </h2>
                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableCourses.map((course) => (
                       <div key={course.id} className="relative">
                          {/* Card Bloqueado Visualmente */}
                          <CourseCard 
                             course={{
                               ...course,
                               price: Number(course.price),
                               _count: course._count
                             }}
                             isLocked={true}
                          />
                          
                          {/* Overlay de Cadeado Extra */}
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

  // Fallback para outras roles (ex: Secretária não tem acesso aqui)
  return redirect("/dashboard");
}