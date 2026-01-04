"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveWeeklyCheckin } from "@/actions/tracking";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { PlusCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function RangeSlider({ name, label }: { name: string, label: string }) {
    const [val, setVal] = useState(5);
    return (
        <div className="space-y-3">
            <div className="flex justify-between text-sm">
                <span className="text-gray-300">{label}</span>
                <span className="font-bold text-[#76A771]">{val}</span>
            </div>
            <input 
                type="range" 
                name={name} 
                min="0" max="10" 
                value={val} 
                onChange={(e) => setVal(Number(e.target.value))}
                className="w-full h-2 bg-[#0A311D] rounded-lg appearance-none cursor-pointer accent-[#76A771]" 
            />
            <div className="flex justify-between text-[10px] text-gray-500">
                <span>Péssimo</span>
                <span>Ótimo</span>
            </div>
        </div>
    );
}

export function CheckinDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
        const res = await saveWeeklyCheckin(formData);
        if (res.success) {
            toast.success(res.success);
            setOpen(false);
        } else {
            toast.error(res.error);
        }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a] font-semibold gap-2 shadow-lg shadow-[#76A771]/20">
          <PlusCircle className="w-4 h-4" /> Check-in Semanal
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#062214] border-[#2A5432] text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Como foi a sua semana?</DialogTitle>
        </DialogHeader>
        
        <form action={handleSubmit} className="space-y-6 mt-2">
          <div className="space-y-5">
             <RangeSlider name="sleepQuality" label="Qualidade do Sono" />
             <RangeSlider name="energyLevel" label="Nível de Energia" />
             <RangeSlider name="digestion" label="Digestão / Intestino" />
             <RangeSlider name="mood" label="Humor / Ansiedade" />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Observações (Opcional)</Label>
            <Textarea 
                name="notes" 
                placeholder="Ex: Comi fora da dieta no sábado..." 
                className="bg-[#0A311D] border-[#2A5432] text-white resize-none" 
            />
          </div>

          <Button type="submit" className="w-full bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a]" disabled={isPending}>
            {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : "Registar Semana"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}