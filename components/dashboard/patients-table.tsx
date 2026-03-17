"use client";

import { useState, useEffect, useCallback } from "react";
import { getPatientsAndLeadsPaginated } from "@/actions/patient";
import { sendRegistrationInvite } from "@/actions/crm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NewAppointmentDialog } from "@/components/dashboard/new-appointment-dialog";
import { EditLeadDialog } from "@/components/dashboard/crm/edit-lead-dialog";
import Link from "next/link";
import { toast } from "sonner";
import {
    Search,
    FileText,
    MoreHorizontal,
    Phone,
    Mail,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Send,
    Loader2,
    UserPlus,
} from "lucide-react";
import { useDebounce } from "use-debounce";

type UnifiedRow = {
    id: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    type: "patient" | "lead";
    lastAppointment: Date | null;
    createdAt: Date;
    leadId: string | null;
    registrationToken: string | null;
};

export function PatientsTable() {
    const [data, setData] = useState<UnifiedRow[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 400);
    const [loading, setLoading] = useState(true);
    const [sendingInvite, setSendingInvite] = useState<string | null>(null);

    const fetchData = useCallback(async (p: number, q: string) => {
        setLoading(true);
        const result = await getPatientsAndLeadsPaginated(p, q);
        setData(result.data);
        setTotalPages(result.totalPages);
        setTotal(result.total);
        setLoading(false);
    }, []);

    useEffect(() => {
        setPage(1);
        fetchData(1, debouncedQuery);
    }, [debouncedQuery, fetchData]);

    useEffect(() => {
        fetchData(page, debouncedQuery);
    }, [page, fetchData, debouncedQuery]);

    const handleInvite = async (leadId: string) => {
        setSendingInvite(leadId);
        const result = await sendRegistrationInvite(leadId);
        if (result.success && result.whatsappUrl) {
            toast.success("Convite gerado! Redirecionando para o WhatsApp...");
            window.open(result.whatsappUrl, "_blank");
            fetchData(page, debouncedQuery);
        } else {
            toast.error(result.message || "Erro ao enviar convite");
        }
        setSendingInvite(null);
    };

    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center bg-[#0A311D]/50 p-4 rounded-xl border border-[#2A5432]/30 backdrop-blur-sm">
                <div className="flex-1 w-full relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-[#76A771] transition-colors" />
                    <Input
                        placeholder="Buscar por nome..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-10 bg-[#062214] border-[#2A5432] text-white placeholder:text-gray-600 focus-visible:ring-[#76A771] h-11 rounded-lg transition-all"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-[#2A5432]/30 overflow-hidden shadow-2xl bg-[#062214]/50 backdrop-blur-md">
                <Table>
                    <TableHeader className="bg-[#0A311D] border-b border-[#2A5432]/50">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="text-gray-400 font-medium">Paciente / Lead</TableHead>
                            <TableHead className="text-gray-400 font-medium">Contato</TableHead>
                            <TableHead className="text-gray-400 font-medium">Tipo</TableHead>
                            <TableHead className="text-gray-400 font-medium">Status / Última Visita</TableHead>
                            <TableHead className="text-right text-gray-400 font-medium pr-6">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center">
                                    <Loader2 className="w-6 h-6 animate-spin text-[#76A771] mx-auto" />
                                </TableCell>
                            </TableRow>
                        ) : data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <Search className="w-8 h-8 opacity-20" />
                                        <p>{query ? "Nenhum resultado encontrado." : "Nenhum paciente ou lead cadastrado."}</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row) => {
                                const hasEmail = row.email && !row.email.includes("@sistema.local");
                                const isLead = row.type === "lead";

                                return (
                                    <TableRow key={row.id} className="border-b border-[#2A5432]/20 hover:bg-[#2A5432]/10 transition-colors group">
                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 border border-[#2A5432]">
                                                    <AvatarFallback className={`font-bold ${isLead ? "bg-blue-950/50 text-blue-400" : "bg-[#0A311D] text-[#76A771]"}`}>
                                                        {row.name.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium text-white group-hover:text-[#76A771] transition-colors">
                                                        {row.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Mail className="w-3 h-3" />
                                                        {hasEmail ? row.email : "Sem email"}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                {row.phone ? (
                                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                                        <Phone className="w-3.5 h-3.5 text-[#76A771]" />
                                                        {row.phone}
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-gray-600 italic">Sem telefone</span>
                                                )}
                                                <span className="text-xs text-gray-600">
                                                    {row.city ? `${row.city} - ${row.state}` : ""}
                                                </span>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            {isLead ? (
                                                <Badge variant="outline" className="bg-blue-950/50 text-blue-400 border-blue-900 text-xs">
                                                    <UserPlus className="w-3 h-3 mr-1" /> Lead
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-[#2A5432]/30 text-emerald-400 border-emerald-900 text-xs">
                                                    Paciente
                                                </Badge>
                                            )}
                                        </TableCell>

                                        <TableCell>
                                            {row.lastAppointment ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="h-2 w-2 rounded-full bg-[#76A771] animate-pulse" />
                                                    <span className="text-sm text-gray-300">
                                                        {new Date(row.lastAppointment).toLocaleDateString("pt-BR")}
                                                    </span>
                                                </div>
                                            ) : isLead ? (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                    Aguardando Cadastro
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-500 border border-gray-500/20">
                                                    Novo Cadastro
                                                </span>
                                            )}
                                        </TableCell>

                                        <TableCell className="text-right pr-6">
                                            <div className="flex items-center justify-end gap-2">
                                                {isLead && row.leadId && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-xs border-blue-900 text-blue-400 hover:bg-blue-950/50 gap-1"
                                                        onClick={() => handleInvite(row.leadId!)}
                                                        disabled={sendingInvite === row.leadId}
                                                    >
                                                        {sendingInvite === row.leadId ? (
                                                            <Loader2 className="w-3 h-3 animate-spin" />
                                                        ) : (
                                                            <Send className="w-3 h-3" />
                                                        )}
                                                        {row.registrationToken ? "Reenviar" : "Enviar Convite"}
                                                    </Button>
                                                )}

                                                {!isLead && (
                                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <NewAppointmentDialog patientId={row.id} />
                                                    </div>
                                                )}

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#2A5432]/50">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="bg-[#0A311D] border-[#2A5432] text-white">
                                                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                        <DropdownMenuSeparator className="bg-[#2A5432]/50" />
                                                        {!isLead && (
                                                            <DropdownMenuItem asChild className="focus:bg-[#2A5432] cursor-pointer">
                                                                <Link href={`/dashboard/records/${row.id}`} className="flex items-center w-full">
                                                                    <FileText className="mr-2 h-4 w-4 text-[#76A771]" /> Abrir Prontuário
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        {!isLead && (
                                                            <DropdownMenuItem asChild className="focus:bg-[#2A5432] cursor-pointer">
                                                                <Link href={`/dashboard/schedule?patient=${row.id}`} className="flex items-center w-full">
                                                                    <Calendar className="mr-2 h-4 w-4 text-[#76A771]" /> Ver Histórico
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        {isLead && row.leadId && (
                                                            <DropdownMenuItem
                                                                className="focus:bg-[#2A5432] cursor-pointer"
                                                                onClick={() => handleInvite(row.leadId!)}
                                                            >
                                                                <Send className="mr-2 h-4 w-4 text-emerald-400" /> Enviar Convite
                                                            </DropdownMenuItem>
                                                        )}
                                                        {isLead && row.leadId && (
                                                            <div className="w-full" onClick={(e) => e.stopPropagation()}>
                                                                <EditLeadDialog
                                                                    lead={{
                                                                        id: row.leadId!,
                                                                        name: row.name,
                                                                        phone: row.phone,
                                                                        email: row.email,
                                                                        source: "", // Patients-table UnifiedRow doesn't have source, we can leave empty or require fetch, but we pass what we have
                                                                        notes: ""   // Same here
                                                                    }}
                                                                    onSuccess={() => fetchData(page, debouncedQuery)}
                                                                />
                                                            </div>
                                                        )}
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

            {/* Pagination */}
            <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                    Mostrando {data.length} de {total} registros
                </span>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-[#2A5432] text-gray-300 hover:text-white hover:bg-[#2A5432]/30"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page <= 1 || loading}
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
                    </Button>
                    <span className="text-gray-400 text-xs px-2">
                        Pág. {page} de {totalPages || 1}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-[#2A5432] text-gray-300 hover:text-white hover:bg-[#2A5432]/30"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page >= totalPages || loading}
                    >
                        Próxima <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
