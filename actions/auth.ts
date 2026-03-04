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
  roleType: z.string().optional(), // Pode vir do formulário (ex: input hidden)
});

// === REGISTER ACTION ===
export async function register(prevState: any, formData: FormData) {
  // 1. Validar Campos
  const data = Object.fromEntries(formData.entries());
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Dados inválidos! Verifique os campos." };
  }

  const { email, password, name, roleType } = validatedFields.data;

  try {
    // 2. Verificar se usuário já existe
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) return { error: "Este email já está em uso!" };

    // 3. Criptografar Senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Verificar se existe um LEAD no CRM com este e-mail
    const existingLead = await db.lead.findFirst({
      where: { email: email }
    });

    // 5. Determinar a Role (Hierarquia)
    let role = "USER"; // Default: Usuário comum/Aluno

    if (process.env.EMAIL_ADMIN && email === process.env.EMAIL_ADMIN) {
      role = "ADMIN";
    } else if (process.env.ASSISTENT_EMAIL && email === process.env.ASSISTENT_EMAIL) {
      role = "SECRETARY";
    } else if (existingLead) {
      // Se já era um Lead, ele vira Paciente automaticamente
      role = "PATIENT";
    } else if (roleType === "PATIENT") {
      // Se selecionou explicitamente que é paciente
      role = "PATIENT";
    }

    // 6. Criar o Usuário no Banco
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // @ts-ignore: O Enum do Prisma pode precisar de cast se não estiver gerado
        role: role,
      },
    });

    // 7. Lógica de Vinculação CRM -> Paciente
    if (existingLead) {
      // A) Se veio do CRM: Cria perfil de paciente puxando dados do Lead
      await db.patient.create({
        data: {
          userId: user.id,
          phone: existingLead.phone, // Importa o telefone do CRM
          // Aqui você pode adicionar outros campos que existam no Lead e no Patient
        }
      });

      // B) Atualiza o Lead para "WON" (Ganho)
      await db.lead.update({
        where: { id: existingLead.id },
        data: { status: "WON" }
      });

      console.log(`✅ CRM: Lead ${email} convertido para Paciente.`);

    } else if (role === "PATIENT") {
      // C) Se não veio do CRM, mas é Paciente: Cria perfil vazio
      await db.patient.create({
        data: { userId: user.id }
      });
    }

    return { success: "Conta criada com sucesso!" };

  } catch (error) {
    console.error("Erro no registro:", error);
    return { error: "Erro ao criar conta. Tente novamente." };
  }
}

// === REGISTER COM TOKEN (Convite de Lead) ===
export async function registerWithToken(prevState: any, formData: FormData) {
  const token = formData.get("token") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!token || !email || !password) {
    return { error: "Preencha todos os campos." };
  }

  if (password.length < 6) {
    return { error: "A senha deve ter no mínimo 6 caracteres." };
  }

  try {
    // 1. Buscar Lead pelo token
    const lead = await db.lead.findUnique({ where: { registrationToken: token } });
    if (!lead) return { error: "Token inválido ou expirado." };

    // 2. Verificar se email já existe
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) return { error: "Este email já está em uso!" };

    // 3. Criar o usuário
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: {
        name: lead.name,
        email,
        password: hashedPassword,
        role: "PATIENT",
      },
    });

    // 4. Criar paciente vinculado ao profissional do Lead
    await db.patient.create({
      data: {
        userId: user.id,
        phone: lead.phone,
        professionalId: lead.professionalId,
      },
    });

    // 5. Atualizar Lead para WON
    await db.lead.update({
      where: { id: lead.id },
      data: { status: "WON", email: email },
    });

    return { success: "Cadastro realizado com sucesso! Você já pode fazer login." };
  } catch (error) {
    console.error("Erro registerWithToken:", error);
    return { error: "Erro ao criar conta. Tente novamente." };
  }
}

// === LOGIN ACTION ===
export async function login(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  if (!data.email || !data.password) {
    return { error: "Preencha todos os campos." };
  }

  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      // Redireciona para o dashboard após login
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
    // Necessário relançar o erro para o redirecionamento do NextAuth funcionar
    throw error;
  }

  return undefined;
}