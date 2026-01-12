import { db } from "@/lib/db";
import { CourseGrid } from "@/components/community/course-grid";
import { Suspense } from "react";

export default async function DashboardCoursesPage() {
  // 1. Busca todos os cursos ativos
  const courses = await db.course.findMany({
    where: { active: true },
    include: {
      _count: { select: { modules: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // 2. Formata o preço para o componente
  const formattedCourses = courses.map(c => ({
    ...c,
    price: c.price ? Number(c.price) : 0
  }));

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-700">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#062214]">Cursos Disponíveis</h1>
        <p className="text-gray-500">
          Adquira cursos individuais ou assine a comunidade para ter acesso total a todos os conteúdos.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <Suspense fallback={<div className="p-10 text-center text-gray-500">Carregando catálogo...</div>}>
           {/* Reutilizamos o Grid da comunidade para manter a consistência visual.
              O CourseCard dentro dele já aponta corretamente para /community/course/[id],
              que é a página híbrida de vendas/acesso.
           */}
           <CourseGrid courses={formattedCourses} />
        </Suspense>
      </div>
    </div>
  );
}