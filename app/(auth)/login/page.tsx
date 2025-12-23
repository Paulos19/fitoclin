"use client";

import { useActionState } from "react";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, undefined);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-[#062214]">
          Acesse sua conta
        </h1>
        <p className="text-sm text-muted-foreground">
          Bem-vindo de volta à sua jornada de saúde
        </p>
      </div>

      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
          <input 
            id="email" name="email" type="email" required 
            className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A5432]/20 focus-visible:border-[#2A5432] transition-all"
            placeholder="nome@exemplo.com"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium leading-none" htmlFor="password">Senha</label>
            <Link href="#" className="text-xs text-[#2A5432] hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
          <input 
            id="password" name="password" type="password" required 
            className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A5432]/20 focus-visible:border-[#2A5432] transition-all"
          />
        </div>

        {state?.error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 flex items-center justify-center">
            {state.error}
          </div>
        )}

        <Button className="w-full h-11 btn-gradient font-bold text-base" disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Ou</span>
        </div>
      </div>

      <div className="text-center text-sm">
        Não tem uma conta?{" "}
        <Link href="/register" className="font-semibold text-[#2A5432] hover:underline underline-offset-4">
          Cadastre-se gratuitamente
        </Link>
      </div>
    </div>
  );
}