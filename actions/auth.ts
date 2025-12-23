"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const prisma = new PrismaClient();

// Schema de Validação
const RegisterSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

// === CORREÇÃO: Adicionado prevState (mesmo que não usado) como primeiro argumento ===
export async function register(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  
  // 1. Validar dados
  const validatedFields = RegisterSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Dados inválidos!" };
  }

  const { email, password, name } = validatedFields.data;

  try {
    // 2. Verificar se usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Este email já está em uso!" };
    }

    // 3. Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Definir Role (Lógica do Admin Mestre)
    const role = email === process.env.EMAIL_ADMIN ? "ADMIN" : "PATIENT";

    // 5. Criar usuário no Banco
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        // Se for paciente, já cria o perfil vazio para evitar erro depois
        patient: role === "PATIENT" ? { create: {} } : undefined
      },
    });

    return { success: "Conta criada com sucesso!" };

  } catch (error) {
    console.error(error);
    return { error: "Erro ao criar conta. Tente novamente." };
  }
}

// === CORREÇÃO: Adicionado prevState como primeiro argumento ===
export async function login(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  // Validação simples dos campos antes de chamar o Auth.js
  if (!data.email || !data.password) {
    return { error: "Preencha todos os campos." };
  }

  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/", 
    });
    // O signIn geralmente faz um throw de redirecionamento, então o código abaixo raramente é alcançado se der certo
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email ou senha incorretos!" };
        default:
          return { error: "Algo deu errado no login." };
      }
    }
    throw error; // Necessário relançar o erro para o redirecionamento funcionar
  }
  
  return undefined; // Retorno padrão caso passe direto
}