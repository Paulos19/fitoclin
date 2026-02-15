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
import { getPatientEvolutions } from "@/actions/record"; // <--- Importe a nova action
import { generatePrescriptionSuggestion } from "@/actions/ai"; // <--- Importe a action da IA

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

interface PrescriptionPanelProps {
  patientId: string;
  patientName: string;
  patientDetails?: string; // Ex: "32 anos"
  patientEmail?: string | null;
  patientPhone?: string | null;
  doctorName?: string;
}

interface PrescriptionDoc {
  id: string;
  title: string;
  url: string;
  createdAt: Date;
}

interface EvolutionRecord {
  id: string;
  date: Date;
  title: string;
  pilar5_evolucao: string | null;
  notes: string | null;
}

export function PrescriptionPanel({ 
  patientId, 
  patientName, 
  patientDetails,
  patientEmail,
  patientPhone,
  doctorName
}: PrescriptionPanelProps) {
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false); // PDF Generation
  const [logoBase64, setLogoBase64] = useState<string>("");
  
  // Estados para o Histórico
  const [history, setHistory] = useState<PrescriptionDoc[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // Estados para IA
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [manualComplaint, setManualComplaint] = useState("");
  const [evolutions, setEvolutions] = useState<EvolutionRecord[]>([]);
  const [selectedEvolutionId, setSelectedEvolutionId] = useState<string>("");

  // Carregar Logo
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

  // Busca Histórico
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

  // Busca Evoluções quando abre o Modal de IA
  const handleOpenAiModal = async (open: boolean) => {
    setIsAiModalOpen(open);
    if (open && evolutions.length === 0) {
      const records = await getPatientEvolutions(patientId);
      // @ts-ignore
      setEvolutions(records);
    }
  };

  // --- FUNÇÃO GERAR COM IA ---
  const handleGenerateAiSuggestion = async () => {
    let complaintText = "";

    // Lógica para decidir qual texto enviar
    if (manualComplaint.trim()) {
      complaintText = manualComplaint;
    } else if (selectedEvolutionId) {
      const record = evolutions.find(e => e.id === selectedEvolutionId);
      complaintText = record?.pilar5_evolucao || record?.notes || "";
    }

    if (!complaintText) {
      toast.warning("Selecione uma evolução ou escreva a queixa manualmente.");
      return;
    }

    setIsAiLoading(true);

    try {
      // Extrair idade numérica do patientDetails (ex: "32 anos")
      const ageMatch = patientDetails?.match(/\d+/);
      const age = ageMatch ? parseInt(ageMatch[0]) : "N/A";

      const result = await generatePrescriptionSuggestion({
        patientName,
        age,
        complaint: complaintText
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        // Formata a resposta da IA para o textarea
        // Supondo que o n8n devolva { suggestions: [ ... ], analysis: "..." } ou um texto puro
        const aiResponse = result.success; 
        
        let formattedText = "";
        
        // Se a IA já retornar string formatada
        if (typeof aiResponse === 'string') {
            formattedText = aiResponse;
        } 
        // Se retornar JSON estruturado (ajuste conforme seu fluxo n8n)
        else if (aiResponse.suggestions) {
            formattedText = `📋 ANÁLISE CLÍNICA:\n${aiResponse.analysis}\n\n`;
            formattedText += `💊 PRESCRIÇÃO SUGERIDA:\n`;
            aiResponse.suggestions.forEach((item: any, idx: number) => {
                formattedText += `${idx + 1}. ${item.name}\n   Posologia: ${item.dosage}\n   Nota: ${item.reason}\n\n`;
            });
            if(aiResponse.alerts) formattedText += `⚠️ ALERTAS: ${aiResponse.alerts}\n`;
        }

        // Adiciona ao editor existente
        setContent(prev => prev ? `${prev}\n\n---\n\n${formattedText}` : formattedText);
        
        toast.success("Sugestão gerada com sucesso!");
        setIsAiModalOpen(false);
        setManualComplaint("");
        setSelectedEvolutionId("");
      }
    } catch (error) {
      toast.error("Erro de comunicação com a IA.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Funções de Deletar e Salvar (Mantidas iguais)
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
                    {/* BOTÃO LIMPAR */}
                    {content.length > 0 && (
                        <Button 
                            variant="ghost" size="sm" onClick={() => setContent("")}
                            className="text-gray-400 hover:text-white"
                        >
                            Limpar
                        </Button>
                    )}

                    {/* BOTÃO IA (NOVO) */}
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
                                    Escolha a fonte de dados para a IA analisar e sugerir fitoterápicos.
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

                                {/* ABA: PRONTUÁRIO */}
                                <TabsContent value="record" className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label className="text-gray-300">Selecione uma consulta recente:</Label>
                                        <Select onValueChange={(val) => {
                                            setSelectedEvolutionId(val);
                                            setManualComplaint(""); // Limpa o manual se escolher record
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
                                        
                                        {selectedEvolutionId && (
                                            <div className="bg-[#062214]/50 p-3 rounded-md border border-[#2A5432]/30 mt-2 max-h-[100px] overflow-y-auto">
                                                <p className="text-xs text-gray-400 italic">
                                                    "{evolutions.find(e => e.id === selectedEvolutionId)?.pilar5_evolucao?.slice(0, 150)}..."
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>

                                {/* ABA: MANUAL */}
                                <TabsContent value="manual" className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label className="text-gray-300">Descreva as queixas e sintomas:</Label>
                                        <Textarea 
                                            placeholder="Ex: Paciente relata insônia inicial, ansiedade durante o trabalho e dores musculares..."
                                            className="bg-[#062214] border-[#2A5432] text-white h-[120px] resize-none"
                                            value={manualComplaint}
                                            onChange={(e) => {
                                                setManualComplaint(e.target.value);
                                                setSelectedEvolutionId(""); // Limpa o record se digitar manual
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