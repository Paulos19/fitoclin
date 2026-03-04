"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { importLeadsFromXlsx } from "@/actions/crm";

export function ImportLeadsButton() {
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validar tipo de arquivo
        if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
            toast.error("Por favor, selecione um arquivo Excel (.xlsx ou .xls)");
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Processando arquivo...");

        try {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const base64 = event.target?.result?.toString().split(",")[1];
                if (base64) {
                    const result = await importLeadsFromXlsx(base64);
                    if (result.success) {
                        toast.success(result.message, { id: toastId });
                    } else {
                        toast.error(result.message, { id: toastId });
                    }
                }
                setLoading(false);
                if (fileInputRef.current) fileInputRef.current.value = "";
            };
            reader.onerror = () => {
                toast.error("Erro ao ler o arquivo", { id: toastId });
                setLoading(false);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error("Erro import:", error);
            toast.error("Erro ao importar leads", { id: toastId });
            setLoading(false);
        }
    };

    return (
        <>
            <input
                type="file"
                accept=".xlsx, .xls"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={loading}
            />
            <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                className="border-[#2A5432] text-[#76A771] hover:bg-[#2A5432]/20"
            >
                {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                    <Upload className="w-4 h-4 mr-2" />
                )}
                Importar XLSX
            </Button>
        </>
    );
}
