"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { pdf } from "@react-pdf/renderer";
import { PrescriptionPDF } from "@/components/documents/prescription-pdf";
import { uploadDocument, getPatientPrescriptions, deleteDocument } from "@/actions/documents";
import { getPatientEvolutions } from "@/actions/record"; 
import { generatePrescriptionSuggestion } from "@/actions/ai"; 

import { toast } from "sonner";
import { 
  FileUp, 
  Loader2, 
  Pill, 
  Trash2, 
  Download, 
  History,
  RefreshCcw,
  Sparkles,
  Bot,
  FileText,
  PenLine
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Interface atualizada para receber idade e gênero explicitamente
interface PrescriptionPanelProps {
  patientId: string;
  patientName: string;
  patientDetails?: string; 
  patientEmail?: string | null;
  patientPhone?: string | null;
  doctorName?: string;
  
  // Novos campos obrigatórios para a IA
  patientAge: string | number;
  patientGender: string;
}

interface PrescriptionDoc {
  id: string;
  title: string;
  url: string;
  createdAt: Date;
}

// Interface completa correspondente ao retorno do backend (getPatientEvolutions)
interface EvolutionRecord {
  id: string;
  date: Date;
  title: string;
  pilar1_investigacao: string | null;
  pilar2_fitoterapia: string | null;
  pilar3_metabolismo: string | null;
  pilar4_estresse: string | null;
  pilar5_evolucao: string | null;
  notes: string | null;
}

export function PrescriptionPanel({ 
  patientId, 
  patientName, 
  patientDetails,
  patientEmail,
  patientPhone,
  doctorName,
  // Props desestruturados
  patientAge,
  patientGender
}: PrescriptionPanelProps) {
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [logoBase64, setLogoBase64] = useState<string>("");
  
  // Histórico de Prescrições (PDFs)
  const [history, setHistory] = useState<PrescriptionDoc[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // IA
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [manualComplaint, setManualComplaint] = useState("");
  const [evolutions, setEvolutions] = useState<EvolutionRecord[]>([]);
  const [selectedEvolutionId, setSelectedEvolutionId] = useState<string>("");

  useEffect(() => {
    async function prepareImage() {
      try {
        const response = await fetch("/logo.png");
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => setLogoBase64(reader.result as string);
        reader.readAsDataURL(blob);
      } catch (e) { console.error(e); }
    }
    prepareImage();
  }, []);

  const fetchHistory = useCallback(async () => {
    try {
      setIsLoadingHistory(true);
      const docs = await getPatientPrescriptions(patientId);
      // @ts-ignore 
      setHistory(docs); 
    } catch (error) { toast.error("Erro ao carregar histórico."); } 
    finally { setIsLoadingHistory(false); }
  }, [patientId]);

  useEffect(() => { fetchHistory(); }, [fetchHistory]);

  const handleOpenAiModal = async (open: boolean) => {
    setIsAiModalOpen(open);
    if (open && evolutions.length === 0) {
      const records = await getPatientEvolutions(patientId);
      // @ts-ignore
      setEvolutions(records);
    }
  };

  // --- FUNÇÃO PRINCIPAL: GERAR COM IA ---
  const handleGenerateAiSuggestion = async () => {
    let complaintText = "";

    if (manualComplaint.trim()) {
      complaintText = manualComplaint;
    } else if (selectedEvolutionId) {
      const record = evolutions.find(e => e.id === selectedEvolutionId);
      
      // MONTAGEM DO CONTEXTO CLÍNICO COMPLETO
      if (record) {
        const parts = [];
        parts.push(`[Consulta: ${record.title} - ${format(new Date(record.date), "dd/MM/yyyy")}]`);
        
        if (record.pilar1_investigacao) parts.push(`QUEIXA PRINCIPAL E SINTOMAS:\n${record.pilar1_investigacao}`);
        if (record.pilar3_metabolismo) parts.push(`METABOLISMO/DIGESTÃO:\n${record.pilar3_metabolismo}`);
        if (record.pilar4_estresse) parts.push(`ESTRESSE E EMOCIONAL:\n${record.pilar4_estresse}`);
        if (record.pilar5_evolucao) parts.push(`EVOLUÇÃO DO QUADRO:\n${record.pilar5_evolucao}`);
        if (record.notes) parts.push(`OBSERVAÇÕES ADICIONAIS:\n${record.notes}`);
        
        complaintText = parts.join("\n\n---\n\n");
      }
    }

    if (!complaintText || complaintText.length < 5) {
      toast.warning("A evolução selecionada parece vazia. Por favor, escreva a queixa manualmente ou preencha o prontuário.");
      return;
    }

    setIsAiLoading(true);

    try {
      // Usa os dados passados via props, sem regex
      const result = await generatePrescriptionSuggestion({
        patientName,
        age: patientAge,
        gender: patientGender,
        complaint: complaintText
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        const aiResponse = result.success; 
        let formattedText = "";
        
        if (typeof aiResponse === 'string') {
            formattedText = aiResponse;
        } else if (aiResponse.suggestions) {
            formattedText = `📋 ANÁLISE CLÍNICA:\n${aiResponse.analysis}\n\n`;
            formattedText += `💊 PRESCRIÇÃO SUGERIDA:\n`;
            aiResponse.suggestions.forEach((item: any, idx: number) => {
                formattedText += `${idx + 1}. ${item.name}\n   Posologia: ${item.dosage}\n   Nota: ${item.reason}\n\n`;
            });
            if(aiResponse.alerts) formattedText += `⚠️ ALERTAS: ${aiResponse.alerts}\n`;
        } else if (aiResponse.output) {
             try {
                const inner = JSON.parse(aiResponse.output);
                formattedText = `📋 ANÁLISE: ${inner.analysis}\n\n💊 SUGESTÕES:\n` + 
                inner.suggestions.map((s:any) => `• ${s.name}: ${s.dosage}`).join('\n');
                if(inner.alerts) formattedText += `\n⚠️ ALERTAS: ${inner.alerts}`;
             } catch (e) {
                formattedText = aiResponse.output;
             }
        }

        setContent(prev => prev ? `${prev}\n\n---\n\n${formattedText}` : formattedText);
        toast.success("Sugestão gerada com sucesso!");
        setIsAiModalOpen(false);
        setManualComplaint("");
        setSelectedEvolutionId("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro de comunicação com a IA.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleDelete = async (docId: string) => {
    setIsDeletingId(docId);
    try {
      const result = await deleteDocument(docId);
      if (result.error) toast.error(result.error);
      else {
        toast.success("Prescrição removida.");
        setHistory((prev) => prev.filter((doc) => doc.id !== docId));
      }
    } catch (error) { toast.error("Erro ao deletar."); } 
    finally { setIsDeletingId(null); }
  };

  const handleSaveAndSend = async () => {
    if (!content.trim()) { toast.error("A prescrição não pode estar vazia."); return; }
    setIsGenerating(true);
    try {
      const doc = (
        <PrescriptionPDF
          patientName={patientName}
          patientDetails={patientDetails}
          patientEmail={patientEmail}
          patientPhone={patientPhone}
          doctorName={doctorName}
          date={new Date()}
          content={content}
          logoBase64={logoBase64}
        />
      );
      const blob = await pdf(doc).toBlob();
      const filename = `Receita - ${patientName.split(" ")[0]} - ${format(new Date(), "dd-MM-yyyy")}.pdf`;
      const file = new File([blob], filename, { type: "application/pdf" });
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", `Prescrição - ${format(new Date(), "dd/MM/yyyy HH:mm")}`);
      formData.append("type", "PRESCRIPTION");
      formData.append("patientId", patientId);

      const result = await uploadDocument(formData);
      if (result.error) toast.error(result.error);
      else {
        toast.success("Prescrição salva e enviada!");
        setContent(""); 
        fetchHistory();
      }
    } catch (error) { toast.error("Erro ao gerar PDF."); } 
    finally { setIsGenerating(false); }
  };

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] min-h-[500px]">
        
        {/* --- COLUNA DA ESQUERDA: EDITOR (Ocupa 8/12) --- */}
        <section className="lg:col-span-8 flex flex-col h-full">
          <Card className="bg-[#0A311D]/50 border-[#2A5432]/30 backdrop-blur-sm flex flex-col h-full shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#2A5432]/20 rounded-lg border border-[#2A5432]/30">
                    <Pill className="w-5 h-5 text-[#76A771]" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">Nova Prescrição</CardTitle>
                    <CardDescription className="text-gray-400">
                      Editor de receitas fitoterápicas
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                    {content.length > 0 && (
                        <Button 
                            variant="ghost" size="sm" onClick={() => setContent("")}
                            className="text-gray-400 hover:text-white"
                        >
                            Limpar
                        </Button>
                    )}

                    {/* BOTÃO IA */}
                    <Dialog open={isAiModalOpen} onOpenChange={handleOpenAiModal}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="border-[#76A771] text-[#76A771] hover:bg-[#76A771] hover:text-[#062214] gap-2 transition-all">
                                <Sparkles className="w-4 h-4" />
                                <span className="hidden sm:inline">Sugestão IA</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#0A311D] border-[#2A5432] text-white sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <Bot className="w-5 h-5 text-[#76A771]" /> Assistente de Prescrição
                                </DialogTitle>
                                <DialogDescription className="text-gray-400">
                                    Escolha a fonte de dados para a IA analisar.
                                </DialogDescription>
                            </DialogHeader>

                            <Tabs defaultValue="record" className="w-full mt-4">
                                <TabsList className="grid w-full grid-cols-2 bg-[#062214] border border-[#2A5432]">
                                    <TabsTrigger value="record" className="data-[state=active]:bg-[#2A5432] data-[state=active]:text-white text-gray-400">
                                        <History className="w-4 h-4 mr-2" /> Evolução Salva
                                    </TabsTrigger>
                                    <TabsTrigger value="manual" className="data-[state=active]:bg-[#2A5432] data-[state=active]:text-white text-gray-400">
                                        <PenLine className="w-4 h-4 mr-2" /> Manual
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="record" className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label className="text-gray-300">Selecione uma consulta recente:</Label>
                                        <Select onValueChange={(val) => {
                                            setSelectedEvolutionId(val);
                                            setManualComplaint(""); 
                                        }}>
                                            <SelectTrigger className="bg-[#062214] border-[#2A5432] text-white">
                                                <SelectValue placeholder="Selecione..." />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#062214] border-[#2A5432] text-white">
                                                {evolutions.length > 0 ? evolutions.map((rec) => (
                                                    <SelectItem key={rec.id} value={rec.id} className="focus:bg-[#2A5432]">
                                                        {format(new Date(rec.date), "dd/MM/yyyy")} - {rec.title || "Consulta"}
                                                    </SelectItem>
                                                )) : (
                                                    <div className="p-2 text-sm text-gray-500 text-center">Nenhuma evolução encontrada.</div>
                                                )}
                                            </SelectContent>
                                        </Select>
                                        
                                        {/* PREVIEW DO CONTEXTO */}
                                        {selectedEvolutionId && (
                                            <div className="bg-[#062214]/50 p-3 rounded-md border border-[#2A5432]/30 mt-2 max-h-[150px] overflow-y-auto">
                                                <p className="text-xs text-gray-400 italic">
                                                    {(() => {
                                                        const r = evolutions.find(e => e.id === selectedEvolutionId);
                                                        return r ? (
                                                            <>
                                                                <span className="block font-bold mb-1 text-[#76A771]">Resumo do Prontuário:</span>
                                                                {r.pilar1_investigacao ? `Queixa: ${r.pilar1_investigacao.slice(0, 60)}...` : "Sem queixa principal."}
                                                                <br/>
                                                                {r.pilar3_metabolismo ? `Metab.: ${r.pilar3_metabolismo.slice(0, 40)}...` : ""}
                                                            </>
                                                        ) : "";
                                                    })()}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="manual" className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label className="text-gray-300">Descreva as queixas e sintomas:</Label>
                                        <Textarea 
                                            placeholder="Ex: Paciente relata insônia inicial, ansiedade durante o trabalho e dores musculares..."
                                            className="bg-[#062214] border-[#2A5432] text-white h-[120px] resize-none"
                                            value={manualComplaint}
                                            onChange={(e) => {
                                                setManualComplaint(e.target.value);
                                                setSelectedEvolutionId(""); 
                                            }}
                                        />
                                    </div>
                                </TabsContent>
                            </Tabs>

                            <DialogFooter>
                                <Button 
                                    onClick={handleGenerateAiSuggestion} 
                                    disabled={isAiLoading || (!manualComplaint && !selectedEvolutionId)}
                                    className="w-full bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a] font-bold"
                                >
                                    {isAiLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analisando com IA...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4 mr-2" /> Gerar Prescrição
                                        </>
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col gap-4 min-h-0">
              <div className="flex-1 relative group">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Digite a prescrição aqui...&#10;&#10;Ex:&#10;1. Passiflora Incarnata 200mg&#10;   - Tomar 1 cápsula à noite..."
                  className="w-full h-full bg-[#062214] border-[#2A5432] text-white text-base leading-relaxed p-4 resize-none focus-visible:ring-1 focus-visible:ring-[#76A771] rounded-md scrollbar-thin scrollbar-thumb-[#2A5432] scrollbar-track-transparent"
                />
              </div>
              
              <div className="flex justify-end pt-2 border-t border-[#2A5432]/30">
                <Button 
                  onClick={handleSaveAndSend} 
                  disabled={isGenerating || !logoBase64}
                  className="bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a] font-bold px-8 shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processando...
                    </>
                  ) : (
                    <>
                      <FileUp className="w-4 h-4 mr-2" /> Salvar Prescrição
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* --- COLUNA DA DIREITA: HISTÓRICO --- */}
        <section className="lg:col-span-4 flex flex-col h-full">
          <Card className="bg-[#062214] border-[#2A5432] shadow-inner flex flex-col h-full overflow-hidden">
            <CardHeader className="bg-[#0A311D]/80 border-b border-[#2A5432] py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-[#76A771]" />
                  <CardTitle className="text-white text-sm font-semibold uppercase tracking-wider">Histórico</CardTitle>
                </div>
                <Button 
                  variant="ghost" size="icon" onClick={fetchHistory} disabled={isLoadingHistory}
                  className="h-6 w-6 text-gray-400 hover:text-white"
                >
                  <RefreshCcw className={`w-3 h-3 ${isLoadingHistory ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 min-h-0">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-3">
                  {isLoadingHistory ? (
                    <div className="flex flex-col items-center justify-center py-10 text-gray-500 gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-[#76A771]" />
                      <span className="text-xs">Carregando receitas...</span>
                    </div>
                  ) : history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-gray-500 gap-2 border border-dashed border-[#2A5432] rounded-lg bg-[#0A311D]/30 m-2">
                      <FileText className="w-8 h-8 opacity-20" />
                      <span className="text-sm">Nenhuma prescrição encontrada.</span>
                    </div>
                  ) : (
                    history.map((doc) => (
                      <div 
                        key={doc.id} 
                        className="bg-[#0A311D] border border-[#2A5432]/50 p-3 rounded-lg group hover:border-[#76A771]/50 transition-all hover:bg-[#0E3A24]"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex flex-col gap-0.5 overflow-hidden">
                            <span className="text-white font-medium text-sm truncate" title={doc.title}>
                              {doc.title}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono">
                              {format(new Date(doc.createdAt), "dd 'de' MMM, HH:mm", { locale: ptBR })}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-3 pt-2 border-t border-[#2A5432]/30">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex-1">
                                <Button variant="secondary" size="sm" className="w-full h-7 text-xs bg-[#2A5432]/50 hover:bg-[#76A771] hover:text-[#062214] text-gray-300 border-0 transition-colors">
                                  <Download className="w-3 h-3 mr-1.5" /> PDF
                                </Button>
                              </a>
                            </TooltipTrigger>
                            <TooltipContent><p>Baixar PDF</p></TooltipContent>
                          </Tooltip>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="ghost" size="sm" 
                                className="h-7 w-7 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-md"
                                disabled={isDeletingId === doc.id}
                              >
                                {isDeletingId === doc.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-[#0A311D] border-[#2A5432] text-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Excluir permanentemente?</AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-400">
                                  Esta prescrição será apagada do banco de dados.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-transparent border-[#2A5432] text-gray-300 hover:bg-[#2A5432] hover:text-white">Voltar</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDelete(doc.id)}
                                  className="bg-red-600 text-white hover:bg-red-700 border-none"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
      </div>
    </TooltipProvider>
  );
}