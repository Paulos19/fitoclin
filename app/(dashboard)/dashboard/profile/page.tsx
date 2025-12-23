import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { ShieldCheck, UserCog } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const prisma = new PrismaClient();

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/login");

  let patientData = null;

  if (session.user.role === "PATIENT") {
    patientData = await prisma.patient.findUnique({
      where: { userId: session.user.id },
      include: { user: true }
    });
  } else {
    // Admin View (Read-only / Aviso)
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
         <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-[#2A5432]/30 pb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Meu Perfil (Admin)</h1>
              <p className="text-gray-400 mt-1">Dados da conta administrativa.</p>
            </div>
         </div>
         
         <Alert className="bg-[#76A771]/10 border-[#76A771]/30 text-[#76A771]">
            <UserCog className="h-4 w-4 stroke-[#76A771]" />
            <AlertTitle>Modo Administrador</AlertTitle>
            <AlertDescription className="mt-1">
              Seus dados de acesso (Dra. Isa) são gerenciados diretamente no banco de dados por segurança.
            </AlertDescription>
         </Alert>
      </div>
    );
  }

  if (!patientData) {
    return <div className="text-white p-8">Erro ao carregar perfil. Tente novamente.</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-[#2A5432]/30 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Meus Dados</h1>
          <p className="text-gray-400 mt-1">
            Mantenha suas informações atualizadas para que possamos personalizar seu tratamento.
          </p>
        </div>
        
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A5432]/20 border border-[#2A5432]/50">
           <ShieldCheck className="w-4 h-4 text-[#76A771]" />
           <span className="text-xs text-[#76A771] font-medium">Dados Criptografados</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <ProfileForm initialData={patientData} />
      </div>
    </div>
  );
}