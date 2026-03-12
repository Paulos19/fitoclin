"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Phone,
  CalendarCheck,
  UserPlus,
  XCircle,
  MessageCircle,
  Loader2,
  ArrowRight,
  RefreshCw,
  Send,
  FileText,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { updateLeadStatus, getLeadsPaginated, triggerPostConsultationManual, getPatientByLead, sendRegistrationInvite } from "@/actions/crm";
import { cn } from "@/lib/utils";
import { NewAppointmentDialog } from "@/components/dashboard/new-appointment-dialog";

// --- TIPOS ---
type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  status: string;
  source: string;
  notes: string | null;
  createdAt: Date;
  // Precisamos saber se o paciente já foi criado para gerar o link do prontuário.
  // Assumindo que o backend retorna patientId se existir, ou faremos uma busca.
  // Para simplificar, o link irá para a busca de pacientes com o nome.
};

// Configuração de cores
const STATUS_CONFIG: Record<string, { label: string; color: string; bgHeader: string; border: string; icon: any }> = {
  NEW: {
    label: "Novos",
    color: "text-blue-400",
    bgHeader: "bg-blue-950/40",
    border: "border-blue-800/50",
    icon: UserPlus
  },
  CONTACTED: {
    label: "Em Contato",
    color: "text-yellow-400",
    bgHeader: "bg-yellow-950/40",
    border: "border-yellow-800/50",
    icon: Phone
  },
  SCHEDULED: {
    label: "Agendados",
    color: "text-purple-400",
    bgHeader: "bg-purple-950/40",
    border: "border-purple-800/50",
    icon: CalendarCheck
  },
  WON: {
    label: "Virou Paciente",
    color: "text-[#76A771]",
    bgHeader: "bg-[#2A5432]/40",
    border: "border-[#76A771]/50",
    icon: UserPlus
  },
  // Estados de Pós-Consulta (Visualmente ficam na coluna WON ou numa separada, aqui trataremos dentro de WON)
  POS_CONSULTA: { label: "Pós-Consulta", color: "text-emerald-400", bgHeader: "", border: "", icon: MessageCircle },
  POS_CONSULTA_ENVIADO: { label: "Enviado", color: "text-emerald-400", bgHeader: "", border: "", icon: MessageCircle },
  LOST: {
    label: "Perdido",
    color: "text-red-400",
    bgHeader: "bg-red-950/40",
    border: "border-red-900/50",
    icon: XCircle
  },
};

// --- 1. COMPONENTE DO CARD (LeadCard) ---
const LeadCard = ({ lead, statusKey, onMove, onRefresh }: { lead: Lead, statusKey: string, onMove: (id: string, newStatus: string) => void, onRefresh: () => void }) => {
  const [isSending, setIsSending] = useState(false);

  // Verifica se está em fase de pós-consulta
  const isPostConsultationStarted = lead.status === 'POS_CONSULTA' || lead.status === 'POS_CONSULTA_ENVIADO';

  const openWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanPhone = lead.phone.replace(/\D/g, '');
    const fullPhone = cleanPhone.length <= 11 ? `55${cleanPhone}` : cleanPhone;
    const message = encodeURIComponent(`Olá ${lead.name}, tudo bem? Sou da Clínica Fitoclin.`);
    window.open(`https://wa.me/${fullPhone}?text=${message}`, '_blank');
  };

  const handlePostConsultation = async () => {
    setIsSending(true);
    try {
      const res = await triggerPostConsultationManual(lead.id);
      if (res.success) {
        toast.success("Pós-Consulta iniciada!");
        onRefresh(); // Atualiza a lista para refletir a mudança de status
      } else {
        toast.error("Erro ao iniciar.");
      }
    } catch (error) {
      toast.error("Erro de conexão.");
    } finally {
      setIsSending(false);
    }
  };

  const [resolvedPatientId, setResolvedPatientId] = useState<string | undefined>(undefined);

  const handleOpenAppointment = async () => {
    if (resolvedPatientId === undefined) {
      const pId = await getPatientByLead(lead.id);
      setResolvedPatientId(pId || ""); // Use empty string if not found to avoid re-fetching
    }
  };

  return (
    <div className="group relative bg-[#0A311D] rounded-xl border border-[#2A5432]/50 hover:border-[#76A771] shadow-sm hover:shadow-[0_0_15px_-5px_rgba(118,167,113,0.3)] transition-all duration-300 p-4 flex flex-col gap-3">
      {/* Header do Card */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <Avatar className="h-9 w-9 border border-[#2A5432]">
            <AvatarFallback className="bg-[#051F12] text-[#76A771] text-xs font-bold">
              {lead.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <span className="font-semibold text-sm text-[#F1F1F1] truncate" title={lead.name}>
              {lead.name}
            </span>
            <div className="flex items-center gap-2 text-[10px] text-[#F1F1F1]/60">
              <span>{new Date(lead.createdAt).toLocaleDateString()}</span>

              {/* Badge extra se já iniciou pós consulta */}
              {isPostConsultationStarted && (
                <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/50 px-1.5 rounded border border-emerald-900">
                  <CheckCircle2 className="w-3 h-3" /> Pós-Consulta
                </span>
              )}
            </div>
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 text-[#76A771] hover:bg-[#76A771]/20 hover:text-white transition-all"
          onClick={openWhatsApp}
          title="Chamar no WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </Button>
      </div>

      {/* Infos */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#F1F1F1]/80 bg-[#062214] px-2 py-1.5 rounded-md border border-[#2A5432]/30">
          <Phone className="w-3 h-3 text-[#76A771]" />
          {lead.phone}
        </div>
        {lead.notes && (
          <div className="text-[11px] text-[#F1F1F1]/70 bg-[#2A5432]/10 p-2 rounded-md border border-[#2A5432]/30 italic line-clamp-2">
            "{lead.notes}"
          </div>
        )}
      </div>

      {/* Botão Enviar Convite — visível se não é WON */}
      {statusKey !== 'WON' && !isPostConsultationStarted && (
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs border-blue-900 text-blue-400 hover:bg-blue-950/50 gap-1"
          onClick={async (e) => {
            e.stopPropagation();
            const res = await sendRegistrationInvite(lead.id);
            if (res.success && res.whatsappUrl) {
              toast.success("Convite gerado!");
              window.open(res.whatsappUrl, "_blank");
            } else {
              toast.error(res.message || "Erro");
            }
          }}
        >
          <Send className="w-3 h-3" /> Enviar Convite
        </Button>
      )}

      {/* Ações */}
      <div className="pt-3 mt-1 border-t border-[#2A5432]/30 flex items-center justify-between gap-2">

        {/* === LÓGICA DA COLUNA WON E PÓS-CONSULTA === */}
        {(statusKey === 'WON' || isPostConsultationStarted) ? (
          <div className="w-full space-y-2">

            {/* Se ainda NÃO iniciou (Status WON puro) */}
            {!isPostConsultationStarted && (
              <Button
                size="sm"
                className="w-full text-xs h-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-0 shadow-lg shadow-emerald-900/20 transition-all"
                onClick={handlePostConsultation}
                disabled={isSending}
              >
                {isSending ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Send className="w-3 h-3 mr-2" />}
                {isSending ? "Iniciando..." : "Iniciar Pós-Consulta"}
              </Button>
            )}

            {/* Se JÁ iniciou (POS_CONSULTA ou ENVIADO) */}
            {isPostConsultationStarted && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs border-emerald-800 text-emerald-500 bg-emerald-950/30 cursor-default hover:bg-emerald-950/30">
                  <CheckCircle2 className="w-3 h-3 mr-2" /> Iniciada
                </Button>
                <Link href={`/dashboard/records?query=${encodeURIComponent(lead.name)}`} className="flex-1">
                  <Button size="sm" variant="secondary" className="w-full text-xs bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a]">
                    <FileText className="w-3 h-3 mr-2" /> Prontuário
                  </Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          // === LÓGICA PADRÃO PARA OUTRAS COLUNAS ===
          <>
            {(['NEW', 'CONTACTED', 'SCHEDULED'].includes(statusKey)) ? (
              <div className="flex-1">
                <NewAppointmentDialog
                  patientId={resolvedPatientId || undefined}
                  trigger={
                    <Button
                      variant="ghost"
                      onClick={handleOpenAppointment}
                      className="w-full text-xs flex items-center justify-center gap-1.5 py-1.5 h-auto rounded-md bg-[#2A5432]/40 text-[#76A771] hover:bg-[#76A771] hover:text-[#062214] border border-[#2A5432] transition-all font-medium"
                    >
                      <CalendarCheck className="w-3.5 h-3.5" /> Agendar
                    </Button>
                  }
                />
              </div>
            ) : <div className="flex-1"></div>}

            <div className="ml-auto">
              {statusKey === 'NEW' && (
                <Button size="sm" variant="ghost" className="text-xs h-7 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30" onClick={() => onMove(lead.id, 'CONTACTED')}>
                  Contatar <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              )}
              {statusKey === 'CONTACTED' && (
                <Button size="sm" variant="ghost" className="text-xs h-7 text-purple-400 hover:text-purple-300 hover:bg-purple-900/30" onClick={() => onMove(lead.id, 'SCHEDULED')}>
                  Agendou <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              )}
              {statusKey === 'SCHEDULED' && (
                <Button size="sm" variant="ghost" className="text-xs h-7 text-[#76A771] hover:text-[#A4D49E] hover:bg-[#2A5432]/30" onClick={() => onMove(lead.id, 'WON')}>
                  Virou Paciente <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// --- 2. COMPONENTE DA COLUNA ---
const KanbanColumn = ({ statusKey, refreshTrigger, onLeadMoved }: { statusKey: string, refreshTrigger: number, onLeadMoved: (id: string, from: string, to: string) => void }) => {
  const config = STATUS_CONFIG[statusKey] || STATUS_CONFIG['WON']; // Fallback
  const [leads, setLeads] = useState<Lead[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchLeads = useCallback(async (pageNum: number, shouldReset = false) => {
    if (loading) return;
    setLoading(true);

    // Se a coluna for WON, queremos buscar também os POS_CONSULTA para exibir nela
    const res = await getLeadsPaginated(statusKey, pageNum);

    if (res.success && res.data) {
      setLeads(prev => {
        if (shouldReset) return res.data;

        // Evita duplicatas se a mesma página for carregada duas vezes ou houver overlap
        const existingIds = new Set(prev.map(l => l.id));
        const newLeads = res.data.filter(l => !existingIds.has(l.id));
        return [...prev, ...newLeads];
      });
      setHasMore(res.data.length === 10);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  }, [statusKey]);

  useEffect(() => { fetchLeads(1, true); }, []);

  useEffect(() => {
    if (refreshTrigger > 0) {
      setPage(1);
      setHasMore(true);
      fetchLeads(1, true);
    }
  }, [refreshTrigger, fetchLeads]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50 && hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchLeads(nextPage);
    }
  };

  const handleMove = async (id: string, newStatus: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    const res = await updateLeadStatus(id, newStatus);
    if (res.success) {
      toast.success("Atualizado");
      onLeadMoved(id, statusKey, newStatus);
    } else {
      toast.error("Erro");
      fetchLeads(1, true);
    }
  };

  return (
    <div className="flex flex-col h-full min-w-[300px] max-w-[300px] rounded-xl bg-[#062214] border border-[#2A5432]/30 shadow-lg overflow-hidden">
      <div className={cn("p-3 border-b border-[#2A5432]/30 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md", config.bgHeader)}>
        <div className="flex items-center gap-2">
          <div className={cn("p-1.5 rounded-md bg-[#062214]/50 border border-white/5", config.color)}>
            <config.icon className="w-4 h-4" />
          </div>
          <span className={cn("font-bold text-xs uppercase tracking-widest", config.color)}>
            {config.label}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6 text-[#F1F1F1]/50 hover:text-[#F1F1F1]" onClick={() => fetchLeads(1, true)}>
            <RefreshCw className={cn("w-3 h-3", loading && "animate-spin")} />
          </Button>
          <Badge variant="outline" className="bg-[#062214] text-[#F1F1F1]/70 border-[#2A5432]/50 text-[10px] h-5">
            {leads.length}{hasMore ? '+' : ''}
          </Badge>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar" onScroll={handleScroll} ref={scrollRef}>
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            statusKey={statusKey}
            onMove={handleMove}
            onRefresh={() => fetchLeads(1, true)} // Passa função de refresh
          />
        ))}
        {leads.length === 0 && !loading && (
          <div className="h-32 flex flex-col items-center justify-center text-[#F1F1F1]/20 border-2 border-dashed border-[#2A5432]/30 rounded-xl">
            <UserPlus className="w-8 h-8 mb-2 opacity-20" />
            <span className="text-xs">Vazio</span>
          </div>
        )}
        {loading && <div className="py-4 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-[#76A771]" /></div>}
      </div>
    </div>
  );
};

// --- 3. COMPONENTE PAI ---
export function KanbanBoard() {
  const COLUMNS = ["NEW", "CONTACTED", "SCHEDULED", "WON"];
  const [refreshTriggers, setRefreshTriggers] = useState<Record<string, number>>({
    NEW: 0, CONTACTED: 0, SCHEDULED: 0, WON: 0, LOST: 0
  });

  const handleLeadMoved = (id: string, from: string, to: string) => {
    setRefreshTriggers(prev => ({ ...prev, [to]: (prev[to] || 0) + 1 }));
  };

  return (
    <div className="h-[calc(100vh-140px)] w-full overflow-x-auto pb-2 custom-scrollbar">
      <div className="flex h-full gap-4 px-1 min-w-max">
        {COLUMNS.map((status) => (
          <KanbanColumn
            key={status}
            statusKey={status}
            refreshTrigger={refreshTriggers[status]}
            onLeadMoved={handleLeadMoved}
          />
        ))}
      </div>
    </div>
  );
}