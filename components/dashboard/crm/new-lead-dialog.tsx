"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createLead } from "@/actions/crm";
import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";

export function NewLeadDialog() {
  const [open, setOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    const res = await createLead(formData);
    if (res.success) {
      toast.success(res.message);
      setOpen(false);
    } else {
      toast.error(res.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="w-4 h-4 mr-2" /> Novo Lead</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Cadastrar Interessado</DialogTitle></DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div><Label>Nome</Label><Input name="name" required /></div>
          <div><Label>WhatsApp</Label><Input name="phone" required placeholder="(00) 00000-0000" /></div>
          <div><Label>Origem</Label>
            <Select name="source" defaultValue="Instagram">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Indicação">Indicação</SelectItem>
                    <SelectItem value="Google">Google / Site</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div><Label>Observação</Label><Input name="notes" placeholder="Ex: Quer horário de almoço" /></div>
          <Button type="submit" className="w-full">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}