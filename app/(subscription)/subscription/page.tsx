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
  ArrowRight,
  CheckCircle2,
  Star
} from "lucide-react";

export default async function SubscriptionPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const userSubscription = await db.subscription.findUnique({
    where: { userId: session.user.id },
  });

  const hasActiveSubscription = userSubscription?.stripeCurrentPeriodEnd
    ? userSubscription.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
    : false;

  // =========================================================
  // CENÁRIO 1: USUÁRIO JÁ É ASSINANTE (MEMBERSHIP CARD)
  // =========================================================
  if (hasActiveSubscription) {
    return (
      <div className="flex flex-col items-center justify-center w-full animate-in fade-in zoom-in duration-700 py-10">
        <div className="group relative w-full aspect-[1.58/1] max-w-[500px] rounded-3xl overflow-hidden shadow-2xl transition-all hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A311D] via-[#062214] to-[#04150C] border border-white/10 z-0" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-[#D4AF37]/20 to-transparent opacity-50 blur-[60px]" />
          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[#D4AF37] font-bold text-lg tracking-widest">FITOCLIN</h3>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em]">Membro VIP</p>
              </div>
              <Crown className="text-[#D4AF37] w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-white/60 text-xs uppercase tracking-wider">Titular</p>
              <p className="text-xl md:text-2xl font-medium text-white truncate">{session.user.name}</p>
            </div>
            <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#76A771] animate-pulse" />
                 <span className="text-[#76A771] text-xs font-bold uppercase">Ativo</span>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Link href="/community">
            <Button className="h-12 px-8 rounded-full btn-gradient font-bold shadow-lg">
              Acessar Área Exclusiva <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // =========================================================
  // CENÁRIO 2: PÁGINA DE VENDAS (CARDS NO TOPO, COPY EMBAIXO)
  // =========================================================
  return (
    <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto animate-in slide-in-from-bottom-10 duration-700 pb-20">
      
      {/* 1. HEADER SIMPLES */}
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#76A771] text-xs font-bold uppercase tracking-widest">
           <Sparkles className="w-3 h-3" /> Planos Disponíveis
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
           Escolha o plano ideal para sua jornada
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
           Desbloqueie todo o potencial da Fitoterapia Clínica com acesso imediato.
        </p>
      </div>

      {/* 2. CARDS (LADO A LADO E CENTRALIZADOS) */}
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-6 w-full px-4">
        {PLANS.map((plan) => {
           if (!plan.priceId) return null; 

           return (
             <div 
               key={plan.key} 
               className={`relative w-full max-w-md lg:max-w-[380px] flex flex-col ${plan.highlight ? 'lg:-mt-4 lg:mb-4 z-10' : ''}`}
             >
                {/* Glow atrás do destaque */}
                {plan.highlight && (
                   <div className="absolute inset-0 bg-[#D4AF37]/20 blur-[60px] -z-10 rounded-full opacity-50" />
                )}
                
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

      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500 mb-20">
         <ShieldCheck className="w-4 h-4 text-[#76A771]" />
         <span>Pagamento 100% seguro via Stripe. Cancele quando quiser.</span>
      </div>

      {/* 3. COPYWRITING & BENEFÍCIOS (EMBAIXO) */}
      <div className="w-full max-w-5xl px-4 border-t border-white/5 pt-20">
         
         <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
              Por que assinar o <span className="text-[#D4AF37]">Fitoclin Academy?</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
              Mais do que uma plataforma de cursos, somos um ecossistema completo para profissionais de saúde que desejam escalar seus resultados e pacientes que buscam autonomia.
            </p>
         </div>

         {/* Grid de Benefícios */}
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitItem 
               icon={PlayCircle}
               title="Educação Contínua" 
               desc="Aulas novas toda semana com materiais de apoio em PDF."
            />
            <BenefitItem 
               icon={Users}
               title="Comunidade Elite" 
               desc="Networking estratégico com profissionais de alto nível."
            />
            <BenefitItem 
               icon={ShieldCheck}
               title="Protocolos Validados" 
               desc="Copie e cole estratégias que funcionam no campo de batalha."
            />
            <BenefitItem 
               icon={Crown}
               title="Gestão Completa" 
               desc="Ferramentas de CRM, Prontuário e Agenda integradas."
            />
         </div>

         {/* Social Proof Final */}
         <div className="mt-20 flex flex-col items-center justify-center p-8 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm">
            <div className="flex -space-x-4 mb-4">
               {[1,2,3,4,5].map((i) => (
                 <div key={i} className="w-12 h-12 rounded-full border-4 border-[#062214] bg-[#2A5432] flex items-center justify-center text-xs text-white/50 font-bold shadow-lg">
                   <Users className="w-5 h-5" />
                 </div>
               ))}
            </div>
            <div className="flex items-center gap-1 text-[#D4AF37] mb-2">
               <Star className="w-5 h-5 fill-current" />
               <Star className="w-5 h-5 fill-current" />
               <Star className="w-5 h-5 fill-current" />
               <Star className="w-5 h-5 fill-current" />
               <Star className="w-5 h-5 fill-current" />
            </div>
            <p className="text-white font-medium text-lg">
              Junte-se a <span className="text-[#76A771] font-bold">+1.200 alunos</span> transformando vidas.
            </p>
         </div>

      </div>
      
    </div>
  );
}

// --- SUB-COMPONENTE: BENEFIT ITEM (Estilo Card Minimalista) ---
function BenefitItem({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#0A311D]/40 border border-white/5 hover:bg-[#0A311D]/80 hover:border-[#76A771]/30 transition-all duration-300 group">
      <div className="mb-4 p-3 rounded-full bg-[#76A771]/10 text-[#76A771] group-hover:bg-[#76A771] group-hover:text-[#062214] transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-white font-bold text-lg mb-2">{title}</h4>
      <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">{desc}</p>
    </div>
  );
}