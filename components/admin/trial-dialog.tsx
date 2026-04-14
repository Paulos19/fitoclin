"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { inviteProfessionalTrial } from "@/actions/trial";
import { Loader2, Send, Crown } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function TrialDialog() {
    const [open, setOpen] = useState(false);
    const [state, action, isPending] = useActionState(inviteProfessionalTrial, undefined);

    // Close dialog on success
    useEffect(() => {
        if (state?.success && open) {
            const timer = setTimeout(() => setOpen(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [state, open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#2A5432]/40 group">
                    <Crown className="mr-2 w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                    Conceder Trial Clínico
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#062214] border-[#2A5432]/50 text-white sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl text-white">
                        <Crown className="w-5 h-5 text-[#D4AF37]" /> Conceder Trial PRO
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Envie um convite de teste da plataforma clínica para um profissional.
                    </DialogDescription>
                </DialogHeader>

                <form action={action} className="space-y-4 pt-4">
                    <div className="space-y-2 flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300">
                            Email do Profissional
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="contato@clinica.com"
                            required
                            className="flex h-10 w-full rounded-md border border-[#2A5432]/50 bg-[#0A311D] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#76A771] focus:border-transparent"
                        />
                    </div>

                    <div className="space-y-2 flex flex-col">
                        <label htmlFor="days" className="text-sm font-medium text-gray-300">
                            Duração do Trial (dias)
                        </label>
                        <input
                            id="days"
                            name="days"
                            type="number"
                            min="1"
                            max="30"
                            defaultValue="7"
                            required
                            className="flex h-10 w-full rounded-md border border-[#2A5432]/50 bg-[#0A311D] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#76A771] focus:border-transparent"
                        />
                    </div>

                    {state?.error && (
                        <div className="p-3 bg-red-900/40 border border-red-900 text-red-200 text-sm rounded-md">
                            {state.error}
                        </div>
                    )}

                    {state?.success && (
                        <div className="p-3 bg-green-900/40 border border-green-900 text-green-200 text-sm rounded-md">
                            {state.success}
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="border-[#2A5432]/50 bg-transparent text-gray-300 hover:text-white hover:bg-[#2A5432]/30"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending || !!state?.success}
                            className="bg-[#D4AF37] hover:bg-[#b5952f] text-[#062214] font-bold"
                        >
                            {isPending ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4 mr-2" />
                            )}
                            {isPending ? "Enviando..." : "Enviar Convite"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
