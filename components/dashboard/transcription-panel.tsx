"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Loader2,
    Save,
    CheckCircle2,
    FileAudio,
    ChevronDown,
    ChevronUp,
    Send,
    Play,
    Edit3,
    Download,
    Trash2,
    Music,
    AlertCircle,
    XCircle
} from "lucide-react";
import {
    saveFinalTranscription,
    sendTranscriptionToPEP,
    deleteTranscriptionRecord
} from "@/actions/transcription";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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

interface RecordWithTranscription {
    id: string;
    date: Date;
    title: string;
    transcriptionStatus: string;
    transcription: string | null;
    audioUrl: string | null;
    notes?: string | null;
}

export function TranscriptionPanel({
    records,
    patientId
}: {
    records: RecordWithTranscription[],
    patientId: string
}) {
    // Só mostramos registros que são especificamente de transcrição
    const transcriptions = records.filter(r => r.transcriptionStatus !== "NONE" && r.title.includes("Transcrição"));

    if (transcriptions.length === 0) {
        return (
            <div className="text-center py-16 bg-[#0A311D]/30 rounded-xl border-2 border-dashed border-[#2A5432]/50 flex flex-col items-center">
                <FileAudio className="w-12 h-12 text-[#2A5432] mb-3" />
                <p className="text-gray-400">Nenhuma transcrição encontrada neste prontuário.</p>
                <p className="text-sm text-gray-500 mt-1">Utilize o botão superior "Gravar Consulta" para iniciar uma nova.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 max-w-4xl mx-auto pb-10">
            <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-white font-bold flex items-center gap-2">
                    <FileAudio className="w-5 h-5 text-[#76A771]" />
                    Histórico de Transcrições ({transcriptions.length})
                </h3>
            </div>

            <div className="space-y-3">
                {transcriptions.map((record) => (
                    <TranscriptionItem key={record.id} record={record} patientId={patientId} />
                ))}
            </div>
        </div>
    );
}

function TranscriptionItem({ record, patientId }: { record: RecordWithTranscription, patientId: string }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [text, setText] = useState(record.transcription || "");
    const [isSaving, setIsSaving] = useState(false);
    const [isMigrating, setIsMigrating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(record.transcriptionStatus === "COMPLETED");

    const handleSave = async () => {
        setIsSaving(true);
        const res = await saveFinalTranscription(record.id, text, patientId);
        setIsSaving(false);

        if (res.success) {
            toast.success("Transcrição revisada e salva!");
            setIsEditing(false);
        } else {
            toast.error("Erro ao salvar.");
        }
    };

    const handleSendToPEP = async () => {
        if (!text) return;
        setIsMigrating(true);
        const res = await sendTranscriptionToPEP(record.id, text, patientId);
        setIsMigrating(false);

        if (res.success) {
            toast.success("Enviado para o Prontuário!");
            setIsExpanded(false);
        } else {
            toast.error("Erro ao enviar para o PEP.");
        }
    };

    const handleDelete = async () => {
        const toastId = toast.loading("Excluindo registro...");
        setIsDeleting(true);
        try {
            const res = await deleteTranscriptionRecord(record.id, record.audioUrl, patientId);
            setIsDeleting(false);
            toast.dismiss(toastId);

            if (res.success) {
                toast.success("Transcrição excluída com sucesso!");
            } else {
                toast.error("Erro ao excluir registro.");
            }
        } catch (e) {
            setIsDeleting(false);
            toast.dismiss(toastId);
            toast.error("Erro inesperado.");
        }
    };

    const downloadText = () => {
        const element = document.createElement("a");
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `Transcricao-${new Date(record.date).toLocaleDateString('pt-BR')}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const isPending = record.transcriptionStatus === "PENDING";
    const isFinalized = record.transcriptionStatus === "FINALIZED";
    const isMigrated = record.notes?.includes("Migrado");

    return (
        <Card className={cn(
            "bg-[#0A311D]/40 border-[#2A5432]/30 overflow-hidden transition-all duration-300",
            isExpanded ? "ring-1 ring-[#76A771]/50 bg-[#0A311D]/60 shadow-xl" : "hover:bg-[#0A311D]/60"
        )}>
            {/* Cabeçalho do Item */}
            <div className="flex items-center justify-between p-4 cursor-pointer group">
                <div onClick={() => setIsExpanded(!isExpanded)} className="flex items-center gap-4 flex-1">
                    <div className={cn(
                        "p-2 rounded-full hidden sm:block",
                        isFinalized ? "bg-[#76A771]/10 text-[#76A771]" : "bg-blue-500/10 text-blue-400"
                    )}>
                        <FileAudio className="w-5 h-5" />
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-sm sm:text-base">
                                {new Date(record.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                            </span>
                            {isMigrated && <Badge className="bg-[#76A771]/20 text-[#76A771] border-none text-[10px]">No Prontuário</Badge>}
                        </div>
                        <div className="flex gap-2 mt-1">
                            {isPending && <span className="text-[10px] text-yellow-500 flex items-center animate-pulse uppercase font-bold tracking-wide">Salvando Áudio/IA...</span>}
                            {!isPending && !isFinalized && <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Aguardando Revisão</span>}
                            {isFinalized && <span className="text-[10px] text-gray-500 font-medium">Revisado às {new Date(record.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-red-900/40 hover:text-red-500 hover:bg-red-500/10 transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-[#0A311D] border-[#2A5432] text-white">
                            <AlertDialogHeader>
                                <AlertDialogTitle>{isPending ? "Abortar Transcrição?" : "Excluir Registro?"}</AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-400">
                                    {isPending
                                        ? "A IA parece estar demorando muito. Você pode abortar esta tarefa e excluir o áudio do servidor agora."
                                        : "Isso apagará o texto e também o arquivo de áudio do servidor permanentemente. Esta ação não pode ser desfeita."
                                    }
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="bg-transparent border-[#2A5432] text-gray-300">Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-700 border-none">
                                    Confirmar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <div onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-[#76A771]" />}
                    </div>
                </div>
            </div>

            {/* Conteúdo Expandido */}
            {isExpanded && (
                <CardContent className="pt-0 pb-6 px-6 animate-in fade-in slide-in-from-top-2">
                    <div className="h-px w-full bg-[#2A5432]/20 mb-4" />

                    {isPending ? (
                        <div className="py-12 flex flex-col items-center justify-center text-gray-500 bg-[#062214]/30 rounded-lg relative overflow-hidden">
                            <div className="absolute top-4 right-4">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="sm" className="text-red-900/40 hover:text-red-400 gap-2 h-8">
                                            <XCircle className="w-4 h-4" /> Abortar
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-[#0A311D] border-[#2A5432] text-white">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Interromper?</AlertDialogTitle>
                                            <AlertDialogDescription className="text-gray-400">
                                                O áudio será excluído para evitar cobranças e você poderá gravar novamente.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="bg-transparent border-[#2A5432] text-gray-300">Voltar</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleDelete} className="bg-red-600">Sim, Abortar</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>

                            <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#76A771]" />
                            <p className="font-bold text-white text-lg">Processando áudio...</p>
                            <div className="flex items-center gap-2 mt-2 px-4 py-1.5 bg-[#76A771]/10 rounded-full border border-[#76A771]/20">
                                <AlertCircle className="w-3.5 h-3.5 text-[#76A771]" />
                                <span className="text-[11px] text-[#76A771] font-medium">O Gemini está gerando o texto. Aguarde alguns instantes.</span>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Player e Download */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                {record.audioUrl && (
                                    <div className="flex-1 flex items-center gap-3 bg-[#062214]/50 p-2 rounded-lg border border-[#2A5432]/30">
                                        <div className="p-1.5 bg-[#2A5432]/20 rounded-md">
                                            <Music className="w-3.5 h-3.5 text-[#76A771]" />
                                        </div>
                                        <audio controls className="h-8 flex-1 opacity-80 hover:opacity-100 transition-opacity">
                                            <source src={record.audioUrl} type="audio/webm" />
                                        </audio>
                                    </div>
                                )}

                                {record.audioUrl && (
                                    <a href={record.audioUrl} target="_blank" rel="noopener noreferrer" className="block">
                                        <Button variant="outline" className="w-full sm:w-auto h-12 border-[#2A5432] text-gray-300 gap-2 font-semibold">
                                            <Download className="w-4 h-4" /> Audio
                                        </Button>
                                    </a>
                                )}
                            </div>

                            {/* Editor de Texto */}
                            <div className="relative">
                                <div className="flex items-center justify-between mb-2 px-1">
                                    <label className="text-xs font-bold text-[#76A771] uppercase tracking-widest flex items-center gap-2">
                                        Transcrição da Consulta
                                        {isFinalized && <CheckCircle2 className="w-3.5 h-3.5" />}
                                    </label>

                                    <div className="flex items-center gap-2">
                                        {text && (
                                            <Button variant="ghost" size="sm" onClick={downloadText} className="h-7 text-[10px] text-gray-500 hover:text-[#76A771]">
                                                <Download className="w-3 w-3 mr-1" /> Baixar TXT
                                            </Button>
                                        )}
                                        {!isEditing && isFinalized && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setIsEditing(true)}
                                                className="h-7 text-[10px] text-blue-400 hover:bg-blue-400/10"
                                            >
                                                <Edit3 className="w-3.5 h-3.5 mr-1" /> Editar
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                <Textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className={cn(
                                        "min-h-[220px] bg-[#062214] border-[#2A5432] text-gray-200 resize-y focus-visible:ring-[#76A771] leading-relaxed",
                                        !isEditing && "opacity-70 cursor-default"
                                    )}
                                    placeholder="Nenhum texto detectado..."
                                    readOnly={!isEditing}
                                />
                            </div>

                            {/* Ações */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#2A5432]/10">
                                {isEditing ? (
                                    <Button onClick={handleSave} disabled={isSaving || !text} className="bg-blue-600 hover:bg-blue-500 text-white font-bold flex-1 h-12 rounded-xl shadow-lg">
                                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
                                        Finalizar Revisão
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleSendToPEP}
                                        disabled={isMigrating || !text}
                                        className="bg-[#76A771] hover:bg-[#659160] text-[#062214] font-bold flex-1 h-12 rounded-xl gap-2 shadow-xl shadow-[#76A771]/10 transition-all hover:scale-[1.02]"
                                    >
                                        {isMigrating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                        Mover para Prontuário
                                    </Button>
                                )}

                                <Button
                                    variant="outline"
                                    onClick={() => setIsExpanded(false)}
                                    className="border-[#2A5432] text-gray-400 h-12 px-6 rounded-xl"
                                >
                                    Recolher
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            )}
        </Card>
    );
}