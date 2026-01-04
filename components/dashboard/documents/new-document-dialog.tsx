"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { uploadDocument } from "@/actions/documents";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";

export function NewDocumentDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await uploadDocument(formData);

      if (result.success) {
        toast.success(result.success);
        setOpen(false); // Fecha o modal
      } else {
        toast.error(result.error || "Erro ao enviar arquivo.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a] font-bold shadow-lg shadow-[#76A771]/20">
           <Plus className="w-4 h-4 mr-2" /> Novo Documento
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#062214] border-[#2A5432] text-white">
        <DialogHeader>
          <DialogTitle>Enviar Arquivo</DialogTitle>
        </DialogHeader>
        
        <form action={handleSubmit} className="space-y-5 mt-2">
            <div className="space-y-2">
                <Label>Nome do Arquivo</Label>
                <Input 
                    name="title" 
                    placeholder="Ex: Hemograma Jan/26" 
                    className="bg-[#0A311D] border-[#2A5432] text-white placeholder:text-gray-500" 
                    required 
                    disabled={isPending}
                />
            </div>
            
            <div className="space-y-2">
                <Label>Tipo</Label>
                <Select name="type" defaultValue="EXAM" disabled={isPending}>
                    <SelectTrigger className="bg-[#0A311D] border-[#2A5432] text-white">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0A311D] border-[#2A5432] text-white">
                        <SelectItem value="EXAM">Exame Laboratorial</SelectItem>
                        <SelectItem value="PRESCRIPTION">Receita / Prescrição</SelectItem>
                        <SelectItem value="OTHER">Outro Documento</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label>Selecione o Arquivo (PDF ou Imagem)</Label>
                <Input 
                    name="file" 
                    type="file" 
                    accept=".pdf,image/*"
                    className="bg-[#0A311D] border-[#2A5432] text-white file:bg-[#76A771] file:text-[#062214] file:border-0 file:rounded-md file:mr-4 file:px-2 file:font-semibold hover:file:bg-[#5e8a5a]" 
                    required 
                    disabled={isPending}
                />
                <p className="text-xs text-gray-500">Máximo: 4MB.</p>
            </div>

            <Button type="submit" className="w-full bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a] font-bold" disabled={isPending}>
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                    </>
                ) : (
                    "Fazer Upload"
                )}
            </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}