"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// Schema de validação para cadastro de aluno de cursos
const RegisterCursoSchema = z
  .object({
    name: z.string().min(2, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    cpf: z
      .string()
      .min(11, "CPF deve ter 11 dígitos")
      .max(14, "CPF inválido"),
    confirmCpf: z.string(),
  })
  .refine((data) => data.cpf === data.confirmCpf, {
    message: "Os CPFs não coincidem",
    path: ["confirmCpf"],
  });

// Cadastro de aluno de cursos (público)
export async function registerCursoAluno(
  prevState: any,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = RegisterCursoSchema.safeParse(data);

  if (!validatedFields.success) {
    const errorMsg =
      validatedFields.error.errors[0]?.message || "Dados inválidos";
    return { error: errorMsg };
  }

  const { name, email, cpf } = validatedFields.data;
  const cpfClean = cpf.replace(/\D/g, "");

  try {
    // Verificar se email já existe
    const existingEmail = await db.user.findUnique({ where: { email } });
    if (existingEmail) {
      return { error: "Este email já está em uso!" };
    }

    // Verificar se CPF já existe
    const existingCpf = await db.user.findUnique({
      where: { cpf: cpfClean },
    });
    if (existingCpf) {
      return { error: "Este CPF já está cadastrado!" };
    }

    // Gerar senha automaticamente: 4 primeiros dígitos do CPF
    const generatedPassword = cpfClean.substring(0, 4);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    // Criar usuário
    await db.user.create({
      data: {
        name,
        email,
        cpf: cpfClean,
        password: hashedPassword,
        role: "USER",
      },
    });

    return {
      success: true,
      generatedPassword,
      message:
        "Cadastro realizado com sucesso! Sua senha são os 4 primeiros dígitos do seu CPF.",
    };
  } catch (error) {
    console.error("Erro ao cadastrar aluno:", error);
    return { error: "Erro ao realizar cadastro. Tente novamente." };
  }
}

// Login por CPF (para a área de cursos)
export async function loginCursos(
  prevState: any,
  formData: FormData
) {
  const cpf = formData.get("cpf") as string;
  const password = formData.get("password") as string;

  if (!cpf || !password) {
    return { error: "CPF e senha são obrigatórios." };
  }

  const cpfClean = cpf.replace(/\D/g, "");
  if (cpfClean.length !== 11) {
    return { error: "CPF inválido." };
  }

  try {
    await signIn("credentials", {
      cpf: cpfClean,
      password,
      redirectTo: "/cursos",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "CPF ou senha inválidos." };
        default:
          return { error: "Erro ao fazer login." };
      }
    }
    throw error; // Re-throw para NextAuth redirect funcionar
  }
}
