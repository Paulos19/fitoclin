import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { PrescriptionButton } from "@/components/dashboard/prescription-button"; 
import { FileText, Calendar, Leaf, ArrowRight, Download } from "lucide-react";

const prisma = new PrismaClient();

export default async function MyPrescriptionsPage() {
  const session = await auth();
  if (!session || session.user.role !== "PATIENT") redirect("/dashboard");

  const patient = await prisma.patient.findUnique({
    where: { userId: session.user.id },
    include: {
      user: true, 
      medicalRecords: {
        // Apenas registros com prescrição fitoterápica
        where: { pilar2_fitoterapia: { not: "" } },
        orderBy: { date: 'desc' }
      }
    }
  });

  if (!patient) return <div className="text-white">Perfil não encontrado.</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-[#2A5432]/30 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Protocolos & Receitas</h1>
          <p className="text-gray-400 mt-1">Seus planos de tratamento fitoterápico personalizados.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {patient.medicalRecords.length === 0 ? (
           <div className="col-span-full py-16 text-center flex flex-col items-center justify-center gap-4 border border-dashed border-[#2A5432]/30 rounded-2xl bg-[#062214]/50">
             <Leaf className="w-12 h-12 text-[#2A5432] opacity-50" />
             <div className="space-y-1">
               <p className="text-lg font-medium text-white">Nenhuma receita encontrada</p>
               <p className="text-sm text-gray-500">Suas receitas aparecerão aqui após as consultas.</p>
             </div>
           </div>
        ) : (
          patient.medicalRecords.map((record) => (
            <Card key={record.id} className="group bg-[#0A311D]/40 border-[#2A5432]/30 hover:border-[#76A771] hover:bg-[#0A311D] transition-all duration-300 overflow-hidden flex flex-col h-full">
              
              {/* Header Visual */}
              <div className="h-2 bg-gradient-to-r from-[#2A5432] to-[#76A771] opacity-60 group-hover:opacity-100 transition-opacity" />
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-[#062214] rounded-lg border border-[#2A5432]/50 text-[#76A771]">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-[#062214] px-2 py-1 rounded border border-[#2A5432]/30">
                    PDF Pronto
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 flex-1">
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight mb-1 group-hover:text-[#76A771] transition-colors">
                    {record.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {new Date(record.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>

                {/* Preview do Conteúdo (Miniatura de Texto) */}
                <div className="relative bg-[#062214]/60 p-3 rounded-lg border border-[#2A5432]/20 mt-2">
                  <div className="absolute top-2 left-2 text-[#2A5432] opacity-20">
                     <Leaf className="w-8 h-8" />
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-3 italic relative z-10 leading-relaxed font-serif">
                    "{record.pilar2_fitoterapia}"
                  </p>
                </div>
              </CardContent>

              <CardFooter className="pt-2 pb-6">
                <div className="w-full">
                  <PrescriptionButton 
                    patientName={patient.user.name}
                    date={new Date(record.date)}
                    content={record.pilar2_fitoterapia || ""}
                    variant="default" // Botão cheio aqui fica melhor
                  />
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}