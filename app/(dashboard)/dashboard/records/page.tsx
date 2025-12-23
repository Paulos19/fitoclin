import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText, Clock, ChevronRight, User } from "lucide-react";

const prisma = new PrismaClient();

export default async function RecordsIndexPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  const query = searchParams?.query || "";

  // Busca pacientes ordenados pela atualização mais recente (seja do cadastro ou prontuário)
  // Incluímos a última evolução para mostrar na tabela
  const patients = await prisma.patient.findMany({
    where: {
      user: {
        name: { contains: query } // Filtro por nome
      }
    },
    include: {
      user: true,
      medicalRecords: {
        orderBy: { date: 'desc' },
        take: 1, // Pega só a última evolução para exibir "Último registro"
      },
      _count: {
        select: { medicalRecords: true } // Contagem total de evoluções
      }
    },
    // Ordenar: Quem teve registro médico mais recente aparece primeiro
    // (Lógica simplificada: ordenando por update do paciente, mas idealmente seria max(record.date))
    orderBy: { updatedAt: 'desc' }, 
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#062214]">Prontuários Eletrônicos</h1>
          <p className="text-gray-500">Acesse e gerencie o histórico clínico dos pacientes.</p>
        </div>
      </div>

      {/* Busca */}
      <Card className="border-none shadow-sm bg-white">
        <CardContent className="p-6">
          <form className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                name="query"
                placeholder="Buscar paciente por nome..."
                defaultValue={query}
                className="pl-10 bg-gray-50 border-gray-200 h-10 focus:ring-[#76A771] focus:border-[#76A771]"
              />
            </div>
            <Button type="submit" className="btn-gradient">Buscar</Button>
          </form>
        </CardContent>
      </Card>

      {/* Lista de Prontuários */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-[300px]">Paciente</TableHead>
              <TableHead>Última Evolução</TableHead>
              <TableHead>Registros</TableHead>
              <TableHead className="text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="w-8 h-8 text-gray-300" />
                    <p>Nenhum prontuário encontrado.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              patients.map((patient) => {
                const lastRecord = patient.medicalRecords[0];
                
                return (
                  <TableRow key={patient.id} className="group hover:bg-gray-50/50 transition-colors">
                    {/* Coluna Paciente */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#2A5432]/10 flex items-center justify-center text-[#2A5432] font-bold group-hover:bg-[#2A5432] group-hover:text-white transition-colors">
                          {patient.user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-[#062214]">{patient.user.name}</div>
                          <div className="text-xs text-gray-500">Cod: {patient.id.slice(-6)}</div>
                        </div>
                      </div>
                    </TableCell>
                    
                    {/* Coluna Última Evolução */}
                    <TableCell>
                      {lastRecord ? (
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-700">{lastRecord.title}</span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(lastRecord.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 italic">Sem registros ainda</span>
                      )}
                    </TableCell>
                    
                    {/* Coluna Quantidade */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#76A771]" />
                        <span className="font-medium text-gray-700">{patient._count.medicalRecords}</span>
                        <span className="text-xs text-gray-400">evoluções</span>
                      </div>
                    </TableCell>
                    
                    {/* Coluna Ação */}
                    <TableCell className="text-right">
                      <Link href={`/dashboard/records/${patient.id}`}>
                        <Button variant="outline" size="sm" className="hover:border-[#76A771] hover:text-[#2A5432] gap-1 group-hover:bg-[#76A771] group-hover:text-white group-hover:border-[#76A771] transition-all">
                          Abrir Prontuário <ChevronRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dica Visual */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-[#2A5432]/5 border-[#2A5432]/10">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
             <div className="p-2 bg-[#2A5432]/10 rounded-full text-[#2A5432]"><User className="w-4 h-4" /></div>
             <CardTitle className="text-sm font-medium text-gray-600">Total de Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#062214]">{patients.length}</div>
          </CardContent>
        </Card>
        
        {/* Outros cards de estatísticas poderiam entrar aqui futuramente */}
      </div>
    </div>
  );
}