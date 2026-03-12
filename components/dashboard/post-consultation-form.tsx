"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Paperclip, Loader2, FileText, X } from "lucide-react";
import { addPostConsultationUpdateAction } from "@/actions/post-consultation";
import { uploadDocument } from "@/actions/documents";
import { toast } from "sonner";

interface PostConsultationFormProps {
    patientId: string;
}

export function PostConsultationForm({ patientId }: PostConsultationFormProps) {
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 4 * 1024 * 1024) {
                toast.error("O arquivo deve ter no máximo 4MB");
                return;
            }
            setSelectedFile(file);
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
        // Reset file input if needed, but not strictly necessary for controlled state
    };

    const handleSubmit = async () => {
        if (!notes.trim() && !selectedFile) {
            toast.error("Adicione uma mensagem ou um arquivo.");
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Enviar mensagem (se houver)
            if (notes.trim()) {
                const resMessage = await addPostConsultationUpdateAction(patientId, notes);
                if (resMessage.error) {
                    toast.error(resMessage.error);
                    setIsSubmitting(false);
                    return;
                }
            }

            // 2. Enviar arquivo (se houver)
            if (selectedFile) {
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("title", `Anexo Pós-Consulta - ${selectedFile.name}`);
                formData.append("type", "OTHER");
                formData.append("patientId", patientId);

                const resFile = await uploadDocument(formData);
                if (resFile.error) {
                    toast.error(resFile.error);
                }
            }

            toast.success("Atualização adicionada com sucesso!");
            setNotes("");
            setSelectedFile(null);
            // O revalidatePath nas actions já cuida da atualização da tela
        } catch (error) {
            toast.error("Erro inesperado ao salvar.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="bg-[#0A311D]/50 border-[#2A5432]/30 backdrop-blur-sm text-white mb-6">
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <Textarea
                        placeholder="Adicione uma atualização, nota ou mensagem de pós-consulta..."
                        className="min-h-[100px] bg-[#062214]/50 border-[#2A5432]/50 text-white placeholder:text-gray-500 resize-none focus-visible:ring-[#76A771]"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        disabled={isSubmitting}
                    />

                    {selectedFile && (
                        <div className="flex items-center justify-between p-3 bg-[#062214]/80 border border-[#2A5432]/50 rounded-lg">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <FileText className="w-5 h-5 text-[#76A771] flex-shrink-0" />
                                <span className="text-sm text-gray-300 truncate">{selectedFile.name}</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10 flex-shrink-0"
                                onClick={clearFile}
                                disabled={isSubmitting}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                        <div>
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                onChange={handleFileChange}
                                disabled={isSubmitting}
                            />
                            <label htmlFor="file-upload">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="border-[#2A5432] text-[#76A771] hover:bg-[#2A5432]/30 hover:text-white cursor-pointer"
                                    asChild
                                    disabled={isSubmitting}
                                >
                                    <span><Paperclip className="w-4 h-4 mr-2" /> Anexar Arquivo</span>
                                </Button>
                            </label>
                        </div>

                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting || (!notes.trim() && !selectedFile)}
                            className="bg-[#76A771] text-[#062214] hover:bg-[#76A771]/80 shadow-lg text-sm font-bold"
                        >
                            {isSubmitting ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Salvando...</>
                            ) : (
                                <><Send className="w-4 h-4 mr-2" /> Adicionar</>
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
