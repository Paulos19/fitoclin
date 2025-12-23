import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { ScheduleSettingsForm } from "@/components/dashboard/schedule-settings-form";

const prisma = new PrismaClient();

export default async function SchedulePage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  // Buscar configurações atuais
  const schedules = await prisma.doctorSchedule.findMany({
    where: { userId: session.user.id },
    orderBy: { dayOfWeek: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#062214]">Configuração da Agenda</h1>
        <p className="text-gray-500">Defina seus dias e horários de atendimento padrão.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <Card>
             <CardHeader>
               <CardTitle className="flex items-center gap-2">
                 <Clock className="w-5 h-5 text-[#76A771]" /> Disponibilidade Semanal
               </CardTitle>
             </CardHeader>
             <CardContent>
               <ScheduleSettingsForm initialData={schedules} />
             </CardContent>
           </Card>
        </div>
        
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
             <strong>Nota sobre Fuso Horário:</strong><br/>
             O sistema está configurado para o Horário de Brasília (GMT-3). Todos os agendamentos respeitarão essa configuração.
          </div>
        </div>
      </div>
    </div>
  );
}