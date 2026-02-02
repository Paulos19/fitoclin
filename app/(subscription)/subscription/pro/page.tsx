import { auth } from "@/auth";
import { db } from "@/lib/db";
import { PricingCard } from "@/components/subscription/pricing-card";
import { redirect } from "next/navigation";
import { PLANS } from "@/config/plans";
import { 
  Sparkles, 
  Crown, 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Briefcase,
  Stethoscope
} from "lucide-react";

export default async function ProSubscriptionPage() {
  const session = await auth();
  if (!session) redirect("/login?callbackUrl=/subscription/pro");

  // Filtrar apenas o plano CRM PRO
  const proPlans = PLANS.filter(plan => plan.key === "crm_pro");

  // Verificar se já é assinante PRO
  const userSubscription = await db.subscription.findUnique({
    where: { userId: session.user.id },
  });
  
  // Lógica simples: Se tem assinatura ativa, verificamos se é PRO (pode ser refinado pelo priceId se necessário)
  const hasActiveSubscription = userSubscription?.stripeCurrentPeriodEnd
    ? userSubscription.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
    : false;

  if (hasActiveSubscription) {
    // Se já é assinante, redireciona para o dashboard ou mostra aviso
    // Aqui optamos por mostrar um aviso elegante
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Você já é um Membro PRO</h1>
            <p className="text-gray-400 mb-8">Sua assinatura está ativa. Acesse seu painel administrativo.</p>
            <a href="/dashboard" className="px-8 py-3 bg-[#D4AF37] text-[#062214] font-bold rounded-full hover:bg-[#b5952f] transition-colors">
                Ir para Dashboard
            </a>
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto animate-in slide-in-from-bottom-10 duration-700 pb-20">
      
      {/* 1. HEADER PRO */}
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
           <Crown className="w-3 h-3" /> Fitoclin Profissional
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
           Escalando sua Prática Clínica
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
           Ferramentas de gestão, prontuário eletrônico e CRM para terapeutas de elite.
        </p>
      </div>

      {/* 2. CARD PRO */}
      <div className="flex flex-col items-center justify-center w-full px-4">
        {proPlans.map((plan) => {
           if (!plan.priceId) return null; 

           return (
             <div 
               key={plan.key} 
               className="relative w-full max-w-md flex flex-col z-10"
             >
               <div className="absolute inset-0 bg-[#D4AF37]/20 blur-[80px] -z-10 rounded-full opacity-40" />
               <PricingCard 
                 planId={plan.key}
                 priceId={plan.priceId}
                 name={plan.name}
                 price={plan.price}
                 features={plan.features.join(";")}
                 isPopular={true} // Força o visual de destaque
               />
             </div>
           );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500 mb-20">
         <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
         <span>Assinatura Profissional. Nota fiscal inclusa.</span>
      </div>

      {/* 3. BENEFÍCIOS PRO */}
      <div className="w-full max-w-5xl px-4 border-t border-white/5 pt-20">
         
         <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
              Sistema Completo para <span className="text-[#D4AF37]">Terapeutas</span>
            </h2>
         </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitItem 
               icon={LayoutDashboard}
               title="Dashboard Gestão" 
               desc="Visão completa do seu consultório em um só lugar."
            />
            <BenefitItem 
               icon={Users}
               title="CRM de Pacientes" 
               desc="Gestão ilimitada de pacientes e funil de vendas."
            />
            <BenefitItem 
               icon={Stethoscope}
               title="Prontuário (PEP)" 
               desc="Histórico clínico seguro e organizado (Metodologia Fitoclin)."
            />
            <BenefitItem 
               icon={Briefcase}
               title="Financeiro" 
               desc="Controle de receitas, despesas e faturamento."
            />
         </div>

      </div>
      
    </div>
  );
}

function BenefitItem({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#0A311D]/40 border border-white/5 hover:bg-[#0A311D]/80 hover:border-[#D4AF37]/30 transition-all duration-300 group">
      <div className="mb-4 p-3 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#062214] transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-white font-bold text-lg mb-2">{title}</h4>
      <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">{desc}</p>
    </div>
  );
}