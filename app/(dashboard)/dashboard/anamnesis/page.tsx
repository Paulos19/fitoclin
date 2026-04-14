import { auth } from "@/auth";
import { AnamnesisForm } from "@/components/dashboard/anamnesis-form";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AnamnesisPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Buscar dados do paciente para verificar se pode preencher
  const patient = await db.patient.findUnique({
    where: { userId: session.user.id },
    include: { anamnesis: true }
  });

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Perfil de paciente não encontrado.
      </div>
    );
  }

  const canFillAnamnesis = patient.allowAnamnesisUpdate;

  return (
    <div className="container max-w-4xl py-6">
      <div className="mb-6 text-center md:text-left">
        <h1 className="text-3xl font-bold text-white mb-2">Formulário Pré-Atendimento</h1>
        <p className="text-gray-400">
          Suas respostas ajudam a Dra. Isa a preparar a planta medicinal ideal para o seu momento.
        </p>
      </div>

      {canFillAnamnesis ? (
        <AnamnesisForm
          userEmail={session.user.email || ""}
          userName={session.user.name || ""}
        />
      ) : (
        <Card className="bg-[#0A311D]/50 border-[#2A5432] backdrop-blur-sm shadow-2xl">
          <CardContent className="p-12 flex flex-col items-center text-center space-y-6">
            <div className="h-20 w-20 rounded-full bg-[#2A5432]/30 flex items-center justify-center text-[#76A771]">
              <Lock className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Acesso Restrito</h2>
              <p className="text-gray-400 max-w-md mx-auto">
                Você já preencheu o formulário de anamnese. Caso precise realizar alguma alteração ou preencher novamente, entre em contato com a Dra. Isa.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/dashboard">
                <Button variant="outline" className="border-[#2A5432] text-[#76A771] hover:bg-[#2A5432]/20">
                  Voltar para Dashboard
                </Button>
              </Link>
              <Link href="https://wa.me/5548991206103" target="_blank">
                <Button className="bg-[#128C7E] hover:bg-[#075E54] text-white">
                  Falar com Suporte
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}