import { db } from "@/lib/db";
import { auth } from "@/auth";
import { CommunitySearch } from "@/components/community/search-bar";
import { CourseGrid } from "@/components/community/course-grid";
import { FeaturedBanner } from "@/components/community/featured-banner";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const session = await auth();
  const { q: query } = await searchParams;

  // 1. Verificação de Assinatura (Lógica Mantida)
  const subscription = await db.subscription.findUnique({
    where: { userId: session?.user?.id },
    select: { stripeCurrentPeriodEnd: true }
  });

  const isAdmin = session?.user?.role === "ADMIN";
  const isSubscribed = subscription?.stripeCurrentPeriodEnd
    ? subscription.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now() // +1 dia de tolerância
    : false;

  if (!isAdmin && !isSubscribed) {
     redirect("/dashboard/courses"); 
  }

  // 2. Buscas Paralelas (Destaque + Lista)
  // Se houver query, não precisamos do banner de destaque necessariamente, 
  // mas vamos buscá-lo se a query for vazia para compor a vitrine.
  
  const featuredPromise = !query 
    ? db.course.findFirst({
        where: { active: true },
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { modules: true } } },
      })
    : Promise.resolve(null);

  const coursesPromise = db.course.findMany({
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
    // Se não tiver query, podemos pular o primeiro (que já está no banner)
    // skip: !query ? 1 : 0, 
    // ^ Opcional: decidi manter na lista também para consistência
  });

  const [featuredCourse, courses] = await Promise.all([featuredPromise, coursesPromise]);

  // Formatação Decimal -> Number
  const formattedCourses = courses.map(c => ({
    ...c,
    price: c.price ? Number(c.price) : 0
  }));
  
  // Cast manual necessário se o prisma retornar Decimal e o componente esperar number no featured
  const formattedFeatured = featuredCourse ? {
      ...featuredCourse,
      price: featuredCourse.price ? Number(featuredCourse.price) : 0
  } : null;

  return (
    // Background Claro com Texturas Sutis
    <div className="min-h-screen w-full bg-[#F9FBF9] relative overflow-x-hidden">
      
      {/* Background Decorativo (Linear Gradient suave) */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#E8F1EB] to-transparent pointer-events-none" />
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-gradient-to-br from-[#76A771]/20 to-transparent rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative container mx-auto px-4 md:px-6 py-8 space-y-12">
        
        {/* HEADER DA COMUNIDADE */}
        {!query && (
            <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="flex flex-col space-y-2">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#062214]">
                        Comunidade <span className="text-[#2A5432]">Fitoclin</span>
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl">
                        Explore, aprenda e evolua com conteúdos exclusivos preparados pela Dra. Isa.
                    </p>
                </div>
                
                {/* BANNER PRINCIPAL (Framer Motion) */}
                {formattedFeatured && <FeaturedBanner course={formattedFeatured} />}
            </div>
        )}

        {/* ÁREA DE BUSCA E GRID */}
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 sticky top-4 z-30 bg-[#F9FBF9]/80 backdrop-blur-md p-4 -mx-4 md:mx-0 rounded-2xl border border-transparent md:border-gray-200/50 transition-all">
                <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-[#062214] flex items-center gap-2">
                        {query ? `Resultados para "${query}"` : "Todos os Cursos"}
                    </h3>
                    {!query && <p className="text-sm text-gray-400 font-medium">Biblioteca completa de conhecimento</p>}
                </div>
                <div className="w-full md:w-auto min-w-[300px]">
                    <CommunitySearch />
                </div>
            </div>

            <Suspense fallback={<CommunitySkeleton />}>
                {formattedCourses.length > 0 ? (
                    <CourseGrid courses={formattedCourses} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center opacity-70">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700">Nenhum curso encontrado</h3>
                        <p className="text-gray-500">Tente buscar por outro termo.</p>
                    </div>
                )}
            </Suspense>
        </div>
      </div>
    </div>
  );
}

function CommunitySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex flex-col gap-3">
            <div className="h-[200px] rounded-2xl bg-gray-200 animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}