"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  saveMedicalRecord, 
  updateMedicalRecord, 
  deleteMedicalRecord, 
  getPatientRecords 
} from "@/actions/record";
import { 
  Loader2, 
  Save, 
  Search, 
  Leaf, 
  Activity, 
  Heart, 
  Sparkles, 
  FilePlus2,
  History,
  Trash2,
  RefreshCcw,
  Bot,
  MessageCircle,
  Pill,
  User,
  Calendar
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Tipagem para o registro vindo do banco
interface MedicalRecord {
  id: string;
  title: string;
  notes: string | null;
  pilar1_investigacao: string | null;
  pilar2_fitoterapia: string | null;
  pilar3_metabolismo: string | null;
  pilar4_estresse: string | null;
  pilar5_evolucao: string | null;
  date: Date;
  createdAt: Date;
  // Se tiver adicionado relation no record.ts:
  // professional?: { name: string | null };
}

export function PepForm({ patientId }: { patientId: string }) {
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [activeTab, setActiveTab] = useState("pilar1");
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  // Estado do formulário
  const [formData, setFormData] = useState({
    title: "",
    pilar1: "",
    pilar2: "",
    pilar3: "",
    pilar4: "",
    pilar5: "",
    notes: ""
  });

  // Função para buscar histórico atualizado
  const fetchRecords = useCallback(async () => {
    setLoadingHistory(true);
    try {
      const data = await getPatientRecords(patientId);
      // @ts-ignore
      setRecords(data);
    } catch (error) {
      toast.error("Erro ao carregar histórico");
    } finally {
      setLoadingHistory(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  // Modo Criação
  const handleNewEvolution = () => {
    setSelectedRecordId(null);
    setFormData({ title: "", pilar1: "", pilar2: "", pilar3: "", pilar4: "", pilar5: "", notes: "" });
    setActiveTab("pilar1");
  };

  // Modo Edição
  const handleSelectRecord = (record: MedicalRecord) => {
    setSelectedRecordId(record.id);
    setFormData({
      title: record.title || "",
      pilar1: record.pilar1_investigacao || "",
      pilar2: record.pilar2_fitoterapia || "",
      pilar3: record.pilar3_metabolismo || "",
      pilar4: record.pilar4_estresse || "",
      pilar5: record.pilar5_evolucao || "",
      notes: record.notes || ""
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Submit Unificado (Create/Update)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Usando controle manual ao invés de action direta para melhor UX
    
    if (!formData.title) {
      toast.error("O título é obrigatório.");
      return;
    }
    
    setLoading(true);
    
    const data = new FormData();
    data.append("patientId", patientId);
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      let result;
      if (selectedRecordId) {
        result = await updateMedicalRecord(selectedRecordId, data);
      } else {
        result = await saveMedicalRecord(data);
      }

      if (result.error) throw new Error(result.error);

      toast.success(selectedRecordId ? "Registro atualizado!" : "Evolução criada!");
      await fetchRecords();
      
      if (!selectedRecordId) handleNewEvolution(); // Limpa se foi criação

    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Deletar
  const handleDelete = async () => {
    if (!selectedRecordId) return;
    
    const toastId = toast.loading("Excluindo...");
    try {
      const res = await deleteMedicalRecord(selectedRecordId, patientId);
      if (res.error) throw new Error(res.error);
      
      toast.dismiss(toastId);
      toast.success("Registro excluído.");
      handleNewEvolution();
      fetchRecords();
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Não foi possível excluir.");
    }
  };

  const tabs = [
    { id: "pilar1", icon: Search, label: "Investigação", color: "text-blue-400" },
    { id: "pilar2", icon: Leaf, label: "Fitoterapia", color: "text-[#76A771]" },
    { id: "pilar3", icon: Activity, label: "Metabolismo", color: "text-orange-400" },
    { id: "pilar4", icon: Heart, label: "Estresse", color: "text-red-400" },
    { id: "pilar5", icon: Sparkles, label: "Evolução", color: "text-purple-400" },
  ];

  // Helper para ícones visuais na lista
  const getRecordIcon = (title: string) => {
    if (title.includes("WhatsApp")) return <MessageCircle className="w-4 h-4 text-green-400" />;
    if (title.includes("Automação") || title.includes("Bot")) return <Bot className="w-4 h-4 text-purple-400" />;
    return <User className="w-4 h-4 text-[#76A771]" />;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-200px)] min-h-[600px]">
      
      {/* --- SIDEBAR: HISTÓRICO --- */}
      <div className="lg:col-span-4 flex flex-col h-full bg-[#0A311D]/90 border border-[#2A5432]/50 rounded-2xl shadow-xl backdrop-blur-md overflow-hidden">
        <div className="p-4 border-b border-[#2A5432]/30 flex justify-between items-center bg-[#062214]/50">
          <div className="flex items-center gap-2 text-white font-bold">
            <History className="w-5 h-5 text-[#76A771]" />
            <h3>Histórico</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={fetchRecords} disabled={loadingHistory} className="h-8 w-8 text-gray-400 hover:text-white">
            <RefreshCcw className={cn("w-4 h-4", loadingHistory && "animate-spin")} />
          </Button>
        </div>

        <div className="p-3 border-b border-[#2A5432]/30 bg-[#062214]/20">
           <Button 
             onClick={handleNewEvolution} 
             variant={selectedRecordId === null ? "secondary" : "outline"}
             className={cn(
               "w-full justify-start font-bold border-dashed border-[#2A5432]",
               selectedRecordId === null ? "bg-[#76A771] text-[#062214] hover:bg-[#659160]" : "text-[#76A771] hover:text-[#76A771] hover:bg-[#2A5432]/20"
             )}
           >
             <FilePlus2 className="w-4 h-4 mr-2" /> Nova Evolução
           </Button>
        </div>

        <ScrollArea className="flex-1 p-3">
          <div className="space-y-2">
            {records.length === 0 && !loadingHistory ? (
                <div className="flex flex-col items-center justify-center py-10 text-gray-500 gap-2">
                    <History className="w-8 h-8 opacity-20" />
                    <p className="text-xs">Nenhum registro.</p>
                </div>
            ) : (
                records.map((rec) => (
                <div 
                    key={rec.id}
                    onClick={() => handleSelectRecord(rec)}
                    className={cn(
                    "p-3 rounded-lg border cursor-pointer transition-all hover:bg-[#2A5432]/30 group relative overflow-hidden",
                    selectedRecordId === rec.id 
                        ? "bg-[#2A5432]/40 border-[#76A771] shadow-lg" 
                        : "bg-[#062214]/40 border-[#2A5432]/30 border-transparent"
                    )}
                >
                    {selectedRecordId === rec.id && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#76A771]" />
                    )}
                    
                    <div className="flex justify-between items-start mb-1 pl-2">
                        <span className={cn(
                            "text-sm font-bold line-clamp-1", 
                            selectedRecordId === rec.id ? "text-white" : "text-gray-300"
                        )}>
                            {rec.title}
                        </span>
                        <Badge variant="outline" className="text-[10px] border-[#2A5432] text-gray-400 h-5 px-1.5 ml-2 shrink-0 bg-[#062214]">
                            {format(new Date(rec.date), "dd/MM")}
                        </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500 pl-2 mt-2">
                        {getRecordIcon(rec.title)}
                        <span className="line-clamp-1 truncate">
                            {rec.notes ? rec.notes : "Sem observações..."}
                        </span>
                    </div>
                </div>
                ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* --- MAIN: FORMULÁRIO --- */}
      <form 
        onSubmit={handleSubmit}
        className="lg:col-span-8 flex flex-col h-full bg-[#0A311D]/90 border border-[#2A5432]/50 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden relative"
      >
        {/* HEADER DO FORM */}
        <div className="shrink-0 p-6 border-b border-[#2A5432]/30 bg-[#062214]/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-lg transition-colors", selectedRecordId ? "bg-blue-500/20" : "bg-[#2A5432]/20")}>
              {selectedRecordId ? (
                  <Pill className={cn("w-6 h-6", selectedRecordId ? "text-blue-400" : "text-[#76A771]")} />
              ) : (
                  <FilePlus2 className="w-6 h-6 text-[#76A771]" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight flex items-center gap-2">
                {selectedRecordId ? "Editando Registro" : "Nova Evolução"}
                {selectedRecordId && <Badge className="bg-blue-500/20 text-blue-400 border-none text-[10px] h-5">Modo Edição</Badge>}
              </h2>
              <p className="text-xs text-gray-400">
                {selectedRecordId 
                    ? "As alterações serão salvas diretamente neste registro." 
                    : "Preencha os dados abaixo para criar um novo registro."}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
              <Input 
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Título (ex: Consulta Inicial)" 
                className="bg-[#062214] border-[#2A5432] text-white placeholder:text-gray-500 focus-visible:ring-[#76A771] w-full md:w-64 h-10 font-medium" 
                required 
              />
              
              {selectedRecordId && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button type="button" variant="destructive" size="icon" className="h-10 w-10 shrink-0 bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-900/50">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-[#0A311D] border-[#2A5432] text-white">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Excluir registro?</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400">
                                Tem certeza que deseja apagar "{formData.title}"? Esta ação é irreversível.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="bg-transparent border-[#2A5432] text-gray-300 hover:bg-[#2A5432] hover:text-white">Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-700 border-none">Confirmar Exclusão</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
              )}
          </div>
        </div>

        {/* CONTEÚDO (ABAS) */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
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

          <div className="flex-1 relative min-h-0 bg-[#062214]/20 mx-6 mb-2 rounded-xl border border-[#2A5432]/20 overflow-hidden group">
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="h-full mt-0 data-[state=inactive]:hidden">
                 <div className="h-full flex flex-col">
                   <div className="shrink-0 px-4 py-2 flex items-center gap-2 border-b border-[#2A5432]/10 bg-[#062214]/20">
                     <tab.icon className={cn("w-4 h-4", tab.color)} />
                     <span className={cn("text-xs font-bold uppercase tracking-widest opacity-80", tab.color)}>
                       {tab.label}
                     </span>
                   </div>
                   
                   <Textarea 
                     value={formData[tab.id as keyof typeof formData]}
                     onChange={(e) => handleChange(tab.id, e.target.value)}
                     placeholder={`Descreva os detalhes sobre ${tab.label}...`}
                     className={cn(
                       "flex-1 w-full resize-none bg-transparent border-none text-gray-200 placeholder:text-gray-600/50 p-4 text-base leading-relaxed focus-visible:ring-0",
                       "scrollbar-thin scrollbar-thumb-[#2A5432] scrollbar-track-transparent hover:scrollbar-thumb-[#76A771]"
                     )}
                   />
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
        
        {/* FOOTER DE AÇÃO */}
        <div className="shrink-0 p-6 pt-4 bg-[#062214]/30 border-t border-[#2A5432]/30 flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full relative">
              <label className="text-[10px] font-bold text-gray-500 mb-1.5 block uppercase ml-1">
                Nota Interna (Privada)
              </label>
              <Input 
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Observações visíveis apenas no histórico..." 
                className="bg-[#062214] border-[#2A5432] text-gray-400 text-sm h-10 focus-visible:ring-[#2A5432]"
              />
            </div>

            <Button 
              type="submit" 
              className={cn(
                  "w-full md:w-auto min-w-[180px] font-bold h-10 transition-all",
                  selectedRecordId 
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]" 
                    : "bg-[#76A771] hover:bg-[#659160] text-[#062214] shadow-[0_0_15px_rgba(118,167,113,0.2)]"
              )}
              disabled={loading}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <Save className="w-5 h-5 mr-2" /> {selectedRecordId ? "Atualizar Alterações" : "Salvar Evolução"}
                </>
              )}
            </Button>
        </div>
      </form>
    </div>
  );
}