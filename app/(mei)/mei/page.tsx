// app/(mei)/mei/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Brain, Droplets, AlertTriangle, Heart, PlayCircle, CheckCircle2, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function MeiPortalPage() {
  return (
    <div className="min-h-screen bg-[#04150c] text-white pb-20">
      
      {/* HEADER / BANNER PRINCIPAL */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A311D] to-[#04150c] pt-20 pb-16 border-b border-[#2A5432]/50">
        <div className="absolute inset-0 bg-[url('/globe.svg')] opacity-5 bg-center bg-no-repeat bg-cover mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <Badge className="bg-green-600/20 text-green-400 border border-green-500/30 mb-6 px-4 py-1 text-sm">
            🌿 BEM-VINDO
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            EMAGRECIMENTO INTELIGENTE <span className="text-green-400">(MEI)</span>
          </h1>
          <p className="text-xl text-gray-300 mb-4 font-light">
            Você não está começando mais uma dieta.
          </p>
          <p className="text-lg text-gray-400 mb-8">
            Você está iniciando um processo estruturado de reorganização metabólica, hormonal e neural.
          </p>
          <div className="inline-block bg-[#0A311D] border border-[#2A5432] rounded-lg px-6 py-3 text-green-300 font-medium">
            Respire. Aqui começa a sua nova base.
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-12 grid gap-12 max-w-5xl">
        
        {/* COMO USAR ESSA ÁREA */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-8 h-8 text-green-400" />
            <h2 className="text-2xl font-bold">COMO USAR ESSA ÁREA</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#0A311D]/40 border border-[#2A5432]/50 rounded-xl p-6 space-y-4">
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 font-bold text-sm shrink-0">1</span>
                  <p className="text-gray-300">Assista às aulas na ordem das fases.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 font-bold text-sm shrink-0">2</span>
                  <p className="text-gray-300">Preencha o Mapa de Avaliação Metabólica antes de iniciar.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 font-bold text-sm shrink-0">3</span>
                  <p className="text-gray-300">Siga os 21 dias estratégicos com disciplina e leveza.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 font-bold text-sm shrink-0">4</span>
                  <p className="text-gray-300">Participe do Clube MEI no WhatsApp.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 font-bold text-sm shrink-0">5</span>
                  <p className="text-gray-300">Compareça às mentorias ao vivo.</p>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-[#2A5432]/50">
                <p className="text-center font-semibold text-green-400">Constância vale mais do que intensidade.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Link href="/mei/courses" className="flex-1">
                <Button className="w-full h-full text-lg bg-green-600 hover:bg-green-700 text-white flex flex-col gap-2 rounded-xl border-none">
                  <PlayCircle className="w-8 h-8" />
                  Ir para as Aulas
                </Button>
              </Link>
              <a href="#" target="_blank" className="flex-1">
                <Button variant="outline" className="w-full h-full text-lg border-green-600/50 bg-[#0A311D]/30 hover:bg-green-900/40 text-green-400 flex flex-col gap-2 rounded-xl">
                  <MessageCircle className="w-8 h-8" />
                  Entrar no Clube MEI (WhatsApp)
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* FASES DA JORNADA */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">🔹 SUA JORNADA ESTÁ ORGANIZADA EM 3 FASES</h2>
            <p className="text-gray-400">Siga o processo estruturado para garantir resultados permanentes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-[#0A311D]/30 border-[#2A5432] relative overflow-hidden group hover:border-green-500/50 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500/30 group-hover:bg-green-400 transition-colors"></div>
              <CardHeader>
                <CardTitle className="text-green-400 text-xl">FASE 1 – DESPERTAR™</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Consciência + ativação dos 5 pilares + início da reorganização.</p>
              </CardContent>
            </Card>

            <Card className="bg-[#0A311D]/30 border-[#2A5432] relative overflow-hidden group hover:border-green-500/50 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50 group-hover:bg-green-400 transition-colors"></div>
              <CardHeader>
                <CardTitle className="text-green-400 text-xl">FASE 2 – REORGANIZAÇÃO™</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Estabilização do sono, cortisol, insulina, inflamação e intestino.</p>
              </CardContent>
            </Card>

            <Card className="bg-[#0A311D]/30 border-[#2A5432] relative overflow-hidden group hover:border-green-500/50 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500/80 group-hover:bg-green-400 transition-colors"></div>
              <CardHeader>
                <CardTitle className="text-green-400 text-xl">FASE 3 – IDENTIDADE PERMANENTE™</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Consolidação do novo padrão e fim do efeito sanfona.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* AVISOS IMPORTANTES */}
        <section className="grid md:grid-cols-2 gap-6">
          <Card className="bg-blue-950/20 border-blue-900/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Droplets className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold text-blue-400">LEMBRE-SE</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Hidratação correta (40ml por kg).</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Execução diária dos pilares.</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Compromisso com o processo.</li>
              </ul>
              <div className="mt-6 pt-4 border-t border-blue-900/30">
                <p className="text-sm font-medium text-blue-300">Você não precisa ser perfeita.<br/>Precisa ser constante.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-950/20 border-yellow-900/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-yellow-500">IMPORTANTE</h3>
              </div>
              <p className="text-gray-300 mb-4">Este método exige responsabilidade.</p>
              <p className="text-gray-300 mb-6">Se tiver qualquer condição de saúde específica, siga as orientações médicas adequadas.</p>
              <div className="mt-auto pt-4 border-t border-yellow-900/30">
                <p className="text-sm font-medium text-yellow-500">Segurança faz parte da permanência.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* MENSAGEM FINAL */}
        <section className="mt-8">
          <div className="bg-gradient-to-br from-[#0A311D] to-[#04150c] border border-[#2A5432] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <Heart className="absolute -top-10 -right-10 w-40 h-40 text-green-900/20" />
            <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center justify-center gap-3">
              <Leaf className="w-6 h-6" /> UMA MENSAGEM PARA VOCÊ
            </h2>
            <div className="space-y-4 text-lg text-gray-300 max-w-2xl mx-auto italic">
              <p>Você não está aqui por acaso.</p>
              <p>Se chegou até aqui, é porque decidiu parar de lutar contra o corpo e começar a organizar o sistema.</p>
              <p className="text-xl font-semibold text-white mt-6 not-italic">Emagrecer é consequência.<br/>Permanecer é método.</p>
              <p className="mt-8 text-green-400 font-bold not-italic">Bem-vinda à sua nova direção.</p>
              <p className="mt-4 text-sm text-gray-400 not-italic">— Dra. Isa Bieski 💚</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

// Dummy component para o Badge funcionar sem precisar importar do Shadcn (caso não tenha importado)
function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${className}`}>{children}</span>
}