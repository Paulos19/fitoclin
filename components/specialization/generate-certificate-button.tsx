"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Sparkles } from "lucide-react";
import { issueCertificate } from "@/actions/certificates";
import { toast } from "sonner";

interface Props {
  courseId: string;
  certificateCode?: string; // Se já existir, vem preenchido
}

export function GenerateCertificateButton({ courseId, certificateCode: initialCode }: Props) {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(initialCode);

  const handleDownload = async () => {
    setLoading(true);

    try {
      // 1. Se não tiver código, emite primeiro
      if (!code) {
        const res = await issueCertificate(courseId);
        if (res.error) {
            toast.error(res.error);
            setLoading(false);
            return;
        }
        setCode(res.code);
        // Pequeno delay para garantir propagação
        await new Promise(r => setTimeout(r, 500));
      }

      // 2. Inicia download via API Route
      // Abrir em nova aba força o download
      window.open(`/api/certificate/${courseId}`, '_blank');
      toast.success("Certificado gerado com sucesso!");

    } catch (error) {
      toast.error("Erro ao gerar certificado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
        onClick={handleDownload} 
        disabled={loading}
        className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold shadow-lg shadow-yellow-900/20"
    >
        {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
            code ? <Download className="w-4 h-4 mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />
        )}
        {loading ? "Processando..." : (code ? "Baixar Certificado" : "Emitir Certificado")}
    </Button>
  );
}