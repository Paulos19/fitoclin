import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { NewPatientDialog } from "@/components/dashboard/new-patient-dialog";
import { NewAppointmentDialog } from "@/components/dashboard/new-appointment-dialog"; // Reutilizando!
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText, MoreHorizontal, Phone, Mail } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function PatientsPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  // Filtro de busca simples (Server Side)
  const query = searchParams?.query || "";
  
  const patients = await prisma.patient.findMany({
    where: {
      user: {
        name: { contains: query} // No SQLite 'mode: insensitive' pode não funcionar dependendo da versão, mas em Postgres funcionaria
      }
    },
    include: {
      user: true,
      appointments: {
        orderBy: { date: 'desc' },
        take: 1, // Pega a última consulta
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      {/* Header e Ações */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#062214]">Pacientes</h1>
          <p className="text-gray-500">Gerencie os prontuários e cadastros.</p>
        </div>
        <NewPatientDialog />
      </div>

      {/* Barra de Busca */}
      <Card>
        <CardContent className="p-4">
          <form className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                name="query"
                placeholder="Buscar por nome..."
                defaultValue={query}
                className="pl-9 bg-gray-50 border-gray-200"
              />
            </div>
            <Button type="submit" variant="secondary">Filtrar</Button>
          </form>
        </CardContent>
      </Card>

      {/* Tabela de Pacientes */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Nome / Email</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Última Consulta</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                  Nenhum paciente encontrado.
                </TableCell>
              </TableRow>
            ) : (
              patients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-gray-50/50">
                  <TableCell>
                    <div className="font-medium text-[#062214]">{patient.user.name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                       <Mail className="w-3 h-3" /> {patient.user.email.includes("@sistema.local") ? "Sem email" : patient.user.email}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-[#76A771]" />
                      {patient.phone || "-"}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    {patient.appointments[0] ? (
                      <span className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-100">
                        {new Date(patient.appointments[0].date).toLocaleDateString('pt-BR')}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Nunca consultou</span>
                    )}
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Botão Rápido de Agendar */}
                      <div className="scale-90">
                         <NewAppointmentDialog patientId={patient.id} />
                      </div>

                      {/* Menu de Ações Extras */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/records/${patient.id}`} className="flex items-center cursor-pointer">
                              <FileText className="mr-2 h-4 w-4" /> Ver Prontuário
                            </Link>
                          </DropdownMenuItem>
                          {/* Futuro: Editar, Excluir, etc */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}