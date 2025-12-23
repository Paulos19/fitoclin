"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const PatientSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  phone: z.string().optional(),
});

const ProfileSchema = z.object({
  phone: z.string().optional(),
  birthDate: z.string().optional(), // Recebe como string "YYYY-MM-DD"
  gender: z.string().optional(),
  occupation: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
});

export async function createPatient(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };

  const validated = PatientSchema.safeParse(rawData);
  if (!validated.success) return { error: "Dados inválidos" };

  const { name, email, phone } = validated.data;

  // Se não tiver email, geramos um placeholder (ex: paciente+ID@fitoclin.sistema)
  // para permitir cadastro sem email real por enquanto
  const finalEmail = email || `paciente.${Date.now()}@sistema.local`;

  try {
    // Verifica duplicidade apenas se for email real
    if (email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) return { error: "Este email já está cadastrado!" };
    }

    // Senha padrão inicial (pode ser alterada depois pelo "Esqueci minha senha")
    const hashedPassword = await bcrypt.hash("fitoclin123", 10);

    // Criação Atômica: User + Patient
    await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          name,
          email: finalEmail,
          password: hashedPassword,
          role: "PATIENT",
        }
      });

      await tx.patient.create({
        data: {
          userId: newUser.id,
          phone: phone,
          // Outros campos iniciam vazios
        }
      });
    });

    revalidatePath("/dashboard/patients");
    return { success: "Paciente cadastrado com sucesso!" };

  } catch (error) {
    console.error(error);
    return { error: "Erro ao criar paciente." };
  }
}

export async function updatePatientProfile(formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Não autorizado" };

  const rawData = {
    phone: formData.get("phone"),
    birthDate: formData.get("birthDate"),
    gender: formData.get("gender"),
    occupation: formData.get("occupation"),
    address: formData.get("address"),
    city: formData.get("city"),
    state: formData.get("state"),
  };

  const validated = ProfileSchema.safeParse(rawData);
  if (!validated.success) return { error: "Dados inválidos" };

  const data = validated.data;

  try {
    // Converter data string para objeto Date (se existir)
    // O input type="date" retorna "YYYY-MM-DD", o que funciona bem com new Date()
    // Mas precisamos ajustar o fuso para não voltar um dia (adicionando T12:00:00)
    const birthDateObj = data.birthDate 
      ? new Date(data.birthDate + "T12:00:00") 
      : undefined;

    await prisma.patient.update({
      where: { userId: session.user.id }, // Atualiza baseado no ID do usuário logado
      data: {
        phone: data.phone,
        birthDate: birthDateObj,
        gender: data.gender,
        occupation: data.occupation,
        address: data.address,
        city: data.city,
        state: data.state,
      },
    });

    revalidatePath("/dashboard/profile");
    return { success: "Perfil atualizado com sucesso!" };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao atualizar perfil." };
  }
}