"use client";

import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createAppointment } from "@/actions/schedule";
import { Plus, Calendar, Clock, Video, FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function NewAppointmentDialog({ patientId }: { patientId?: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    if (patientId) formData.append("patientId", patientId);
    setLoading(true);

    const promise = createAppointment(formData);
    
    toast.promise(promise, {
      loading: 'Verificando disponibilidade e agendando...',
      success: (data) => {
        setLoading(false);
        if (data?.error) throw new Error(data.error);
        setOpen(false);
        return "Consulta agendada com sucesso!";
      },
      error: (err) => {
        setLoading(false);
        return `Não foi possível agendar: ${err.message}`;
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#76A771] hover:bg-[#5e8a5a] text-[#062214] font-bold shadow-lg shadow-[#76A771]/20 gap-2 transition-transform hover:scale-105">
          <Plus className="w-4 h-4" /> Novo Agendamento
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[450px] bg-[#0A311D] border-[#2A5432] text-[#F1F1F1]">
        <DialogHeader>
          <DialogTitle className="text-xl text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#76A771]" /> Agendar Consulta
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Preencha os dados abaixo para reservar um horário na agenda.
          </DialogDescription>
        </DialogHeader>
        
        <form action={handleSubmit} className="grid gap-5 py-4">
          
          <div className="grid grid-cols-2 gap-4">
            {/* Data */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-gray-300">Data</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-[#76A771]" />
                <Input 
                  id="date" 
                  name="date" 
                  type="date" 
                  required 
                  className="pl-9 bg-[#062214] border-[#2A5432] text-white [color-scheme:dark] focus-visible:ring-[#76A771]" 
                />
              </div>
            </div>
            
            {/* Hora */}
            <div className="space-y-2">
              <Label htmlFor="time" className="text-gray-300">Horário</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-[#76A771]" />
                <Input 
                  id="time" 
                  name="time" 
                  type="time" 
                  required 
                  className="pl-9 bg-[#062214] border-[#2A5432] text-white [color-scheme:dark] focus-visible:ring-[#76A771]" 
                />
              </div>
            </div>
          </div>

          {/* Link Meet */}
          <div className="space-y-2">
            <Label htmlFor="meetLink" className="flex items-center justify-between text-gray-300">
              Link da Videochamada
              <span className="text-[10px] uppercase bg-[#2A5432]/50 px-2 py-0.5 rounded text-[#76A771]">Opcional</span>
            </Label>
            <div className="relative">
              <Video className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                id="meetLink" 
                name="meetLink" 
                placeholder="https://meet.google.com/..." 
                className="pl-9 bg-[#062214] border-[#2A5432] text-white placeholder:text-gray-600 focus-visible:ring-[#76A771]"
              />
            </div>
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-gray-300">Observações Internas</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Textarea 
                id="notes" 
                name="notes" 
                placeholder="Motivo da consulta, sintomas relatados..." 
                className="pl-9 min-h-[80px] bg-[#062214] border-[#2A5432] text-white placeholder:text-gray-600 focus-visible:ring-[#76A771]" 
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#2A5432] to-[#76A771] hover:brightness-110 text-white font-bold border-none h-11"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Confirmar Agendamento"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}