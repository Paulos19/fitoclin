import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { PepForm } from "@/components/dashboard/pep-form";
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Phone, 
  History, 
  AlertCircle,
  Leaf
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrescriptionButton } from "@/components/dashboard/prescription-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const prisma = new PrismaClient();

export default async function RecordPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  
  if (session?.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Workaround para params assíncronos no Next.js 15
  const { id: patientId } = await params;

  // Busca Otimizada: Trazemos o paciente, registros médicos e próximas consultas
  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
    include: {
      user: true,
      medicalRecords: {
        orderBy: { date: 'desc' }
      },
      appointments: {
        where: { date: { gte: new Date() }, status: { not: 'CANCELED' } }, 
        orderBy: { date: 'asc' },
        take: 1
      }
    }
  });

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-gray-400">
        <AlertCircle className="w-10 h-10 mb-4 text-red-500" />
        <h2 className="text-xl font-bold text-white">Paciente não encontrado</h2>
        <Link href="/dashboard/records" className="mt-4">
          <Button variant="outline">Voltar para a Lista</Button>
        </Link>
      </div>
    );
  }

  // Dados calculados para o Header
  const lastRecord = patient.medicalRecords[0];
  const nextAppointment = patient.appointments[0];
  const totalVisits = patient.medicalRecords.length;
  
  const lastVisitDate = lastRecord 
    ? new Date(lastRecord.date).toLocaleDateString('pt-BR')
    : "Primeira vez";

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col space-y-4 animate-in fade-in duration-500">
      
      {/* === HEADER FIXO (Compacto & Informative) === */}
      <div className="shrink-0 bg-[#0A311D] border border-[#2A5432]/50 rounded-xl p-4 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        
        <div className="flex items-center gap-4">
          <Link href="/dashboard/records">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-[#2A5432]">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          
          <Avatar className="h-12 w-12 border-2 border-[#76A771]">
             <AvatarFallback className="bg-[#062214] text-[#76A771] font-bold text-lg">
               {patient.user.name.charAt(0).toUpperCase()}
             </AvatarFallback>
          </Avatar>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">{patient.user.name}</h1>
              {nextAppointment && (
                <Badge className="bg-[#76A771] text-[#062214] hover:bg-[#659160] border-none text-[10px]">
                  Agendado: {new Date(nextAppointment.date).toLocaleDateString('pt-BR')}
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-1">
               <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {patient.phone || "Sem tel"}</span>
               <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {patient.city || "Local n/a"}</span>
               <span className="flex items-center gap-1 text-[#76A771]"><History className="w-3 h-3" /> {totalVisits} evoluções</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Lateral */}
        <div className="hidden md:flex items-center gap-6 px-4 py-2 bg-[#062214]/50 rounded-lg border border-[#2A5432]/30">
           <div className="text-center">
              <p className="text-[10px] uppercase text-gray-500 font-bold">Última Visita</p>
              <p className="text-sm font-medium text-white">{lastVisitDate}</p>
           </div>
           <div className="w-px h-8 bg-[#2A5432]/50" />
           <div className="text-center">
              <p className="text-[10px] uppercase text-gray-500 font-bold">Status</p>
              <div className="flex items-center gap-1 justify-center">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <p className="text-sm font-medium text-white">Ativo</p>
              </div>
           </div>
        </div>
      </div>

      {/* === ÁREA DE TRABALHO (Split View) === */}
      <div className="flex-1 min-h-0">
        
        {/* --- MOBILE VIEW (< md) --- */}
        <div className="md:hidden h-full">
          <Tabs defaultValue="pep" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 bg-[#0A311D]">
              <TabsTrigger value="pep">Nova Evolução</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
            </TabsList>
            <TabsContent value="pep" className="flex-1 overflow-y-auto mt-2 pb-20">
              <PepForm patientId={patient.id} />
            </TabsContent>
            <TabsContent value="history" className="flex-1 overflow-y-auto mt-2 pb-20">
               {/* Passamos o objeto paciente inteiro para extrair dados para o PDF */}
               <Timeline records={patient.medicalRecords} patient={patient} />
            </TabsContent>
          </Tabs>
        </div>

        {/* --- DESKTOP VIEW (>= md) --- */}
        <div className="hidden md:grid grid-cols-12 gap-6 h-full">
          
          {/* ESQUERDA: FORMULÁRIO */}
          <div className="col-span-7 h-full overflow-hidden flex flex-col">
             <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <PepForm patientId={patient.id} />
             </div>
          </div>

          {/* DIREITA: TIMELINE */}
          <div className="col-span-5 h-full overflow-hidden flex flex-col bg-[#062214]/30 border-l border-[#2A5432]/30 pl-6 rounded-tl-xl">
             <div className="flex items-center gap-2 pb-4 pt-2 border-b border-[#2A5432]/30 mb-4 sticky top-0 bg-[#062214]/95 backdrop-blur z-10">
                <History className="w-5 h-5 text-[#76A771]" />
                <h3 className="font-bold text-white text-lg">Linha do Tempo</h3>
             </div>
             
             <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
                <Timeline records={patient.medicalRecords} patient={patient} />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// === COMPONENTE DE TIMELINE ===
function Timeline({ records, patient }: { records: any[], patient: any }) {
  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-gray-500 opacity-60">
        <Leaf className="w-12 h-12 mb-2" />
        <p>Histórico vazio</p>
      </div>
    );
  }

  // Prepara string de detalhes para o PDF
  const patientDetailsString = `${patient.phone || ""} • ${patient.city || ""}`.trim().replace(/^• | •$/g, '');

  return (
    <div className="relative space-y-0 ml-3">
      {/* Linha Vertical Conectora */}
      <div className="absolute left-[11px] top-2 bottom-0 w-[2px] bg-[#2A5432]/30" />

      {records.map((record, index) => {
         const isLatest = index === 0;
         return (
          <div key={record.id} className="relative pl-10 pb-10 group">
            {/* Nó da Timeline */}
            <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 transition-all z-10 flex items-center justify-center ${
              isLatest 
                ? "bg-[#062214] border-[#76A771] shadow-[0_0_10px_#76A771]" 
                : "bg-[#062214] border-[#2A5432] group-hover:border-[#76A771]"
            }`}>
               {isLatest && <div className="w-2 h-2 bg-[#76A771] rounded-full" />}
            </div>

            {/* Card do Evento */}
            <div className={`rounded-xl border p-4 transition-all ${
               isLatest 
                 ? "bg-[#0A311D] border-[#76A771]/50 shadow-lg" 
                 : "bg-[#062214]/50 border-[#2A5432]/30 hover:bg-[#0A311D]/50"
            }`}>
               {/* Cabeçalho */}
               <div className="flex justify-between items-start mb-3">
                 <div>
                   <h4 className={`font-bold text-base ${isLatest ? "text-white" : "text-gray-300"}`}>
                     {record.title}
                   </h4>
                   <span className="text-xs text-[#76A771] flex items-center gap-1 mt-0.5 font-mono">
                     <Clock className="w-3 h-3" />
                     {new Date(record.date).toLocaleDateString('pt-BR')}
                   </span>
                 </div>
                 
                 {/* Botão de Receita (Icon Variant) */}
                 {record.pilar2_fitoterapia && (
                   <PrescriptionButton 
                     patientName={patient.user.name}
                     patientDetails={patientDetailsString}
                     date={new Date(record.date)}
                     content={record.pilar2_fitoterapia}
                     variant="icon"
                   />
                 )}
               </div>

               {/* Conteúdo Resumido */}
               <div className="space-y-3 text-sm">
                  {record.pilar2_fitoterapia && (
                    <div className="bg-[#062214] p-3 rounded border border-[#2A5432]/30">
                       <p className="text-[10px] uppercase text-[#76A771] font-bold mb-1">Fitoterapia</p>
                       <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-xs">
                         {record.pilar2_fitoterapia}
                       </p>
                    </div>
                  )}
                  
                  {isLatest && record.pilar1_investigacao && (
                    <div className="mt-2">
                      <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Investigação</p>
                      <p className="text-gray-400 line-clamp-3 hover:line-clamp-none transition-all cursor-pointer text-xs">
                        {record.pilar1_investigacao}
                      </p>
                    </div>
                  )}
               </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}