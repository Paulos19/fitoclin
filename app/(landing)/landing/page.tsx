import Image from "next/image";
import Link from "next/link";
import { LeadCaptureForm } from "@/components/landing/lead-capture-form";
import { 
  CheckCircle2, 
  Leaf, 
  HeartPulse, 
  Brain, 
  MessageCircle, 
  Star,
  Activity,
  Flame,
  Salad,
  HandHeart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  const whatsappNumber = "5511999999999"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá,+gostaria+de+agendar+uma+consulta+com+a+Dra.+Isa.`;

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white selection:bg-[#76A771] selection:text-[#062214]">
      
      {/* --- HEADER --- */}
      <header className="fixed top-0 w-full z-50 bg-[#062214]/90 backdrop-blur-md border-b border-[#2A5432]/30 transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Fitoclin Logo" width={36} height={36} className="object-contain" />
            <span className="font-bold text-2xl text-white tracking-tight">Fitoclin</span>
          </div>
          <Link href={whatsappLink} target="_blank" className="hidden md:block">
            <Button variant="outline" className="border-[#76A771] text-[#76A771] hover:bg-[#76A771] hover:text-[#062214] font-semibold transition-colors rounded-full px-6">
              Falar no WhatsApp
            </Button>
          </Link>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/banner-lp.jpeg" 
            alt="Fundo Fitoterapia" 
            fill 
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#062214] via-[#062214]/90 to-[#062214]/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#062214]/20 to-[#062214]" />
        </div>

        <div className="container mx-auto px-4 z-10 relative grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 max-w-2xl animate-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#76A771]/10 border border-[#76A771]/30 text-[#76A771] text-sm font-bold uppercase tracking-wider backdrop-blur-sm">
              <Leaf className="w-4 h-4" /> Clínica Fitoclin
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Saúde não é ausência de sintomas.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#76A771] to-emerald-400">
                É equilíbrio.
              </span>
            </h1>
            
            <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
              <p>
                Na Clínica Fitoclin, você não recebe uma prescrição comum. Recebe um <strong>raciocínio clínico profundo</strong>, baseado na sua história, no seu corpo e no que seu organismo está tentando comunicar.
              </p>
              <p className="border-l-4 border-[#76A771] pl-4 italic text-white font-medium">
                Aqui, não tratamos sintomas. Tratamos causas.
              </p>
              <p className="text-base text-gray-400">
                Dor, insônia, ansiedade, obesidade, queda de cabelo e fadiga não surgem por acaso — são sinais de desequilíbrios internos que vamos resolver juntos.
              </p>
            </div>
          </div>

          {/* Card de Captura */}
          <div className="bg-[#0A311D]/60 backdrop-blur-xl border border-[#2A5432] p-8 rounded-3xl shadow-2xl animate-in slide-in-from-right duration-700 lg:ml-auto w-full max-w-md transform hover:scale-[1.01] transition-transform">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Inicie sua Transformação</h2>
              <p className="text-sm text-gray-300">
                A Dra. Isa identifica a raiz do problema e constrói um plano personalizado para você.
              </p>
            </div>
            <LeadCaptureForm />
          </div>
        </div>
      </section>

      {/* --- SOBRE A DRA. ISA --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#76A771]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#062214]/5 aspect-[4/5] w-full max-w-md mx-auto">
                <Image 
                  src="/isa.png" // Certifique-se de ter essa imagem
                  alt="Dra. Isa"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062214]/80 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-bold text-xl">Dra. Isa</p>
                  <p className="text-[#76A771] text-sm font-medium">Criadora do Método Fitoclin</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl font-bold text-[#062214] flex items-center gap-3">
                <Star className="w-8 h-8 text-[#76A771] fill-[#76A771]" />
                Quem é a Dra. Isa?
              </h2>
              
              <div className="space-y-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Ela une ciência, clínica, espiritualidade e natureza para oferecer um cuidado seguro, personalizado e transformador.
                </p>

                <ul className="space-y-4">
                  {[
                    "Mais de 20 anos de estudo profundo em plantas medicinais",
                    "Mais de 6.000 pacientes atendidos",
                    "Mestrado, Doutorado e Pós-Doutorado",
                    "Formação sólida em Biologia e Química",
                    "Referência em Fitoterapia Integrativa no Brasil"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 min-w-[20px]">
                        <CheckCircle2 className="w-5 h-5 text-[#76A771]" />
                      </div>
                      <span className="text-[#062214] font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-[#062214] p-6 rounded-xl border-l-4 border-[#76A771]">
                  <p className="text-gray-300 italic">
                    "Você não será atendido por um protocolo genérico. Você será atendido por uma especialista com experiência real, método próprio e resultados comprovados."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- COMO É O ATENDIMENTO --- */}
      <section className="py-24 bg-[#F8FAF9]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#062214] mb-4">Como é o Atendimento?</h2>
            <p className="text-gray-600">
              Aqui, você não recebe uma fórmula pronta. Você recebe um protocolo clínico exclusivo para o seu organismo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                title: "Avaliação 360º",
                text: "Análise completa da saúde física, emocional e espiritual."
              },
              {
                icon: Brain,
                title: "Anamnese Epigenética",
                text: "Sua história de vida orienta todo o raciocínio clínico."
              },
              {
                icon: Leaf,
                title: "Prescrição Natural",
                text: "Plantas medicinais, chás, fitoterápicos e óleos essenciais personalizados."
              },
              {
                icon: HeartPulse,
                title: "Fitoneuroplasticidade",
                text: "Aplicação técnica para modular respostas neurais e comportamentais."
              },
              {
                icon: CheckCircle2,
                title: "Plano Estruturado",
                text: "Terapêutica progressiva e individual, passo a passo."
              },
              {
                icon: Star,
                title: "Resultado Real",
                text: "Foco na resolução da causa raiz, não apenas alívio."
              }
            ].map((card, idx) => (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white group">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#062214] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <card.icon className="w-8 h-8 text-[#76A771]" />
                  </div>
                  <h3 className="font-bold text-xl text-[#062214] mb-3">{card.title}</h3>
                  <p className="text-gray-600">{card.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5 PILARES --- */}
      <section className="py-24 bg-[#062214] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#76A771 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Os 5 Pilares do <span className="text-[#76A771]">Método Fitoclin</span>
          </h2>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { icon: HandHeart, title: "Fé", desc: "Fortalecimento espiritual como base da cura." },
              { icon: Salad, title: "Alimentação", desc: "Nutrição funcional e terapêutica." },
              { icon: Activity, title: "Atividade", desc: "Estímulo metabólico consciente." },
              { icon: Flame, title: "Motivação", desc: "Reprogramação mental e mudança real." },
              { icon: Leaf, title: "Fitoterapia", desc: "Plantas medicinais com critério clínico." },
            ].map((pillar, i) => (
              <div key={i} className="bg-[#0A311D] border border-[#2A5432] p-6 rounded-2xl hover:bg-[#2A5432]/30 transition-colors text-center group">
                <div className="mx-auto w-12 h-12 mb-4 text-[#76A771] group-hover:text-white transition-colors">
                  <pillar.icon className="w-full h-full" />
                </div>
                <h3 className="font-bold text-lg mb-2">{pillar.title}</h3>
                <p className="text-sm text-gray-400">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PARA QUEM É --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-[#062214] mb-8 leading-tight">
                Para quem é a <br/>
                <span className="text-[#76A771]">Fitoclin?</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Já tentou de tudo e não teve resultados duradouros",
                  "Quer tratar a raiz do problema, não apenas silenciar sintomas",
                  "Busca um cuidado humano, científico e profundo",
                  "Deseja transformar sua saúde de forma natural, segura e definitiva"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="bg-[#062214] p-2 rounded-full">
                      <CheckCircle2 className="w-5 h-5 text-[#76A771]" />
                    </div>
                    <p className="text-[#062214] font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 bg-[#062214] p-12 rounded-3xl text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#76A771] blur-[80px] opacity-20" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Seu corpo fala.<br/>Aqui nós sabemos ouvir.</h3>
                <p className="text-gray-300 mb-8 text-lg">
                  Se você quer mais do que alívio temporário — se você quer transformação real — esse é o seu lugar.
                </p>
                <Link href={whatsappLink} target="_blank">
                  <Button size="lg" className="w-full bg-[#76A771] hover:bg-[#5e8a5a] text-[#062214] font-bold text-lg h-14 rounded-full shadow-lg">
                    Agendar Minha Consulta
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-[#062214] mb-6">
            Dê o primeiro passo para sua nova saúde.
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Fale agora com nossa secretária e garanta seu horário.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href={whatsappLink} target="_blank">
              <Button size="lg" className="h-16 px-12 text-lg bg-[#25D366] hover:bg-[#1da851] text-white rounded-full font-bold shadow-[0_10px_40px_-10px_rgba(37,211,102,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(37,211,102,0.6)] transition-all transform hover:-translate-y-1 flex items-center gap-3">
                <MessageCircle className="w-6 h-6" /> 
                Agendamento via WhatsApp
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 flex justify-center gap-8 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#76A771]"/> Atendimento Personalizado</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#76A771]"/> Método Exclusivo</span>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 bg-[#051F12] border-t border-[#2A5432]/30 text-center md:text-left">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
              <Image src="/logo.png" alt="Fitoclin" width={40} height={40} />
              <div>
                <p className="text-white font-bold text-lg">Fitoclin</p>
                <p className="text-[#76A771] text-xs uppercase tracking-widest">Saúde Integrativa</p>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              <p>&copy; {new Date().getFullYear()} Clínica Fitoclin. Todos os direitos reservados.</p>
              <p className="mt-1">Responsável Técnica: Drª Isa.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* --- BOTÃO FLUTUANTE --- */}
      <Link 
        href={whatsappLink} 
        target="_blank" 
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] hover:bg-[#1da851] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all hover:scale-110 group"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-[#062214] px-4 py-2 rounded-xl text-sm font-bold shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none translate-x-2 group-hover:translate-x-0 duration-300">
          Agende sua Consulta
        </span>
      </Link>
    </div>
  );
}