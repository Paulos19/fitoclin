import { auth } from "@/auth";
import { getCourseContent } from "@/actions/courses";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CourseSidebarPro } from "@/components/specialization/course-sidebar-pro";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function SpecializationCourseLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) {
  const session = await auth();
  if (!session) return redirect("/login");
  
  const { courseId } = await params;

  // 1. Validar Acesso (Specialization, Admin ou Compra)
  const subscription = await db.subscription.findUnique({ where: { userId: session.user.id } });
  const purchase = await db.purchase.findUnique({ where: { userId_courseId: { userId: session.user.id, courseId } } });
  
  const hasAccess = 
    session.user.role === "ADMIN" || 
    subscription?.plan === "SPECIALIZATION" ||
    !!purchase;

  if (!hasAccess) {
    return redirect("/specialization"); // Ou página de venda
  }

  // 2. Buscar Conteúdo
  const course = await getCourseContent(courseId);
  if (!course) return redirect("/specialization");

  // 3. Calcular Progresso Total
  const allLessons = course.modules.flatMap((m: any) => m.lessons);
  const completedCount = allLessons.filter((l: any) => l.progress.length > 0 && l.progress[0].completed).length;

  return (
    // CORREÇÃO: flex-1 e h-full substitui o h-[calc(100vh-80px)]
    <div className="flex flex-1 h-full overflow-hidden bg-[#062214]">
        {/* Sidebar fixa a esquerda (Desktop) */}
        <div className="hidden md:block h-full">
            <CourseSidebarPro course={course} progressCount={completedCount} />
        </div>

        {/* Área de Conteúdo Principal */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            {/* Header Mobile / Navegação Rápida */}
            <div className="md:hidden p-4 border-b border-white/10 flex items-center gap-2 shrink-0">
                <Button asChild size="icon" variant="ghost">
                    <Link href="/specialization/courses"><ArrowLeft className="w-5 h-5" /></Link>
                </Button>
                <span className="font-bold text-white truncate">{course.title}</span>
            </div>

            {/* O conteúdo das aulas (Player, materiais, etc) */}
            <div className="flex-1">
                {children}
            </div>
        </div>
    </div>
  );
}