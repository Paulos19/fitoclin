import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { PrescriptionButton } from "@/components/dashboard/prescription-button"; // Reutilizando nosso componente mágico
import { FileText, Calendar } from "lucide-react";

const prisma = new PrismaClient();

export default async function MyPrescriptionsPage() {
  const session = await auth();
  if (!session || session.user.role !== "PATIENT") redirect("/dashboard");

  const patient = await prisma.patient.findUnique({
    where: { userId: session.user.id },
    include: {
      user: true, // Necessário para o nome no PDF
      medicalRecords: {
        where: { 
           // Filtra apenas registros que tenham fitoterapia preenchida
           pilar2_fitoterapia: { not: "" } 
        },
        orderBy: { date: 'desc' }
      }
    }
  });

  if (!patient) return <div>Perfil não encontrado.</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#062214]">Minhas Receitas</h1>
        <p className="text-gray-500">Acesse e baixe seus planos de tratamento fitoterápico.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {patient.medicalRecords.length === 0 ? (
           <div className="col-span-full p-8 text-center bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
             Nenhuma receita disponível ainda.
           </div>
        ) : (
          patient.medicalRecords.map((record) => (
            <Card key={record.id} className="hover:border-[#76A771] transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[#76A771]/10 rounded-full text-[#2A5432]">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#062214]">{record.title}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(record.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-gray-600 line-clamp-3 bg-gray-50 p-3 rounded-md italic">
                  "{record.pilar2_fitoterapia}"
                </div>

                <div className="pt-2">
                  {/* Botão de Download Reutilizado */}
                  <div className="w-full [&>button]:w-full">
                    <PrescriptionButton 
                      patientName={patient.user.name}
                      date={new Date(record.date)}
                      content={record.pilar2_fitoterapia || ""}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}