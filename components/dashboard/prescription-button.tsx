"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { PrescriptionPDF } from "@/components/documents/prescription-pdf";
import { Button } from "@/components/ui/button";
import { FileDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PrescriptionButtonProps {
  patientName: string;
  patientDetails?: string; // NOVO: Detalhes extras
  date: Date;
  content: string;
  variant?: "default" | "icon" | "ghost";
}

export function PrescriptionButton({ 
  patientName, 
  patientDetails,
  date, 
  content, 
  variant = "default" 
}: PrescriptionButtonProps) {
  const [isReady, setIsReady] = useState(false);
  const [logoBase64, setLogoBase64] = useState<string>("");

  useEffect(() => {
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
        setIsReady(true);
      }
    }

    prepareImage();
  }, []);

  const isIcon = variant === "icon";

  if (!content) {
    if (isIcon) return null;
    return (
      <Button variant="outline" size="sm" disabled className="opacity-50 cursor-not-allowed">
        <FileDown className="w-4 h-4 mr-2" />
        Sem Prescrição
      </Button>
    );
  }

  if (!isReady) {
    return (
      <Button variant="outline" size={isIcon ? "icon" : "sm"} disabled>
        <Loader2 className={cn("animate-spin", isIcon ? "w-4 h-4" : "w-4 h-4 mr-2")} />
        {!isIcon && "Preparando..."}
      </Button>
    );
  }

  return (
    <PDFDownloadLink
      document={
        <PrescriptionPDF 
          patientName={patientName}
          patientDetails={patientDetails} // Passando os detalhes
          date={date} 
          content={content} 
          logoBase64={logoBase64}
        />
      }
      fileName={`receita_${patientName.split(" ")[0]}_${date.toISOString().split("T")[0]}.pdf`}
    >
      {({ loading }) => (
        <Button 
            variant={variant === "ghost" ? "ghost" : "outline"}
            size={isIcon ? "icon" : "sm"}
            className={cn(
              "transition-colors",
              !isIcon && "border-[#76A771] text-[#2A5432] hover:bg-[#76A771] hover:text-white",
              isIcon && "h-8 w-8 p-0 border-[#2A5432]/30 text-[#76A771] hover:bg-[#76A771] hover:text-[#062214] hover:border-[#76A771]"
            )}
            disabled={loading}
            title="Baixar PDF Premium"
        >
          {loading ? (
             <Loader2 className={cn("animate-spin", isIcon ? "w-4 h-4" : "w-4 h-4 mr-2")} />
          ) : (
             <FileDown className={isIcon ? "w-4 h-4" : "w-4 h-4 mr-2"} />
          )}
          {!isIcon && (loading ? "Gerando..." : "Baixar Receita")}
        </Button>
      )}
    </PDFDownloadLink>
  );
}