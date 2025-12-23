import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { PepForm } from "@/components/dashboard/pep-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { User, Phone, Calendar, Clock, MapPin, Leaf } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PrescriptionButton } from "@/components/dashboard/prescription-button";

const prisma = new PrismaClient();

export default async function RecordPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  
  // 1. Proteção de Rota
  if (session?.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // 2. Resolver Params (Next.js 15+)
  const { id: patientId } = await params;

  if (!patientId) {
    return <div className="p-8 text-center text-red-500">ID do paciente inválido.</div>;
  }

  // 3. Buscar Dados Completos
  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
    include: {
      user: true,
      medicalRecords: {
        orderBy: { date: 'desc' }
      },
      appointments: {
        orderBy: { date: 'desc' },
        take: 1
      }
    }
  });

  if (!patient) {
    return <div className="p-8 text-center">Paciente não encontrado.</div>;
  }

  return (
    <div className="space-y-8 pb-20">
      
      {/* === HEADER DO PACIENTE === */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#062214] p-8 rounded-2xl text-white shadow-lg">
        <div className="flex items-center gap-6">
          {/* Avatar com Iniciais */}
          <div className="h-20 w-20 bg-[#76A771] rounded-full flex items-center justify-center text-[#062214] text-3xl font-bold border-4 border-[#2A5432]">
            {patient.user.name.charAt(0).toUpperCase()}
          </div>
          
          {/* Dados Pessoais */}
          <div>
            <h1 className="text-3xl font-bold">{patient.user.name}</h1>
            <div className="flex flex-wrap gap-4 mt-2 text-gray-300 text-sm">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4 text-[#76A771]" /> 
                {patient.gender || "Gênero não inf."}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4 text-[#76A771]" /> 
                {patient.phone || "Sem telefone"}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#76A771]" /> 
                {patient.city || "Local não inf."}
              </span>
            </div>
          </div>
        </div>
        
        {/* Bloco Lateral do Header */}
        <div className="flex flex-col items-end gap-3">
           <div className="bg-white/10 px-4 py-2 rounded-lg text-sm text-right">
              <p className="text-gray-400 text-xs uppercase tracking-wider">Última Consulta</p>
              <p className="font-bold text-[#76A771] text-lg">
                {patient.appointments[0] 
                  ? new Date(patient.appointments[0].date).toLocaleDateString('pt-BR') 
                  : "--/--/----"}
              </p>
           </div>
           <Link href="/dashboard/records">
             <Button variant="link" className="text-white hover:text-[#76A771] p-0 h-auto decoration-transparent">
               &larr; Voltar para Lista
             </Button>
           </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* === COLUNA PRINCIPAL: NOVO PRONTUÁRIO (FORM) === */}
        <div className="lg:col-span-2 space-y-6">
          <PepForm patientId={patient.id} />
        </div>

        {/* === COLUNA LATERAL: HISTÓRICO (TIMELINE) === */}
        <div className="space-y-6">
          <Card className="border-[#2A5432]/10 shadow-sm">
            <CardHeader className="bg-gray-50/50 border-b pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-[#062214]">
                <Clock className="w-5 h-5 text-[#76A771]" /> Histórico Clínico
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {patient.medicalRecords.length === 0 ? (
                   <div className="p-8 text-center text-gray-400 text-sm flex flex-col items-center gap-2">
                      <Clock className="w-8 h-8 opacity-20" />
                      <p>Nenhum registro anterior.</p>
                   </div>
                ) : (
                  patient.medicalRecords.map((record) => (
                    <AccordionItem key={record.id} value={record.id} className="border-b last:border-0 px-4">
                      <AccordionTrigger className="hover:no-underline py-4 group">
                        <div className="text-left">
                          <p className="font-semibold text-[#062214] group-hover:text-[#2A5432] transition-colors">
                            {record.title}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(record.date).toLocaleDateString('pt-BR')} 
                            <span className="mx-1">•</span>
                            {new Date(record.date).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                      </AccordionTrigger>
                      
                      <AccordionContent className="text-sm text-gray-600 space-y-4 bg-gray-50/50 p-4 rounded-lg mb-4 border border-gray-100">
                        
                        {/* BOTÃO DE DOWNLOAD DA RECEITA */}
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Resumo do Atendimento</span>
                          <PrescriptionButton 
                            patientName={patient.user.name} 
                            date={new Date(record.date)} 
                            content={record.pilar2_fitoterapia || ""} 
                          />
                        </div>

                        {/* CONTEÚDO DOS PILARES */}
                        <div className="space-y-3">
                          {record.pilar1_investigacao && (
                            <div>
                              <strong className="text-[#2A5432] block mb-1">1. Investigação:</strong> 
                              <p className="text-gray-700 leading-relaxed">{record.pilar1_investigacao}</p>
                            </div>
                          )}
                          
                          {record.pilar2_fitoterapia && (
                            <div className="bg-[#76A771]/10 p-3 rounded-md border border-[#76A771]/20">
                              <strong className="text-[#2A5432] flex items-center gap-2 mb-1">
                                <Leaf className="w-4 h-4" /> Prescrição Fitoterápica:
                              </strong> 
                              <p className="text-[#062214] font-medium">{record.pilar2_fitoterapia}</p>
                            </div>
                          )}

                          {record.pilar3_metabolismo && (
                            <div>
                              <strong className="text-[#2A5432] block mb-1">3. Metabolismo:</strong> 
                              <p className="text-gray-700">{record.pilar3_metabolismo}</p>
                            </div>
                          )}
                          
                          {record.pilar4_estresse && (
                            <div>
                              <strong className="text-[#2A5432] block mb-1">4. Estresse:</strong> 
                              <p className="text-gray-700">{record.pilar4_estresse}</p>
                            </div>
                          )}

                           {record.pilar5_evolucao && (
                            <div>
                              <strong className="text-[#2A5432] block mb-1">5. Evolução:</strong> 
                              <p className="text-gray-700">{record.pilar5_evolucao}</p>
                            </div>
                          )}

                          {record.notes && (
                            <div className="pt-2 border-t border-gray-200 mt-2">
                              <p className="text-xs text-gray-500 italic">
                                <span className="font-semibold">Nota Interna:</span> {record.notes}
                              </p>
                            </div>
                          )}
                        </div>

                      </AccordionContent>
                    </AccordionItem>
                  ))
                )}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}