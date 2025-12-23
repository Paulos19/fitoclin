import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { NewPatientDialog } from "@/components/dashboard/new-patient-dialog";
import { NewAppointmentDialog } from "@/components/dashboard/new-appointment-dialog";
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
import { 
  Search, 
  FileText, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  Calendar,
  Filter
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const prisma = new PrismaClient();

export default async function PatientsPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  // Parâmetros de busca (URL) - Compatível com Next.js 15+
  // Em versões mais novas do Next, searchParams pode ser uma Promise. 
  // Vou assumir acesso direto por enquanto, mas fique atento.
  const query = searchParams?.query || "";
  
  // Buscar Pacientes no Banco
  const patients = await prisma.patient.findMany({
    where: {
      user: {
        name: { contains: query, mode: 'insensitive' } // 'insensitive' requer Postgres. Se usar SQLite remova.
      }
    },
    include: {
      user: true,
      appointments: {
        orderBy: { date: 'desc' },
        take: 1, // Última consulta para mostrar status
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* --- HEADER DA PÁGINA --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#2A5432]/30 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Base de Pacientes</h1>
          <p className="text-gray-400 mt-1">
            Gerencie prontuários, históricos e dados de contato.
          </p>
        </div>
        <NewPatientDialog />
      </div>

      {/* --- BARRA DE FERRAMENTAS --- */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-[#0A311D]/50 p-4 rounded-xl border border-[#2A5432]/30 backdrop-blur-sm">
        {/* Input de Busca */}
        <form className="flex-1 w-full relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-[#76A771] transition-colors" />
          <Input
            name="query"
            placeholder="Buscar por nome, email ou CPF..."
            defaultValue={query}
            className="pl-10 bg-[#062214] border-[#2A5432] text-white placeholder:text-gray-600 focus-visible:ring-[#76A771] h-11 rounded-lg transition-all"
          />
        </form>
        
        {/* Botão de Filtro (Visual por enquanto) */}
        <Button variant="outline" className="border-[#2A5432] text-gray-300 hover:text-white hover:bg-[#2A5432]/30 gap-2 h-11">
          <Filter className="w-4 h-4" /> Filtros Avançados
        </Button>
      </div>

      {/* --- TABELA DE DADOS --- */}
      <div className="rounded-xl border border-[#2A5432]/30 overflow-hidden shadow-2xl bg-[#062214]/50 backdrop-blur-md">
        <Table>
          <TableHeader className="bg-[#0A311D] border-b border-[#2A5432]/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-gray-400 font-medium">Paciente</TableHead>
              <TableHead className="text-gray-400 font-medium">Contato</TableHead>
              <TableHead className="text-gray-400 font-medium">Status / Última Visita</TableHead>
              <TableHead className="text-right text-gray-400 font-medium pr-6">Ações Rápidas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                     <Search className="w-8 h-8 opacity-20" />
                     <p>Nenhum paciente encontrado com este termo.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              patients.map((patient) => {
                const lastAppointment = patient.appointments[0];
                const hasEmail = !patient.user.email.includes("@sistema.local");

                return (
                  <TableRow key={patient.id} className="border-b border-[#2A5432]/20 hover:bg-[#2A5432]/10 transition-colors group">
                    {/* Coluna 1: Nome e Avatar */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-[#2A5432]">
                          <AvatarFallback className="bg-[#0A311D] text-[#76A771] font-bold">
                            {patient.user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white group-hover:text-[#76A771] transition-colors">
                            {patient.user.name}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                             <Mail className="w-3 h-3" /> 
                             {hasEmail ? patient.user.email : "Cadastro presencial (sem email)"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    
                    {/* Coluna 2: Contato */}
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {patient.phone ? (
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Phone className="w-3.5 h-3.5 text-[#76A771]" />
                            {patient.phone}
                          </div>
                        ) : (
                           <span className="text-xs text-gray-600 italic">Sem telefone</span>
                        )}
                        <span className="text-xs text-gray-600">
                           {patient.city ? `${patient.city} - ${patient.state}` : "Localização não inf."}
                        </span>
                      </div>
                    </TableCell>
                    
                    {/* Coluna 3: Status */}
                    <TableCell>
                      {lastAppointment ? (
                        <div className="flex items-center gap-2">
                           <div className="h-2 w-2 rounded-full bg-[#76A771] animate-pulse" />
                           <span className="text-sm text-gray-300">
                             {new Date(lastAppointment.date).toLocaleDateString('pt-BR')}
                           </span>
                        </div>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-500 border border-gray-500/20">
                          Novo Cadastro
                        </span>
                      )}
                    </TableCell>
                    
                    {/* Coluna 4: Ações */}
                    <TableCell className="text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        {/* Botão de Agendar (Ícone visível para acesso rápido) */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                           <NewAppointmentDialog patientId={patient.id} />
                        </div>

                        {/* Dropdown */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#2A5432]/50">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-[#0A311D] border-[#2A5432] text-white">
                            <DropdownMenuLabel>Ações do Paciente</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-[#2A5432]/50" />
                            
                            <DropdownMenuItem asChild className="focus:bg-[#2A5432] cursor-pointer">
                              <Link href={`/dashboard/records/${patient.id}`} className="flex items-center w-full">
                                <FileText className="mr-2 h-4 w-4 text-[#76A771]" /> Abrir Prontuário
                              </Link>
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem asChild className="focus:bg-[#2A5432] cursor-pointer">
                               <Link href={`/dashboard/schedule?patient=${patient.id}`} className="flex items-center w-full">
                                  <Calendar className="mr-2 h-4 w-4 text-[#76A771]" /> Ver Histórico
                               </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação simples (se houver muitos dados futuramente) */}
      <div className="flex justify-center text-xs text-gray-600">
         Mostrando {patients.length} pacientes
      </div>
    </div>
  );
}