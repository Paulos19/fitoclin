"use client";

import { createLead } from "@/actions/crm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useTransition } from "react";
import { Loader2, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function LeadForm() {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await createLead(formData);
      
      if (result.success) {
        toast.success(result.message);
        // Opcional: Limpar o formulário ou redirecionar
        const form = document.getElementById("lead-form") as HTMLFormElement;
        form?.reset();
      } else {
        toast.error(result.message);
      }
    });
  }

  // Estilos comuns para inputs escuros
  const inputStyles = "bg-[#0A311D]/50 border-[#2A5432]/50 text-white placeholder:text-gray-500 focus:border-[#76A771] focus:ring-[#76A771]/20 transition-all";
  const labelStyles = "text-gray-300 font-medium text-sm";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#2A5432]/30 bg-[#062214]/80 backdrop-blur-xl p-8 shadow-2xl">
      
      {/* Efeito de brilho interno no topo */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#76A771]/50 to-transparent" />

      <div className="mb-8 text-center md:text-left">
        <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#76A771]" />
            <span className="text-xs font-bold text-[#76A771] uppercase tracking-wider">Agendamento</span>
        </div>
        <h3 className="text-2xl font-bold text-white">Garanta sua vaga</h3>
        <p className="text-gray-400 mt-2 text-sm leading-relaxed">
          Preencha os dados abaixo. Nossa equipe entrará em contato via WhatsApp para confirmar o melhor horário para você.
        </p>
      </div>

      <form id="lead-form" action={handleSubmit} className="space-y-5">
        {/* Campo Oculto para Fonte */}
        <input type="hidden" name="source" value="Site Institucional" />

        <div className="space-y-2">
          <Label htmlFor="name" className={labelStyles}>Nome Completo</Label>
          <Input 
            id="name" 
            name="name" 
            placeholder="Ex: Maria Silva" 
            required 
            disabled={isPending} 
            className={inputStyles}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className={labelStyles}>WhatsApp</Label>
            <Input 
                id="phone" 
                name="phone" 
                placeholder="(00) 00000-0000" 
                required 
                disabled={isPending} 
                className={inputStyles}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className={labelStyles}>E-mail <span className="text-gray-500 text-xs font-normal">(Opcional)</span></Label>
            <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="maria@exemplo.com" 
                disabled={isPending} 
                className={inputStyles}
            />
          </div>
        </div>

        <div className="space-y-2">
            <Label className={labelStyles}>Interesse Principal</Label>
            <Select name="notes" disabled={isPending}>
                <SelectTrigger className={cn(inputStyles, "w-full")}>
                    <SelectValue placeholder="Selecione o motivo..." />
                </SelectTrigger>
                <SelectContent className="bg-[#0A311D] border-[#2A5432] text-white">
                    <SelectItem value="Emagrecimento" className="focus:bg-[#2A5432] focus:text-white">Emagrecimento</SelectItem>
                    <SelectItem value="Ansiedade e Estresse" className="focus:bg-[#2A5432] focus:text-white">Ansiedade e Estresse</SelectItem>
                    <SelectItem value="Saúde da Mulher" className="focus:bg-[#2A5432] focus:text-white">Saúde da Mulher</SelectItem>
                    <SelectItem value="Outro" className="focus:bg-[#2A5432] focus:text-white">Outro Motivo</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className={labelStyles}>Mensagem <span className="text-gray-500 text-xs font-normal">(Opcional)</span></Label>
          <Textarea 
            id="message" 
            name="notes_extra" 
            placeholder="Conte um pouco sobre o seu objetivo..." 
            className={cn(inputStyles, "resize-none min-h-[100px]")}
            disabled={isPending}
          />
        </div>

        <Button 
            type="submit" 
            className="w-full bg-[#76A771] hover:bg-[#659160] text-[#062214] font-bold h-12 text-lg shadow-[0_0_20px_rgba(118,167,113,0.3)] transition-all hover:scale-[1.02]" 
            disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processando...
            </>
          ) : (
            <>
              Solicitar Agendamento <Send className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>

        <p className="text-xs text-center text-gray-500 pt-2 flex items-center justify-center gap-1">
           🔒 Seus dados estão 100% seguros.
        </p>
      </form>
    </div>
  );
}