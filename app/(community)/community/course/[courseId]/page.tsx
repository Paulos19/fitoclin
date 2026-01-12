import { getCourseContent } from "@/actions/courses";
import { auth } from "@/auth";
import { hasCourseAccess } from "@/lib/access"; // 👈 Nossa nova função
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, CheckCircle, BookOpen, Lock, ShieldCheck, CreditCard } from "lucide-react";
import Link from "next/link";
import { BuyButton } from "@/components/community/buy-button"; // 👈 Nosso botão

export default async function CourseOverviewPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const session = await auth();
  
  if (!session?.user) return redirect("/login");

  // 1. Busca Dados do Curso
  const course = await getCourseContent(courseId);
  if (!course) redirect("/community");

  // 2. Verifica se tem acesso (Assinatura ou Compra)
  const hasAccess = await hasCourseAccess(session.user.id, courseId);

  // Cálculos de Estatísticas
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = course.modules.reduce((acc, m) => {
    return acc + m.lessons.filter(l => l.progress.length > 0 && l.progress[0].completed).length;
  }, 0);
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="flex flex-col min-h-full pb-20 animate-in fade-in duration-500">
      
      {/* --- HERO SECTION --- */}
      <div className="relative w-full bg-gradient-to-r from-[#062214] to-[#0A331E] text-white p-8 md:p-12 overflow-hidden shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')]"></div>
        
        <div className="relative z-10 max-w-4xl flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="flex-1 space-y-4">
            <div className="flex gap-2">
                <Badge className="bg-[#76A771]/20 text-[#76A771] border-0">Curso Completo</Badge>
                {!hasAccess && <Badge variant="destructive">Conteúdo Bloqueado</Badge>}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">{course.title}</h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
              {course.description || "Aprofunde seus conhecimentos com este curso exclusivo."}
            </p>

            <div className="flex items-center gap-6 text-sm font-medium text-gray-400 pt-2">
               <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#76A771]" />
                  {course.modules.length} Módulos
               </div>
               <div className="flex items-center gap-2">
                  <PlayCircle className="w-4 h-4 text-[#76A771]" />
                  {totalLessons} Aulas
               </div>
            </div>
          </div>

          {/* CARD DE AÇÃO (BUY BOX) - Só aparece se não tiver acesso */}
          {!hasAccess && (
            <div className="w-full md:w-[350px] bg-white rounded-xl p-6 text-[#062214] shadow-2xl border-2 border-[#76A771]">
                <h3 className="font-bold text-lg mb-1">Desbloqueie este curso</h3>
                <p className="text-sm text-gray-500 mb-4">Tenha acesso vitalício ao conteúdo.</p>
                
                <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-xs text-gray-400 font-medium">POR APENAS</span>
                    <span className="text-4xl font-extrabold text-[#2A5432]">
                        R$ {Number(course.price).toFixed(2).replace('.', ',')}
                    </span>
                </div>

                <BuyButton courseId={course.id} price={Number(course.price)} />

                <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <CreditCard className="w-3 h-3" /> Parcelamento disponível
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <ShieldCheck className="w-3 h-3" /> Pagamento 100% seguro
                    </div>
                </div>
            </div>
          )}
        </div>
      </div>

      {/* --- ÁREA DO ALUNO (Visível apenas se tiver acesso) --- */}
      {hasAccess && (
        <div className="bg-white border-b border-gray-100 px-8 py-6 sticky top-0 z-20 shadow-sm">
           <div className="max-w-5xl">
              <div className="flex justify-between text-sm font-medium mb-2 text-[#062214]">
                 <span>Seu Progresso</span>
                 <span>{progressPercentage}% Concluído</span>
              </div>
              <Progress value={progressPercentage} className="h-2 bg-gray-100" indicatorClassName="bg-[#2A5432]" />
           </div>
        </div>
      )}

      {/* --- LISTAGEM DE MÓDULOS --- */}
      <div className="p-8 max-w-6xl mx-auto w-full space-y-8">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#062214]">Conteúdo Programático</h2>
            {!hasAccess && <Lock className="text-gray-300 w-6 h-6" />}
        </div>
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${!hasAccess ? "opacity-60 pointer-events-none select-none grayscale-[0.5]" : ""}`}>
          {course.modules.map((module, index) => {
            const moduleCompleted = module.lessons.filter(l => l.progress?.[0]?.completed).length;
            const isModuleComplete = module.lessons.length > 0 && module.lessons.length === moduleCompleted;
            const firstLessonId = module.lessons[0]?.id;

            return (
              <Card key={module.id} className="flex flex-col overflow-hidden border-gray-100 hover:border-green-200 transition-all duration-300">
                <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
                  <div className="flex justify-between items-start">
                     <Badge variant="outline" className="bg-white">Módulo {index + 1}</Badge>
                     {isModuleComplete && hasAccess && (
                        <Badge className="bg-green-100 text-green-700 border-0 gap-1"><CheckCircle className="w-3 h-3" /> Concluído</Badge>
                     )}
                  </div>
                  <CardTitle className="text-lg font-bold text-[#062214] pt-2 line-clamp-2">{module.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col pt-6">
                   <div className="space-y-3 mb-6 flex-1">
                      {module.lessons.slice(0, 3).map((lesson) => (
                         <div key={lesson.id} className="flex items-center gap-3 text-sm text-gray-600">
                            {hasAccess && lesson.progress?.[0]?.completed ? <CheckCircle className="w-4 h-4 text-[#76A771]" /> : <PlayCircle className="w-4 h-4 text-gray-300" />}
                            <span className="line-clamp-1">{lesson.title}</span>
                         </div>
                      ))}
                      {module.lessons.length > 3 && <p className="text-xs text-gray-400 pl-7">...e mais aulas</p>}
                   </div>

                   {/* Botão de Iniciar Módulo */}
                   <div className="mt-auto">
                      <Button asChild className="w-full bg-[#2A5432] hover:bg-[#204026]" disabled={!hasAccess}>
                         <Link href={hasAccess && firstLessonId ? `/community/course/${course.id}/lesson/${firstLessonId}` : "#"}>
                            {hasAccess ? "Acessar Módulo" : "Bloqueado"}
                         </Link>
                      </Button>
                   </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action Final para quem não comprou */}
        {!hasAccess && (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                <Lock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">Conteúdo Exclusivo</h3>
                <p className="text-gray-500 mb-6">Adquira o curso para desbloquear todas as aulas e materiais.</p>
                <div className="w-full max-w-xs mx-auto">
                    <BuyButton courseId={course.id} price={Number(course.price)} />
                </div>
            </div>
        )}
      </div>
    </div>
  );
}