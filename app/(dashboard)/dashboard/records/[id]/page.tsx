import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { 
  Calendar as CalendarIcon, 
  User, 
  FileText, 
  Activity, 
  Phone, 
  AlertCircle,
  Clock,
  Stethoscope,
  ChevronRight,
  Sparkles,
  Leaf,
  ExternalLink,
  Image as ImageIcon,
  File
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EvolutionChart } from "@/components/dashboard/evolution-chart";

const prisma = new PrismaClient();

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RecordDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const session = await auth();
  
  if (session?.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // 1. Buscar dados (INCLUINDO DOCUMENTS)
  const patient = await prisma.patient.findUnique({
    where: { id: resolvedParams.id },
    include: {
      user: true,
      anamnesis: true,
      weeklyCheckins: {
        orderBy: { createdAt: 'asc' },
        take: 20
      },
      appointments: {
        orderBy: { date: 'desc' },
        take: 5
      },
      medicalRecords: {
        orderBy: { date: 'desc' }
      },
      documents: { // 👈 Novo Include
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!patient) return (
    <div className="flex items-center justify-center h-96 text-gray-400">
      Paciente não encontrado.
    </div>
  );

  // 2. Preparar dados
  const evolutionData = patient.weeklyCheckins.map(c => ({
    date: c.createdAt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
    Sono: c.sleepQuality,
    Energia: c.energyLevel,
    Humor: c.mood,
    Digestão: c.digestion
  }));

  const age = patient.anamnesis?.age || "N/A";

  // Estilos comuns (Dark Premium)
  const cardStyle = "bg-[#0A311D]/50 border-[#2A5432]/30 backdrop-blur-sm text-white";
  const labelStyle = "text-xs font-semibold text-[#76A771] uppercase tracking-wider mb-1";
  const valueStyle = "text-sm text-gray-300";

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      
      {/* --- CABEÇALHO DO PACIENTE (HERO) --- */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A311D] to-[#062214] border border-[#2A5432]/30 p-8 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#76A771]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
                <div className="h-20 w-20 rounded-full bg-[#2A5432] flex items-center justify-center text-white text-3xl font-bold border-2 border-[#76A771]/30 shadow-lg">
                    {patient.user.name?.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#062214] p-1.5 rounded-full border border-[#2A5432]">
                    <Leaf className="w-4 h-4 text-[#76A771]" />
                </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">{patient.user.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A311D] border border-[#2A5432]/50">
                    <User className="w-3.5 h-3.5 text-[#76A771]" /> {age} anos
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A311D] border border-[#2A5432]/50">
                    <Phone className="w-3.5 h-3.5 text-[#76A771]" /> {patient.anamnesis?.phone || patient.user.email}
                </span>
                {patient.anamnesis?.profession && (
                   <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A311D] border border-[#2A5432]/50">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> {patient.anamnesis.profession}
                   </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
             <Link href={`https://wa.me/55${patient.anamnesis?.phone?.replace(/\D/g, '') || ''}`} target="_blank" className="flex-1 md:flex-none">
                <Button variant="outline" className="w-full border-[#2A5432] text-[#76A771] hover:bg-[#2A5432]/20 hover:text-white bg-transparent">
                  WhatsApp
                </Button>
             </Link>
             <Button className="flex-1 md:flex-none bg-[#76A771] hover:bg-[#5e8a5a] text-[#062214] font-bold shadow-lg shadow-[#76A771]/10">
               <Stethoscope className="w-4 h-4 mr-2" /> Nova Consulta
             </Button>
          </div>
        </div>
      </div>

      {/* --- CONTEÚDO (TABS) --- */}
      <Tabs defaultValue="overview" className="w-full">
        
        {/* Navegação das Abas */}
        <TabsList className="bg-[#0A311D] border border-[#2A5432] p-1 rounded-xl w-full md:w-auto overflow-x-auto flex justify-start mb-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#76A771] data-[state=active]:text-[#062214] text-gray-400 rounded-lg px-6">Visão Geral</TabsTrigger>
          <TabsTrigger value="anamnesis" className="data-[state=active]:bg-[#76A771] data-[state=active]:text-[#062214] text-gray-400 rounded-lg px-6">Anamnese</TabsTrigger>
          <TabsTrigger value="evolution" className="data-[state=active]:bg-[#76A771] data-[state=active]:text-[#062214] text-gray-400 rounded-lg px-6">Evolução</TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-[#76A771] data-[state=active]:text-[#062214] text-gray-400 rounded-lg px-6">Histórico</TabsTrigger>
          <TabsTrigger value="exams" className="data-[state=active]:bg-[#76A771] data-[state=active]:text-[#062214] text-gray-400 rounded-lg px-6">Exames</TabsTrigger>
        </TabsList>

        {/* 1. VISÃO GERAL */}
        <TabsContent value="overview" className="space-y-6 animate-in slide-in-from-bottom-2">
           <div className="grid md:grid-cols-2 gap-6">
              
              {/* Queixa Principal */}
              <Card className={`${cardStyle} h-full border-l-4 border-l-red-500/50`}>
                 <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2 text-white">
                       <AlertCircle className="w-5 h-5 text-red-400" /> Queixa Principal
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    {patient.anamnesis ? (
                       <p className="text-lg text-gray-200 italic leading-relaxed">"{patient.anamnesis.mainComplaint}"</p>
                    ) : (
                       <div className="flex flex-col items-center py-4 text-center">
                           <p className="text-gray-500 text-sm mb-2">Anamnese pendente.</p>
                           <Button size="sm" variant="link" className="text-[#76A771]">Solicitar preenchimento</Button>
                       </div>
                    )}
                 </CardContent>
              </Card>

              {/* Próximos Agendamentos */}
              <Card className={cardStyle}>
                 <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2 text-white">
                       <CalendarIcon className="w-5 h-5 text-[#76A771]" /> Agenda
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="space-y-3">
                       {patient.appointments.map((apt) => (
                          <div key={apt.id} className="flex justify-between items-center text-sm p-3 rounded-lg bg-[#062214]/50 border border-[#2A5432]/30">
                             <div className="flex items-center gap-3">
                                <div className="bg-[#2A5432]/30 p-2 rounded-md text-[#76A771]">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="font-medium text-white block">
                                    {new Date(apt.date).toLocaleDateString('pt-BR')}
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                    {new Date(apt.date).toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}
                                    </span>
                                </div>
                             </div>
                             <Badge variant={apt.status === 'SCHEDULED' ? 'default' : 'secondary'} className={apt.status === 'SCHEDULED' ? "bg-[#76A771] text-[#062214] hover:bg-[#76A771]/80" : "bg-gray-700 text-gray-300"}>
                                {apt.status === 'SCHEDULED' ? 'Agendado' : apt.status}
                             </Badge>
                          </div>
                       ))}
                       {patient.appointments.length === 0 && <p className="text-gray-500 italic py-2">Sem agendamentos futuros.</p>}
                    </div>
                 </CardContent>
              </Card>
           </div>
        </TabsContent>

        {/* 2. ANAMNESE */}
        <TabsContent value="anamnesis" className="animate-in slide-in-from-bottom-2">
           {patient.anamnesis ? (
              <Card className={cardStyle}>
                 <CardHeader className="border-b border-[#2A5432]/30">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-white">Ficha de Pré-Consulta</CardTitle>
                        <Badge variant="outline" className="border-[#76A771] text-[#76A771]">
                            Recebido em {patient.anamnesis.createdAt.toLocaleDateString('pt-BR')}
                        </Badge>
                    </div>
                 </CardHeader>
                 <CardContent className="space-y-8 pt-6">
                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#2A5432]/30">
                             <Activity className="w-4 h-4 text-[#76A771]" />
                             <h3 className="font-bold text-white uppercase tracking-wider text-sm">Saúde Geral</h3>
                          </div>
                          <div className="space-y-4">
                            <div>
                                <p className={labelStyle}>Diagnósticos</p>
                                <p className={valueStyle}>{patient.anamnesis.diagnosedDiseases || "—"}</p>
                            </div>
                            <div>
                                <p className={labelStyle}>Medicamentos</p>
                                <p className={valueStyle}>{patient.anamnesis.medications || "—"}</p>
                            </div>
                            <div>
                                <p className={labelStyle}>Alergias</p>
                                <p className={valueStyle}>{patient.anamnesis.allergies || "—"}</p>
                            </div>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#2A5432]/30">
                             <Sparkles className="w-4 h-4 text-yellow-500" />
                             <h3 className="font-bold text-white uppercase tracking-wider text-sm">Auto-Avaliação (0-10)</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="bg-[#062214] p-3 rounded-lg border border-[#2A5432]/30">
                                <span className="text-gray-400 text-xs block mb-1">Sono</span>
                                <span className="text-xl font-bold text-white">{patient.anamnesis.sleepQuality}</span>
                             </div>
                             <div className="bg-[#062214] p-3 rounded-lg border border-[#2A5432]/30">
                                <span className="text-gray-400 text-xs block mb-1">Intestino</span>
                                <span className="text-xl font-bold text-white">{patient.anamnesis.bowelFunction}</span>
                             </div>
                             <div className="bg-[#062214] p-3 rounded-lg border border-[#2A5432]/30">
                                <span className="text-gray-400 text-xs block mb-1">Energia</span>
                                <span className="text-xl font-bold text-white">{patient.anamnesis.energyLevel}</span>
                             </div>
                             <div className="bg-[#062214] p-3 rounded-lg border border-[#2A5432]/30">
                                <span className="text-gray-400 text-xs block mb-1">Ansiedade</span>
                                <span className="text-xl font-bold text-white">{patient.anamnesis.anxiety}</span>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div className="bg-[#062214]/50 p-4 rounded-xl border border-[#2A5432]/30">
                       <p className={labelStyle}>Relato Completo da Queixa</p>
                       <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed mt-2">
                         {patient.anamnesis.mainComplaint}
                       </p>
                    </div>
                 </CardContent>
              </Card>
           ) : (
              <div className="text-center py-16 bg-[#0A311D]/30 rounded-xl border-2 border-dashed border-[#2A5432]/50">
                 <div className="bg-[#2A5432]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-[#76A771]" />
                 </div>
                 <p className="text-gray-400">Este paciente ainda não preencheu a Anamnese.</p>
              </div>
           )}
        </TabsContent>

        {/* 3. EVOLUÇÃO */}
        <TabsContent value="evolution" className="animate-in slide-in-from-bottom-2">
           <div className="space-y-6">
             <EvolutionChart data={evolutionData} />
             {patient.weeklyCheckins.length > 0 && (
                <Card className={cardStyle}>
                    <CardHeader>
                        <CardTitle className="text-white text-base">Diário de Observações</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {patient.weeklyCheckins.slice(0, 5).map((check) => (
                            check.notes && (
                                <div key={check.id} className="flex gap-4 items-start p-4 rounded-lg bg-[#062214] border border-[#2A5432]/30">
                                    <div className="min-w-[80px] text-xs font-bold text-[#76A771] pt-1">
                                        {check.createdAt.toLocaleDateString('pt-BR', {day:'2-digit', month:'short'})}
                                    </div>
                                    <p className="text-sm text-gray-300 italic">"{check.notes}"</p>
                                </div>
                            )
                        ))}
                    </CardContent>
                </Card>
             )}
           </div>
        </TabsContent>

        {/* 4. HISTÓRICO */}
        <TabsContent value="history" className="animate-in slide-in-from-bottom-2">
           <div className="space-y-4">
              {patient.medicalRecords.length > 0 ? (
                 patient.medicalRecords.map((record) => (
                    <Card key={record.id} className={`${cardStyle} hover:border-[#76A771]/50 transition-colors cursor-default group`}>
                       <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                             <div>
                                <CardTitle className="text-lg text-white group-hover:text-[#76A771] transition-colors">
                                    {record.title || "Consulta de Rotina"}
                                </CardTitle>
                                <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                    <CalendarIcon className="w-3 h-3" />
                                    {new Date(record.date).toLocaleDateString('pt-BR')}
                                </span>
                             </div>
                             <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#76A771] transition-colors" />
                          </div>
                       </CardHeader>
                       <CardContent>
                          <div className="grid md:grid-cols-2 gap-6 text-sm bg-[#062214]/50 p-4 rounded-lg border border-[#2A5432]/20">
                             <div>
                                <strong className="text-[#76A771] block mb-1 text-xs uppercase">Fitoterapia</strong>
                                <p className="text-gray-300 line-clamp-2">{record.pilar2_fitoterapia || "Sem prescrição registrada."}</p>
                             </div>
                             <div>
                                <strong className="text-purple-400 block mb-1 text-xs uppercase">Evolução</strong>
                                <p className="text-gray-300 line-clamp-2">{record.pilar5_evolucao || "Sem evolução registrada."}</p>
                             </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                             <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white hover:bg-[#2A5432]/50">
                                Ver Prontuário Completo
                             </Button>
                          </div>
                       </CardContent>
                    </Card>
                 ))
              ) : (
                 <div className="text-center py-16 bg-[#0A311D]/30 rounded-xl border-2 border-dashed border-[#2A5432]/50">
                    <p className="text-gray-500">Nenhum registo clínico anterior encontrado.</p>
                    <Button variant="link" className="text-[#76A771] mt-2">Iniciar Primeiro Atendimento</Button>
                 </div>
              )}
           </div>
        </TabsContent>

        {/* 5. EXAMES (NOVO) */}
        <TabsContent value="exams" className="animate-in slide-in-from-bottom-2">
            <div className="grid md:grid-cols-3 gap-4">
                {patient.documents.length > 0 ? (
                    patient.documents.map((doc) => (
                        <Card key={doc.id} className={`${cardStyle} hover:bg-[#0A311D] transition-colors group`}>
                            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-[#062214] flex items-center justify-center border border-[#2A5432] group-hover:border-[#76A771] transition-colors">
                                    {doc.url.endsWith('.pdf') ? (
                                        <FileText className="w-6 h-6 text-red-400" />
                                    ) : (
                                        <ImageIcon className="w-6 h-6 text-blue-400" />
                                    )}
                                </div>
                                <div className="space-y-1 w-full">
                                    <h4 className="text-white font-medium truncate" title={doc.title}>{doc.title}</h4>
                                    <p className="text-xs text-gray-500">{new Date(doc.createdAt).toLocaleDateString('pt-BR')}</p>
                                </div>
                                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="w-full mt-2">
                                    <Button size="sm" variant="outline" className="w-full border-[#2A5432] text-[#76A771] hover:bg-[#2A5432]/30 hover:text-white">
                                        <ExternalLink className="w-3 h-3 mr-2" /> Visualizar
                                    </Button>
                                </a>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-3 text-center py-16 bg-[#0A311D]/30 rounded-xl border-2 border-dashed border-[#2A5432]/50">
                        <div className="bg-[#2A5432]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <File className="w-8 h-8 text-[#76A771]" />
                        </div>
                        <p className="text-gray-400">Nenhum exame ou documento anexado.</p>
                    </div>
                )}
            </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}