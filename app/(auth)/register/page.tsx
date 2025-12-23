"use client";

import { useActionState } from "react";
import { register } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const [state, action, isPending] = useActionState(register, undefined);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-[#062214]">
          Crie sua conta
        </h1>
        <p className="text-sm text-muted-foreground">
          Preencha seus dados para iniciar o tratamento
        </p>
      </div>

      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="name">Nome Completo</label>
          <input 
            id="name" name="name" type="text" required 
            className="flex h-11 w-full rounded-lg border border-input px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A5432]/20 focus-visible:border-[#2A5432]"
            placeholder="Ex: Maria Silva"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="email">Email</label>
          <input 
            id="email" name="email" type="email" required 
            className="flex h-11 w-full rounded-lg border border-input px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A5432]/20 focus-visible:border-[#2A5432]"
            placeholder="maria@email.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="password">Senha</label>
          <input 
            id="password" name="password" type="password" required minLength={6}
            className="flex h-11 w-full rounded-lg border border-input px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A5432]/20 focus-visible:border-[#2A5432]"
          />
          <p className="text-[0.8rem] text-muted-foreground">Mínimo de 6 caracteres</p>
        </div>

        {state?.error && (
           <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 flex items-center justify-center">
             {state.error}
           </div>
        )}
        
        {state?.success && (
          <div className="p-3 rounded-lg bg-green-50 border border-green-100 text-sm text-green-700 flex flex-col items-center justify-center text-center">
            <p>{state.success}</p>
            <Link href="/login" className="font-bold underline mt-1">Ir para Login</Link>
          </div>
        )}

        <Button className="w-full h-11 btn-gradient font-bold text-base" disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isPending ? "Criando conta..." : "Cadastrar"}
        </Button>
      </form>

      <div className="text-center text-sm">
        Já possui cadastro?{" "}
        <Link href="/login" className="font-semibold text-[#2A5432] hover:underline underline-offset-4">
          Fazer Login
        </Link>
      </div>
    </div>
  );
}