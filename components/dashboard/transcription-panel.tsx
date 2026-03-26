"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mic, Save, CheckCircle2, FileAudio } from "lucide-react";
import { saveFinalTranscription } from "@/actions/transcription";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

// Interface baseada no modelo MedicalRecord
interface RecordWithTranscription {
    id: string;
    date: Date;
    title: string;
    transcriptionStatus: string;
    transcription: string | null;
    audioUrl: string | null;
}

export function TranscriptionPanel({
    records,
    patientId
}: {
    records: RecordWithTranscription[],
    patientId: string
}) {
    const transcriptions = records.filter(r => r.transcriptionStatus !== "NONE" && r.title.includes("Transcrição"));

    if (transcriptions.length === 0) {
        return (
            <div className="text-center py-16 bg-[#0A311D]/30 rounded-xl border-2 border-dashed border-[#2A5432]/50 flex flex-col items-center">
                <Mic className="w-12 h-12 text-[#2A5432] mb-3" />
                <p className="text-gray-400">Nenhuma transcrição encontrada.</p>
                <p className="text-sm text-gray-500 mt-1">Utilize o botão superior "Gravar Consulta" durante o atendimento.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {transcriptions.map((record) => (
                <TranscriptionEditor key={record.id} record={record} patientId={patientId} />
            ))}
        </div>
    );
}

function TranscriptionEditor({ record, patientId }: { record: RecordWithTranscription, patientId: string }) {
    const [text, setText] = useState(record.transcription || "");
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        const res = await saveFinalTranscription(record.id, text, patientId);
        setIsSaving(false);

        if (res.success) {
            toast.success("Transcrição revisada e salva com sucesso!");
        } else {
            toast.error("Erro ao salvar transcrição.");
        }
    };

    const isPending = record.transcriptionStatus === "PENDING";
    const isFinalized = record.transcriptionStatus === "FINALIZED";

    return (
        <Card className="bg-[#0A311D]/50 border-[#2A5432]/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-[#2A5432]/30">
                <div>
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                        <FileAudio className="w-5 h-5 text-[#76A771]" />
                        Transcrição de {new Date(record.date).toLocaleDateString('pt-BR')}
                    </CardTitle>
                    <div className="flex gap-2 mt-2">
                        {isPending && <Badge variant="outline" className="border-yellow-500 text-yellow-500 bg-yellow-500/10"><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Processando no Gemini...</Badge>}
                        {record.transcriptionStatus === "COMPLETED" && <Badge variant="outline" className="border-blue-400 text-blue-400 bg-blue-400/10">Pronto para Revisão</Badge>}
                        {isFinalized && <Badge variant="outline" className="border-[#76A771] text-[#76A771] bg-[#76A771]/10"><CheckCircle2 className="w-3 h-3 mr-1" /> Finalizado</Badge>}
                    </div>
                </div>

                {record.audioUrl && (
                    <audio controls className="h-8 w-64 opacity-70 hover:opacity-100 transition-opacity">
                        <source src={record.audioUrl} type="audio/webm" />
                    </audio>
                )}
            </CardHeader>

            <CardContent className="pt-4">
                {isPending ? (
                    <div className="h-40 flex flex-col items-center justify-center text-gray-500">
                        <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#76A771]" />
                        <p>O n8n está processando o áudio desta consulta...</p>
                        <p className="text-xs mt-1 text-gray-600">Isso pode levar alguns minutos dependendo do tamanho da gravação.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <Textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="min-h-[200px] bg-[#062214] border-[#2A5432] text-gray-200 resize-y focus-visible:ring-[#76A771]"
                            placeholder="A transcrição aparecerá aqui..."
                            readOnly={isFinalized}
                        />

                        {!isFinalized && (
                            <div className="flex justify-end">
                                <Button onClick={handleSave} disabled={isSaving || !text} className="bg-[#76A771] hover:bg-[#5b8557] text-[#062214] font-bold">
                                    {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                    Salvar Revisão Final
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}