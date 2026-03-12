import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { NewPatientDialog } from "@/components/dashboard/new-patient-dialog";
import { PatientsTable } from "@/components/dashboard/patients-table";

export default async function PatientsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const isProfessional = session.user.role === "PROFESSIONAL";
  const isAdmin = session.user.role === "ADMIN";
  const isSecretary = session.user.role === "SECRETARY";

  if (!isProfessional && !isAdmin && !isSecretary) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#2A5432]/30 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {isProfessional ? "Meus Pacientes" : "Base de Pacientes"}
          </h1>
          <p className="text-gray-400 mt-1">
            Gerencie pacientes e leads cadastrados.
          </p>
        </div>
        <NewPatientDialog />
      </div>

      <PatientsTable />
    </div>
  );
}