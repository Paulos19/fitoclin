"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { updateLeadStatus } from "@/actions/crm";
import { toast } from "sonner";
import { Phone, Mail, CalendarCheck, UserPlus, XCircle } from "lucide-react";

// Tipagem básica do Lead vinda do Prisma
type Lead = {
  id: string;
  name: string;
  phone: string;
  status: string;
  source: string;
  notes: string | null;
  createdAt: Date;
};

// Mapa de Cores e Ícones por Status
const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  NEW: { label: "Novos", color: "bg-blue-100 text-blue-800", icon: UserPlus },
  CONTACTED: { label: "Em Contato", color: "bg-yellow-100 text-yellow-800", icon: Phone },
  SCHEDULED: { label: "Agendados", color: "bg-purple-100 text-purple-800", icon: CalendarCheck },
  WON: { label: "Virou Paciente", color: "bg-green-100 text-green-800", icon: UserPlus }, // Sucesso
  LOST: { label: "Perdido", color: "bg-gray-100 text-gray-800", icon: XCircle },
};

export function KanbanBoard({ leads }: { leads: Lead[] }) {
  
  async function handleMove(id: string, newStatus: string) {
    const res = await updateLeadStatus(id, newStatus);
    if (res.success) toast.success("Lead movido!");
    else toast.error("Erro ao mover.");
  }

  // Colunas que queremos exibir (excluímos LOST para não poluir, ou deixamos no fim)
  const COLUMNS = ["NEW", "CONTACTED", "SCHEDULED", "WON"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-200px)] overflow-x-auto">
      {COLUMNS.map((statusKey) => {
        const config = STATUS_CONFIG[statusKey];
        const columnLeads = leads.filter((l) => l.status === statusKey);

        return (
          <div key={statusKey} className="flex flex-col gap-4 bg-muted/30 p-4 rounded-xl min-w-[280px]">
            {/* Cabeçalho da Coluna */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-muted-foreground uppercase">
                    <config.icon className="w-4 h-4" />
                    {config.label}
                </div>
                <Badge variant="secondary">{columnLeads.length}</Badge>
            </div>

            {/* Lista de Cards */}
            <div className="flex flex-col gap-3 overflow-y-auto">
              {columnLeads.map((lead) => (
                <Card key={lead.id} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex justify-between items-start">
                        <span className="font-semibold truncate">{lead.name}</span>
                        <Badge variant="outline" className="text-[10px]">{lead.source}</Badge>
                    </div>
                    
                    <div className="text-xs text-muted-foreground flex flex-col gap-1">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> {lead.phone}</span>
                        {lead.notes && <span className="italic">"{lead.notes}"</span>}
                    </div>

                    {/* Botões de Ação Rápida (Mover para prox etapa) */}
                    <div className="pt-2 flex gap-1 justify-end">
                        {statusKey === 'NEW' && (
                             <button onClick={() => handleMove(lead.id, 'CONTACTED')} className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">Contatado →</button>
                        )}
                        {statusKey === 'CONTACTED' && (
                             <button onClick={() => handleMove(lead.id, 'SCHEDULED')} className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700">Agendou →</button>
                        )}
                        {statusKey === 'SCHEDULED' && (
                             <button onClick={() => handleMove(lead.id, 'WON')} className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700">Converteu!</button>
                        )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {columnLeads.length === 0 && (
                <div className="text-center py-8 text-xs text-muted-foreground border-2 border-dashed rounded-lg">
                    Vazio
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}