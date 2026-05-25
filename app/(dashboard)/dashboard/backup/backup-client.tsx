"use client";

import { useState, useTransition, useRef } from "react";
import { toast } from "sonner";
import { exportAllData, importAllData } from "@/actions/backup";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  UploadCloud,
  Database,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  FileJson,
  Info,
  ShieldCheck,
  Search
} from "lucide-react";

// Dicionário de tradução amigável para as tabelas
const TABLE_LABELS: Record<string, string> = {
  users: "Usuários",
  plans: "Planos & Preços",
  siteInfos: "Configuração do Site",
  mentorships: "Mentorias",
  trialInvites: "Convites de Trial",
  courses: "Cursos",
  patients: "Pacientes",
  subscriptions: "Assinaturas",
  doctorSchedules: "Agendas de Profissionais",
  notifications: "Notificações",
  leads: "Leads (CRM)",
  medicalRecords: "Prontuários & Transcrições",
  prescriptions: "Receituários",
  exams: "Exames Anexados",
  anamnesis: "Anamneses Gerais",
  weeklyCheckins: "Check-ins Semanais",
  documents: "Documentos de Pacientes",
  epigeneticAnamneses: "Anamneses Epigenéticas",
  appointments: "Consultas Agendadas",
  transactions: "Transações Financeiras",
  purchases: "Matrículas em Cursos",
  modules: "Módulos de Cursos",
  lessons: "Aulas de Módulos",
  moduleMaterials: "Materiais Didáticos",
  quizzes: "Quizzes de Módulos",
  questions: "Perguntas de Quizzes",
  options: "Opções de Perguntas",
  userLessonProgresses: "Progresso de Aulas",
  certificates: "Certificados Emitidos"
};

export function BackupClient() {
  const [isExporting, startExport] = useTransition();
  const [isImporting, startImport] = useTransition();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [importSummary, setImportSummary] = useState<Record<string, { imported: number; duplicates: number }> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manipular Exportação
  const handleExport = () => {
    startExport(async () => {
      const res = await exportAllData();
      if (!res.success || !res.data) {
        toast.error(res.error || "Erro desconhecido ao exportar dados.");
        return;
      }

      try {
        const blob = new Blob([res.data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const dateStr = new Date().toISOString().split("T")[0];
        a.href = url;
        a.download = `fitoclin_backup_${dateStr}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("Backup exportado com sucesso! Salve o arquivo JSON com segurança.");
      } catch (err) {
        console.error(err);
        toast.error("Erro ao baixar o arquivo de backup.");
      }
    });
  };

  // Manipular Drag and Drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/json" || file.name.endsWith(".json")) {
        setSelectedFile(file);
        toast.success(`Arquivo ${file.name} selecionado!`);
      } else {
        toast.error("Por favor, selecione apenas arquivos .json.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      toast.success(`Arquivo ${file.name} selecionado!`);
    }
  };

  // Executar Importação
  const handleImport = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      
      startImport(async () => {
        try {
          // Validação rápida de sintaxe JSON antes de enviar ao servidor
          JSON.parse(content);
        } catch (err) {
          toast.error("O arquivo selecionado não é um JSON válido. Verifique se o arquivo está corrompido.");
          return;
        }

        const res = await importAllData(content);
        if (!res.success) {
          toast.error(res.error || "Erro ao processar importação.");
          return;
        }

        if (res.summary) {
          setImportSummary(res.summary);
          setIsDialogOpen(true);
          setSelectedFile(null);
          
          // Calcular totais de novos e duplicados
          let totalImported = 0;
          let totalDuplicates = 0;
          Object.values(res.summary).forEach((val) => {
            totalImported += val.imported;
            totalDuplicates += val.duplicates;
          });

          if (totalImported > 0) {
            toast.success(`Importação concluída! ${totalImported} novos registros inseridos.`);
          } else {
            toast.info("Nenhum registro novo encontrado. Todos os dados já existiam no banco.");
          }
          
          if (totalDuplicates > 0) {
            toast.warning(`${totalDuplicates} registros duplicados foram detectados e descartados.`);
          }
        }
      });
    };

    reader.readAsText(selectedFile);
  };

  // Filtrar sumário baseado na pesquisa
  const filteredSummary = importSummary
    ? Object.entries(importSummary).filter(([key]) => {
        const label = TABLE_LABELS[key] || key;
        return label.toLowerCase().includes(searchQuery.toLowerCase());
      })
    : [];

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-[#2A5432]/30 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            <Database className="w-8 h-8 text-[#76A771]" />
            Backup & Restauração
          </h1>
          <p className="text-gray-400 mt-1">
            Exportar todos os dados da clínica e cursos para um arquivo JSON ou restaurá-los com eliminação automática de duplicatas.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#051F12] border border-[#2A5432]/40 rounded-xl px-4 py-2 text-[#76A771] text-xs font-bold uppercase tracking-wider shadow-inner">
          <ShieldCheck className="w-4 h-4" />
          Acesso Administrador
        </div>
      </div>

      {/* Grid de Ações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CARD EXPORTAR */}
        <Card className="bg-[#06180e] border-[#2A5432]/40 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
          
          <CardHeader className="border-b border-[#2A5432]/20 pb-4">
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-[#76A771]" />
              Exportar Todos os Dados
            </CardTitle>
            <CardDescription className="text-gray-400">
              Gera um arquivo JSON completo contendo todas as 29 tabelas da base de dados (usuários, pacientes, prontuários, cursos, financeiro, etc).
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6 space-y-6">
            <div className="bg-[#03120b] border border-[#2A5432]/20 rounded-xl p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#76A771] shrink-0 mt-0.5" />
              <div className="text-xs text-gray-300 leading-relaxed">
                <strong className="text-white">Dica de Segurança:</strong> Este backup contém informações confidenciais de pacientes, dados financeiros e credenciais de acesso. Mantenha o arquivo gerado em um local extremamente seguro e criptografado.
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-8 border border-dashed border-[#2A5432]/30 rounded-xl bg-[#03120b]/50">
              <FileJson className="w-16 h-16 text-[#76A771]/40 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm text-gray-400 text-center max-w-[280px]">
                Todos os dados serão empacotados em um único arquivo estruturado pronto para download.
              </p>
            </div>

            <Button
              onClick={handleExport}
              disabled={isExporting || isImporting}
              className="w-full bg-gradient-to-r from-primary to-[#4a9e64] hover:from-[#4a9e64] hover:to-primary text-white font-bold h-12 shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
            >
              {isExporting ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Gerando arquivo de backup...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Exportar e Baixar JSON
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* CARD IMPORTAR */}
        <Card className="bg-[#06180e] border-[#2A5432]/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#76A771]/5 blur-3xl rounded-full pointer-events-none" />
          
          <CardHeader className="border-b border-[#2A5432]/20 pb-4">
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-[#76A771]" />
              Importar Backup
            </CardTitle>
            <CardDescription className="text-gray-400">
              Restaura a base de dados a partir de um arquivo JSON anteriormente exportado.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6 space-y-6">
            <div className="bg-[#03120b] border border-[#2A5432]/20 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-xs text-gray-300 leading-relaxed">
                <strong className="text-white">Deduplicação Ativa:</strong> O sistema analisa cada registro. Qualquer dado idêntico já cadastrado será <strong className="text-amber-400">automaticamente ignorado</strong>, evitando chaves duplicadas e salvando apenas novos registros de forma limpa.
              </div>
            </div>

            {/* Dropzone */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
                dragActive
                  ? "border-[#76A771] bg-[#76A771]/10 text-white"
                  : selectedFile
                  ? "border-primary bg-primary/5 text-white"
                  : "border-[#2A5432]/30 hover:border-[#2A5432]/60 bg-[#03120b]/50 text-gray-400"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
              
              <UploadCloud className={`w-12 h-12 mb-3 transition-transform ${dragActive ? "scale-110 text-[#76A771]" : selectedFile ? "text-primary scale-105" : "text-gray-500"}`} />
              
              {selectedFile ? (
                <div className="text-center">
                  <p className="text-sm font-bold text-[#76A771] truncate max-w-[250px] mx-auto">
                    {selectedFile.name}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    {(selectedFile.size / 1024).toFixed(1)} KB • Pronto para importar
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm font-medium">
                    Arraste seu arquivo JSON ou clique para navegar
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Aceita apenas arquivos JSON de backup do Fitoclin
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {selectedFile && (
                <Button
                  variant="outline"
                  onClick={() => setSelectedFile(null)}
                  disabled={isImporting}
                  className="border-red-900/40 text-red-400 hover:bg-red-500/10 hover:text-white"
                >
                  Cancelar
                </Button>
              )}
              
              <Button
                onClick={handleImport}
                disabled={!selectedFile || isImporting || isExporting}
                className={`flex-1 font-bold h-12 shadow-lg transition-all duration-300 ${
                  selectedFile
                    ? "bg-[#76A771] text-[#062214] hover:bg-[#8bc97d] hover:scale-[1.01] active:scale-[0.99]"
                    : "bg-[#051F12] border border-[#2A5432]/20 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isImporting ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Processando importação inteligente...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Confirmar Restauração
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* MODAL DE RESULTADO DA IMPORTAÇÃO */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#06180e] border-[#2A5432]/40 text-white max-w-2xl max-h-[85vh] flex flex-col p-6 rounded-2xl shadow-2xl">
          <DialogHeader className="border-b border-[#2A5432]/20 pb-4">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-7 h-7 text-[#76A771]" />
              Resumo da Importação
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-sm mt-1">
              Confira abaixo quantos novos registros foram criados e quantas duplicatas foram descartadas com segurança.
            </DialogDescription>
          </DialogHeader>

          {/* Filtro de pesquisa */}
          <div className="relative my-4">
            <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-400" />
            <input
              type="text"
              placeholder="Filtrar tabela..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#03120b] border border-[#2A5432]/30 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#76A771] placeholder-gray-500"
            />
          </div>

          {/* Tabela do Sumário */}
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar min-h-[250px] border border-[#2A5432]/20 rounded-xl bg-[#03120b]/50">
            <Table>
              <TableHeader className="bg-[#051F12]">
                <TableRow className="border-[#2A5432]/20 hover:bg-transparent">
                  <TableHead className="text-[#76A771] font-bold">Tabela</TableHead>
                  <TableHead className="text-center text-[#76A771] font-bold">Importados (Novos)</TableHead>
                  <TableHead className="text-center text-amber-500 font-bold">Duplicatas Ignoradas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSummary.length > 0 ? (
                  filteredSummary.map(([key, value]) => {
                    const label = TABLE_LABELS[key] || key;
                    if (value.imported === 0 && value.duplicates === 0) return null; // Esconde tabelas sem ação para limpar visual
                    
                    return (
                      <TableRow key={key} className="border-[#2A5432]/10 hover:bg-[#2A5432]/10 transition-colors">
                        <TableCell className="font-semibold text-sm text-gray-200">
                          {label}
                        </TableCell>
                        <TableCell className="text-center font-bold text-[#76A771]">
                          {value.imported > 0 ? `+${value.imported}` : "-"}
                        </TableCell>
                        <TableCell className="text-center font-semibold text-amber-400/90">
                          {value.duplicates > 0 ? value.duplicates : "-"}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                      Nenhum registro alterado nesta importação.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="border-t border-[#2A5432]/20 pt-4 mt-6 flex justify-end">
            <Button
              onClick={() => setIsDialogOpen(false)}
              className="bg-[#2A5432] hover:bg-[#1f3f25] text-white font-bold px-6"
            >
              Fechar Resumo
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
