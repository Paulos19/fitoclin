"use client";

import { useActionState } from "react";
import { loginCursos } from "@/actions/cursos-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2, ArrowLeft, Play, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function CursosLoginPage() {
  const [state, action, isPending] = useActionState(loginCursos, undefined);

  return (
    <div className="min-h-screen bg-[#062214] flex items-center justify-center px-4 selection:bg-[#76A771] selection:text-[#062214]">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#76A771]/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#76A771]/10 flex items-center justify-center">
              <Play className="w-5 h-5 text-[#76A771]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">
            Área do Aluno
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Acesse a biblioteca de vídeos
          </p>
        </div>

        {/* Form */}
        <div className="bg-[#0A311D]/50 border border-[#2A5432]/50 rounded-2xl p-8 backdrop-blur-sm">
          <form action={action} className="space-y-5">
            {/* CPF */}
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm font-medium">
                CPF
              </Label>
              <Input
                name="cpf"
                type="text"
                required
                placeholder="000.000.000-00"
                maxLength={14}
                className="bg-[#062214] border-[#2A5432] text-white placeholder:text-gray-500 h-11"
                onChange={(e) => {
                  // Máscara de CPF
                  let v = e.target.value.replace(/\D/g, "");
                  if (v.length > 11) v = v.substring(0, 11);
                  if (v.length > 9)
                    v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
                  else if (v.length > 6)
                    v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
                  else if (v.length > 3)
                    v = v.replace(/(\d{3})(\d{1,3})/, "$1.$2");
                  e.target.value = v;
                }}
              />
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm font-medium">
                Senha
              </Label>
              <Input
                name="password"
                type="password"
                required
                placeholder="Digite sua senha"
                className="bg-[#062214] border-[#2A5432] text-white placeholder:text-gray-500 h-11"
              />
              <p className="text-gray-500 text-xs">
                A senha são os 4 primeiros dígitos do seu CPF
              </p>
            </div>

            {/* Erro */}
            {state?.error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 text-center">
                {state.error}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11 bg-[#76A771] hover:bg-[#5e8a5a] text-[#062214] font-bold text-base rounded-xl transition-all"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Shield className="mr-2 h-4 w-4" />
              )}
              {isPending ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>

        {/* Cadastro */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Ainda não tem conta?{" "}
            <Link
              href="/cursos/cadastro"
              className="text-[#76A771] hover:text-[#a8d4a0] font-semibold transition-colors"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
