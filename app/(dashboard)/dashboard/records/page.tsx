import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, FileText, Clock, ChevronRight, Filter, FolderOpen } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const prisma = new PrismaClient();

export default async function RecordsIndexPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  const query = searchParams?.query || "";

  // Busca Otimizada
  const patients = await prisma.patient.findMany({
    where: {
      user: {
        name: { contains: query, mode: 'insensitive' } 
      }
    },
    include: {
      user: true,
      medicalRecords: {
        orderBy: { date: 'desc' },
        take: 1, 
      },
      _count: {
        select: { medicalRecords: true }
      }
    },
    orderBy: { updatedAt: 'desc' }, 
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-[#2A5432]/30 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Prontuários Eletrônicos</h1>
          <p className="text-gray-400 mt-1">
            Histórico clínico e evolução dos pacientes.
          </p>
        </div>
      </div>

      {/* --- BARRA DE BUSCA --- */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-[#0A311D]/50 p-4 rounded-xl border border-[#2A5432]/30 backdrop-blur-sm">
        <form className="flex-1 w-full relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-[#76A771] transition-colors" />
          <Input
            name="query"
            placeholder="Buscar prontuário por nome do paciente..."
            defaultValue={query}
            className="pl-10 bg-[#062214] border-[#2A5432] text-white placeholder:text-gray-600 focus-visible:ring-[#76A771] h-11 rounded-lg transition-all"
          />
        </form>
        <Button variant="outline" className="border-[#2A5432] text-gray-300 hover:text-white hover:bg-[#2A5432]/30 gap-2 h-11 hidden md:flex">
          <Filter className="w-4 h-4" /> Filtros
        </Button>
      </div>

      {/* --- LISTA (TABLE) --- */}
      <div className="rounded-xl border border-[#2A5432]/30 overflow-hidden shadow-2xl bg-[#062214]/50 backdrop-blur-md">
        <Table>
          <TableHeader className="bg-[#0A311D] border-b border-[#2A5432]/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-gray-400 font-medium pl-6">Paciente</TableHead>
              <TableHead className="text-gray-400 font-medium">Última Evolução</TableHead>
              <TableHead className="text-gray-400 font-medium text-center">Registros</TableHead>
              <TableHead className="text-right text-gray-400 font-medium pr-6">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-48 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 rounded-full bg-[#2A5432]/10">
                       <FolderOpen className="w-8 h-8 opacity-40 text-[#76A771]" />
                    </div>
                    <p>Nenhum prontuário encontrado.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              patients.map((patient) => {
                const lastRecord = patient.medicalRecords[0];
                
                return (
                  <TableRow key={patient.id} className="border-b border-[#2A5432]/20 hover:bg-[#2A5432]/10 transition-colors group cursor-pointer">
                    {/* Coluna Paciente */}
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border border-[#2A5432]">
                          <AvatarFallback className="bg-[#0A311D] text-[#76A771] font-bold">
                            {patient.user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white group-hover:text-[#76A771] transition-colors text-base">
                             {patient.user.name}
                          </div>
                          <div className="text-xs text-gray-500 font-mono">ID: {patient.id.slice(-6)}</div>
                        </div>
                      </div>
                    </TableCell>
                    
                    {/* Coluna Última Evolução */}
                    <TableCell>
                      {lastRecord ? (
                        <div className="flex flex-col gap-1">
                          <span className="font-medium text-gray-300">{lastRecord.title}</span>
                          <span className="text-xs text-[#76A771] flex items-center gap-1 bg-[#2A5432]/20 w-fit px-2 py-0.5 rounded border border-[#2A5432]/30">
                            <Clock className="w-3 h-3" />
                            {new Date(lastRecord.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-600 italic flex items-center gap-1">
                           <span className="w-2 h-2 rounded-full bg-gray-600" /> Sem registros
                        </span>
                      )}
                    </TableCell>
                    
                    {/* Coluna Quantidade */}
                    <TableCell className="text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A311D] border border-[#2A5432]/50">
                        <FileText className="w-3 h-3 text-[#76A771]" />
                        <span className="font-bold text-white">{patient._count.medicalRecords}</span>
                      </div>
                    </TableCell>
                    
                    {/* Coluna Ação */}
                    <TableCell className="text-right pr-6">
                      <Link href={`/dashboard/records/${patient.id}`}>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-[#76A771] hover:border-[#76A771] transition-all gap-1">
                          Acessar <ChevronRight className="w-4 h-4" />
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
    </div>
  );
}