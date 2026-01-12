import { db } from "@/lib/db";
import { CommunitySearch } from "@/components/community/search-bar";
import { CourseGrid } from "@/components/community/course-grid";
import { Suspense } from "react";

// Forçamos a renderização dinâmica por causa da busca na URL
export const dynamic = "force-dynamic";

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || "";
  
  // 1. Buscar cursos no banco
  const courses = await db.course.findMany({
    where: {
      active: true, // Apenas cursos ativos
      title: {
        contains: query,
        mode: "insensitive", // Busca case-insensitive (Postgres)
      },
    },
    include: {
      _count: { select: { modules: true } }, // Contar módulos para o card
    },
    orderBy: { createdAt: "desc" },
  });

  // Serialização simples para passar para o Client Component (Decimal -> Number)
  const formattedCourses = courses.map(c => ({
    ...c,
    price: c.price ? Number(c.price) : 0
  }));

  return (
    <div className="space-y-8 pb-20">
      {/* Cabeçalho / Hero da Página */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10 border-b border-gray-100 pb-8">
        <div className="space-y-3">
           <h1 className="text-4xl font-bold tracking-tight text-[#062214]">
             Fitoclin Academy
           </h1>
           <p className="text-gray-500 text-lg max-w-2xl font-light">
             Aprofunde seus conhecimentos com protocolos exclusivos e aulas práticas preparadas para sua evolução.
           </p>
        </div>
        
        {/* Componente de Busca */}
        <CommunitySearch />
      </div>

      {/* Grid de Conteúdo */}
      <Suspense fallback={<CommunitySkeleton />}>
         <CourseGrid courses={formattedCourses} />
      </Suspense>
    </div>
  );
}

// Um Skeleton simples para o loading state
function CommunitySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-[300px] rounded-2xl bg-gray-100 animate-pulse" />
      ))}
    </div>
  );
}