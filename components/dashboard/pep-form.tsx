"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { saveMedicalRecord } from "@/actions/record";
import { 
  Loader2, 
  Save, 
  Search, 
  Leaf, 
  Activity, 
  Heart, 
  Sparkles, 
  FilePlus2,
  Maximize2
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function PepForm({ patientId }: { patientId: string }) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("pilar1");

  // Estado local do formulário
  const [formData, setFormData] = useState({
    title: "",
    pilar1: "",
    pilar2: "",
    pilar3: "",
    pilar4: "",
    pilar5: "",
    notes: ""
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(data: FormData) {
    if (!formData.title) {
      toast.error("Por favor, dê um título para esta evolução.");
      return;
    }
    
    setLoading(true);
    data.append("patientId", patientId);

    const promise = saveMedicalRecord(data);

    toast.promise(promise, {
      loading: 'Salvando evolução...',
      success: (res) => {
        setLoading(false);
        if (res.error) throw new Error(res.error);
        
        // Reset opcional: limpa apenas os campos de texto, mantém título ou não conforme preferência
        setFormData({ title: "", pilar1: "", pilar2: "", pilar3: "", pilar4: "", pilar5: "", notes: "" });
        setActiveTab("pilar1"); // Volta para o início
        return "Prontuário salvo e histórico atualizado!";
      },
      error: (err) => {
        setLoading(false);
        return err.message;
      }
    });
  }

  const tabs = [
    { id: "pilar1", icon: Search, label: "Investigação", color: "text-blue-400" },
    { id: "pilar2", icon: Leaf, label: "Fitoterapia", color: "text-[#76A771]" },
    { id: "pilar3", icon: Activity, label: "Metabolismo", color: "text-orange-400" },
    { id: "pilar4", icon: Heart, label: "Estresse", color: "text-red-400" },
    { id: "pilar5", icon: Sparkles, label: "Evolução", color: "text-purple-400" },
  ];

  return (
    <form 
      action={handleSubmit} 
      className="flex flex-col h-full bg-[#0A311D]/90 border border-[#2A5432]/50 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden"
    >
      {/* Inputs Ocultos para Server Action */}
      {Object.entries(formData).map(([key, val]) => (
        <input key={key} type="hidden" name={key} value={val} />
      ))}

      {/* --- HEADER DO CARD --- */}
      <div className="shrink-0 p-6 border-b border-[#2A5432]/30 bg-[#062214]/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#2A5432]/20 rounded-lg">
            <FilePlus2 className="w-6 h-6 text-[#76A771]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">Nova Evolução</h2>
            <p className="text-xs text-gray-400">Preencha os pilares do método Fitoclin.</p>
          </div>
        </div>
        
        <Input 
             value={formData.title}
             onChange={(e) => handleChange("title", e.target.value)}
             placeholder="Título da Consulta (ex: Retorno 45d)" 
             className="bg-[#062214] border-[#2A5432] text-white placeholder:text-gray-500 focus-visible:ring-[#76A771] md:w-72 h-10 font-medium" 
             required 
        />
      </div>

      {/* --- CORPO PRINCIPAL (TABS + TEXTAREA) --- */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        
        {/* BARRA DE SWITCHES (ABAS) */}
        <div className="shrink-0 px-6 pt-4 pb-2">
          <TabsList className="w-full grid grid-cols-5 bg-[#062214] p-1.5 rounded-xl border border-[#2A5432]/30 h-auto gap-1">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className={cn(
                  "flex flex-col items-center justify-center py-2 gap-1.5 rounded-lg transition-all duration-300",
                  "data-[state=active]:bg-[#2A5432] data-[state=active]:text-white data-[state=active]:shadow-lg",
                  "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                )}
              >
                <tab.icon className={cn("w-4 h-4 md:w-5 md:h-5 transition-colors", activeTab === tab.id ? tab.color : "currentColor")} />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider hidden md:block">
                  {tab.label}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* ÁREA DE CONTEÚDO COM SCROLLBAR ESTILIZADA */}
        <div className="flex-1 relative min-h-0 bg-[#062214]/20 mx-6 mb-2 rounded-xl border border-[#2A5432]/20 overflow-hidden group">
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="h-full mt-0 data-[state=inactive]:hidden">
               <div className="h-full flex flex-col">
                  {/* Label flutuante dentro da área */}
                  <div className="shrink-0 px-4 py-2 flex items-center gap-2 border-b border-[#2A5432]/10 bg-[#062214]/20">
                    <tab.icon className={cn("w-4 h-4", tab.color)} />
                    <span className={cn("text-xs font-bold uppercase tracking-widest opacity-80", tab.color)}>
                      {tab.label}
                    </span>
                  </div>
                  
                  {/* TEXTAREA COM SCROLLBAR CUSTOMIZADA */}
                  <Textarea 
                      value={formData[tab.id as keyof typeof formData]}
                      onChange={(e) => handleChange(tab.id, e.target.value)}
                      placeholder={`Digite as observações sobre ${tab.label.toLowerCase()} aqui...`}
                      className={cn(
                        "flex-1 w-full resize-none bg-transparent border-none text-gray-200 placeholder:text-gray-600/50 p-4 text-base leading-relaxed focus-visible:ring-0",
                        // Classes utilitárias para scrollbar customizada (Tailwind v4 / Plugin ou CSS puro)
                        "[&::-webkit-scrollbar]:w-2",
                        "[&::-webkit-scrollbar-track]:bg-[#062214]",
                        "[&::-webkit-scrollbar-thumb]:bg-[#2A5432] [&::-webkit-scrollbar-thumb]:rounded-full",
                        "[&::-webkit-scrollbar-thumb]:hover:bg-[#76A771] [&::-webkit-scrollbar-thumb]:transition-colors"
                      )}
                  />
               </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
      
      {/* --- FOOTER (NOTES & SAVE) --- */}
      <div className="shrink-0 p-6 pt-4 bg-[#062214]/30 border-t border-[#2A5432]/30 flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full relative">
            <label className="text-[10px] font-bold text-gray-500 mb-1.5 block uppercase ml-1">
              Nota Interna (Privada)
            </label>
            <Input 
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Ex: Paciente relatou dificuldade financeira..." 
              className="bg-[#062214] border-[#2A5432] text-gray-400 text-sm h-10 focus-visible:ring-[#2A5432]"
            />
          </div>

          <Button 
             type="submit" 
             className="w-full md:w-auto min-w-[180px] bg-[#76A771] hover:bg-[#659160] text-[#062214] font-bold h-10 shadow-[0_0_15px_rgba(118,167,113,0.2)] hover:shadow-[0_0_25px_rgba(118,167,113,0.4)] transition-all" 
             disabled={loading}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
               <Save className="w-5 h-5 mr-2" /> Salvar Evolução
              </>
            )}
          </Button>
      </div>
    </form>
  );
}