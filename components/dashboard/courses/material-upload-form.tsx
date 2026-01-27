"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, UploadCloud } from "lucide-react";
import { addModuleMaterial } from "@/actions/courses";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-[#76A771] hover:bg-[#5e8a5a] text-[#062214]">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
      Salvar Material
    </Button>
  );
}

export function MaterialUploadForm({ moduleId }: { moduleId: string }) {
  const [isOpen, setIsOpen] = useState(true);

  async function clientAction(formData: FormData) {
    const result = await addModuleMaterial(formData);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Material enviado!");
      // Aqui você poderia fechar o dialog via props ou state global se necessário
    }
  }

  return (
    <div className="space-y-4 py-4">
      <div>
        <h3 className="text-lg font-semibold text-white">Adicionar Material de Apoio</h3>
        <p className="text-sm text-gray-400">PDF, Imagens, Excel ou Word.</p>
      </div>
      
      <form action={clientAction} className="space-y-4">
        <input type="hidden" name="moduleId" value={moduleId} />
        
        <div className="space-y-2">
          <Label htmlFor="title" className="text-gray-300">Título do Arquivo</Label>
          <Input 
            id="title" 
            name="title" 
            placeholder="Ex: E-book de Receitas" 
            required 
            className="bg-[#062214] border-[#2A5432] text-white" 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="file" className="text-gray-300">Arquivo</Label>
          <Input 
            id="file" 
            name="file" 
            type="file" 
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png,.jpeg"
            required 
            className="bg-[#062214] border-[#2A5432] text-white file:text-[#76A771]" 
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}