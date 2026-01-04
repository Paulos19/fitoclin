"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { put } from "@vercel/blob";

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

  // 1. Tratamento da Imagem (Vercel Blob)
  const profileImage = formData.get("profileImage") as File;
  let newImageUrl: string | undefined;

  if (profileImage && profileImage.size > 0) {
    try {
      // Upload para o Vercel Blob
      // Nome do arquivo: profiles/ID-TIMESTAMP.extensão
      const filename = `profiles/${session.user.id}-${Date.now()}.${profileImage.name.split('.').pop()}`;
      const blob = await put(filename, profileImage, {
        access: 'public',
      });
      newImageUrl = blob.url;
    } catch (err) {
      console.error("Erro no upload da imagem:", err);
      return { error: "Falha ao enviar a foto de perfil." };
    }
  }

  // 2. Validação dos outros campos
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
  if (!validated.success) return { error: "Dados inválidos nos campos de texto" };

  const data = validated.data;

  try {
    const birthDateObj = data.birthDate 
      ? new Date(data.birthDate + "T12:00:00") 
      : undefined;

    // 3. Atualização no Banco (Transaction para garantir integridade)
    await prisma.$transaction(async (tx) => {
      // Atualiza tabela Patient
      await tx.patient.update({
        where: { userId: session.user.id },
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

      // Se houver nova imagem, atualiza tabela User
      if (newImageUrl) {
        await tx.user.update({
          where: { id: session.user.id },
          data: { image: newImageUrl },
        });
      }
    });

    revalidatePath("/dashboard/profile");
    // Revalidar layout para atualizar o avatar no Header instantaneamente
    revalidatePath("/", "layout"); 
    
    return { success: "Perfil atualizado com sucesso!" };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao atualizar perfil." };
  }
}