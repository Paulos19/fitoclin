"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTransaction } from "@/actions/financial";
import { useState } from "react";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

export function NewTransactionDialog() {
  const [open, setOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    const result = await createTransaction(formData);
    if (result.success) {
      toast.success(result.message);
      setOpen(false);
    } else {
      toast.error(result.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Nova Transação
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Movimentação</DialogTitle>
        </DialogHeader>
        
        <form action={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select name="type" defaultValue="INCOME">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INCOME">Receita (Entrada)</SelectItem>
                  <SelectItem value="EXPENSE">Despesa (Saída)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Valor (R$)</Label>
              <Input name="amount" type="number" step="0.01" placeholder="0,00" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>
            <Input name="description" placeholder="Ex: Consulta João, Aluguel..." required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Categoria</Label>
                <Select name="category" defaultValue="Consultas">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Consultas">Consultas</SelectItem>
                        <SelectItem value="Procedimentos">Procedimentos</SelectItem>
                        <SelectItem value="Cursos">Venda de Cursos</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Impostos">Impostos</SelectItem>
                        <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>Data</Label>
                <Input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
            </div>
          </div>

          <div className="space-y-2">
             <Label>Status</Label>
             <Select name="status" defaultValue="PAID">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="PAID">Pago / Recebido</SelectItem>
                  <SelectItem value="PENDING">Pendente (Agendado)</SelectItem>
                </SelectContent>
             </Select>
          </div>

          <Button type="submit" className="w-full">Salvar Registro</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}