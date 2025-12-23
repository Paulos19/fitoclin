"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { saveMedicalRecord } from "@/actions/record";
import { Loader2, Save, Search, Leaf, Activity, Heart, Sparkles, FileText } from "lucide-react";
import { toast } from "sonner";

export function PepForm({ patientId }: { patientId: string }) {
  const [loading, setLoading] = useState(false);

  // 1. Estado para segurar os dados na memória (mesmo se a aba fechar)
  const [formData, setFormData] = useState({
    title: "",
    pilar1: "",
    pilar2: "",
    pilar3: "",
    pilar4: "",
    pilar5: "",
    notes: ""
  });

  // Função para atualizar o estado
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(data: FormData) {
    setLoading(true);
    // O FormData pegará automaticamente os inputs hidden que criamos abaixo
    data.append("patientId", patientId);

    const promise = saveMedicalRecord(data);

    toast.promise(promise, {
      loading: 'Salvando evolução...',
      success: (res) => {
        setLoading(false);
        if (res.error) throw new Error(res.error);
        
        // Opcional: Limpar formulário após sucesso
        setFormData({
            title: "", pilar1: "", pilar2: "", pilar3: "", pilar4: "", pilar5: "", notes: ""
        });
        
        return "Prontuário atualizado com sucesso!";
      },
      error: (err) => {
        setLoading(false);
        return err.message;
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border shadow-sm">
      
      {/* 2. Inputs Ocultos (Hidden) - Garantem que o dado seja enviado ao Server Action */}
      {/* Eles permanecem montados no DOM independente da aba ativa */}
      <input type="hidden" name="title" value={formData.title} />
      <input type="hidden" name="pilar1" value={formData.pilar1} />
      <input type="hidden" name="pilar2" value={formData.pilar2} />
      <input type="hidden" name="pilar3" value={formData.pilar3} />
      <input type="hidden" name="pilar4" value={formData.pilar4} />
      <input type="hidden" name="pilar5" value={formData.pilar5} />
      <input type="hidden" name="notes" value={formData.notes} />

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#062214] flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#76A771]" /> Nova Evolução Clínica
        </h2>
        {/* Input Visual (Controlado) */}
        <Input 
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Título (ex: Retorno 30 dias)" 
          className="w-64" 
          required 
        />
      </div>

      <Tabs defaultValue="pilar1" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="pilar1"><Search className="w-4 h-4 mr-2 hidden md:inline" /> Investigação</TabsTrigger>
          <TabsTrigger value="pilar2"><Leaf className="w-4 h-4 mr-2 hidden md:inline" /> Fitoterapia</TabsTrigger>
          <TabsTrigger value="pilar3"><Activity className="w-4 h-4 mr-2 hidden md:inline" /> Metabolismo</TabsTrigger>
          <TabsTrigger value="pilar4"><Heart className="w-4 h-4 mr-2 hidden md:inline" /> Estresse</TabsTrigger>
          <TabsTrigger value="pilar5"><Sparkles className="w-4 h-4 mr-2 hidden md:inline" /> Evolução</TabsTrigger>
        </TabsList>

        <div className="mt-6 space-y-4">
          {/* Note: Removemos o 'name' dos Textareas visuais para não duplicar no FormData */}
          
          <TabsContent value="pilar1">
            <label className="text-sm font-medium text-gray-700 block mb-2">1. Investigação Profunda</label>
            <Textarea 
              value={formData.pilar1}
              onChange={(e) => handleChange("pilar1", e.target.value)}
              placeholder="Anamnese detalhada, queixas principais..." 
              className="min-h-[200px] border-gray-200 focus:border-[#76A771]"
            />
          </TabsContent>

          <TabsContent value="pilar2">
            <label className="text-sm font-medium text-gray-700 block mb-2">2. Fitoterapia Personalizada</label>
            <Textarea 
              value={formData.pilar2}
              onChange={(e) => handleChange("pilar2", e.target.value)}
              placeholder="Plantas prescritas, dosagens..." 
              className="min-h-[200px] border-gray-200 focus:border-[#76A771]"
            />
          </TabsContent>

          <TabsContent value="pilar3">
            <label className="text-sm font-medium text-gray-700 block mb-2">3. Modulação Metabólica</label>
            <Textarea 
              value={formData.pilar3}
              onChange={(e) => handleChange("pilar3", e.target.value)}
              placeholder="Ajustes alimentares..." 
              className="min-h-[200px] border-gray-200 focus:border-[#76A771]"
            />
          </TabsContent>

          <TabsContent value="pilar4">
            <label className="text-sm font-medium text-gray-700 block mb-2">4. Gestão do Estresse</label>
            <Textarea 
              value={formData.pilar4}
              onChange={(e) => handleChange("pilar4", e.target.value)}
              placeholder="Sono, cortisol..." 
              className="min-h-[200px] border-gray-200 focus:border-[#76A771]"
            />
          </TabsContent>

          <TabsContent value="pilar5">
            <label className="text-sm font-medium text-gray-700 block mb-2">5. Evolução e Próximos Passos</label>
            <Textarea 
              value={formData.pilar5}
              onChange={(e) => handleChange("pilar5", e.target.value)}
              placeholder="Comparativo com consulta anterior..." 
              className="min-h-[200px] border-gray-200 focus:border-[#76A771]"
            />
          </TabsContent>
        </div>
      </Tabs>
      
      <div className="pt-4 border-t mt-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">Anotações Gerais (Privado)</label>
          <Input 
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Notas rápidas..." 
          />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" className="btn-gradient w-48" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Salvar no Prontuário
        </Button>
      </div>
    </form>
  );
}