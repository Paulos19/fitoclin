"use client";

import { createLead } from "@/actions/crm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useTransition } from "react";
import { Loader2, Send } from "lucide-react";

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

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Agende a sua consulta</h3>
        <p className="text-muted-foreground mt-2">
          Preencha os dados abaixo e a nossa equipa entrará em contacto para confirmar o melhor horário.
        </p>
      </div>

      <form id="lead-form" action={handleSubmit} className="space-y-4">
        {/* Campo Oculto para Fonte */}
        <input type="hidden" name="source" value="Site Institucional" />

        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo</Label>
          <Input id="name" name="name" placeholder="Ex: Maria Silva" required disabled={isPending} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">WhatsApp</Label>
            <Input id="phone" name="phone" placeholder="(00) 00000-0000" required disabled={isPending} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail (Opcional)</Label>
            <Input id="email" name="email" type="email" placeholder="maria@exemplo.com" disabled={isPending} />
          </div>
        </div>

        <div className="space-y-2">
            <Label>Interesse Principal</Label>
            <Select name="notes" disabled={isPending}>
                <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Emagrecimento">Emagrecimento</SelectItem>
                    <SelectItem value="Ansiedade e Estresse">Ansiedade e Estresse</SelectItem>
                    <SelectItem value="Saúde da Mulher">Saúde da Mulher</SelectItem>
                    <SelectItem value="Outro">Outro Motivo</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Mensagem (Opcional)</Label>
          <Textarea 
            id="message" 
            name="notes_extra" // Dica: Podemos concatenar isso no backend se quisermos, ou ignorar por enquanto
            placeholder="Conte um pouco sobre o seu objetivo..." 
            className="resize-none"
            disabled={isPending}
          />
        </div>

        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
            </>
          ) : (
            <>
              Solicitar Agendamento <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground pt-2">
          Seus dados estão seguros. Entraremos em contacto em até 24h úteis.
        </p>
      </form>
    </div>
  );
}