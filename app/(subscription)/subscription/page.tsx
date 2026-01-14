import { auth } from "@/auth";
import { db } from "@/lib/db";
import { PricingCard } from "@/components/subscription/pricing-card";
import { redirect } from "next/navigation";
import { PLANS } from "@/config/plans";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
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
      <div className="flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500 py-20">
        <div className="relative">
          {/* Glow Effect usando a cor secundária (Lime Green) */}
          <div className="absolute -inset-4 bg-secondary/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative p-6 rounded-full bg-card border border-primary/40 shadow-2xl shadow-black/50">
            <Crown className="w-16 h-16 text-secondary" />
          </div>
        </div>
        
        <div className="space-y-4 max-w-2xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
            Você é <span className="text-secondary">VIP</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Sua assinatura está ativa e você tem acesso ilimitado a todo o ecossistema Fitoclin.
          </p>
        </div>

        <Link href="/community">
          <Button className="h-14 px-10 text-lg font-bold btn-gradient rounded-full shadow-[0_0_30px_-5px_rgba(118,167,113,0.3)] transition-transform hover:scale-105">
            Entrar na Comunidade Agora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    );
  }

  // --- CENÁRIO 2: PÁGINA DE VENDAS (NÃO ASSINANTE) ---
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto animate-in slide-in-from-bottom-10 duration-700 px-6 py-12">
      
      {/* COLUNA DA ESQUERDA: O PRODUTO / COPY */}
      <div className="space-y-10 order-2 lg:order-1 text-center lg:text-left">
        <div className="space-y-6">
          {/* Badge estilizado com as cores do tema */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-secondary text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_-3px_rgba(118,167,113,0.2)]">
            <Sparkles className="w-3 h-3" />
            Fitoclin Academy Premium
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            Domine a <br/>
            {/* Gradiente de texto usando Secondary (Verde Lima) e um tom dourado sutil para destaque */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-[#D4AF37] to-secondary animate-gradient bg-300%">
              Fitoterapia Clínica
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground lg:max-w-lg leading-relaxed mx-auto lg:mx-0">
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
        <div className="flex items-center justify-center lg:justify-start gap-4 pt-6 border-t border-border">
          <div className="flex -space-x-3">
             {[1,2,3,4].map((i) => (
               <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-card flex items-center justify-center text-xs font-bold text-muted-foreground overflow-hidden">
                 <Users className="w-4 h-4 opacity-50" />
               </div>
             ))}
          </div>
          <div className="text-sm text-left">
            <p className="text-foreground font-bold">+1.200 Membros</p>
            <p className="text-secondary">transformando vidas agora.</p>
          </div>
        </div>
      </div>

      {/* COLUNA DA DIREITA: PRECIFICAÇÃO */}
      <div className="order-1 lg:order-2 flex flex-col items-center justify-center w-full">
        {/* Card Principal: bg-card com transparência e borda primary */}
        <div className="w-full max-w-md bg-card/60 backdrop-blur-md border border-primary/30 p-8 rounded-3xl shadow-2xl shadow-black/40 relative overflow-hidden group mx-auto">
          
          {/* Efeito de luz ambiente */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          
          <div className="text-center mb-8 space-y-2">
            <h3 className="text-xl font-medium text-foreground">Escolha seu plano</h3>
            <p className="text-sm text-muted-foreground">Cancele a qualquer momento.</p>
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
          
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="w-3 h-3 text-secondary" />
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
    // Usa bg-card com hover sutil e bordas baseadas no tema
    <div className="flex items-start gap-4 p-4 rounded-xl bg-card/40 border border-primary/10 hover:bg-card/60 hover:border-primary/30 transition-all cursor-default group">
      <div className="p-2.5 rounded-lg bg-primary/20 text-secondary group-hover:bg-primary/30 transition-colors mt-1 shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-bold text-foreground text-lg group-hover:text-secondary transition-colors">{title}</h4>
        <p className="text-muted-foreground text-sm leading-snug">{desc}</p>
      </div>
    </div>
  );
}