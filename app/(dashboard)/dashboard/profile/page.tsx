import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/dashboard/profile-form";

const prisma = new PrismaClient();

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/login");

  // Busca dados do paciente ou do usuário admin (se for admin testando)
  // Se for admin, pode não ter registro na tabela Patient, então tratamos isso.
  
  let patientData = null;

  if (session.user.role === "PATIENT") {
    patientData = await prisma.patient.findUnique({
      where: { userId: session.user.id },
      include: { user: true }
    });
  } else {
    // Fallback visual para Admin (que não tem perfil de paciente)
    // Apenas para não quebrar a tela se a Dra. Isa clicar em "Meus Dados"
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-[#062214]">Meu Perfil</h1>
        <div className="p-8 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
          Você é uma Administradora. A edição de perfil está disponível apenas para pacientes.
          <br/>Para alterar sua senha ou email de acesso, contate o suporte técnico.
        </div>
      </div>
    );
  }

  if (!patientData) {
    return <div>Erro ao carregar perfil.</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold text-[#062214]">Meus Dados</h1>
        <p className="text-gray-500">Mantenha suas informações atualizadas para um melhor atendimento.</p>
      </div>

      <ProfileForm initialData={patientData} />
    </div>
  );
}