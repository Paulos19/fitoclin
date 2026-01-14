"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { put } from "@vercel/blob";

const PatientSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  phone: z.string().optional(),
});

const ProfileSchema = z.object({
  phone: z.string().optional(),
  birthDate: z.string().optional(),
  gender: z.string().optional(),
  occupation: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
});

export async function createPatient(formData: FormData) {
  const session = await auth();
  
  // 1. Permissão: Admin e Profissional podem criar
  const isAllowed = session?.user?.role === "ADMIN" || session?.user?.role === "PROFESSIONAL";
  if (!isAllowed) return { error: "Não autorizado" };

  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };

  const validated = PatientSchema.safeParse(rawData);
  if (!validated.success) return { error: "Dados inválidos" };

  const { name, email, phone } = validated.data;

  // Placeholder se não tiver email
  const finalEmail = email || `paciente.${Date.now()}@sistema.local`;

  try {
    if (email) {
      const existing = await db.user.findUnique({ where: { email } });
      if (existing) return { error: "Este email já está cadastrado!" };
    }

    const hashedPassword = await bcrypt.hash("fitoclin123", 10);

    // 2. Definir o Dono (Professional ID)
    // Se quem está criando é PROFESSIONAL, ele é o dono. Se é ADMIN, fica null (ou define lógica)
    const professionalId = session?.user?.role === "PROFESSIONAL" ? session?.user?.id : null;

    await db.$transaction(async (tx) => {
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
          // 👇 Vínculo de propriedade
          professionalId: professionalId, 
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

  // Tratamento da Imagem
  const profileImage = formData.get("profileImage") as File;
  let newImageUrl: string | undefined;

  if (profileImage && profileImage.size > 0) {
    try {
      const filename = `profiles/${session.user.id}-${Date.now()}.${profileImage.name.split('.').pop()}`;
      const blob = await put(filename, profileImage, { access: 'public' });
      newImageUrl = blob.url;
    } catch (err) {
      console.error("Erro no upload:", err);
      return { error: "Falha ao enviar a foto." };
    }
  }

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
    const birthDateObj = data.birthDate 
      ? new Date(data.birthDate + "T12:00:00") 
      : undefined;

    await db.$transaction(async (tx) => {
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

      if (newImageUrl) {
        await tx.user.update({
          where: { id: session.user.id },
          data: { image: newImageUrl },
        });
      }
    });

    revalidatePath("/dashboard/profile");
    revalidatePath("/", "layout"); 
    
    return { success: "Perfil atualizado com sucesso!" };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao atualizar perfil." };
  }
}