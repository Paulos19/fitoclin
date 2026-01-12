import { db } from "@/lib/db";
import { CourseGrid } from "@/components/community/course-grid";
import { Suspense } from "react";
import { GraduationCap, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default async function DashboardCoursesPage() {
  // 1. Busca dados no servidor
  const courses = await db.course.findMany({
    where: { active: true },
    include: {
      _count: { select: { modules: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const formattedCourses = courses.map((c) => ({
    ...c,
    price: c.price ? Number(c.price) : 0,
  }));

  return (
    // Usa bg-background definido no CSS (#062214) e text-foreground (#F1F1F1)
    <div className="flex flex-col gap-8 p-6 md:p-8 min-h-full w-full animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border/40 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            {/* Ícone com a cor Secondary (#76A771) sobre fundo Primary suave */}
            <div className="p-2.5 rounded-xl bg-primary/20 border border-primary/30 shadow-[0_0_15px_-3px_rgba(118,167,113,0.2)]">
              <GraduationCap className="w-6 h-6 text-secondary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Catálogo de Cursos
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl text-base leading-relaxed pl-1">
            Explore conteúdos exclusivos de fitoterapia e saúde integrativa. 
            Aprenda no seu ritmo com a metodologia Fitoclin.
          </p>
        </div>

        {/* Botão VIP - Mantendo destaque Dourado para contraste com o Verde Escuro */}
        <Link href="/community">
          <Button 
            className="h-11 px-6 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#062214] font-bold hover:brightness-110 shadow-lg shadow-[#D4AF37]/10 border-none transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 mr-2 text-[#062214]" />
            Acessar Comunidade VIP
          </Button>
        </Link>
      </div>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <Suspense fallback={<CoursesSkeleton />}>
        {formattedCourses.length > 0 ? (
          <div className="grid gap-6">
             {/* O CourseGrid deve renderizar Cards que usarão automaticamente a var(--card) #0A311D */}
             <CourseGrid courses={formattedCourses} />
          </div>
        ) : (
          <EmptyState />
        )}
      </Suspense>
    </div>
  );
}

// --- SUB-COMPONENTES DE UI (Adaptados ao Tema Escuro) ---

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border/50 rounded-2xl bg-card/30">
      <div className="p-4 rounded-full bg-primary/10 mb-4 border border-primary/20">
        <BookOpen className="w-8 h-8 text-secondary/80" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">
        Nenhum curso disponível
      </h3>
      <p className="text-muted-foreground max-w-sm mt-2">
        Ainda não publicamos novos cursos. Fique atento, novidades estão chegando em breve!
      </p>
    </div>
  );
}

function CoursesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3 p-4 rounded-xl border border-border bg-card">
          {/* Skeleton adaptado para fundo escuro (shadcn geralmente lida com isso via opacidade) */}
          <Skeleton className="h-40 w-full rounded-lg bg-primary/20" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4 bg-primary/20" />
            <Skeleton className="h-3 w-1/2 bg-primary/20" />
          </div>
          <div className="flex justify-between pt-4">
            <Skeleton className="h-9 w-24 rounded-md bg-primary/20" />
            <Skeleton className="h-9 w-9 rounded-full bg-primary/20" />
          </div>
        </div>
      ))}
    </div>
  );
}