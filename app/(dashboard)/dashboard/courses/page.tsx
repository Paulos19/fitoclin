import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CoursesManager } from "@/components/dashboard/settings/courses-manager";
import { GrantAccessDialog } from "@/components/dashboard/courses/grant-access-dialog"; // Import do novo componente

export default async function CoursesAdminPage() {
  const session = await auth();
  
  // Só ADMIN vê essa página
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  // 1. Busca os dados brutos
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

  // 2. Serialização
  const courses = rawCourses.map((course) => ({
    ...course,
    price: Number(course.price),
  }));

  // Lista simplificada para o select do Dialog
  const simpleCourses = courses.map(c => ({ id: c.id, title: c.title }));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header com Ação Extra */}
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