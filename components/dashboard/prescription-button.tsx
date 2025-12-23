"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { PrescriptionPDF } from "@/components/documents/prescription-pdf";
import { Button } from "@/components/ui/button";
import { FileDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // Importante para mesclar classes condicionalmente

interface PrescriptionButtonProps {
  patientName: string;
  date: Date;
  content: string;
  variant?: "default" | "icon" | "ghost"; // Adicionada a propriedade opcional
}

export function PrescriptionButton({ 
  patientName, 
  date, 
  content, 
  variant = "default" // Valor padrão
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

  // Lógica de Renderização Baseada em Variantes
  const isIcon = variant === "icon";

  // Botão Desabilitado (Sem conteúdo)
  if (!content) {
    if (isIcon) return null; // Se for ícone e não tiver conteúdo, nem mostra
    return (
      <Button variant="outline" size="sm" disabled className="opacity-50 cursor-not-allowed">
        <FileDown className="w-4 h-4 mr-2" />
        Sem Prescrição
      </Button>
    );
  }

  // Botão Carregando (Preparando imagem/recursos iniciais)
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
              // Estilos Padrão
              !isIcon && "border-[#76A771] text-[#2A5432] hover:bg-[#76A771] hover:text-white",
              // Estilos Ícone (Minimalista para Timeline)
              isIcon && "h-8 w-8 p-0 border-[#2A5432]/30 text-[#76A771] hover:bg-[#76A771] hover:text-[#062214] hover:border-[#76A771]"
            )}
            disabled={loading}
            title="Baixar Receita em PDF" // Tooltip nativo
        >
          {loading ? (
             <Loader2 className={cn("animate-spin", isIcon ? "w-4 h-4" : "w-4 h-4 mr-2")} />
          ) : (
             <FileDown className={isIcon ? "w-4 h-4" : "w-4 h-4 mr-2"} />
          )}
          
          {/* Texto só aparece se NÃO for ícone */}
          {!isIcon && (loading ? "Gerando PDF..." : "Baixar Receita")}
        </Button>
      )}
    </PDFDownloadLink>
  );
}