"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPatient } from "@/actions/patient";
import { UserPlus, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function NewPatientDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    
    // Usando toast.promise para feedback visual
    const promise = createPatient(formData);
    
    toast.promise(promise, {
      loading: 'Cadastrando paciente...',
      success: (data) => {
        setLoading(false);
        if (data.error) throw new Error(data.error);
        setOpen(false);
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
        <Button className="btn-gradient gap-2">
          <UserPlus className="w-4 h-4" /> Novo Paciente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Paciente</DialogTitle>
        </DialogHeader>
        
        <form action={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome Completo *</Label>
            <Input id="name" name="name" required placeholder="Ex: Ana Souza" />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email (Opcional)</Label>
            <Input id="email" name="email" type="email" placeholder="ana@email.com" />
            <p className="text-[0.8rem] text-muted-foreground">Necessário para acesso à área do paciente.</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Telefone / WhatsApp</Label>
            <Input id="phone" name="phone" placeholder="(11) 99999-9999" />
          </div>

          <Button type="submit" className="btn-gradient w-full" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Cadastrar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}