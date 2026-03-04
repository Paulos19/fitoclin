"use client";

import { useState, useEffect, useCallback } from "react";
import { getLeadsFiltered, sendRegistrationInvite } from "@/actions/crm";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
    Search,
    Phone,
    Mail,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Send,
    MessageCircle,
} from "lucide-react";
import { useDebounce } from "use-debounce";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
    NEW: { label: "Novo", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    CONTACTED: { label: "Em Contato", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    SCHEDULED: { label: "Agendado", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    WON: { label: "Paciente", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    POS_CONSULTA: { label: "Pós-Consulta", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    POS_CONSULTA_ENVIADO: { label: "Pós-Enviado", color: "bg-teal-500/20 text-teal-400 border-teal-500/30" },
    LOST: { label: "Perdido", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

type Lead = {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    source: string;
    status: string;
    notes: string | null;
    createdAt: Date;
    registrationToken: string | null;
};

export function LeadsList() {
    const [data, setData] = useState<Lead[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [debouncedQuery] = useDebounce(query, 400);
    const [loading, setLoading] = useState(true);
    const [sendingInvite, setSendingInvite] = useState<string | null>(null);

    const fetchData = useCallback(async (p: number, q: string, s: string) => {
        setLoading(true);
        const result = await getLeadsFiltered(p, q, s);
        setData(result.data);
        setTotalPages(result.totalPages);
        setTotal(result.total);
        setLoading(false);
    }, []);

    useEffect(() => {
        setPage(1);
        fetchData(1, debouncedQuery, statusFilter);
    }, [debouncedQuery, statusFilter, fetchData]);

    useEffect(() => {
        fetchData(page, debouncedQuery, statusFilter);
    }, [page]);

    const handleInvite = async (leadId: string) => {
        setSendingInvite(leadId);
        const result = await sendRegistrationInvite(leadId);
        if (result.success && result.whatsappUrl) {
            toast.success("Convite gerado!");
            window.open(result.whatsappUrl, "_blank");
            fetchData(page, debouncedQuery, statusFilter);
        } else {
            toast.error(result.message || "Erro ao enviar convite");
        }
        setSendingInvite(null);
    };

    const openWhatsApp = (lead: Lead) => {
        const cleanPhone = lead.phone.replace(/\D/g, "");
        const fullPhone = cleanPhone.length <= 11 ? `55${cleanPhone}` : cleanPhone;
        const message = encodeURIComponent(`Olá ${lead.name}, tudo bem? Sou da Clínica Fitoclin.`);
        window.open(`https://wa.me/${fullPhone}?text=${message}`, "_blank");
    };

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3 items-center bg-[#0A311D]/50 p-4 rounded-xl border border-[#2A5432]/30 backdrop-blur-sm">
                <div className="flex-1 w-full relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-[#76A771] transition-colors" />
                    <Input
                        placeholder="Buscar por nome..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-10 bg-[#062214] border-[#2A5432] text-white placeholder:text-gray-600 focus-visible:ring-[#76A771] h-10 rounded-lg"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px] bg-[#062214] border-[#2A5432] text-white h-10">
                        <SelectValue placeholder="Filtrar status" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0A311D] border-[#2A5432] text-white">
                        <SelectItem value="ALL">Todos os Status</SelectItem>
                        <SelectItem value="NEW">Novos</SelectItem>
                        <SelectItem value="CONTACTED">Em Contato</SelectItem>
                        <SelectItem value="SCHEDULED">Agendados</SelectItem>
                        <SelectItem value="WON">Pacientes (WON)</SelectItem>
                        <SelectItem value="LOST">Perdidos</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-[#2A5432]/30 overflow-hidden shadow-2xl bg-[#062214]/50 backdrop-blur-md">
                <Table>
                    <TableHeader className="bg-[#0A311D] border-b border-[#2A5432]/50">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="text-gray-400 font-medium">Lead</TableHead>
                            <TableHead className="text-gray-400 font-medium">Contato</TableHead>
                            <TableHead className="text-gray-400 font-medium">Origem</TableHead>
                            <TableHead className="text-gray-400 font-medium">Status</TableHead>
                            <TableHead className="text-gray-400 font-medium">Data</TableHead>
                            <TableHead className="text-right text-gray-400 font-medium pr-6">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center">
                                    <Loader2 className="w-6 h-6 animate-spin text-[#76A771] mx-auto" />
                                </TableCell>
                            </TableRow>
                        ) : data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <Search className="w-8 h-8 opacity-20" />
                                        <p>{query || statusFilter !== "ALL" ? "Nenhum lead encontrado com esses filtros." : "Nenhum lead cadastrado."}</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((lead) => {
                                const statusInfo = STATUS_LABELS[lead.status] || STATUS_LABELS.NEW;

                                return (
                                    <TableRow key={lead.id} className="border-b border-[#2A5432]/20 hover:bg-[#2A5432]/10 transition-colors group">
                                        <TableCell className="py-3">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 border border-[#2A5432]">
                                                    <AvatarFallback className="bg-[#0A311D] text-[#76A771] text-xs font-bold">
                                                        {lead.name.substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium text-white text-sm group-hover:text-[#76A771] transition-colors">
                                                        {lead.name}
                                                    </div>
                                                    {lead.notes && (
                                                        <div className="text-[10px] text-gray-500 truncate max-w-[200px]" title={lead.notes}>
                                                            {lead.notes}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-300">
                                                    <Phone className="w-3 h-3 text-[#76A771]" />
                                                    {lead.phone}
                                                </div>
                                                {lead.email && (
                                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                                                        <Mail className="w-3 h-3" />
                                                        {lead.email}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <span className="text-xs text-gray-400">{lead.source}</span>
                                        </TableCell>

                                        <TableCell>
                                            <Badge variant="outline" className={`text-[10px] ${statusInfo.color}`}>
                                                {statusInfo.label}
                                            </Badge>
                                        </TableCell>

                                        <TableCell>
                                            <span className="text-xs text-gray-500">
                                                {new Date(lead.createdAt).toLocaleDateString("pt-BR")}
                                            </span>
                                        </TableCell>

                                        <TableCell className="text-right pr-6">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-[#76A771] hover:bg-[#76A771]/20"
                                                    onClick={() => openWhatsApp(lead)}
                                                    title="WhatsApp"
                                                >
                                                    <MessageCircle className="w-3.5 h-3.5" />
                                                </Button>
                                                {lead.status !== "WON" && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-[10px] h-7 border-blue-900 text-blue-400 hover:bg-blue-950/50 gap-1 px-2"
                                                        onClick={() => handleInvite(lead.id)}
                                                        disabled={sendingInvite === lead.id}
                                                    >
                                                        {sendingInvite === lead.id ? (
                                                            <Loader2 className="w-3 h-3 animate-spin" />
                                                        ) : (
                                                            <Send className="w-3 h-3" />
                                                        )}
                                                        {lead.registrationToken ? "Reenviar" : "Convite"}
                                                    </Button>
                                                )}
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
                <span>Mostrando {data.length} de {total} leads</span>
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
