import { auth } from "@/auth";
import { AnamnesisForm } from "@/components/dashboard/anamnesis-form";
import { redirect } from "next/navigation";

export default async function AnamnesisPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="container max-w-4xl py-6">
      <div className="mb-6 text-center md:text-left">
        <h1 className="text-3xl font-bold text-white mb-2">Formulário Pré-Consulta</h1>
        <p className="text-gray-400">
            Suas respostas ajudam a Dra. Isa a preparar a planta medicinal ideal para o seu momento.
        </p>
      </div>
      
      <AnamnesisForm 
        userEmail={session.user.email || ""} 
        userName={session.user.name || ""} 
      />
    </div>
  );
}