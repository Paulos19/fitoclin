// app/(subscription)/subscription/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Importe sua função de checkout do Stripe aqui (ex: createCheckoutSession)
// import { createCheckoutSession } from "@/actions/stripe";

export default async function SubscriptionPage() {
  const session = await auth();
  if (!session) return redirect("/login");

  const subscription = await db.subscription.findUnique({
    where: { userId: session.user.id }
  });

  const isCommunity = subscription?.plan === "COMMUNITY" && subscription?.status === "active";
  const isSpecialization = subscription?.plan === "SPECIALIZATION" && subscription?.status === "active";

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-10 space-y-4">
        <h1 className="text-4xl font-bold">Escolha seu Plano</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Tenha acesso ao melhor conteúdo de fitoterapia e saúde integrativa.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* PLANO COMUNIDADE */}
        <Card className={`flex flex-col ${isCommunity ? 'border-primary shadow-lg' : ''}`}>
          <CardHeader>
            <CardTitle className="text-2xl">Comunidade Fitoclin</CardTitle>
            <CardDescription>Para quem está começando</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">R$ 49,90</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              <FeatureItem text="Acesso aos cursos da Comunidade" />
              <FeatureItem text="Materiais de apoio básicos" />
              <FeatureItem text="Participação no fórum" />
            </ul>
          </CardContent>
          <CardFooter>
            <form action={/* action para criar checkout stripe COMUNIDADE */ "..."}>
               <Button className="w-full" variant={isCommunity ? "outline" : "default"} disabled={isCommunity}>
                 {isCommunity ? "Plano Atual" : "Assinar Comunidade"}
               </Button>
            </form>
          </CardFooter>
        </Card>

        {/* PLANO ESPECIALIZAÇÃO */}
        <Card className={`flex flex-col relative ${isSpecialization ? 'border-primary shadow-lg' : 'border-purple-200 bg-purple-50/10'}`}>
          <div className="absolute -top-3 right-4">
             <Badge className="bg-purple-600 hover:bg-purple-700">Recomendado</Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-2xl text-purple-700 dark:text-purple-400">Especialização</CardTitle>
            <CardDescription>Para profissionais da saúde</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">R$ 99,90</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              <FeatureItem text="Tudo do plano Comunidade" />
              <FeatureItem text="Acesso à Área de Especialização" />
              <FeatureItem text="Cursos técnicos aprofundados" />
              <FeatureItem text="Certificados de conclusão" />
              <FeatureItem text="Mentorias gravadas com Dra. Isa" />
            </ul>
          </CardContent>
          <CardFooter>
            <form action={/* action para criar checkout stripe ESPECIALIZAÇÃO */ "..."}>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={isSpecialization}>
                  {isSpecialization ? "Plano Atual" : "Assinar Especialização"}
                </Button>
            </form>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2 text-sm text-muted-foreground">
      <Check className="h-4 w-4 text-primary" />
      {text}
    </li>
  );
}