"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { saveScheduleSettings } from "@/actions/schedule";
import { Loader2, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const DAYS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0') + ":00");

export function ScheduleSettingsForm({ initialData }: { initialData: any[] }) {
  const [loading, setLoading] = useState(false);
  
  const [schedule, setSchedule] = useState(() => {
    return DAYS.map((day, index) => {
      const existing = initialData.find(s => s.dayOfWeek === index);
      return {
        dayOfWeek: index,
        isEnabled: existing ? existing.isEnabled : index > 0 && index < 6,
        startTime: existing?.startTime || "09:00",
        endTime: existing?.endTime || "18:00",
      };
    });
  });

  const handleSave = async () => {
    setLoading(true);
    const res = await saveScheduleSettings(schedule);
    setLoading(false);
    
    if (res.error) {
      toast.error("Erro ao salvar", { description: res.error });
    } else {
      toast.success("Agenda Atualizada!", { 
        description: "Seus horários de disponibilidade foram salvos.",
        icon: <CheckCircle2 className="text-[#76A771]" />
      });
    }
  };

  const updateDay = (index: number, field: string, value: any) => {
    const newSchedule = [...schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setSchedule(newSchedule);
  };

  return (
    <div className="space-y-4">
       {schedule.map((day, index) => (
        <div 
          key={index} 
          className={cn(
            "flex items-center justify-between p-4 rounded-xl border transition-all duration-300",
            day.isEnabled 
              ? "bg-[#0A311D]/80 border-[#76A771]/30 shadow-[0_0_10px_rgba(118,167,113,0.1)]" 
              : "bg-[#062214]/50 border-[#2A5432]/20 opacity-60 hover:opacity-100"
          )}
        >
          {/* Lado Esquerdo: Switch e Dia */}
          <div className="flex items-center gap-4 w-40">
            <Switch 
              checked={day.isEnabled} 
              onCheckedChange={(val) => updateDay(index, "isEnabled", val)}
              className="data-[state=checked]:bg-[#76A771] data-[state=unchecked]:bg-[#2A5432]"
            />
            <span className={cn(
              "font-medium transition-colors", 
              day.isEnabled ? "text-white" : "text-gray-500"
            )}>
              {DAYS[index]}
            </span>
          </div>

          {/* Lado Direito: Seletores de Horário */}
          {day.isEnabled ? (
            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 bg-[#062214] p-1 rounded-lg border border-[#2A5432]">
                <Clock className="w-4 h-4 text-[#76A771] ml-2" />
                
                {/* Select Início */}
                <Select value={day.startTime} onValueChange={(val) => updateDay(index, "startTime", val)}>
                  <SelectTrigger className="w-[85px] border-none bg-transparent text-white focus:ring-0 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A311D] border-[#2A5432] text-white max-h-60">
                    {HOURS.map(h => <SelectItem key={h} value={h} className="focus:bg-[#2A5432] focus:text-white cursor-pointer">{h}</SelectItem>)}
                  </SelectContent>
                </Select>

                <span className="text-[#2A5432]">|</span>

                {/* Select Fim */}
                <Select value={day.endTime} onValueChange={(val) => updateDay(index, "endTime", val)}>
                  <SelectTrigger className="w-[85px] border-none bg-transparent text-white focus:ring-0 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A311D] border-[#2A5432] text-white max-h-60">
                    {HOURS.map(h => <SelectItem key={h} value={h} className="focus:bg-[#2A5432] focus:text-white cursor-pointer">{h}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <span className="text-sm text-gray-500 italic flex-1 text-right pr-4 flex items-center justify-end gap-2">
              <AlertCircle className="w-4 h-4" /> Indisponível
            </span>
          )}
        </div>
      ))}

      <div className="pt-4">
        <Button 
          onClick={handleSave} 
          className="w-full bg-[#76A771] hover:bg-[#659160] text-[#062214] font-bold h-12 text-lg shadow-lg hover:shadow-[#76A771]/20 transition-all" 
          disabled={loading}
        >
          {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Salvar Configurações da Agenda"}
        </Button>
      </div>
    </div>
  );
}