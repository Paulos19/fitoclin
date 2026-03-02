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
import { getAvailableSlots } from "@/actions/availability"; // Certifique-se que esta action existe
import { getPatientsForSelect } from "@/actions/patient";
import { Calendar as CalendarIcon, Clock, Plus, Loader2, CheckCircle2, Search } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

// 👇 1. Definimos a interface das Props
interface NewAppointmentDialogProps {
  patientId?: string; // Opcional, pois pode ser chamado sem ID (pelo menu geral)
}

// 👇 2. Recebemos as props no componente
export function NewAppointmentDialog({ patientId }: NewAppointmentDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  // Estados de Seleção
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Estados dos Pacientes
  const [patients, setPatients] = useState<any[]>([]);
  const [searchPatient, setSearchPatient] = useState("");
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(patientId || null);

  const canScheduleForOthers = session?.user?.role === "ADMIN" || session?.user?.role === "PROFESSIONAL";

  // Efeito: Buscar pacientes quando o modal abrir (se tiver permissão e não tiver paciente pré-selecionado por prop)
  useEffect(() => {
    if (open && canScheduleForOthers && !patientId) {
      getPatientsForSelect().then(data => setPatients(data));
    }
  }, [open, canScheduleForOthers, patientId]);

  // Efeito: Buscar slots quando a data muda
  useEffect(() => {
    if (date) {
      const fetchSlots = async () => {
        setLoadingSlots(true);
        setSelectedTime(null);

        const dateStr = format(date, "yyyy-MM-dd");
        try {
          // Verifica se a função existe antes de chamar (segurança)
          const res = await getAvailableSlots(dateStr);
          if (res && res.slots) {
            setSlots(res.slots);
          } else {
            setSlots([]);
          }
        } catch (error) {
          console.error("Erro ao buscar slots", error);
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

    if (canScheduleForOthers && !patientId && !selectedPatientId) {
      toast.error("Selecione um paciente.");
      return;
    }

    setLoading(true);

    formData.set("date", format(date, "yyyy-MM-dd"));
    formData.set("time", selectedTime);

    // Se o patientId veio via prop e não estava no form (caso oculto), garantimos ele aqui
    if (patientId && !formData.get("patientId")) {
      formData.set("patientId", patientId);
    }

    const result = await createAppointment(formData);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.success);
      setOpen(false);
      setDate(new Date());
      setSelectedTime(null);
      setSearchPatient("");
      setSelectedPatientId(patientId || null);
    }
  }

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchPatient.toLowerCase()) ||
    p.phone.includes(searchPatient)
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Se tiver patientId, mostra um botão menor (ícone), senão mostra o botão grande */}
        {patientId ? (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#76A771] hover:border-[#76A771] transition-all">
            <Plus className="w-4 h-4" />
          </Button>
        ) : (
          <Button className="bg-[#76A771] hover:bg-[#659160] text-[#062214] font-bold shadow-lg shadow-[#76A771]/20">
            <Plus className="w-4 h-4 mr-2" /> Agendar Consulta
          </Button>
        )}
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
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
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
            {/* Campo de Paciente (Preenchido auto se tiver prop, ou manual se Admin sem prop) */}
            {canScheduleForOthers && (
              <div className="grid gap-2 relative">
                <Label>Paciente</Label>
                {patientId ? (
                  <Input
                    name="patientId"
                    defaultValue={patientId}
                    className="bg-[#062214] border-[#2A5432] text-white opacity-50 cursor-not-allowed"
                    readOnly
                  />
                ) : (
                  <div className="relative">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Pesquisar por nome ou número..."
                        value={searchPatient}
                        onChange={(e) => {
                          setSearchPatient(e.target.value);
                          setShowPatientDropdown(true);
                          setSelectedPatientId(null);
                        }}
                        onFocus={() => setShowPatientDropdown(true)}
                        onBlur={() => setTimeout(() => setShowPatientDropdown(false), 200)}
                        className="bg-[#062214] border-[#2A5432] text-white pl-9"
                      />
                    </div>
                    <input type="hidden" name="patientId" value={selectedPatientId || ""} />

                    {showPatientDropdown && searchPatient && (
                      <div className="absolute z-50 w-full mt-1 bg-[#0A311D] border border-[#2A5432] rounded-md shadow-lg max-h-48 overflow-auto">
                        {filteredPatients.length === 0 ? (
                          <div className="p-3 text-sm text-gray-400">Nenhum paciente encontrado.</div>
                        ) : (
                          filteredPatients.map(p => (
                            <div
                              key={p.id}
                              className="p-3 hover:bg-[#2A5432] cursor-pointer text-sm text-white border-b border-[#2A5432]/30 last:border-0"
                              onMouseDown={(e) => {
                                e.preventDefault(); // Evita o blur do input antes do click registrar
                                setSelectedPatientId(p.id);
                                setSearchPatient(p.name);
                                setShowPatientDropdown(false);
                              }}
                            >
                              <div className="font-medium text-[#76A771]">{p.name}</div>
                              <div className="text-xs text-gray-400 mt-0.5">{p.phone || "Sem telefone"} {p.email ? `• ${p.email}` : ''}</div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                )}
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

            {canScheduleForOthers && (
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