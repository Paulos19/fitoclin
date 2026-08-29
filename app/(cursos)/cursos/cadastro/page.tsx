"use client";

import { useActionState, useState } from "react";
import { registerCursoAluno } from "@/actions/cursos-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2, ArrowLeft, UserPlus, Copy, Check, LogIn } from "lucide-react";
import { motion } from "framer-motion";

export default function CursosCadastroPage() {
  const [state, action, isPending] = useActionState(
    registerCursoAluno,
    undefined
  );
  const [copied, setCopied] = useState(false);

  const handleCopyPassword = () => {
    if (state?.generatedPassword) {
      navigator.clipboard.writeText(state.generatedPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Se cadastro foi sucesso, mostrar senha gerada
  if (state?.success && state?.generatedPassword) {
    return (
      <div className="min-h-screen bg-[#062214] flex items-center justify-center px-4 selection:bg-[#76A771] selection:text-[#062214]">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#76A771]/5 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md text-center"
        >
          <div className="bg-[#0A311D]/50 border border-[#76A771]/30 rounded-2xl p-8 backdrop-blur-sm">
            <div className="w-16 h-16 rounded-2xl bg-[#76A771]/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-[#76A771]" />
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">
              Cadastro Realizado!
            </h1>
            <p className="text-gray-400 text-sm mb-6">
              Sua senha foi gerada automaticamente. Anote ou copie abaixo:
            </p>

            {/* Senha gerada */}
            <div className="bg-[#062214] border border-[#76A771]/30 rounded-xl p-4 mb-6">
              <p className="text-gray-400 text-xs mb-2 uppercase tracking-wider">
                Sua senha
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl font-mono font-bold text-[#76A771] tracking-[0.3em]">
                  {state.generatedPassword}
                </span>
                <button
                  type="button"
                  onClick={handleCopyPassword}
                  className="p-2 rounded-lg bg-[#76A771]/10 hover:bg-[#76A771]/20 transition-colors"
                  title="Copiar senha"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-[#76A771]" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#76A771]" />
                  )}
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-3">
                São os 4 primeiros dígitos do seu CPF
              </p>
            </div>

            <Link href="/cursos/login">
              <Button className="w-full h-11 bg-[#76A771] hover:bg-[#5e8a5a] text-[#062214] font-bold rounded-xl">
                <LogIn className="w-4 h-4 mr-2" />
                Ir para o Login
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Formulário de cadastro
  return (
    <div className="min-h-screen bg-[#062214] flex items-center justify-center px-4 selection:bg-[#76A771] selection:text-[#062214]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#76A771]/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Header */}
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
              <UserPlus className="w-5 h-5 text-[#76A771]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Criar Conta</h1>
          <p className="text-gray-400 text-sm mt-1">
            Cadastre-se para acessar os vídeos
          </p>
        </div>

        {/* Form */}
        <div className="bg-[#0A311D]/50 border border-[#2A5432]/50 rounded-2xl p-8 backdrop-blur-sm">
          <form action={action} className="space-y-5">
            {/* Nome */}
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm font-medium">
                Nome completo
              </Label>
              <Input
                name="name"
                type="text"
                required
                placeholder="Seu nome"
                className="bg-[#062214] border-[#2A5432] text-white placeholder:text-gray-500 h-11"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm font-medium">
                Email
              </Label>
              <Input
                name="email"
                type="email"
                required
                placeholder="seu@email.com"
                className="bg-[#062214] border-[#2A5432] text-white placeholder:text-gray-500 h-11"
              />
            </div>

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
                  let v = e.target.value.replace(/\D/g, "");
                  if (v.length > 11) v = v.substring(0, 11);
                  if (v.length > 9)
                    v = v.replace(
                      /(\d{3})(\d{3})(\d{3})(\d{1,2})/,
                      "$1.$2.$3-$4"
                    );
                  else if (v.length > 6)
                    v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
                  else if (v.length > 3)
                    v = v.replace(/(\d{3})(\d{1,3})/, "$1.$2");
                  e.target.value = v;
                }}
              />
            </div>

            {/* Confirmar CPF */}
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm font-medium">
                Confirmar CPF
              </Label>
              <Input
                name="confirmCpf"
                type="text"
                required
                placeholder="000.000.000-00"
                maxLength={14}
                className="bg-[#062214] border-[#2A5432] text-white placeholder:text-gray-500 h-11"
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, "");
                  if (v.length > 11) v = v.substring(0, 11);
                  if (v.length > 9)
                    v = v.replace(
                      /(\d{3})(\d{3})(\d{3})(\d{1,2})/,
                      "$1.$2.$3-$4"
                    );
                  else if (v.length > 6)
                    v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
                  else if (v.length > 3)
                    v = v.replace(/(\d{3})(\d{1,3})/, "$1.$2");
                  e.target.value = v;
                }}
              />
            </div>

            <p className="text-gray-500 text-xs text-center">
              Sua senha serão os 4 primeiros dígitos do seu CPF
            </p>

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
                <UserPlus className="mr-2 h-4 w-4" />
              )}
              {isPending ? "Cadastrando..." : "Criar Conta"}
            </Button>
          </form>
        </div>

        {/* Login */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Já tem uma conta?{" "}
            <Link
              href="/cursos/login"
              className="text-[#76A771] hover:text-[#a8d4a0] font-semibold transition-colors"
            >
              Entrar
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
