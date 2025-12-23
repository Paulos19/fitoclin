import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const prisma = new PrismaClient();

export default async function MyAppointmentsPage() {
  const session = await auth();
  if (!session || session.user.role !== "PATIENT") redirect("/dashboard");

  // Buscar paciente
  const patient = await prisma.patient.findUnique({
    where: { userId: session.user.id }
  });

  if (!patient) return <div>Perfil de paciente não encontrado.</div>;

  const appointments = await prisma.appointment.findMany({
    where: { patientId: patient.id },
    orderBy: { date: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#062214]">Minhas Consultas</h1>
        <p className="text-gray-500">Histórico e agendamentos futuros.</p>
      </div>

      <div className="space-y-4">
        {appointments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              Você ainda não tem consultas agendadas.
            </CardContent>
          </Card>
        ) : (
          appointments.map((apt) => {
            const isFuture = new Date(apt.date) > new Date();
            
            return (
              <Card key={apt.id} className={`border-l-4 ${isFuture ? 'border-l-[#76A771]' : 'border-l-gray-300'}`}>
                <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex gap-4">
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center text-lg font-bold ${
                      isFuture ? 'bg-[#76A771]/10 text-[#2A5432]' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {new Date(apt.date).getDate()}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#062214]">
                        {isFuture ? "Consulta Agendada" : "Consulta Realizada"}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" /> 
                          {new Date(apt.date).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> 
                          {new Date(apt.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {isFuture && apt.meetLink && (
                    <a href={apt.meetLink} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-[#76A771] hover:bg-[#5e8a5a] text-[#062214]">
                        <Video className="w-4 h-4 mr-2" /> Acessar Sala
                      </Button>
                    </a>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}