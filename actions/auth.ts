"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// Schema de Validação
const RegisterSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

// === REGISTER ACTION ===
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
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Este email já está em uso!" };
    }

    // 3. Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Definir Role (Lógica de Admin e Secretária via variáveis de ambiente)
    let role = "PATIENT"; // O padrão é paciente

    if (process.env.EMAIL_ADMIN && email === process.env.EMAIL_ADMIN) {
      role = "ADMIN";
    } else if (process.env.ASSISTENT_EMAIL && email === process.env.ASSISTENT_EMAIL) {
      role = "SECRETARY"; // 👈 Atribui a role de Secretária se o email bater com o .env
    }

    // 5. Criar usuário no Banco
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // @ts-ignore: O TypeScript pode reclamar se você ainda não rodou 'prisma generate' após adicionar SECRETARY ao enum
        role: role, 
        // Se for paciente, já cria o perfil vazio para evitar erro de relacionamento depois.
        // Secretárias e Admins não precisam necessariamente de um perfil 'Patient' atrelado agora.
        patient: role === "PATIENT" ? { create: {} } : undefined
      },
    });

    return { success: "Conta criada com sucesso!" };

  } catch (error) {
    console.error("Erro no registro:", error);
    return { error: "Erro ao criar conta. Tente novamente." };
  }
}

// === LOGIN ACTION ===
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
      // 👇 Força ida para o dashboard após login
      redirectTo: "/dashboard", 
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email ou senha incorretos!" };
        default:
          return { error: "Algo deu errado no login." };
      }
    }
    // O Next.js lança um erro para fazer o redirect. É obrigatório relançar esse erro.
    throw error; 
  }
  
  return undefined;
}