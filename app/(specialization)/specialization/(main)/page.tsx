import { auth } from "@/auth";
import { getCourses } from "@/actions/courses";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CourseGrid } from "@/components/community/course-grid"; 
import { Lock, Sparkles, PlayCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export default async function SpecializationPage() {
  const session = await auth();
  if (!session) return redirect("/login");

  // 1. Verificar Permissão
  const subscription = await db.subscription.findUnique({
    where: { userId: session.user.id },
  });

  const hasAccess = 
    session.user.role === "ADMIN" || 
    subscription?.plan === "SPECIALIZATION" || 
    // Fallback temporário para testes, remova em produção se necessário
    session.user.email === "admin@fitoclin.com"; 

  // 2. Buscar Cursos "SPECIALIZATION"
  // @ts-ignore
  const courses = await getCourses("SPECIALIZATION");

  if (!hasAccess) {
    // Tela de Bloqueio Bonita
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-8 space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="relative">
            <div className="absolute inset-0 bg-purple-600 blur-3xl opacity-20 rounded-full"></div>
            <div className="relative bg-gradient-to-br from-[#0A311D] to-[#062214] p-8 rounded-2xl border border-purple-500/30 shadow-2xl">
                <Lock className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-white mb-2">Acesso Exclusivo</h1>
                <p className="text-gray-400 max-w-md mx-auto">
                  A área de Especialização contém masterclasses, certificações e mentorias avançadas. 
                  Faça o upgrade do seu plano para acessar.
                </p>
                <Button asChild size="lg" className="mt-6 bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-900/50">
                  <Link href="/subscription">Fazer Upgrade Agora</Link>
                </Button>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10 animate-in fade-in duration-700">
      
      {/* HERO SECTION */}
      <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl">
         <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-[#062214]/90 z-10"></div>
         {/* Imagem de Fundo (opcional) */}
         <div className="absolute inset-0 bg-[url('/banner-lp.jpeg')] bg-cover bg-center opacity-30"></div>
         
         <div className="relative z-20 p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" /> Bem-vindo(a), Dra. {session.user.name?.split(" ")[0]}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    Sua Jornada de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">Excelência</span>
                </h1>
                <p className="text-gray-300 text-lg">
                    Continue de onde parou ou inicie uma nova certificação em fitoterapia avançada.
                </p>
                <div className="flex gap-4 pt-2">
                    <Button className="bg-white text-purple-900 hover:bg-gray-100 font-bold">
                        <PlayCircle className="w-4 h-4 mr-2" /> Continuar Aula
                    </Button>
                    <Button variant="outline" className="border-purple-400/30 text-purple-200 hover:bg-purple-500/10">
                        Ver Agenda
                    </Button>
                </div>
            </div>

            {/* Card de Progresso Geral */}
            <div className="bg-[#062214]/60 backdrop-blur-md p-6 rounded-xl border border-white/10 w-full md:w-80">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-300">Nível Atual</span>
                    <Trophy className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="mb-2 flex justify-between items-end">
                    <span className="text-2xl font-bold text-white">Especialista I</span>
                    <span className="text-xs text-purple-300">750/1000 XP</span>
                </div>
                <Progress value={75} className="h-2 bg-white/10" indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500" />
                <p className="text-xs text-gray-500 mt-3 text-center">
                    Complete mais 2 aulas para subir de nível
                </p>
            </div>
         </div>
      </div>

      {/* GRID DE CURSOS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold text-white">Cursos de Especialização</h2>
                <p className="text-gray-400">Conteúdo técnico aprofundado e exclusivo.</p>
            </div>
        </div>

        {courses.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-dashed border-gray-700 bg-white/5">
            <p className="text-gray-400">Nenhum curso de especialização disponível no momento.</p>
            <p className="text-sm text-gray-500 mt-2">Novos módulos são liberados mensalmente.</p>
          </div>
        ) : (
          <CourseGrid courses={courses} />
        )}
      </div>
    </div>
  );
}