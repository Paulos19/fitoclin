import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { 
  Calendar, 
  Users, 
  Activity, 
  Video, 
  FileText, 
  ArrowRight, 
  Clock, 
  TrendingUp,
  Leaf,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Instância do Prisma (Idealmente, mova para um arquivo lib/db.ts singleton em produção)
const prisma = new PrismaClient();

// Função auxiliar para saudação temporal
function getGreeting() {
  const hour = new Date().toLocaleTimeString("pt-BR", { 
    hour: "2-digit", 
    hour12: false, 
    timeZone: "America/Sao_Paulo" 
  });
  const h = parseInt(hour);
  
  if (h >= 5 && h < 12) return "Bom dia";
  if (h >= 12 && h < 18) return "Boa tarde";
  return "Boa noite";
}

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user;
  const greeting = getGreeting();

  // Cores da Marca (para referência inline se precisar, mas usaremos Tailwind)
  // Verde Escuro: #062214 | Verde Médio: #0A311D | Musgo: #2A5432 | Lima: #76A771

  // ==========================================
  // 🟢 VISÃO DA DRA. ISA (ADMIN)
  // ==========================================
  if (user?.role === "ADMIN") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Consultas de Hoje
    const appointmentsTodayCount = await prisma.appointment.count({
      where: { date: { gte: today, lt: tomorrow }, status: { not: 'CANCELED' } }
    });

    // Próximas 3 consultas detalhadas (para a lista rápida)
    const nextAppointments = await prisma.appointment.findMany({
      where: { date: { gte: new Date() }, status: { not: 'CANCELED' } },
      orderBy: { date: 'asc' },
      take: 3,
      include: { patient: { include: { user: true } } }
    });
    
    const totalPatients = await prisma.patient.count();

    // Mock de Faturamento (pode ser implementado via query depois)
    const revenueMonth = "R$ 12.450"; 

    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        
        {/* --- HERO BANNER ADMIN --- */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A311D] to-[#062214] border border-[#2A5432]/30 p-8 shadow-2xl">
          {/* Grafismos de Fundo */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-[#76A771]/10 blur-3xl" />
          <div className="absolute bottom-0 left-20 h-40 w-40 rounded-full bg-[#2A5432]/20 blur-2xl" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-[#76A771] border-[#76A771] bg-[#76A771]/10">
                   Admin Mode
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {greeting}, <span className="text-[#76A771]">Dra. Isa</span>.
              </h1>
              <p className="text-gray-400 max-w-md">
                Aqui está o resumo da sua clínica hoje. Você tem <span className="text-white font-bold">{appointmentsTodayCount} atendimentos</span> agendados.
              </p>
            </div>
            
            {/* Botão de Ação Rápida */}
            <div className="flex gap-3">
              <Link href="/dashboard/schedule">
                <Button className="bg-[#76A771] hover:bg-[#5e8a5a] text-[#062214] font-semibold shadow-lg shadow-[#76A771]/20">
                  <Calendar className="mr-2 h-4 w-4" /> Ver Agenda
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* --- METRICS GRID --- */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-[#0A311D]/50 border-[#2A5432]/30 backdrop-blur-sm hover:border-[#76A771]/50 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Pacientes Totais</CardTitle>
              <Users className="h-4 w-4 text-[#76A771]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalPatients}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-[#76A771]" /> +4 novos este mês
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#0A311D]/50 border-[#2A5432]/30 backdrop-blur-sm hover:border-[#76A771]/50 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Faturamento (Est.)</CardTitle>
              <Activity className="h-4 w-4 text-[#76A771]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{revenueMonth}</div>
              <p className="text-xs text-muted-foreground mt-1">Baseado nos agendamentos</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0A311D]/50 border-[#2A5432]/30 backdrop-blur-sm hover:border-[#76A771]/50 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Eficiência</CardTitle>
              <Sparkles className="h-4 w-4 text-[#76A771]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">98%</div>
              <p className="text-xs text-muted-foreground mt-1">Taxa de comparecimento</p>
            </CardContent>
          </Card>
        </div>

        {/* --- PRÓXIMOS ATENDIMENTOS (LISTA RÁPIDA) --- */}
        <div className="grid md:grid-cols-3 gap-6">
           <Card className="col-span-2 bg-[#062214] border-[#2A5432]/30">
             <CardHeader>
               <CardTitle className="text-white flex items-center gap-2">
                 <Clock className="w-5 h-5 text-[#76A771]" /> Próximos na Fila
               </CardTitle>
             </CardHeader>
             <CardContent>
               <div className="space-y-4">
                 {nextAppointments.length > 0 ? (
                   nextAppointments.map((apt) => (
                     <div key={apt.id} className="flex items-center justify-between p-4 rounded-xl bg-[#0A311D]/50 border border-[#2A5432]/20 hover:bg-[#0A311D] transition-colors">
                       <div className="flex items-center gap-4">
                         <div className="h-10 w-10 rounded-full bg-[#2A5432] flex items-center justify-center text-white font-bold">
                           {apt.patient.user.name.charAt(0)}
                         </div>
                         <div>
                           <p className="text-white font-medium">{apt.patient.user.name}</p>
                           <p className="text-sm text-gray-400">
                             {new Date(apt.date).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})} • {apt.type === 'FIRST_VISIT' ? 'Primeira Consulta' : 'Retorno'}
                           </p>
                         </div>
                       </div>
                       <Link href={`/dashboard/records/${apt.patient.id}`}>
                          <Button size="sm" variant="outline" className="border-[#76A771] text-[#76A771] hover:bg-[#76A771] hover:text-[#062214]">
                            Prontuário
                          </Button>
                       </Link>
                     </div>
                   ))
                 ) : (
                   <p className="text-gray-500">Nenhum agendamento próximo.</p>
                 )}
               </div>
             </CardContent>
           </Card>

           {/* Atalhos Rápidos Admin */}
           <Card className="bg-gradient-to-b from-[#2A5432]/20 to-[#062214] border-[#2A5432]/30">
              <CardHeader>
                <CardTitle className="text-white text-sm uppercase tracking-wider">Atalhos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                 <Link href="/dashboard/patients" className="block">
                   <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#2A5432]/40">
                     <Users className="mr-2 w-4 h-4 text-[#76A771]"/> Novo Paciente
                   </Button>
                 </Link>
                 <Link href="/dashboard/schedule" className="block">
                   <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#2A5432]/40">
                     <Calendar className="mr-2 w-4 h-4 text-[#76A771]"/> Bloquear Horário
                   </Button>
                 </Link>
              </CardContent>
           </Card>
        </div>
      </div>
    );
  }

  // ==========================================
  // 🟢 VISÃO DO PACIENTE
  // ==========================================
  
  // Buscar dados do Paciente logado
  const patient = await prisma.patient.findUnique({
    where: { userId: user?.id },
    include: {
      appointments: {
        where: { date: { gte: new Date() }, status: { not: 'CANCELED' } }, 
        orderBy: { date: 'asc' },
        take: 1
      },
      medicalRecords: {
        orderBy: { date: 'desc' },
        take: 1
      }
    }
  });

  const nextAppointment = patient?.appointments[0];
  const lastRecord = patient?.medicalRecords[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* --- HERO BANNER PACIENTE --- */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0A311D] border border-[#2A5432]/30 p-8 shadow-xl">
         {/* Efeitos de Luz Premium */}
         <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-[#76A771]/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
         
         <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A5432]/30 border border-[#2A5432]/50 text-[#76A771] text-xs font-semibold uppercase tracking-wide">
                  <Leaf className="w-3 h-3" /> Saúde Integrativa
               </div>
               <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                 {greeting}, <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#76A771]">
                   {user?.name?.split(' ')[0]}
                 </span>
               </h1>
               <p className="text-gray-400 text-lg leading-relaxed">
                 Bem-vindo ao seu espaço de cuidado. A fitoterapia conecta você à sua melhor versão natural.
               </p>
               
               <div className="flex flex-wrap gap-3 pt-2">
                 <Link href="https://wa.me/5511999999999" target="_blank">
                    <Button className="bg-[#25D366] hover:bg-[#1da851] text-white border-none rounded-full">
                      WhatsApp da Clínica
                    </Button>
                 </Link>
                 {!nextAppointment && (
                   <Button variant="outline" className="border-[#76A771] text-[#76A771] hover:bg-[#76A771]/10 rounded-full">
                     Agendar Consulta
                   </Button>
                 )}
               </div>
            </div>

            {/* Ilustração ou Card Flutuante Decorativo */}
            <div className="hidden md:flex justify-end relative">
               <div className="absolute inset-0 bg-[#76A771] blur-[80px] opacity-10 rounded-full" />
               <Card className="w-64 bg-[#062214]/90 backdrop-blur border-[#2A5432] rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                 <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                    <div className="p-3 bg-[#76A771]/10 rounded-full">
                      <Sparkles className="w-6 h-6 text-[#76A771]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Você sabia?</p>
                      <p className="text-xs text-gray-400 mt-2">
                        A consistência no uso dos fitoterápicos é responsável por 70% do sucesso do tratamento.
                      </p>
                    </div>
                 </CardContent>
               </Card>
            </div>
         </div>
      </div>

      {/* --- GRID DE STATUS --- */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* CARD 1: PRÓXIMA CONSULTA (Destaque) */}
        <Card className="lg:col-span-2 bg-[#062214] border-[#2A5432]/50 shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2A5432]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <CardHeader className="border-b border-[#2A5432]/20 pb-4">
            <CardTitle className="flex items-center gap-2 text-white">
              <Calendar className="h-5 w-5 text-[#76A771]" /> Sua Próxima Consulta
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {nextAppointment ? (
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                <div className="space-y-1">
                  <div className="text-5xl font-bold text-white tracking-tighter">
                    {new Date(nextAppointment.date).getDate()}
                    <span className="text-xl font-normal text-[#76A771] ml-1 uppercase">
                      {new Date(nextAppointment.date).toLocaleDateString('pt-BR', { month: 'short' })}
                    </span>
                  </div>
                  <div className="text-lg text-gray-400 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {new Date(nextAppointment.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    <span className="text-xs px-2 py-0.5 rounded bg-[#2A5432]/30 text-[#76A771] border border-[#2A5432]">Confirmado</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto">
                   {nextAppointment.meetLink ? (
                      <a href={nextAppointment.meetLink} target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button className="w-full md:w-auto bg-[#76A771] hover:bg-[#659160] text-[#062214] font-bold shadow-lg shadow-[#76A771]/20 animate-pulse-slow">
                          <Video className="w-4 h-4 mr-2" /> Entrar na Sala Agora
                        </Button>
                      </a>
                    ) : (
                      <div className="bg-[#0A311D] border border-[#2A5432] p-3 rounded-lg text-xs text-gray-400 flex items-center gap-2 max-w-xs">
                        <Video className="w-4 h-4 text-gray-500" />
                        Link disponível 1h antes da consulta.
                      </div>
                    )}
                </div>
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                <div className="p-4 rounded-full bg-[#0A311D]">
                   <Calendar className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-gray-400">Nenhuma consulta agendada no momento.</p>
                <Link href="https://wa.me/5511999999999">
                  <Button variant="link" className="text-[#76A771]">Agendar novo horário &rarr;</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* CARD 2: PRESCRIÇÃO ATUAL */}
        <Card className="bg-[#0A311D]/30 border-[#2A5432]/30 hover:bg-[#0A311D]/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white text-base">
              <FileText className="h-4 w-4 text-[#76A771]" /> Protocolo Atual
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {lastRecord ? (
              <>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Última avaliação</p>
                  <p className="font-medium text-[#76A771] line-clamp-1">{lastRecord.title}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(lastRecord.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                
                {lastRecord.pilar2_fitoterapia && (
                   <div className="p-3 rounded-lg bg-[#062214] border border-[#2A5432]/40">
                      <p className="text-xs text-gray-500 mb-1">Foco Fitoterápico:</p>
                      <p className="text-sm text-gray-300 line-clamp-3 italic">
                        "{lastRecord.pilar2_fitoterapia}"
                      </p>
                   </div>
                )}

                <Link href="/dashboard/prescriptions" className="block mt-2">
                  <Button variant="ghost" className="w-full justify-between text-sm text-gray-300 hover:text-white hover:bg-[#2A5432]/30 border border-transparent hover:border-[#2A5432]/50">
                    Abrir Receita <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <p className="text-sm text-gray-500 mb-4">Seu prontuário será atualizado após a primeira consulta.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* --- ATALHOS RÁPIDOS (ICONS) --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        {[
          { label: "Histórico", icon: Calendar, href: "/dashboard/appointments", color: "text-blue-400", bg: "bg-blue-400/10" },
          { label: "Receitas", icon: FileText, href: "/dashboard/prescriptions", color: "text-[#76A771]", bg: "bg-[#76A771]/10" },
          { label: "Meus Dados", icon: Users, href: "/dashboard/profile", color: "text-purple-400", bg: "bg-purple-400/10" },
          { label: "Suporte", icon: Sparkles, href: "https://wa.me/5511999999999", color: "text-yellow-400", bg: "bg-yellow-400/10" },
        ].map((item) => (
          <Link key={item.label} href={item.href} className="group">
            <Card className="h-full bg-[#062214] border-[#2A5432]/30 hover:border-[#76A771] transition-all duration-300 cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center py-6 gap-3">
                <div className={`p-3 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors">{item.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}