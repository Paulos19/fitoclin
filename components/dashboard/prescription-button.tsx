"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { PrescriptionPDF } from "@/components/documents/prescription-pdf";
import { Button } from "@/components/ui/button";
import { FileDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface PrescriptionButtonProps {
  patientName: string;
  date: Date;
  content: string;
}

export function PrescriptionButton({ patientName, date, content }: PrescriptionButtonProps) {
  const [isReady, setIsReady] = useState(false);
  const [logoBase64, setLogoBase64] = useState<string>("");

  useEffect(() => {
    // Função para buscar a imagem e converter para Base64
    async function prepareImage() {
      try {
        const response = await fetch("/logo.png");
        const blob = await response.blob();
        
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoBase64(reader.result as string);
          setIsReady(true);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Erro ao carregar logo:", error);
        // Mesmo sem logo, permitimos o download (apenas seta true)
        setIsReady(true);
      }
    }

    prepareImage();
  }, []);

  // Se não tiver conteúdo ou a imagem ainda estiver processando
  if (!content) {
    return (
      <Button variant="outline" size="sm" disabled className="opacity-50 cursor-not-allowed">
        <FileDown className="w-4 h-4 mr-2" />
        Sem Prescrição
      </Button>
    );
  }

  if (!isReady) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Preparando PDF...
      </Button>
    );
  }

  return (
    <PDFDownloadLink
      document={
        <PrescriptionPDF 
          patientName={patientName} 
          date={date} 
          content={content} 
          logoBase64={logoBase64} // Passamos a string Base64 aqui
        />
      }
      fileName={`receita_${patientName.split(" ")[0]}_${date.toISOString().split("T")[0]}.pdf`}
    >
      {({ loading }) => (
        <Button 
            variant="outline" 
            size="sm" 
            className="border-[#76A771] text-[#2A5432] hover:bg-[#76A771] hover:text-white transition-colors"
            disabled={loading}
        >
          {loading ? (
             <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
             <FileDown className="w-4 h-4 mr-2" />
          )}
          {loading ? "Gerando PDF..." : "Baixar Receita"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}