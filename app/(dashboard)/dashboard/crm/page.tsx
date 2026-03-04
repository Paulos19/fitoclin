"use client";

import { useState } from "react";
import { KanbanBoard } from "@/components/dashboard/crm/kanban-board";
import { LeadsList } from "@/components/dashboard/crm/leads-list";
import { NewLeadDialog } from "@/components/dashboard/crm/new-lead-dialog";
import { ImportLeadsButton } from "@/components/dashboard/crm/import-leads-button";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CrmPage() {
  const [view, setView] = useState<"kanban" | "list">("kanban");

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Funil de Vendas</h1>
          <p className="text-muted-foreground text-sm">Gerencie os interessados até virarem pacientes.</p>
        </div>
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center bg-[#062214] border border-[#2A5432]/50 rounded-lg p-0.5">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 px-3 rounded-md text-xs gap-1.5 transition-all",
                view === "kanban"
                  ? "bg-[#2A5432] text-white shadow-sm"
                  : "text-gray-400 hover:text-white hover:bg-transparent"
              )}
              onClick={() => setView("kanban")}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Kanban
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 px-3 rounded-md text-xs gap-1.5 transition-all",
                view === "list"
                  ? "bg-[#2A5432] text-white shadow-sm"
                  : "text-gray-400 hover:text-white hover:bg-transparent"
              )}
              onClick={() => setView("list")}
            >
              <List className="w-3.5 h-3.5" /> Lista
            </Button>
          </div>

          <ImportLeadsButton />
          <NewLeadDialog />
        </div>
      </div>

      <div className="flex-1">
        {view === "kanban" ? <KanbanBoard /> : <LeadsList />}
      </div>
    </div>
  );
}