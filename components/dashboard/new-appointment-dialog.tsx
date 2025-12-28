"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { createAppointment } from "@/actions/schedule";
import { getAvailableSlots } from "@/actions/availability";
import { Calendar as CalendarIcon, Clock, Plus, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

export function NewAppointmentDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  // Estados de Seleção
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Efeito: Buscar slots quando a data muda
  useEffect(() => {
    if (date) {
      const fetchSlots = async () => {
        setLoadingSlots(true);
        setSelectedTime(null); // Reseta horário ao mudar data
        
        // Formata data para YYYY-MM-DD para a API
        const dateStr = format(date, "yyyy-MM-dd");
        const res = await getAvailableSlots(dateStr);
        
        if (res.slots) {
          setSlots(res.slots);
        } else {
          setSlots([]);
        }
        setLoadingSlots(false);
      };

      fetchSlots();
    }
  }, [date]);

  async function handleSubmit(formData: FormData) {
    if (!date || !selectedTime) {
      toast.error("Selecione data e horário.");
      return;
    }

    setLoading(true);

    // Injeta data e hora formatados no FormData para a Action existente processar
    // A action espera 'date' como ISO e 'time' como HH:mm.
    // Vamos ajustar para enviar o que a action espera.
    
    // A action createAppointment espera:
    // date: string (ISO date YYYY-MM-DD)
    // time: string (HH:mm)
    
    formData.set("date", format(date, "yyyy-MM-dd"));
    formData.set("time", selectedTime);

    const result = await createAppointment(formData);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.success);
      setOpen(false);
      // Resetar form
      setDate(new Date());
      setSelectedTime(null);
    }
  }

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#76A771] hover:bg-[#659160] text-[#062214] font-bold shadow-lg shadow-[#76A771]/20">
          <Plus className="w-4 h-4 mr-2" /> Agendar Consulta
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0A311D] border-[#2A5432] text-white sm:max-w-[800px] p-0 overflow-hidden flex flex-col md:flex-row gap-0">
        
        {/* LADO ESQUERDO: CALENDÁRIO */}
        <div className="p-6 bg-[#062214] border-r border-[#2A5432]/30 flex flex-col gap-4 md:w-[320px]">
           <div>
             <DialogTitle className="text-xl mb-1">Escolha a Data</DialogTitle>
             <DialogDescription className="text-gray-400 text-xs">
               Veja os dias disponíveis para atendimento.
             </DialogDescription>
           </div>
           
           <div className="bg-[#0A311D]/50 rounded-xl border border-[#2A5432]/50 p-3 flex justify-center">
             <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ptBR}
                disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} // Bloqueia passado
                className="rounded-md text-white"
                classNames={{
                  day_selected: "bg-[#76A771] text-[#062214] hover:bg-[#76A771] hover:text-[#062214] font-bold",
                  day_today: "bg-[#2A5432]/50 text-white",
                }}
              />
           </div>
        </div>

        {/* LADO DIREITO: HORÁRIOS E FORMULÁRIO */}
        <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto max-h-[80vh]">
          
          {/* Seção de Horários */}
          <div>
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#76A771]" /> Horários Disponíveis
              {date && <span className="text-xs font-normal text-gray-400 ml-auto capitalize">{format(date, "EEEE, d 'de' MMMM", { locale: ptBR })}</span>}
            </h3>

            {loadingSlots ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-[#76A771]" />
              </div>
            ) : slots.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {slots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "border-[#2A5432] hover:bg-[#2A5432] hover:text-white transition-all",
                      selectedTime === time 
                        ? "bg-[#76A771] text-[#062214] border-[#76A771] font-bold ring-2 ring-[#76A771]/30" 
                        : "text-gray-300 bg-transparent"
                    )}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-[#062214]/50 rounded-lg border border-[#2A5432]/30 border-dashed">
                <p className="text-gray-500 text-sm">Nenhum horário disponível neste dia.</p>
              </div>
            )}
          </div>

          <div className="h-px bg-[#2A5432]/30 w-full" />

          {/* Formulário Final */}
          <form action={handleSubmit} className="grid gap-4">
             {/* Admin: Input de Paciente */}
             {isAdmin && (
               <div className="grid gap-2">
                 <Label>ID do Paciente</Label>
                 <Input name="patientId" placeholder="ID do paciente..." className="bg-[#062214] border-[#2A5432] text-white" />
               </div>
             )}

             <div className="grid gap-2">
                <Label>Observações / Motivo</Label>
                <Textarea 
                  name="notes" 
                  placeholder="Descreva brevemente o motivo da consulta..." 
                  className="bg-[#062214] border-[#2A5432] text-white min-h-[80px]" 
                />
             </div>

             {isAdmin && (
               <div className="grid gap-2">
                 <Label>Link do Meet (Opcional)</Label>
                 <Input name="meetLink" placeholder="Gerado automaticamente se vazio" className="bg-[#062214] border-[#2A5432] text-white" />
               </div>
             )}

             <Button 
               type="submit" 
               disabled={loading || !selectedTime || !date} 
               className="w-full bg-[#76A771] hover:bg-[#659160] text-[#062214] font-bold py-6 text-lg shadow-xl shadow-[#76A771]/10 mt-2"
             >
               {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                 <span className="flex items-center gap-2">
                   Confirmar Agendamento <CheckCircle2 className="w-5 h-5" />
                 </span>
               )}
             </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}