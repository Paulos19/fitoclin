"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createAppointment } from "@/actions/schedule";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"; // <--- Import

export function NewAppointmentDialog({ patientId }: { patientId?: string }) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    if (patientId) formData.append("patientId", patientId);
    
    // Toast com Promessa (UX de alto nível)
    toast.promise(createAppointment(formData), {
      loading: 'Agendando consulta...',
      success: (data) => {
        if (data.error) throw new Error(data.error); // Força cair no error se o backend retornar erro lógico
        setOpen(false);
        return "Consulta agendada com sucesso!";
      },
      error: (err) => `Erro: ${err.message}`,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn-gradient gap-2">
          <Plus className="w-4 h-4" /> Novo Agendamento
        </Button>
      </DialogTrigger>
      {/* ... (conteúdo do modal continua igual) ... */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agendar Consulta</DialogTitle>
        </DialogHeader>
        
        <form action={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Data</Label>
            <Input id="date" name="date" type="date" required className="col-span-3" />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="time">Horário (Brasília)</Label>
            <Input id="time" name="time" type="time" required className="col-span-3" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="meetLink" className="flex items-center gap-2">
              Link do Google Meet 
              <span className="text-xs text-gray-400 font-normal">(Opcional)</span>
            </Label>
            <Input 
              id="meetLink" 
              name="meetLink" 
              placeholder="https://meet.google.com/..." 
              className="border-[#2A5432]/20 focus:border-[#2A5432]"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea id="notes" name="notes" placeholder="Motivo da consulta..." />
          </div>

          <Button type="submit" className="btn-gradient w-full">Confirmar Agendamento</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}