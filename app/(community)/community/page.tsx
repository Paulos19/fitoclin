import { db } from "@/lib/db";
import { auth } from "@/auth";
import { CourseGrid } from "@/components/community/course-grid";
import { FeaturedBanner } from "@/components/community/featured-banner";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const session = await auth();
  const { q: query } = await searchParams;

  const siteInfo = await db.siteInfo.findUnique({
    where: { key: "homepage_config" }
  });

  // Verificação de Assinatura
  const subscription = session?.user?.id ? await db.subscription.findUnique({
    where: { userId: session.user.id },
    select: { stripeCurrentPeriodEnd: true }
  }) : null;

  const isAdmin = session?.user?.role === "ADMIN";
  const isSubscribed = subscription?.stripeCurrentPeriodEnd
    ? subscription.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
    : false;

  if (!isAdmin && !isSubscribed) {
    redirect("/dashboard/courses");
  }

  // Lógica de Busca
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
      title: { contains: query || "", mode: "insensitive" },
    },
    include: { _count: { select: { modules: true } } },
    orderBy: { createdAt: "desc" },
  });

  const [featuredCourse, courses] = await Promise.all([featuredPromise, coursesPromise]);

  const formattedCourses = courses.map(c => ({
    ...c,
    price: c.price ? Number(c.price) : 0
  }));

  const formattedFeatured = featuredCourse ? {
    ...featuredCourse,
    price: featuredCourse.price ? Number(featuredCourse.price) : 0
  } : null;

  return (
    <div className="mx-auto max-w-7xl pb-20 space-y-12 animate-in fade-in duration-700">

      {/* Banner Fixo da Comunidade */}
      {siteInfo?.communityBanner && (
        <section>
          <div className="relative w-full aspect-[4/1] md:aspect-[5/1] overflow-hidden rounded-3xl shadow-lg border border-[#2A5432]/30">
            <Image
              src={siteInfo.communityBanner}
              alt="Banner da Comunidade"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* Seção de Destaque */}
      {!query && (
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#2A5432]">
              Destaque da Semana
            </h2>
          </div>
          {formattedFeatured && <FeaturedBanner course={formattedFeatured} />}
        </section>
      )}

      {/* Grid de Cursos */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-gray-200 pb-4">
          <div>
            <h3 className="text-2xl font-bold text-[#062214]">
              {query ? `Resultados para "${query}"` : "Explorar Conteúdos"}
            </h3>
            <p className="text-gray-500 mt-1">
              {courses.length} curso(s) disponível(is)
            </p>
          </div>
          {/* Filtros poderiam vir aqui */}
        </div>

        <Suspense fallback={<div className="h-64 bg-gray-100 rounded-xl animate-pulse" />}>
          {formattedCourses.length > 0 ? (
            <CourseGrid courses={formattedCourses} />
          ) : (
            <div className="py-20 text-center text-gray-400">
              Nenhum conteúdo encontrado.
            </div>
          )}
        </Suspense>
      </section>
    </div>
  );
}