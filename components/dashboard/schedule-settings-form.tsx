"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveScheduleSettings } from "@/actions/schedule";
import { Loader2 } from "lucide-react";
import { toast } from "sonner"; // <--- Importe o toast

const DAYS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0') + ":00");

export function ScheduleSettingsForm({ initialData }: { initialData: any[] }) {
  const [loading, setLoading] = useState(false);
  
  // (Mantém o state de schedule igual...)
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
      toast.error("Erro ao salvar", { description: res.error }); // <--- Toast de Erro
    } else {
      toast.success("Sucesso!", { description: "Horários de atendimento atualizados." }); // <--- Toast de Sucesso
    }
  };

  // ... (Resto do código igual: updateDay e renderização)
  const updateDay = (index: number, field: string, value: any) => {
    const newSchedule = [...schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setSchedule(newSchedule);
  };

  return (
    <div className="space-y-6">
       {/* (Mesmo JSX de antes...) */}
       {schedule.map((day, index) => (
        <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50/50">
          <div className="flex items-center gap-4 w-40">
            <Switch 
              checked={day.isEnabled} 
              onCheckedChange={(val) => updateDay(index, "isEnabled", val)} 
            />
            <span className={`font-medium ${day.isEnabled ? "text-[#062214]" : "text-gray-400"}`}>
              {DAYS[index]}
            </span>
          </div>

          {day.isEnabled && (
            <div className="flex items-center gap-2">
              <Select value={day.startTime} onValueChange={(val) => updateDay(index, "startTime", val)}>
                <SelectTrigger className="w-[100px] bg-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {HOURS.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                </SelectContent>
              </Select>
              <span className="text-gray-400">-</span>
              <Select value={day.endTime} onValueChange={(val) => updateDay(index, "endTime", val)}>
                <SelectTrigger className="w-[100px] bg-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {HOURS.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {!day.isEnabled && <span className="text-sm text-gray-400 italic flex-1 text-center">Fechado</span>}
        </div>
      ))}

      <Button onClick={handleSave} className="w-full btn-gradient" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Salvar Alterações
      </Button>
    </div>
  );
}