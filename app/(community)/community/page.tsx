import { db } from "@/lib/db";
import { auth } from "@/auth";
import { CommunitySearch } from "@/components/community/search-bar";
import { CourseGrid } from "@/components/community/course-grid";
import { Suspense } from "react";
import { redirect } from "next/navigation";

// Forçamos a renderização dinâmica por causa da busca na URL
export const dynamic = "force-dynamic";

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const session = await auth();
  const { q: query } = await searchParams;

  // 1. Verificação de Assinatura
  // Se não for Admin e não tiver assinatura, redireciona para a vitrine pública
  const subscription = await db.subscription.findUnique({
    where: { userId: session?.user?.id },
    select: { stripeCurrentPeriodEnd: true }
  });

  const isAdmin = session?.user?.role === "ADMIN";
  const isSubscribed = subscription?.stripeCurrentPeriodEnd
    ? subscription.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
    : false;

  // Se não for assinante, redireciona para a lista de cursos (Vitrine)
  // Assim ele pode ver o que existe e escolher comprar um curso avulso
  if (!isAdmin && !isSubscribed) {
     redirect("/dashboard/courses"); 
  }

  // 2. Buscar cursos no banco
  const courses = await db.course.findMany({
    where: {
      active: true,
      title: {
        contains: query || "",
        mode: "insensitive",
      },
    },
    include: {
      _count: { select: { modules: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // Serialização simples (Decimal -> Number)
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
             Comunidade Fitoclin
           </h1>
           <p className="text-gray-500 text-lg max-w-2xl font-light">
             Área exclusiva para membros assinantes.
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

function CommunitySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-[300px] rounded-2xl bg-gray-100 animate-pulse" />
      ))}
    </div>
  );
}