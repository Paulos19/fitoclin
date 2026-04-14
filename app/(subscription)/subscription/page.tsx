import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Sparkles } from "lucide-react";
import { PricingCard } from "@/components/subscription/pricing-card";
import { PLANS } from "@/config/plans";

export default async function SubscriptionPage() {
  const session = await auth();
  if (!session) return redirect("/login");

  const subscription = await db.subscription.findUnique({
    where: { userId: session.user.id }
  });

  // Filtrar planos para esta página (Comunidade e Especialização)
  const displayPlans = PLANS.filter(plan =>
    plan.key === "monthly" || plan.key === "specialization"
  );

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
        {displayPlans.map((plan) => (
          <PricingCard
            key={plan.key}
            planId={plan.key}
            priceId={plan.priceId || ""}
            name={plan.name}
            price={plan.price}
            features={plan.features.join(";")}
            isPopular={plan.highlight}
          />
        ))}
      </div>
    </div>
  );
}