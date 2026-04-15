import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, Globe, Info, CalendarCheck } from "lucide-react";
import { ScheduleSettingsForm } from "@/components/dashboard/schedule-settings-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function SchedulePage() {
  const session = await auth();
  if (!session) redirect("/login");

  // 1. Verificação de Role
  // 👇 ATUALIZADO: Inclui SECRETARY
  const isAllowed = session.user.role === "ADMIN" || session.user.role === "PROFESSIONAL" || session.user.role === "SECRETARY";

  if (!isAllowed) {
    redirect("/dashboard");
  }

  // 2. Buscar configurações do Usuário
  // Se for Secretária, a Server Action "saveScheduleSettings" já cuida de salvar para o Admin correto.
  // Aqui buscamos a configuração "visual" que ela vai editar.
  // Nota: Se a secretária tiver que ver a agenda do ADMIN, talvez precise buscar pelo ID do admin aqui.
  // Por enquanto, vou manter 'session.user.id' para consistência, mas se ela for editar a do Admin,
  // o form vai salvar corretamente, mas ela pode ver "vazio" inicialmente se não for o mesmo ID.
  // *Recomendação*: Se a secretária edita a agenda da Dra, precisamos buscar o ID da Dra aqui.

  let targetUserId = session.user.id;

  if (session.user.role === "SECRETARY") {
    const admin = await db.user.findFirst({
      where: { role: "ADMIN" },
      orderBy: { createdAt: "asc" }
    });
    if (admin) targetUserId = admin.id;
  }

  const schedules = await db.doctorSchedule.findMany({
    where: { userId: targetUserId },
    orderBy: { dayOfWeek: 'asc' }
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-[#2A5432]/30 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Configuração da Agenda</h1>
          <p className="text-gray-400 mt-1">
            Defina seus dias de atendimento. Pacientes só poderão agendar dentro destas janelas.
          </p>
        </div>

        <Link href="/dashboard/appointments">
          <Button variant="outline" className="border-[#76A771] text-[#76A771] hover:bg-[#76A771] hover:text-[#062214]">
            <CalendarCheck className="w-4 h-4 mr-2" /> Ver Meus Agendamentos
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#062214]/50 border-[#2A5432]/50 backdrop-blur-sm shadow-xl">
            <CardHeader className="border-b border-[#2A5432]/30 pb-4">
              <CardTitle className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-[#76A771]" /> Disponibilidade Semanal
              </CardTitle>
              <CardDescription className="text-gray-400">
                Ative os dias e defina os horários de início e fim dos turnos.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ScheduleSettingsForm initialData={schedules} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#0A311D] border-[#2A5432]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-base">
                <Globe className="w-4 h-4 text-[#3C78B4]" /> Fuso Horário
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300 space-y-2">
              <p>
                O sistema opera oficialmente no <strong>Horário de Brasília (GMT-3)</strong>.
              </p>
              <div className="p-3 rounded bg-[#062214] border border-[#2A5432]/50 text-xs text-gray-400">
                Se você estiver viajando, lembre-se que as notificações para os pacientes continuarão no horário do Brasil.
              </div>
            </CardContent>
          </Card>

          <Alert className="bg-[#76A771]/10 border-[#76A771]/30 text-[#76A771]">
            <Info className="h-4 w-4 stroke-[#76A771]" />
            <AlertTitle>Dica de Produtividade</AlertTitle>
            <AlertDescription className="text-[#76A771]/80 mt-1 text-xs">
              Mantenha pelo menos 1 dia da semana bloqueado para estudos de caso e análise de exames (Backoffice).
            </AlertDescription>
          </Alert>

        </div>
      </div>
    </div>
  );
}