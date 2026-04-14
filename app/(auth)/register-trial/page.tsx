"use client";

import { useActionState, Suspense } from "react";
import { registerTrialProfessional } from "@/actions/trial";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2, Crown } from "lucide-react";
import { useSearchParams } from "next/navigation";

function RegisterTrialContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";

    const [state, action, isPending] = useActionState(registerTrialProfessional, undefined);

    if (!token) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-100 rounded-xl text-center space-y-4">
                <h2 className="font-bold text-red-600 text-xl">Token Inválido</h2>
                <p className="text-sm text-red-500">
                    O link utilizado parece estar incorreto ou faltando informações importantes.
                </p>
                <Link href="/login" className="text-sm font-semibold underline text-[#2A5432]">
                    Voltar ao login
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col space-y-2 text-center items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 rounded-xl flex items-center justify-center mb-2 shadow-lg shadow-[#D4AF37]/10">
                    <Crown className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h1 className="text-2xl font-semibold tracking-tight text-[#062214]">
                    Ativar Trial Profissional
                </h1>
                <p className="text-sm text-muted-foreground">
                    Conclua seu cadastro para iniciar seu acesso PRO.
                </p>
            </div>

            <form action={action} className="space-y-4">
                <input type="hidden" name="token" value={token} />

                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="name">Nome Completo</label>
                    <input
                        id="name" name="name" type="text" required
                        className="flex h-11 w-full rounded-lg border border-input px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A5432]/20 focus-visible:border-[#2A5432]"
                        placeholder="Ex: Maria Silva"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="password">Crie uma Senha</label>
                    <input
                        id="password" name="password" type="password" required minLength={6}
                        className="flex h-11 w-full rounded-lg border border-input px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A5432]/20 focus-visible:border-[#2A5432]"
                    />
                    <p className="text-[0.8rem] text-muted-foreground">Mínimo de 6 caracteres</p>
                </div>

                {state?.error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 flex items-center justify-center text-center">
                        {state.error}
                    </div>
                )}

                {state?.success && (
                    <div className="p-3 rounded-lg bg-green-50 border border-green-100 text-sm text-green-700 flex flex-col items-center justify-center text-center">
                        <p>{state.success}</p>
                        <Link href="/login" className="font-bold underline mt-2 text-[#2A5432]">
                            Ir para o Login
                        </Link>
                    </div>
                )}

                <Button className="w-full h-11 bg-gradient-to-r from-[#D4AF37] to-[#b5952f] text-[#062214] font-bold text-base hover:opacity-90 transition-opacity" disabled={isPending || !!state?.success}>
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isPending ? "Criando conta..." : "Criar Conta & Ativar Trial"}
                </Button>
            </form>

            <div className="text-center text-sm">
                Já possui conta?{" "}
                <Link href="/login" className="font-semibold text-[#2A5432] hover:underline underline-offset-4">
                    Fazer Login
                </Link>
            </div>
        </div>
    );
}

export default function RegisterTrialPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
            </div>
        }>
            <RegisterTrialContent />
        </Suspense>
    );
}
