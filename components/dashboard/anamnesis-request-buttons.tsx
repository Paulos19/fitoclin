"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { requestAnamnesis, unlockAnamnesis } from "@/actions/patient";
import Link from "next/link";

interface AnamnesisRequestButtonsProps {
    patientId: string;
    patientEmail: string;
    patientName: string;
    patientPhone: string;
    isLocked: boolean;
}

export function AnamnesisRequestButtons({
    patientId,
    patientEmail,
    patientName,
    patientPhone,
    isLocked
}: AnamnesisRequestButtonsProps) {
    const [isPending, startTransition] = useTransition();
    const [isUnlocking, setIsUnlocking] = useState(false);

    const handleEmailRequest = () => {
        startTransition(async () => {
            const result = await requestAnamnesis(patientId, patientEmail, patientName);
            if (result.success) {
                toast.success(result.success);
            } else {
                toast.error(result.error);
            }
        });
    };

    const handleUnlock = async () => {
        setIsUnlocking(true);
        const result = await unlockAnamnesis(patientId);
        if (result.success) {
            toast.success(result.success);
        } else {
            toast.error(result.error);
        }
        setIsUnlocking(false);
    };

    const whatsappNumber = patientPhone?.replace(/\D/g, '') || "";
    const anamnesisLink = `${window.location.origin}/dashboard/anamnesis`;
    const message = encodeURIComponent(`Olá ${patientName}! Aqui é da equipe da Dra. Isa. Por favor, preencha o seu formulário de Pré-Atendimento (Anamnese) clicando no link abaixo:\n\n${anamnesisLink}\n\nLeva apenas 3 minutos!`);
    const whatsappUrl = `https://wa.me/55${whatsappNumber}?text=${message}`;

    return (
        <div className="flex flex-wrap gap-3 mt-4">
            <Button
                onClick={handleEmailRequest}
                disabled={isPending}
                variant="outline"
                className="border-[#76A771] text-[#76A771] hover:bg-[#76A771]/10"
            >
                {isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                    <Mail className="w-4 h-4 mr-2" />
                )}
                Solicitar por E-mail
            </Button>

            {whatsappNumber && (
                <Link href={whatsappUrl} target="_blank">
                    <Button
                        variant="outline"
                        className="border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10"
                    >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Solicitar por WhatsApp
                    </Button>
                </Link>
            )}

            {!isLocked && (
                <Button
                    onClick={handleUnlock}
                    disabled={isUnlocking}
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                >
                    {isUnlocking ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <RefreshCw className="w-4 h-4 mr-2" />
                    )}
                    Liberar Preenchimento Manual
                </Button>
            )}
        </div>
    );
}
