"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { pdf } from "@react-pdf/renderer";
import { PrescriptionPDF } from "@/components/documents/prescription-pdf";
import { uploadDocument } from "@/actions/documents";
import { toast } from "sonner";
import { FileUp, Loader2, Pill } from "lucide-react";

interface PrescriptionPanelProps {
  patientId: string;
  patientName: string;
  patientDetails?: string;
  patientEmail?: string | null;
  patientPhone?: string | null;
  doctorName?: string;
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [logoBase64, setLogoBase64] = useState<string>("");

  useEffect(() => {
    async function prepareImage() {
      try {
        const response = await fetch("/logo.png");
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => setLogoBase64(reader.result as string);
        reader.readAsDataURL(blob);
      } catch (e) {
        console.error("Erro ao carregar logo", e);
      }
    }
    prepareImage();
  }, []);

  const handleSaveAndSend = async () => {
    if (!content.trim()) {
      toast.error("A prescrição não pode estar vazia.");
      return;
    }

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

      const filename = `Receita - ${patientName.split(" ")[0]} - ${new Date().toLocaleDateString("pt-BR").replace(/\//g, "-")}.pdf`;
      const file = new File([blob], filename, { type: "application/pdf" });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", `Prescrição - ${new Date().toLocaleDateString("pt-BR")}`);
      formData.append("type", "PRESCRIPTION");
      formData.append("patientId", patientId);

      const result = await uploadDocument(formData);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Prescrição salva e enviada!");
        setContent(""); 
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao gerar PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="bg-[#0A311D]/50 border-[#2A5432]/30 backdrop-blur-sm h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2A5432]/20 rounded-lg">
                <Pill className="w-6 h-6 text-[#76A771]" />
            </div>
            <div>
                <CardTitle className="text-white text-lg">Nova Prescrição</CardTitle>
                <CardDescription className="text-gray-400">
                    Escreva a receita abaixo. Os dados do paciente e sua assinatura serão inseridos automaticamente.
                </CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label className="text-gray-300">Conteúdo da Receita</Label>
            <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Ex: 1. Óleo Essencial de Lavanda - 1 gota no travesseiro..."
                className="bg-[#062214] border-[#2A5432] text-white min-h-[300px] text-base leading-relaxed p-4 resize-none focus-visible:ring-[#76A771]"
            />
        </div>
        
        <div className="flex justify-end gap-3">
            <Button 
                onClick={handleSaveAndSend} 
                disabled={isGenerating || !logoBase64}
                className="bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a] font-bold w-full md:w-auto"
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processando...
                    </>
                ) : (
                    <>
                        <FileUp className="w-4 h-4 mr-2" /> Salvar e Enviar PDF
                    </>
                )}
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}