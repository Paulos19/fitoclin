import { auth } from "@/auth";
import { db } from "@/lib/db";
import { PricingCard } from "@/components/subscription/pricing-card";
import { redirect } from "next/navigation";
import { PLANS } from "@/config/plans";
import {
  Crown,
  LayoutDashboard,
  Users,
  ShieldCheck,
  Briefcase,
  Stethoscope,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export default async function ProSubscriptionPage() {
  const session = await auth();
  if (!session) redirect("/login?callbackUrl=/subscription/pro");

  // Filtrar apenas o plano CRM PRO
  const proPlans = PLANS.filter(plan => plan.key === "crm_pro");

  // Verificar se já é assinante PRO
  // const userSubscription = await db.subscription.findUnique({
  //   where: { userId: session.user.id },
  // });

  // // Lógica simples: Se tem assinatura ativa, verificamos se é PRO
  // const hasActiveSubscription = userSubscription?.stripeCurrentPeriodEnd
  //   ? userSubscription.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
  //   : false;

  const hasActiveSubscription = false; // Bypass temporário para visualização / Teste

  if (hasActiveSubscription) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-[#062214] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pro_bg_premium.png')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        <div className="relative z-10 p-10 rounded-3xl bg-[#0A311D]/80 backdrop-blur-xl border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
          <Crown className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">Você é um Membro PRO Elite</h1>
          <p className="text-gray-300 mb-8 max-w-md mx-auto text-lg">Sua assinatura está ativa e você tem acesso a todos os recursos de gestão clínica.</p>
          <Link href="/dashboard" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#062214] font-bold rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all scale-100 hover:scale-105">
            Acessar Dashboard <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center pt-24 pb-20 overflow-hidden">

      {/* BACKGROUND IMAGE - NANO BANANA PRO STYLE */}
      <div
        className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/pro_bg_premium.png')` }}
      />

      {/* DARK OVERLAY FOR READABILITY */}
      <div className="fixed inset-0 z-[-1] bg-[#02110A]/85 backdrop-blur-[4px]" />

      <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 px-4">

        {/* 1. HEADER PRO */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-bold uppercase tracking-[0.2em] backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <Crown className="w-4 h-4" /> Fitoclin Profissional
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl hero-textglow">
            Elevando sua <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">Prática Clínica</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl font-light max-w-3xl mx-auto drop-shadow-md leading-relaxed">
            Ferramentas de gestão, prontuário eletrônico inteligente e CRM avançado para terapeutas de alta performance.
          </p>
        </div>

        {/* 2. CARD PRO */}
        <div className="flex flex-col items-center justify-center w-full max-w-md relative mb-12">
          {/* Luz de fundo atrás do Card */}
          <div className="absolute inset-0 bg-[#D4AF37] opacity-20 blur-[100px] rounded-full z-0 h-3/4 w-3/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <div className="relative z-10 w-full animate-in zoom-in-95 duration-700 delay-300">
            {proPlans.map((plan) => {
              if (!plan.priceId) return null;
              return (
                <PricingCard
                  key={plan.key}
                  planId={plan.key}
                  priceId={plan.priceId}
                  name={plan.name}
                  price={plan.price}
                  features={plan.features.join(";")}
                  isPopular={true}
                />
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-24 bg-[#0A311D]/40 px-6 py-2 rounded-full border border-white/5 backdrop-blur-md">
          <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
          <span>Assinatura Profissional segura. Emissão de Notas Fiscais inclusa.</span>
        </div>

        {/* 3. BENEFÍCIOS PRO */}
        <div className="w-full max-w-6xl relative">

          {/* Divisor de seção luxuoso */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

          <div className="text-center pt-24 mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Um Ecossistema Completo para <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">Profissionais de Elite</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            <BenefitItem
              icon={LayoutDashboard}
              title="Dashboard de Gestão"
              desc="Tenha a visão completa do seu consultório em gráficos interativos e em tempo real."
            />
            <BenefitItem
              icon={Users}
              title="CRM Automático"
              desc="Gestão ilimitada de pacientes e leads integrados. Funil de conversão nativo."
            />
            <BenefitItem
              icon={Stethoscope}
              title="Prontuário (PEP)"
              desc="Histórico clínico seguro (Metodologia Fitoclin) e prescrições com um clique."
            />
            <BenefitItem
              icon={Briefcase}
              title="Saúde Financeira"
              desc="Organize fluxo de caixa, emita recibos e proteja o rendimento clínica."
            />
          </div>

        </div>

      </div>
    </div>
  );
}

function BenefitItem({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-[#062214]/60 backdrop-blur-xl border border-white/10 hover:bg-[#0A311D]/90 hover:border-[#D4AF37]/50 hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] transition-all duration-500 group hover:-translate-y-2">
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-transparent border border-[#D4AF37]/20 text-[#D4AF37] group-hover:from-[#D4AF37] group-hover:to-[#b5952f] group-hover:text-[#062214] transition-all duration-500 shadow-lg group-hover:shadow-[#D4AF37]/40">
        <Icon className="w-8 h-8" strokeWidth={1.5} />
      </div>
      <h4 className="text-white font-bold text-xl mb-3 tracking-wide">{title}</h4>
      <p className="text-base text-gray-400 leading-relaxed font-light group-hover:text-gray-200 transition-colors">{desc}</p>
    </div>
  );
}