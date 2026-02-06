"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { put } from "@vercel/blob";

// --- SCHEMAS ---
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

// --- LEITURA ---
export async function getPatients() {
  const session = await auth();
  if (!session) return [];

  const role = session.user.role;

  // 👇 ISOLAMENTO ATUALIZADO:
  // Admin e Secretária podem ver todos os pacientes da clínica.
  // Profissional VÊ APENAS OS SEUS.
  
  // @ts-ignore: Caso o TypeScript reclame que SECRETARY não existe no tipo ainda
  const canViewAll = role === "ADMIN" || role === "SECRETARY";

  const whereClause = canViewAll
    ? {} // Admin e Secretária veem tudo
    : { professionalId: session.user.id }; // Profissional vê apenas os dele

  const patients = await db.patient.findMany({
    where: whereClause,
    include: { user: true },
    orderBy: { createdAt: 'desc' }
  });

  return patients;
}

// --- CRIAÇÃO ---
export async function createPatient(formData: FormData) {
  const session = await auth();
  
  // 👇 PERMISSÃO ATUALIZADA: Adicionado SECRETARY
  // @ts-ignore
  const isAllowed = session?.user?.role === "ADMIN" || session?.user?.role === "PROFESSIONAL" || session?.user?.role === "SECRETARY";
  
  if (!isAllowed) return { error: "Não autorizado" };

  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };

  const validated = PatientSchema.safeParse(rawData);
  if (!validated.success) return { error: "Dados inválidos" };
  const { name, email, phone } = validated.data;

  const finalEmail = email || `paciente.${Date.now()}@sistema.local`;

  try {
    if (email) {
      const existing = await db.user.findUnique({ where: { email } });
      if (existing) return { error: "Este email já está cadastrado!" };
    }

    const hashedPassword = await bcrypt.hash("fitoclin123", 10);

    // 👇 DEFINE O DONO CORRETAMENTE
    // Se for profissional, o paciente é dele.
    // Se for Admin ou Secretária, o professionalId fica null (paciente da clínica).
    const professionalId = session?.user?.role === "PROFESSIONAL" ? session.user.id : null;

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
          professionalId: professionalId, // <--- VÍNCULO
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

// --- ATUALIZAÇÃO DE PERFIL (Para o próprio usuário logado) ---
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
      // Garante que só edita o PRÓPRIO perfil
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