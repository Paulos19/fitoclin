import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Activity, Clock, Video, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user;

  // ==========================================
  // VISÃO DA DRA. ISA (ADMIN)
  // ==========================================
  if (user?.role === "ADMIN") {
    // Busca dados reais para os cards do Admin
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const appointmentsToday = await prisma.appointment.count({
      where: { date: { gte: today, lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) } }
    });
    
    const totalPatients = await prisma.patient.count();

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-[#062214]">Olá, Dra. Isa 👋</h1>
          <p className="text-gray-500">Painel administrativo da clínica.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consultas Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-[#76A771]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointmentsToday}</div>
              <p className="text-xs text-muted-foreground">Agendamentos confirmados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pacientes Totais</CardTitle>
              <Users className="h-4 w-4 text-[#76A771]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPatients}</div>
              <p className="text-xs text-muted-foreground">Base ativa</p>
            </CardContent>
          </Card>

           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faturamento (Mês)</CardTitle>
              <Activity className="h-4 w-4 text-[#76A771]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ --</div>
              <p className="text-xs text-muted-foreground">Disponível em breve</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ==========================================
  // VISÃO DO PACIENTE
  // ==========================================
  
  // 1. Buscar dados do Paciente logado
  const patient = await prisma.patient.findUnique({
    where: { userId: user?.id },
    include: {
      appointments: {
        where: { date: { gte: new Date() }, status: { not: 'CANCELED' } }, // Apenas futuras
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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#062214]">Olá, {user?.name}</h1>
          <p className="text-gray-500">Bem-vindo ao seu espaço de saúde integrativa.</p>
        </div>
        {/* Atalho para marcar consulta (opcional) */}
        <Link href="https://wa.me/5511999999999" target="_blank">
          <Button variant="outline" className="text-[#2A5432] border-[#2A5432]">
            Falar com a Recepção
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* CARD 1: PRÓXIMA CONSULTA */}
        <Card className="bg-[#062214] text-white border-none shadow-xl relative overflow-hidden">
          {/* Background decorativo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#76A771]/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-200">
              <Calendar className="h-5 w-5 text-[#76A771]" /> Próxima Consulta
            </CardTitle>
          </CardHeader>
          <CardContent>
            {nextAppointment ? (
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold text-white mb-1">
                    {new Date(nextAppointment.date).getDate()}
                    <span className="text-lg font-normal text-gray-400 ml-2 uppercase">
                      {new Date(nextAppointment.date).toLocaleDateString('pt-BR', { month: 'short' })}
                    </span>
                  </div>
                  <div className="text-xl text-[#76A771]">
                    {new Date(nextAppointment.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    <span className="text-sm text-gray-400 ml-2">Horário de Brasília</span>
                  </div>
                </div>

                {nextAppointment.meetLink ? (
                  <a href={nextAppointment.meetLink} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-[#76A771] hover:bg-[#5e8a5a] text-[#062214] font-bold gap-2">
                      <Video className="w-4 h-4" /> Entrar na Sala Virtual
                    </Button>
                  </a>
                ) : (
                  <div className="bg-white/10 p-3 rounded-lg text-sm text-center text-gray-300">
                    O link da videochamada aparecerá aqui 1h antes.
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center space-y-4">
                <p className="text-gray-400">Nenhuma consulta agendada.</p>
                <Link href="https://wa.me/5511999999999" target="_blank">
                  <Button variant="secondary" className="w-full">Agendar Agora</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* CARD 2: TRATAMENTO ATUAL (Última Evolução) */}
        <Card className="border-[#2A5432]/10 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#062214]">
              <FileText className="h-5 w-5 text-[#2A5432]" /> Última Prescrição
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {lastRecord ? (
              <>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-sm text-gray-500">Motivo</span>
                  <span className="font-bold text-[#2A5432]">{lastRecord.title}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-sm text-gray-500">Data</span>
                  <span className="font-medium text-gray-700">
                    {new Date(lastRecord.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                
                {lastRecord.pilar2_fitoterapia && (
                   <div className="bg-green-50 p-3 rounded-md border border-green-100 text-sm">
                      <p className="font-semibold text-[#2A5432] mb-1">Fitoterapia:</p>
                      <p className="text-gray-700 line-clamp-3">{lastRecord.pilar2_fitoterapia}</p>
                   </div>
                )}

                <Link href="/dashboard/prescriptions" className="block">
                  <Button variant="outline" className="w-full mt-2 text-[#2A5432] hover:text-[#76A771] border-[#2A5432]/20">
                    Ver Receita Completa <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </>
            ) : (
              <div className="py-10 text-center text-gray-400 text-sm">
                Ainda não há registros clínicos disponíveis.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Atalhos Rápidos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/dashboard/appointments" className="group">
          <Card className="hover:border-[#76A771] transition-colors cursor-pointer h-full">
            <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-full group-hover:bg-[#76A771] group-hover:text-white transition-colors">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="font-medium text-sm text-center">Histórico de Consultas</span>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/dashboard/prescriptions" className="group">
          <Card className="hover:border-[#76A771] transition-colors cursor-pointer h-full">
            <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
              <div className="p-3 bg-green-50 text-green-600 rounded-full group-hover:bg-[#76A771] group-hover:text-white transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <span className="font-medium text-sm text-center">Minhas Receitas</span>
            </CardContent>
          </Card>
        </Link>

         <Link href="/dashboard/profile" className="group">
          <Card className="hover:border-[#76A771] transition-colors cursor-pointer h-full">
            <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-full group-hover:bg-[#76A771] group-hover:text-white transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <span className="font-medium text-sm text-center">Meus Dados</span>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}