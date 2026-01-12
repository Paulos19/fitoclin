import { auth } from "@/auth";
import { db } from "@/lib/db";
import { PricingCard } from "@/components/subscription/pricing-card";
import { redirect } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, ShieldCheck } from "lucide-react";
import { PLANS } from "@/config/plans"; // 👈 Usando a nova config

export const metadata = {
  title: "Assinatura | Fitoclin Academy",
};

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

  // Se já for assinante e tentar acessar a página de compras, podemos mostrar um aviso ou redirecionar
  // Por enquanto, vamos manter a página acessível mas talvez mudar o botão no futuro

  return (
    <div className="flex flex-col min-h-[calc(100vh-100px)] py-8 space-y-8 animate-in fade-in duration-500">
      
      {/* Cabeçalho */}
      <div className="text-center space-y-4 max-w-2xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#062214]">
          Invista na sua Evolução
        </h1>
        <p className="text-gray-500 text-lg">
          Tenha acesso ilimitado à Comunidade Fitoclin, protocolos exclusivos e aulas práticas da Dra. Isa.
        </p>
      </div>

      {/* Alerta de Acesso Restrito (Se não tiver assinatura) */}
      {!hasActiveSubscription && (
        <div className="max-w-3xl mx-auto w-full px-4">
          <Alert className="bg-amber-50 border-amber-200 text-amber-900">
            <Info className="h-4 w-4 text-amber-600" />
            <AlertTitle>Acesso Restrito</AlertTitle>
            <AlertDescription>
              Você precisa de uma assinatura ativa para acessar este conteúdo. Assine abaixo para liberar imediatamente.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Grid de Planos (Gerado via Config) */}
      <div className="flex flex-wrap items-center justify-center gap-8 px-4 py-8">
        {PLANS.map((plan) => {
          // Proteção: Só renderiza se o ID do Stripe estiver configurado no .env
          if (!plan.priceId) {
             if (session.user.role === 'ADMIN') {
               return (
                 <div key={plan.key} className="p-4 bg-red-50 text-red-600 border border-red-200 rounded text-sm">
                   ⚠️ Erro Config: Faltou definir o ID do plano "{plan.name}" no arquivo .env
                 </div>
               );
             }
             return null;
          }

          return (
            <PricingCard
              key={plan.key}
              planId={plan.key}
              priceId={plan.priceId}
              name={plan.name}
              price={plan.price}
              features={plan.features.join(";")} // O componente espera string separada por ponto e vírgula
              isPopular={plan.highlight}
            />
          );
        })}
      </div>

      {/* Footer de Confiança */}
      <div className="mt-auto text-center py-8 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-2">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            Pagamento 100% seguro processado pelo Stripe
        </div>
        <p className="text-xs text-gray-400">
            Transparência total: cancele sua assinatura a qualquer momento com um clique.
        </p>
      </div>
    </div>
  );
}