import { KanbanBoard } from "@/components/dashboard/crm/kanban-board";
import { NewLeadDialog } from "@/components/dashboard/crm/new-lead-dialog";

export default async function CrmPage() {
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Funil de Vendas</h1>
          <p className="text-muted-foreground text-sm">Gerencie os interessados até virarem pacientes.</p>
        </div>
        <NewLeadDialog />
      </div>

      <div className="flex-1">
        <KanbanBoard />
      </div>
    </div>
  );
}