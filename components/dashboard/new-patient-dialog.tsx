"use client";

import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPatient } from "@/actions/patient";
import { UserPlus, Loader2, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function NewPatientDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    
    // Server Action
    const promise = createPatient(formData);
    
    toast.promise(promise, {
      loading: 'Cadastrando paciente no sistema...',
      success: (data) => {
        setLoading(false);
        if (data?.error) throw new Error(data.error);
        setOpen(false);
        // Opcional: recarregar a página para atualizar a lista
        // window.location.reload(); 
        return "Paciente cadastrado com sucesso!";
      },
      error: (err) => {
        setLoading(false);
        return err.message;
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#76A771] hover:bg-[#5e8a5a] text-[#062214] font-bold shadow-lg shadow-[#76A771]/20 gap-2 transition-all hover:scale-105">
          <UserPlus className="w-4 h-4" /> Novo Paciente
        </Button>
      </DialogTrigger>
      
      {/* Estilização Dark Premium do Modal */}
      <DialogContent className="sm:max-w-[425px] bg-[#0A311D] border-[#2A5432] text-[#F1F1F1]">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Cadastrar Novo Paciente</DialogTitle>
          <DialogDescription className="text-gray-400">
            Preencha os dados básicos para iniciar um prontuário.
          </DialogDescription>
        </DialogHeader>
        
        <form action={handleSubmit} className="grid gap-5 py-4">
          
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#76A771]">Nome Completo *</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                id="name" 
                name="name" 
                required 
                placeholder="Ex: Ana Souza" 
                className="pl-9 bg-[#062214] border-[#2A5432] text-white placeholder:text-gray-600 focus-visible:ring-[#76A771]"
              />
            </div>
          </div>
          
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email (Login)</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="ana@email.com" 
                className="pl-9 bg-[#062214] border-[#2A5432] text-white placeholder:text-gray-600 focus-visible:ring-[#76A771]"
              />
            </div>
            <p className="text-[0.7rem] text-gray-500">
              Necessário para o paciente acessar o app. Se deixar vazio, um email fictício será gerado.
            </p>
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-300">WhatsApp</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                id="phone" 
                name="phone" 
                placeholder="(11) 99999-9999" 
                className="pl-9 bg-[#062214] border-[#2A5432] text-white placeholder:text-gray-600 focus-visible:ring-[#76A771]"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#2A5432] hover:bg-[#76A771] text-white hover:text-[#062214] font-bold transition-colors mt-2" 
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Confirmar Cadastro"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}