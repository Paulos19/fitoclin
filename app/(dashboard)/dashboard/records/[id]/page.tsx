import { auth } from "@/auth";
import { db } from "@/lib/db";
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
  Dna,
  Pill,
  MessageCircle,
  Bot,
  Send,
  Mic
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EvolutionChart } from "@/components/dashboard/evolution-chart";
import { EpigeneticForm } from "@/components/dashboard/epigenetic-form";
import { PepForm } from "@/components/dashboard/pep-form";
import { PrescriptionPanel } from "@/components/dashboard/prescription-panel";
import { NewAppointmentDialog } from "@/components/dashboard/new-appointment-dialog";
import { PostConsultationForm } from "@/components/dashboard/post-consultation-form";
import { ConsultationRecorder } from "@/components/dashboard/consultation-recorder";
import { TranscriptionPanel } from "@/components/dashboard/transcription-panel";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RecordDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const session = await auth();

  // 1. Verificação de Acesso
  const role = session?.user?.role;
  const isAllowed = role === "ADMIN" || role === "PROFESSIONAL" || role === "SECRETARY";

  if (!isAllowed) {
    redirect("/dashboard");
  }

  // 2. Buscar Dados do Paciente
  const patient = await db.patient.findUnique({
    where: { id: resolvedParams.id },
    include: {
      user: true,
      anamnesis: true,
      weeklyCheckins: { orderBy: { createdAt: 'asc' }, take: 20 },
      appointments: { orderBy: { date: 'desc' }, take: 5 },
      medicalRecords: { orderBy: { createdAt: 'desc' }, take: 50 },
      documents: { orderBy: { createdAt: 'desc' } }
    }
  });

  if (!patient) return (
    <div className="flex items-center justify-center h-96 text-gray-400">
      Paciente não encontrado.
    </div>
  );

  if (role === "PROFESSIONAL" && patient.professionalId !== session?.user?.id) {
    redirect("/dashboard");
  }

  // 3. Preparar Dados Auxiliares

  // --- LÓGICA DE DADOS CORRIGIDA (IDADE E GÊNERO) ---

  // Cálculo de Idade (Prioriza Data de Nascimento do Perfil, depois Anamnese)
  let calculatedAge: string | number = "N/A";
  if (patient.birthDate) {
    const today = new Date();
    const birth = new Date(patient.birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    calculatedAge = age;
  } else if (patient.anamnesis?.age) {
    calculatedAge = patient.anamnesis.age;
  }

  // Gênero (Prioriza Perfil, depois Anamnese)
  const patientGender = patient.gender || patient.anamnesis?.gender || "Não informado";

  // Gráfico de Evolução
  const evolutionData = patient.weeklyCheckins.map(c => ({
    date: c.createdAt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
    Sono: c.sleepQuality,
    Energia: c.energyLevel,
    Humor: c.mood,
    Digestão: c.digestion
  }));

  const whatsappNumber = patient.anamnesis?.phone?.replace(/\D/g, '') || "";

  // Filtrar Registros de Pós-Consulta (Lógica baseada nos Títulos do N8N)
  const postConsultationRecords = patient.medicalRecords.filter(r =>
    r.title.includes("Pós-Consulta") ||
    r.title.includes("WhatsApp") ||
    r.title.includes("Retorno")
  );

  // Estilos reutilizáveis
  const cardStyle = "bg-[#0A311D]/50 border-[#2A5432]/30 backdrop-blur-sm text-white";
  const labelStyle = "text-xs font-semibold text-[#76A771] uppercase tracking-wider mb-1";
  const valueStyle = "text-sm text-gray-300";
  const tabTriggerStyle = "data-[state=active]:bg-[#76A771] data-[state=active]:text-[#062214] text-gray-400 rounded-lg px-4 md:px-6 flex items-center gap-2";

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">

      {/* --- HERO SECTION --- */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A311D] to-[#062214] border border-[#2A5432]/30 p-8 shadow-2xl">
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
                  <User className="w-3.5 h-3.5 text-[#76A771]" /> {calculatedAge} anos
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A311D] border border-[#2A5432]/50">
                  <Phone className="w-3.5 h-3.5 text-[#76A771]" /> {patient.anamnesis?.phone || patient.user.email}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A311D] border border-[#2A5432]/50">
                  <Dna className="w-3.5 h-3.5 text-[#76A771]" /> {patientGender}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto items-end md:items-center">
            {/* Novo Gravador de Consulta */}
            <ConsultationRecorder patientId={patient.id} />

            <Link href={`https://wa.me/55${whatsappNumber}`} target="_blank" className="flex-1 md:flex-none">
              <Button variant="outline" className="w-full border-[#2A5432] text-[#76A771] hover:bg-[#2A5432]/20 hover:text-white bg-transparent">
                <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
              </Button>
            </Link>
            <NewAppointmentDialog patientId={patient.id} showFullButton={true} />
          </div>
        </div>
      </div>

      {/* --- TABS --- */}
      <Tabs defaultValue="overview" className="w-full">
        <div className="w-full overflow-x-auto pb-2">
          <TabsList className="bg-[#0A311D] border border-[#2A5432] p-1 rounded-xl w-full md:w-max flex justify-start mb-2">
            <TabsTrigger value="anamnesis" className={tabTriggerStyle}>Pré-Atendimento</TabsTrigger>
            <TabsTrigger value="overview" className={tabTriggerStyle}>Visão Geral</TabsTrigger>
            <TabsTrigger value="evolution" className={tabTriggerStyle}>Evolução</TabsTrigger>
            <TabsTrigger value="transcription" className={tabTriggerStyle}><Mic className="w-4 h-4 mr-1" /> Transcrição</TabsTrigger>
            <TabsTrigger value="prescription" className={tabTriggerStyle}><Pill className="w-4 h-4 mr-1" /> Prescrição</TabsTrigger>
            <TabsTrigger value="post-consultation" className={tabTriggerStyle}><MessageCircle className="w-4 h-4 mr-1" /> Pós-Consulta</TabsTrigger>
            <TabsTrigger value="epigenetic" className={tabTriggerStyle}><Dna className="w-4 h-4 mr-1" /> Epigenética</TabsTrigger>
            <TabsTrigger value="history" className={tabTriggerStyle}>Histórico</TabsTrigger>
            <TabsTrigger value="exams" className={tabTriggerStyle}>Exames</TabsTrigger>
          </TabsList>
        </div>

        {/* 1. VISÃO GERAL */}
        <TabsContent value="overview" className="space-y-6 animate-in slide-in-from-bottom-2">
          <div className="grid md:grid-cols-2 gap-6">
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
                            {new Date(apt.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
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

        {/* 2. EVOLUÇÃO (PEP) */}
        <TabsContent value="evolution" className="space-y-6 animate-in slide-in-from-bottom-2">
          <PepForm patientId={patient.id} />
          <EvolutionChart data={evolutionData} />
        </TabsContent>

        {/* 2.5 TRANSCRIÇÃO */}
        <TabsContent value="transcription" className="space-y-6 animate-in slide-in-from-bottom-2">
          <TranscriptionPanel records={patient.medicalRecords as any} patientId={patient.id} />
        </TabsContent>

        {/* 3. PRESCRIÇÃO */}
        <TabsContent value="prescription" className="space-y-6 animate-in slide-in-from-bottom-2">
          <PrescriptionPanel
            patientId={patient.id}
            patientName={patient.user.name || "Paciente"}
            patientDetails={`${calculatedAge} anos`}

            // PASSANDO OS DADOS CORRETOS PARA A IA
            patientAge={calculatedAge as string | number}
            patientGender={patientGender}

            patientEmail={patient.user.email}
            patientPhone={patient.anamnesis?.phone}
            doctorName={session?.user?.name || "Dra. Isa"}
          />
        </TabsContent>

        {/* 4. PÓS-CONSULTA */}
        <TabsContent value="post-consultation" className="animate-in slide-in-from-bottom-2">

          <PostConsultationForm patientId={patient.id} />

          <div className="grid md:grid-cols-3 gap-6 h-[600px]">

            {/* Timeline / Chat */}
            <div className="md:col-span-2 bg-[#0A311D]/30 border border-[#2A5432]/30 rounded-xl p-4 flex flex-col h-full overflow-hidden">
              <div className="border-b border-[#2A5432]/30 pb-3 mb-3 flex justify-between items-center">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#76A771]" />
                  Histórico de Acompanhamento
                </h3>
                <Badge variant="outline" className="border-[#76A771] text-[#76A771]">
                  {postConsultationRecords.length} interações
                </Badge>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                {postConsultationRecords.length > 0 ? (
                  postConsultationRecords.map((record) => {
                    const isPatientReply = record.title.includes("Retorno") || record.title.includes("Resposta");

                    return (
                      <div key={record.id} className={`flex ${isPatientReply ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-xl p-3 border ${isPatientReply
                          ? 'bg-[#2A5432]/40 border-[#76A771]/30 rounded-tr-none'
                          : 'bg-[#062214]/80 border-[#2A5432]/30 rounded-tl-none'
                          }`}>
                          <div className="flex items-center gap-2 mb-1">
                            {isPatientReply ? (
                              <User className="w-3 h-3 text-[#76A771]" />
                            ) : (
                              <Bot className="w-3 h-3 text-purple-400" />
                            )}
                            <span className={`text-[10px] font-bold uppercase ${isPatientReply ? 'text-[#76A771]' : 'text-purple-400'}`}>
                              {isPatientReply ? "Paciente" : "Fitoclin Bot"}
                            </span>
                            <span className="text-[10px] text-gray-500 ml-auto">
                              {new Date(record.date).toLocaleDateString('pt-BR')} • {new Date(record.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
                            {record.notes}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                    <MessageCircle className="w-12 h-12 text-gray-600 mb-2" />
                    <p className="text-sm text-gray-400">Nenhum histórico de pós-consulta registrado.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="space-y-4">
              <Card className={cardStyle}>
                <CardHeader>
                  <CardTitle className="text-sm text-white uppercase tracking-wider flex items-center gap-2">
                    <Send className="w-4 h-4 text-[#76A771]" /> Contato Rápido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-gray-400">
                    Inicie uma conversa ou envie uma mensagem manual para o paciente.
                  </p>
                  {whatsappNumber ? (
                    <Link href={`https://wa.me/55${whatsappNumber}`} target="_blank" className="block">
                      <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold border-none">
                        <MessageCircle className="w-4 h-4 mr-2" /> Abrir WhatsApp
                      </Button>
                    </Link>
                  ) : (
                    <Button disabled className="w-full bg-gray-700 text-gray-400">
                      Sem Telefone
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className={cardStyle}>
                <CardHeader>
                  <CardTitle className="text-sm text-white uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-400" /> Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#76A771] animate-pulse"></div>
                    <span className="text-sm text-gray-200">Em acompanhamento</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    O paciente está na fase de pós-consulta. O sistema monitora automaticamente interações a cada 3 dias.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* 5. EPIGENÉTICA */}
        <TabsContent value="epigenetic" className="animate-in slide-in-from-bottom-2">
          <div className="bg-[#0A311D]/50 border border-[#2A5432]/30 p-6 rounded-xl backdrop-blur-sm">
            <div className="mb-6 border-b border-[#2A5432]/30 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Dna className="w-5 h-5 text-[#76A771]" />
                Anamnese Epigenética
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Roteiro detalhado para investigação de fatores ambientais, genéticos e estilo de vida.
              </p>
            </div>
            <EpigeneticForm patientId={patient.id} />
          </div>
        </TabsContent>

        {/* 6. HISTÓRICO */}
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
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-16 bg-[#0A311D]/30 rounded-xl border-2 border-dashed border-[#2A5432]/50">
                <p className="text-gray-500">Nenhum registo clínico anterior encontrado.</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* 7. EXAMES */}
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
                <p className="text-gray-400">Nenhum exame ou documento anexado.</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* 8. ANAMNESE */}
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
              <p className="text-gray-400">Este paciente ainda não preencheu a Pré-Atendimento.</p>
            </div>
          )}
        </TabsContent>

      </Tabs>
    </div>
  );
}