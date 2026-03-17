// app/(subscription)/subscription/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Check, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function SubscriptionPage() {
  const session = await auth();
  if (!session) return redirect("/login");

  const subscription = await db.subscription.findUnique({
    where: { userId: session.user.id }
  });

  const isCommunity = subscription?.plan === "COMMUNITY" && subscription?.status === "active";
  const isSpecialization = subscription?.plan === "SPECIALIZATION" && subscription?.status === "active";

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center py-20 px-4 overflow-hidden">

      {/* BACKGROUND IMAGE - NANO BANANA STYLE */}
      <div
        className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/sub_bg_premium.png')` }}
      />

      {/* DARK OVERLAY FOR READABILITY */}
      <div className="fixed inset-0 z-[-1] bg-[#062214]/80 backdrop-blur-[2px]" />

      <div className="text-center mb-16 space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#76A771]/10 border border-[#76A771]/30 text-[#76A771] text-xs font-bold uppercase tracking-widest backdrop-blur-md">
          <Sparkles className="w-4 h-4" /> Bem-vindo à Evolução
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-2xl">
          Sua Jornada na <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#76A771] to-[#A3D9A5]">Medicina Integrativa</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md">
          Acesso exclusivo ao ecossistema mais avançado de fitoterapia clínica e saúde baseada em evidências.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 w-full max-w-5xl mx-auto relative z-10">

        {/* PLANO COMUNIDADE */}
        <div className={`relative flex flex-col overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2
          ${isCommunity
            ? 'bg-[#0A311D]/80 border-2 border-[#76A771] shadow-[0_0_40px_rgba(118,167,113,0.3)]'
            : 'bg-[#062214]/60 border border-white/10 hover:border-[#76A771]/50 shadow-2xl backdrop-blur-xl'}`}
        >
          <div className="mb-6 space-y-2">
            <h2 className="text-2xl font-bold text-white">Comunidade Fitoclin</h2>
            <p className="text-gray-400 text-sm">O ponto de partida ideal para transformar sua saúde.</p>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-extrabold text-white">R$ 49</span>
              <span className="text-xl text-white font-bold">,90</span>
              <span className="text-gray-400 ml-1">/mês</span>
            </div>
          </div>

          <div className="flex-1 mb-8">
            <ul className="space-y-4">
              <FeatureItem text="Acesso aos cursos base da Comunidade" />
              <FeatureItem text="Materiais de apoio e e-books exclusivos" />
              <FeatureItem text="Participação no fórum de alunos" />
              <FeatureItem text="Aulas semanais ao vivo" />
            </ul>
          </div>

          <form action={/* action para criar checkout stripe COMUNIDADE */ "..."}>
            <Button
              className={`w-full h-14 rounded-xl font-bold text-lg transition-all duration-300 
                ${isCommunity
                  ? "bg-transparent border border-[#76A771] text-[#76A771]"
                  : "bg-white text-[#062214] hover:bg-[#76A771] hover:text-white hover:shadow-[0_0_20px_rgba(118,167,113,0.4)]"}`}
              disabled={isCommunity}
            >
              {isCommunity ? "Plano Ativo" : "Começar Agora"}
            </Button>
          </form>
        </div>

        {/* PLANO ESPECIALIZAÇÃO */}
        <div className={`relative flex flex-col overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2
          ${isSpecialization
            ? 'bg-[#0f2e21]/90 border-2 border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.4)]'
            : 'bg-gradient-to-b from-[#133F26]/80 to-[#062214]/80 border border-[#D4AF37]/50 hover:border-[#D4AF37] shadow-2xl backdrop-blur-xl'}`}
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />

          <div className="absolute top-6 right-6">
            <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#062214] font-bold px-3 py-1 border-none shadow-lg shadow-[#D4AF37]/20">
              <Star className="w-3 h-3 mr-1 inline fill-[#062214]" /> Elite
            </Badge>
          </div>

          <div className="mb-6 space-y-2">
            <h2 className="text-2xl font-bold text-[#F3E5AB]">Especialização</h2>
            <p className="text-gray-300 text-sm">Formação completa para profissionais da saúde.</p>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-extrabold text-white">R$ 99</span>
              <span className="text-xl text-white font-bold">,90</span>
              <span className="text-gray-400 ml-1">/mês</span>
            </div>
          </div>

          <div className="flex-1 mb-8">
            <ul className="space-y-4">
              <FeatureItem text="Tudo do plano Comunidade" gold />
              <FeatureItem text="Acesso total à Área de Especialização" gold />
              <FeatureItem text="Cursos técnicos e protocolos aprofundados" gold />
              <FeatureItem text="Certificados de conclusão válidos" gold />
              <FeatureItem text="Mentorias gravadas com Dra. Isa" gold />
            </ul>
          </div>

          <form action={/* action para criar checkout stripe ESPECIALIZAÇÃO */ "..."}>
            <Button
              className={`w-full h-14 rounded-xl font-bold text-lg transition-all duration-300 relative overflow-hidden group
                  ${isSpecialization
                  ? "bg-transparent border border-[#D4AF37] text-[#D4AF37]"
                  : "bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#062214] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] border-none"}`}
              disabled={isSpecialization}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative z-10">{isSpecialization ? "Plano Ativo" : "Desbloquear Especialização"}</span>
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}

function FeatureItem({ text, gold = false }: { text: string, gold?: boolean }) {
  return (
    <li className="flex items-start gap-3 text-sm text-gray-200">
      <div className={`mt-0.5 rounded-full p-1 ${gold ? 'bg-[#D4AF37]/20' : 'bg-[#76A771]/20'}`}>
        <Check className={`h-3 w-3 ${gold ? 'text-[#D4AF37]' : 'text-[#76A771]'}`} strokeWidth={3} />
      </div>
      <span className="leading-tight">{text}</span>
    </li>
  );
}