"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { upsertPlan, deletePlan } from "@/actions/settings";
import { Loader2, Plus, Trash2, Edit2, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function PlansManager({ plans }: { plans: any[] }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h2 className="text-xl font-bold text-white">Planos de Assinatura</h2>
         <PlanDialog />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map(plan => (
          <Card key={plan.id} className={`bg-[#062214] relative group hover:border-[#76A771] transition-colors ${plan.highlight ? 'border-[#76A771] border-2' : 'border-[#2A5432]/30'}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg flex justify-between items-start">
                 {plan.name}
                 <PlanDialog plan={plan} isEdit />
              </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold text-[#76A771] mb-2">
                 {plan.price} <span className="text-xs text-gray-500 font-normal">{plan.period}</span>
               </div>
               <div className="space-y-1 mb-4">
                 {plan.features.split(';').map((feat: string, i: number) => (
                    <div key={i} className="text-xs text-gray-400 flex items-center gap-1">
                      <Check className="w-3 h-3 text-[#76A771]" /> {feat.trim()}
                    </div>
                 ))}
               </div>
               <div className="flex justify-end gap-2 border-t border-[#2A5432]/30 pt-2">
                  <DeleteButton id={plan.id} action={deletePlan} />
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PlanDialog({ plan, isEdit }: { plan?: any, isEdit?: boolean }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const res = await upsertPlan(formData, plan?.id);
    setLoading(false);
    if (res.error) toast.error(res.error);
    else {
      toast.success(res.success);
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-500 hover:text-white"><Edit2 className="w-3 h-3" /></Button>
        ) : (
          <Button className="btn-gradient"><Plus className="w-4 h-4 mr-2" /> Novo Plano</Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-[#0A311D] border-[#2A5432] text-white max-h-[80vh] overflow-y-auto custom-scrollbar">
        <DialogHeader><DialogTitle>{isEdit ? "Editar Plano" : "Criar Plano"}</DialogTitle></DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
               <Label>Nome do Plano</Label>
               <Input name="name" defaultValue={plan?.name} required className="bg-[#062214] border-[#2A5432]" />
            </div>
            <div className="space-y-2">
               <Label>Preço</Label>
               <Input name="price" defaultValue={plan?.price} placeholder="R$ 199" required className="bg-[#062214] border-[#2A5432]" />
            </div>
          </div>
          
          <div className="space-y-2">
             <Label>Período (ex: /mês, /ano)</Label>
             <Input name="period" defaultValue={plan?.period} required className="bg-[#062214] border-[#2A5432]" />
          </div>

          <div className="space-y-2">
             <Label>Benefícios (Separar por ponto e vírgula ';')</Label>
             <Textarea 
                name="features" 
                defaultValue={plan?.features} 
                placeholder="Acesso total; Suporte VIP; Mentoria..." 
                required 
                className="bg-[#062214] border-[#2A5432] h-24" 
             />
             <p className="text-[10px] text-gray-400">Use ; para quebrar linha na lista.</p>
          </div>

          <div className="space-y-2">
             <Label>Link do Checkout</Label>
             <Input name="buttonLink" defaultValue={plan?.buttonLink} className="bg-[#062214] border-[#2A5432]" />
          </div>

          <div className="flex items-center gap-2 pt-2">
             <Switch name="highlight" defaultChecked={plan?.highlight ?? false} />
             <Label>Plano em Destaque (Borda Verde)</Label>
          </div>
          
          <Button type="submit" disabled={loading} className="w-full btn-gradient mt-4">
             {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : "Salvar Plano"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteButton({ id, action }: { id: string, action: any }) {
  const [loading, setLoading] = useState(false);
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-4 w-4 text-red-500 hover:text-red-300 hover:bg-transparent p-0"
      disabled={loading}
      onClick={async () => {
         if(!confirm("Excluir este plano?")) return;
         setLoading(true);
         await action(id);
         setLoading(false);
      }}
    >
      {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
    </Button>
  );
}