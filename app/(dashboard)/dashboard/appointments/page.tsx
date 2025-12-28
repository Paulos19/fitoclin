import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Video, CheckCircle2, History, CalendarDays, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { NewAppointmentDialog } from "@/components/dashboard/new-appointment-dialog";
import { MeetLinkDialog } from "@/components/dashboard/meet-link-dialog"; // Certifique-se de ter criado este componente
import Link from "next/link";

const prisma = new PrismaClient();

export default async function AppointmentsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const isAdmin = session.user.role === "ADMIN";
  let appointments = [];

  // --- LÓGICA HÍBRIDA DE BUSCA ---
  if (isAdmin) {
    // ADMIN: Vê TUDO, ordenado por data (próximos primeiro)
    appointments = await prisma.appointment.findMany({
      orderBy: { date: 'asc' },
      include: {
        patient: {
          include: { user: true } // Precisamos dos dados do usuário (nome, email)
        }
      }
    });
  } else {
    // PACIENTE: Vê APENAS OS SEUS
    const patient = await prisma.patient.findUnique({
      where: { userId: session.user.id }
    });

    if (!patient) {
        return <div className="text-white p-6">Perfil de paciente não encontrado.</div>;
    }
    
    appointments = await prisma.appointment.findMany({
      where: { patientId: patient.id },
      orderBy: { date: 'asc' },
      include: { doctor: true }
    });
  }

  // Separação Lógica: Futuras vs Passadas
  const now = new Date();
  const upcoming = appointments.filter(apt => new Date(apt.date) >= now && apt.status !== 'CANCELED');
  
  // Para histórico, invertemos a ordem (mais recentes primeiro)
  const past = appointments
    .filter(apt => new Date(apt.date) < now || apt.status === 'CANCELED')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Híbrido */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#2A5432]/30 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {isAdmin ? "Gestão de Consultas" : "Minhas Consultas"}
          </h1>
          <p className="text-gray-400 mt-1">
            {isAdmin 
              ? "Visualize e gerencie a agenda completa da clínica." 
              : "Gerencie seus agendamentos e veja seu histórico."}
          </p>
        </div>
        
        <div className="flex flex-col-reverse md:flex-row items-end md:items-center gap-3 w-full md:w-auto">
          {/* O Admin sempre pode agendar manualmente, o Paciente também */}
          <NewAppointmentDialog />
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2 bg-[#062214] p-1 rounded-xl border border-[#2A5432]/30 mb-6">
          <TabsTrigger 
            value="upcoming"
            className="data-[state=active]:bg-[#2A5432] data-[state=active]:text-white text-gray-400"
          >
            Agendadas ({upcoming.length})
          </TabsTrigger>
          <TabsTrigger 
            value="history"
            className="data-[state=active]:bg-[#2A5432] data-[state=active]:text-white text-gray-400"
          >
            Histórico ({past.length})
          </TabsTrigger>
        </TabsList>

        {/* --- ABA: AGENDADAS --- */}
        <TabsContent value="upcoming" className="space-y-4">
          {upcoming.length === 0 ? (
            <Card className="bg-[#0A311D]/30 border-[#2A5432]/30 border-dashed">
              <CardContent className="p-12 flex flex-col items-center text-center text-gray-500 gap-4">
                <CalendarDays className="w-12 h-12 opacity-20" />
                <p>Nenhuma consulta agendada para o futuro.</p>
                {/* Atalho para agendar se estiver vazio */}
                <div className="mt-2 scale-90 opacity-80">
                    <NewAppointmentDialog />
                </div>
              </CardContent>
            </Card>
          ) : (
            upcoming.map((apt) => (
              <Card key={apt.id} className="bg-[#0A311D]/50 border-[#76A771]/30 overflow-hidden relative group hover:border-[#76A771] transition-all">
                {/* Efeito Glow Lateral */}
                <div className="absolute top-0 left-0 w-1 h-full bg-[#76A771]" />
                
                <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex gap-4 items-center w-full">
                    {/* Box da Data */}
                    <div className="flex flex-col items-center justify-center h-16 w-16 rounded-xl bg-[#062214] border border-[#2A5432] text-center shrink-0">
                      <span className="text-xs text-gray-400 uppercase font-bold">
                        {new Date(apt.date).toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}
                      </span>
                      <span className="text-2xl font-bold text-[#76A771]">
                        {new Date(apt.date).getDate()}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {/* Título: Se Admin, mostra nome do Paciente. Se Paciente, mostra "Consulta..." */}
                          <h3 className="font-bold text-white text-lg">
                            {isAdmin 
                                ? (apt as any).patient?.user?.name || "Paciente sem nome"
                                : "Consulta com Dra. Isa"}
                          </h3>
                          <Badge className="bg-[#76A771]/20 text-[#76A771] hover:bg-[#76A771]/30 border-none">Confirmado</Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-[#76A771]" /> 
                          {new Date(apt.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        
                        {apt.meetLink ? (
                           <span className="flex items-center gap-1.5 text-[#76A771]">
                             <Video className="w-4 h-4" /> Link Gerado
                           </span>
                        ) : (
                           <span className="flex items-center gap-1.5 text-gray-500">
                             <Video className="w-4 h-4" /> Online (Meet)
                           </span>
                        )}

                        {/* Info extra para Admin */}
                        {isAdmin && (apt as any).patient?.user?.email && (
                            <span className="flex items-center gap-1.5 text-blue-400/80">
                                <User className="w-3 h-3" /> {(apt as any).patient.user.email}
                            </span>
                        )}
                      </div>

                      {/* Motivo/Notas */}
                      {apt.notes && (
                        <div className="mt-2 text-xs text-gray-500 bg-[#062214]/50 p-2 rounded border border-[#2A5432]/20 inline-block max-w-md truncate">
                           💬 {apt.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AÇÕES */}
                  <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row md:flex-col gap-2">
                    
                    {/* Botão de Entrar (Para todos se tiver link) */}
                    {apt.meetLink ? (
                      <a href={apt.meetLink} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full md:w-auto bg-[#76A771] hover:bg-[#5e8a5a] text-[#062214] font-bold shadow-lg shadow-[#76A771]/20">
                          <Video className="w-4 h-4 mr-2" /> Entrar na Sala
                        </Button>
                      </a>
                    ) : (
                      // Se não tiver link e for paciente, avisa
                      !isAdmin && (
                        <div className="px-4 py-2 rounded-lg bg-[#062214] border border-[#2A5432]/30 text-xs text-gray-500 text-center whitespace-nowrap">
                          Aguardando Link
                        </div>
                      )
                    )}

                    {/* --- BOTÃO DE ADICIONAR LINK (SÓ ADMIN) --- */}
                    {isAdmin && (
                      <MeetLinkDialog 
                        appointmentId={apt.id} 
                        currentLink={apt.meetLink} 
                      />
                    )}

                    {/* Botão de Prontuário (Só Admin) */}
                    {isAdmin && (
                        <Link href={`/dashboard/records/${(apt as any).patientId}`}>
                            <Button variant="outline" size="sm" className="w-full border-[#2A5432] text-gray-300 hover:text-white hover:bg-[#2A5432]">
                                <FileText className="w-4 h-4 mr-2" /> Prontuário
                            </Button>
                        </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* --- ABA: HISTÓRICO --- */}
        <TabsContent value="history" className="space-y-4">
          {past.length === 0 ? (
             <div className="text-center p-8 text-gray-500">Nenhum histórico encontrado.</div>
          ) : (
            past.map((apt) => (
              <Card key={apt.id} className="bg-[#062214]/30 border-[#2A5432]/20 opacity-80 hover:opacity-100 transition-opacity">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-[#2A5432]/10 text-gray-500">
                       {apt.status === 'CANCELED' ? <History className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-gray-300 font-medium">
                        {/* No histórico também mostramos o nome se for Admin */}
                        {isAdmin 
                            ? (apt as any).patient?.user?.name + " - " 
                            : ""}
                        {new Date(apt.date).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(apt.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} • {apt.status === 'CANCELED' ? 'Cancelada' : 'Realizada'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}