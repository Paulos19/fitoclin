import { auth } from "@/auth";
import { db } from "@/lib/db";
import { PricingCard } from "@/components/subscription/pricing-card";
import { redirect } from "next/navigation";
import { PLANS } from "@/config/plans";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  CheckCircle2, 
  Sparkles, 
  Crown, 
  PlayCircle, 
  Users, 
  ShieldCheck, 
  ArrowRight
} from "lucide-react";

export default async function SubscriptionPage() {
  const session = await auth();
  if (!session) redirect("/login");

  // 1. Verificar Status Atual
  const userSubscription = await db.subscription.findUnique({
    where: { userId: session.user.id },
  });

  const hasActiveSubscription = userSubscription?.stripeCurrentPeriodEnd
    ? userSubscription.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
    : false;

  // --- CENÁRIO 1: USUÁRIO JÁ É ASSINANTE (PÁGINA DE SUCESSO) ---
  if (hasActiveSubscription) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] rounded-full blur-2xl opacity-30 animate-pulse" />
          <div className="relative p-6 rounded-full bg-gradient-to-br from-[#0A311D] to-[#062214] border border-[#D4AF37]">
            <Crown className="w-16 h-16 text-[#D4AF37]" />
          </div>
        </div>
        
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Você é <span className="text-[#D4AF37]">VIP</span>
          </h1>
          <p className="text-xl text-gray-400">
            Sua assinatura está ativa e você tem acesso ilimitado a todo o ecossistema Fitoclin.
          </p>
        </div>

        <Link href="/community">
          <Button className="h-14 px-10 text-lg font-bold bg-[#D4AF37] text-[#062214] hover:bg-[#F3E5AB] hover:scale-105 transition-all rounded-full shadow-[0_0_30px_-5px_rgba(212,175,55,0.4)]">
            Entrar na Comunidade Agora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    );
  }

  // --- CENÁRIO 2: PÁGINA DE VENDAS (NÃO ASSINANTE) ---
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto animate-in slide-in-from-bottom-10 duration-700">
      
      {/* COLUNA DA ESQUERDA: O PRODUTO / COPY */}
      <div className="space-y-10 order-2 lg:order-1 text-center lg:text-left">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A5432]/30 border border-[#2A5432] text-[#76A771] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            Fitoclin Academy Premium
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Domine a <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#76A771] via-[#D4AF37] to-[#76A771] animate-gradient bg-300%">
              Fitoterapia Clínica
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 lg:max-w-lg leading-relaxed mx-auto lg:mx-0">
            Tenha acesso imediato a protocolos validados, comunidade de elite e atualizações semanais com a Dra. Isa. Evolua sua prática clínica e pessoal.
          </p>
        </div>

        {/* Lista de Benefícios Visual */}
        <div className="space-y-4 text-left">
          <BenefitRow 
            icon={PlayCircle} 
            title="Acesso Imediato aos Cursos" 
            desc="Biblioteca completa de aulas gravadas e materiais em PDF."
          />
          <BenefitRow 
            icon={Users} 
            title="Comunidade Exclusiva" 
            desc="Networking de alto nível e tirada de dúvidas direto com especialistas."
          />
          <BenefitRow 
            icon={ShieldCheck} 
            title="Protocolos Validados" 
            desc="Copie e cole estratégias que funcionam no campo de batalha."
          />
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 border-t border-white/5">
          <div className="flex -space-x-3">
             {[1,2,3,4].map((i) => (
               <div key={i} className="w-10 h-10 rounded-full border-2 border-[#062214] bg-[#2A5432] flex items-center justify-center text-xs font-bold text-white">
                 <Users className="w-4 h-4 opacity-50" />
               </div>
             ))}
          </div>
          <div className="text-sm text-left">
            <p className="text-white font-bold">+1.200 Membros</p>
            <p className="text-[#76A771]">transformando vidas agora.</p>
          </div>
        </div>
      </div>

      {/* COLUNA DA DIREITA: PRECIFICAÇÃO (CORRIGIDA) */}
      <div className="order-1 lg:order-2 flex flex-col items-center justify-center w-full">
        {/* 👇 Wrapper com largura fixa (max-w-md) e mx-auto para garantir centralização */}
        <div className="w-full max-w-md bg-[#0A311D]/80 backdrop-blur-xl border border-[#2A5432]/50 p-8 rounded-3xl shadow-2xl relative overflow-hidden group mx-auto">
          
          {/* Efeito de destaque no card */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          
          <div className="text-center mb-8 space-y-2">
            <h3 className="text-xl font-medium text-gray-300">Escolha seu plano</h3>
            <p className="text-sm text-gray-500">Cancele a qualquer momento.</p>
          </div>

          <div className="flex flex-col gap-4">
            {PLANS.map((plan) => {
               if (!plan.priceId) return null; 

               return (
                 <div key={plan.key} className="transform transition-all hover:scale-[1.02]">
                    <PricingCard 
                      planId={plan.key}
                      priceId={plan.priceId}
                      name={plan.name}
                      price={plan.price}
                      features={plan.features.join(";")}
                      isPopular={plan.highlight}
                    />
                 </div>
               );
            })}
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
            <ShieldCheck className="w-3 h-3" />
            Pagamento seguro via Stripe
          </div>
        </div>
      </div>
      
    </div>
  );
}

// --- SUB-COMPONENTE: LINHA DE BENEFÍCIO ---
function BenefitRow({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
      <div className="p-2 rounded-lg bg-[#2A5432]/20 text-[#76A771] mt-1 shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-bold text-white text-lg">{title}</h4>
        <p className="text-gray-400 text-sm leading-snug">{desc}</p>
      </div>
    </div>
  );
}