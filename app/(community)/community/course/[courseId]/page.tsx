import { getCourseContent } from "@/actions/courses";
import { auth } from "@/auth";
import { hasCourseAccess } from "@/lib/access";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  ShieldCheck, 
  Sparkles, 
  UserCircle, 
  PlayCircle,
  Trophy,
  Clock
} from "lucide-react";
import { BuyButton } from "@/components/community/buy-button";
import { ModuleList } from "@/components/community/module-list";
import { cn } from "@/lib/utils";

export default async function CourseOverviewPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const session = await auth();
  
  if (!session?.user) return redirect("/login");

  // 1. Busca Dados e Acesso
  const course = await getCourseContent(courseId);
  if (!course) redirect("/community");

  const hasAccess = await hasCourseAccess(session.user.id, courseId);

  // 2. Cálculos de Estatísticas
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = course.modules.reduce((acc, m) => {
    return acc + m.lessons.filter(l => l.progress.length > 0 && l.progress[0].completed).length;
  }, 0);
  
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="flex flex-col min-h-full pb-20 animate-in fade-in duration-700">
      
      {/* --- HERO SECTION REDESENHADA --- */}
      <div className="relative w-full bg-[#062214] text-white overflow-hidden pb-12 pt-8 md:pt-12 lg:pb-24 lg:pt-20 rounded-b-[2.5rem] shadow-2xl">
        
        {/* Background Effects (Ambient Light) */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2A5432] rounded-full blur-[120px] opacity-30 -mr-40 -mt-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37] rounded-full blur-[100px] opacity-10 -ml-20 -mb-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />

        <div className="relative z-10 px-6 md:px-10 max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* COLUNA ESQUERDA: Informações */}
          <div className="space-y-8 animate-in slide-in-from-left-6 duration-700">
             <div className="flex flex-wrap gap-3">
                {hasAccess ? (
                    <Badge className="bg-[#2A5432] text-[#76A771] border border-[#76A771]/30 px-3 py-1.5 text-sm">
                        <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Acesso Liberado
                    </Badge>
                ) : (
                    <Badge variant="destructive" className="px-3 py-1.5 text-sm">Conteúdo Exclusivo</Badge>
                )}
                <Badge variant="outline" className="text-gray-300 border-white/10 bg-white/5 backdrop-blur-sm px-3 py-1.5 text-sm">
                    Certificado Oficial
                </Badge>
             </div>

             <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F1F1F1] to-[#9cbfa0]">
                      {course.title}
                   </span>
                </h1>
                
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl font-light">
                   {course.description || "Domine esta especialidade com protocolos práticos e embasamento científico da Metodologia Fitoclin."}
                </p>
             </div>

             {/* Meta Info (Stats) */}
             <div className="flex flex-wrap items-center gap-4 md:gap-8 pt-2">
                <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl px-4 py-3 backdrop-blur-sm">
                    <div className="p-2 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Módulos</p>
                        <p className="text-lg font-bold text-white">{course.modules.length}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl px-4 py-3 backdrop-blur-sm">
                    <div className="p-2 rounded-xl bg-[#76A771]/20 text-[#76A771]">
                        <PlayCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Aulas</p>
                        <p className="text-lg font-bold text-white">{totalLessons}</p>
                    </div>
                </div>

                 <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl px-4 py-3 backdrop-blur-sm">
                    <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                        <UserCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Instrutor</p>
                        <p className="text-lg font-bold text-white">Dra. Isa</p>
                    </div>
                </div>
             </div>
          </div>

          {/* COLUNA DIREITA: Imagem ou Buy Box */}
          <div className="relative flex justify-center lg:justify-end animate-in slide-in-from-right-6 duration-700 delay-100">
             
             {/* SE TIVER ACESSO: MOSTRA A CAPA DO CURSO EM GRANDE ESTILO */}
             {hasAccess ? (
                <div className="relative w-full max-w-lg aspect-video rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group">
                    {course.imageUrl ? (
                        <Image 
                            src={course.imageUrl} 
                            alt={course.title} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#2A5432] to-[#0A311D] flex items-center justify-center">
                            <Image src="/logo.png" alt="Fitoclin" width={100} height={100} className="opacity-20" />
                        </div>
                    )}
                    
                    {/* Overlay de Play */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                            <PlayCircle className="w-10 h-10 text-white fill-white/20" />
                        </div>
                    </div>
                </div>
             ) : (
                /* SE NÃO TIVER ACESSO: MOSTRA O CARD DE VENDA */
                <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-8 text-[#062214] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border-4 border-[#D4AF37]/20 relative">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#062214] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                        Oferta Especial
                    </div>

                    <div className="text-center mb-6 mt-2">
                        <h3 className="font-bold text-2xl">Desbloqueie Agora</h3>
                        <p className="text-gray-500">Acesso vitalício + Atualizações</p>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-1 mb-8">
                        <span className="text-sm text-gray-400 font-medium line-through">
                             R$ {(Number(course.price) * 1.5).toFixed(2).replace('.', ',')}
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg text-gray-400 font-medium">12x de</span>
                            <span className="text-6xl font-extrabold text-[#2A5432] tracking-tighter">
                                R$ {(Number(course.price) / 12).toFixed(2).replace('.', ',')}
                            </span>
                        </div>
                        <span className="text-sm text-[#76A771] font-bold bg-[#76A771]/10 px-2 py-0.5 rounded">
                            ou R$ {Number(course.price).toFixed(2).replace('.', ',')} à vista
                        </span>
                    </div>
                    
                    <BuyButton courseId={course.id} price={Number(course.price)} />

                    <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400">
                        <ShieldCheck className="w-4 h-4 text-[#2A5432]" /> 
                        Garantia incondicional de 7 dias
                    </div>
                </div>
             )}
          </div>
        </div>
      </div>

      {/* --- BARRA DE PROGRESSO STICKY MELHORADA --- */}
      {hasAccess && (
        <div className="sticky top-[80px] z-30 px-4 md:px-0 -mt-8 md:-mt-10 mb-8 pointer-events-none">
           <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl border border-white/50 shadow-lg rounded-2xl p-1 pointer-events-auto">
               <div className="flex items-center gap-4 px-4 py-3">
                  {/* Ícone de Troféu que muda de cor ao completar */}
                  <div className={cn(
                      "p-2 rounded-xl transition-colors",
                      progressPercentage === 100 ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "bg-[#2A5432]/10 text-[#2A5432]"
                  )}>
                      <Trophy className="w-6 h-6" />
                  </div>

                  <div className="flex-1 space-y-1.5">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#062214]">
                          <span>Seu Progresso</span>
                          <span className={progressPercentage === 100 ? "text-[#D4AF37]" : "text-[#76A771]"}>
                              {progressPercentage}%
                          </span>
                      </div>
                      
                      {/* Barra de Progresso com Gradiente */}
                      <Progress 
                        value={progressPercentage} 
                        className="h-2.5 bg-gray-100" 
                        indicatorClassName={cn(
                            "transition-all duration-1000",
                            progressPercentage === 100 
                                ? "bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]" 
                                : "bg-gradient-to-r from-[#2A5432] to-[#76A771]"
                        )} 
                      />
                  </div>
               </div>
           </div>
        </div>
      )}

      {/* --- CONTEÚDO (Módulos) --- */}
      <div className="px-6 max-w-7xl mx-auto w-full space-y-8 mt-4">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
                <h2 className="text-3xl font-bold text-[#062214]">Cronograma do Curso</h2>
                <p className="text-gray-500 mt-1">Siga a ordem sugerida para melhor aproveitamento.</p>
            </div>
            
            {!hasAccess && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    Tempo estimado: {totalLessons * 15} minutos
                </div>
            )}
         </div>

         <ModuleList 
            courseId={course.id} 
            modules={course.modules} 
            hasAccess={hasAccess} 
         />
      </div>

    </div>
  );
}