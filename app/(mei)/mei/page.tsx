import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Brain, Droplets, AlertTriangle, Heart, PlayCircle, CheckCircle2, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function MeiPortalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50/30 to-white text-gray-900 pb-20 relative overflow-hidden">
      {/* Texture Background Global */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5 mix-blend-multiply">
        <Image src="/1.png" alt="Background Texture" fill className="object-cover" />
      </div>

      <div className="relative z-10">
        {/* HEADER / BANNER PRINCIPAL */}
        <section className="relative overflow-hidden pt-28 pb-20 border-b border-green-200/50 bg-gradient-to-b from-green-50/50 to-white/80">
          <div className="absolute inset-0 -z-10">
            <Image src="/4.png" alt="Header Texture" fill priority className="object-cover opacity-[0.03] mix-blend-multiply" />
          </div>

          <div className="container mx-auto px-4 relative z-20 text-center max-w-4xl">
            <Badge className="bg-green-100 text-green-700 border border-green-200 mb-8 px-5 py-1.5 text-sm uppercase tracking-widest backdrop-blur-md shadow-sm">
              🌿 Bem-vindo ao seu novo ponto de partida
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-br from-green-900 via-green-800 to-green-600 drop-shadow-sm">
              EMAGRECIMENTO INTELIGENTE <span className="text-green-500 drop-shadow-md">(MEI)</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-6 font-light">
              Você não está começando mais uma dieta.
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Você está iniciando um processo estruturado de reorganização metabólica, hormonal e neural.
            </p>
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-green-200/50 rounded-2xl px-8 py-4 text-green-800 font-semibold shadow-xl shadow-green-900/5">
              <Leaf className="w-5 h-5 text-green-600" />
              <span>Respire. Aqui começa a sua nova base.</span>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 mt-16 grid gap-16 max-w-6xl">

          {/* NOVA SESSÃO COM A IMAGEM SOLICITADA */}
          <section className="relative z-10">
            <div className="bg-white/60 backdrop-blur-xl border border-green-100 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-green-900/5">
              <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white">
                  <Image
                    src="/WhatsApp Image 2026-02-25 at 17.41.07 (1).jpeg"
                    alt="Metodologia em Ação"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="space-y-6">
                  <Badge className="bg-green-100 text-green-700 border border-green-200 px-4 py-1">O PROCESSO</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                    Transformação de dentro para fora
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    O método MEI não foca apenas na perda de peso estética, mas na verdadeira reprogramação dos seus hábitos diários. Ao alinhar os 5 pilares do emagrecimento, nós restauramos o equilíbrio que o corpo perdeu ao longo dos anos.
                  </p>
                  <ul className="space-y-4 pt-4">
                    {[
                      "Regulação Sistêmica e Hormonal",
                      "Controle de Ansiedade e Fome Oculta",
                      "Manutenção Permanente dos Resultados"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="text-gray-800 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* COMO USAR ESSA ÁREA */}
          <section className="relative">
            <div className="absolute -inset-x-4 -inset-y-8 bg-gradient-to-b from-green-50/50 to-transparent -z-10 rounded-3xl" />
            <div className="flex items-center gap-4 mb-8 justify-center md:justify-start">
              <div className="p-3 bg-green-100 rounded-xl border border-green-200/50 shadow-sm">
                <Brain className="w-8 h-8 text-green-700" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">COMO USAR ESSA ÁREA</h2>
            </div>

            <div className="grid md:grid-cols-[1fr_400px] gap-6">
              <div className="bg-white/80 backdrop-blur-xl border border-green-200/50 rounded-3xl p-8 relative overflow-hidden group shadow-xl shadow-green-900/5">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <ul className="space-y-6 relative z-10">
                  {[
                    "Assista às aulas na ordem das fases.",
                    "Preencha o Mapa de Avaliação Metabólica antes de iniciar.",
                    "Siga os 21 dias estratégicos com disciplina e leveza.",
                    "Participe do Clube MEI no WhatsApp.",
                    "Compareça às mentorias ao vivo."
                  ].map((text, i) => (
                    <li key={i} className="flex gap-4 items-start group/item">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold text-sm shrink-0 border border-green-200 group-hover/item:scale-110 transition-transform shadow-sm">
                        {i + 1}
                      </span>
                      <p className="text-gray-700 text-lg leading-relaxed pt-0.5">{text}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-green-100 relative z-10">
                  <p className="text-center font-bold text-green-700 text-lg tracking-wide uppercase transition-all">Constância vale mais do que intensidade.</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Link href="/mei/courses" className="flex-1 group">
                  <Button className="w-full h-full text-xl bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white flex flex-col gap-3 rounded-3xl border-none shadow-xl shadow-green-600/20 transition-all hover:scale-[1.02] hover:shadow-green-600/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/2.png')] opacity-10 mix-blend-overlay group-hover:opacity-20 transition-opacity"></div>
                    <PlayCircle className="w-12 h-12 relative z-10 group-hover:scale-110 transition-transform" />
                    <span className="relative z-10 font-bold tracking-wide">Ir para as Aulas</span>
                  </Button>
                </Link>
                <a href="#" target="_blank" className="flex-1 group">
                  <Button variant="outline" className="w-full h-full text-lg border-green-200 bg-white hover:bg-green-50 text-green-700 flex flex-col gap-3 rounded-3xl shadow-md transition-all hover:scale-[1.02] hover:border-green-300 relative overflow-hidden">
                    <MessageCircle className="w-10 h-10 relative z-10 group-hover:scale-110 transition-transform text-green-600" />
                    <span className="relative z-10 font-semibold">Entrar no Clube MEI</span>
                    <span className="text-sm font-medium text-green-600/70 relative z-10">(WhatsApp)</span>
                  </Button>
                </a>
              </div>
            </div>
          </section>

          {/* FASES DA JORNADA */}
          <section className="relative z-10">
            <div className="text-center mb-12">
              <Badge className="bg-green-100 text-green-700 border border-green-200 mb-4 px-4 py-1">A METODOLOGIA</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">SUA JORNADA EM 3 FASES</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Siga o processo estruturado para não apenas perder peso, mas reconstruir sua base metabólica.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  phase: "FASE 1",
                  title: "DESPERTAR™",
                  desc: "Consciência + ativação dos 5 pilares + início da reorganização.",
                  bg: "/3.png",
                  color: "from-emerald-900 via-emerald-800/90 to-emerald-900/40",
                  border: "group-hover:border-emerald-500/50"
                },
                {
                  phase: "FASE 2",
                  title: "REORGANIZAÇÃO™",
                  desc: "Estabilização do sono, cortisol, insulina, inflamação e intestino.",
                  bg: "/5.png",
                  color: "from-green-900 via-green-800/90 to-green-900/40",
                  border: "group-hover:border-green-500/50"
                },
                {
                  phase: "FASE 3",
                  title: "IDENTIDADE PERMANENTE™",
                  desc: "Consolidação do novo padrão e o fim definitivo do efeito sanfona.",
                  bg: "/6.png",
                  color: "from-teal-900 via-teal-800/90 to-teal-900/40",
                  border: "group-hover:border-teal-500/50"
                }
              ].map((item, i) => (
                <Card key={i} className={`bg-transparent border-0 relative overflow-hidden group transition-all duration-500 hover:-translate-y-2 rounded-3xl min-h-[350px] flex flex-col justify-end shadow-2xl`}>
                  <div className="absolute inset-0 z-0 opacity-100 transition-transform duration-700 group-hover:scale-110">
                    <Image src={item.bg} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.color} z-0 opacity-90 group-hover:opacity-95 transition-opacity duration-500`}></div>

                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20"></div>

                  <CardHeader className="relative z-10 pb-2">
                    <span className="text-sm font-bold tracking-widest text-green-200 mb-2 block">{item.phase}</span>
                    <CardTitle className="text-white text-2xl font-bold tracking-tight">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-gray-200 leading-relaxed font-medium">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* AVISOS IMPORTANTES */}
          <section className="grid md:grid-cols-2 gap-6 relative z-10">
            <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 overflow-hidden relative group rounded-3xl shadow-xl shadow-blue-900/5">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl group-hover:bg-blue-400/20 transition-all duration-500"></div>
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-100 rounded-xl border border-blue-200">
                    <Droplets className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-800 tracking-tight">LEMBRE-SE</h3>
                </div>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-lg">Hidratação correta (40ml por kg).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-lg">Execução diária dos pilares.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-lg font-medium">Compromisso inegociável com o processo.</span>
                  </li>
                </ul>
                <div className="mt-8 pt-6 border-t border-blue-200">
                  <p className="text-base font-medium text-blue-700 leading-relaxed italic text-center text-lg">"Você não precisa ser perfeita.<br />Precisa ser constante."</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-200 overflow-hidden relative group rounded-3xl shadow-xl shadow-amber-900/5">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl group-hover:bg-amber-400/20 transition-all duration-500"></div>
              <CardContent className="p-8 flex flex-col h-full relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-amber-100 rounded-xl border border-amber-200">
                    <AlertTriangle className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-amber-800 tracking-tight">IMPORTANTE</h3>
                </div>
                <div className="text-gray-700 text-lg space-y-4 leading-relaxed">
                  <p>Este método exige autorresponsabilidade.</p>
                  <p>Se tiver qualquer condição de saúde específica, uso de medicamentos contínuos ou restrições de saúde, <strong className="text-amber-700 font-semibold">siga as orientações do seu médico.</strong></p>
                </div>
                <div className="mt-auto pt-6 border-t border-amber-200 text-center">
                  <p className="text-base font-bold text-amber-600 uppercase tracking-widest">Segurança faz parte da permanência</p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* MENSAGEM FINAL DRA ISA */}
          <section className="mt-8 relative z-10">
            <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-green-900/10">
              <div className="absolute inset-0 z-0">
                <Image src="/1.png" alt="Texture" fill className="object-cover opacity-[0.03] mix-blend-multiply" />
              </div>

              <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center relative z-10">
                <div className="space-y-6 md:pl-8">
                  <div className="inline-flex items-center gap-3 bg-green-100 text-green-700 px-5 py-2.5 rounded-full border border-green-200 mb-2 shadow-sm">
                    <Heart className="w-5 h-5 text-green-600 fill-green-600/20" />
                    <span className="text-sm font-bold tracking-wide uppercase">Uma mensagem para você</span>
                  </div>

                  <div className="space-y-5 text-xl text-gray-700 font-light leading-relaxed">
                    <p>Você não está aqui por acaso.</p>
                    <p>Se chegou até aqui, é porque decidiu parar de lutar contra o seu próprio corpo e começar a organizar o sistema e sua mente.</p>
                    <div className="pl-6 border-l-4 border-green-500 py-4 my-8 bg-gradient-to-r from-green-50 to-transparent rounded-r-2xl">
                      <p className="text-2xl font-bold text-gray-900 tracking-tight">Emagrecer é consequência.<br /><span className="text-green-600">Permanecer é método.</span></p>
                    </div>
                    <p className="text-green-700 font-bold text-2xl tracking-tight">Bem-vinda à sua nova direção.</p>
                  </div>
                </div>

                <div className="relative mx-auto md:mx-0 pr-8 mt-12 md:mt-0">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-green-200 to-transparent rounded-full blur-2xl z-0 pointer-events-none opacity-50"></div>
                  <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full border-8 border-white shadow-2xl overflow-hidden z-10 bg-green-50">
                    <Image
                      src="/isa.png"
                      alt="Dra. Isa Bieski"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white border border-green-200 text-gray-900 px-8 py-3 rounded-full shadow-xl shadow-green-900/10 z-20 whitespace-nowrap">
                    <p className="font-bold text-lg tracking-wide">Dra. Isa Bieski <span className="text-xl inline-block translate-y-0.5 ml-1">💚</span></p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

// Dummy component para o Badge funcionar sem precisar importar do Shadcn (caso não tenha importado)
function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return <span className={`inline-flex items-center rounded-full transition-colors ${className}`}>{children}</span>
}