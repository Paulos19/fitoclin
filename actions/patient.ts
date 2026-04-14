"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { sendEmail, getAnamnesisRequestTemplate } from "@/lib/mail";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { utapi } from "@/lib/uploadthing";

const PatientSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  phone: z.string().optional(),
});

export async function requestAnamnesis(patientId: string, email: string, name: string) {
  const session = await auth();
  if (!session?.user) return { error: "Não autorizado" };

  try {
    // 1. Habilita o preenchimento da anamnese
    await db.patient.update({
      where: { id: patientId },
      data: { allowAnamnesisUpdate: true }
    });

    // 2. Envia o e-mail de solicitação
    const anamnesisLink = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/anamnesis`;
    await sendEmail({
      to: email,
      subject: "Solicitação de Preenchimento: Anamnese Fitoclin",
      html: getAnamnesisRequestTemplate(name, anamnesisLink)
    });

    revalidatePath(`/dashboard/records/${patientId}`);
    return { success: "Solicitação enviada com sucesso por e-mail!" };
  } catch (error) {
    console.error("Erro ao solicitar anamnese:", error);
    return { error: "Erro ao processar solicitação." };
  }
}

export async function unlockAnamnesis(patientId: string) {
  const session = await auth();
  if (!session?.user) return { error: "Não autorizado" };

  try {
    await db.patient.update({
      where: { id: patientId },
      data: { allowAnamnesisUpdate: true }
    });
    revalidatePath(`/dashboard/records/${patientId}`);
    return { success: "Formulário liberado para o paciente." };
  } catch (error) {
    console.error("Erro ao desbloquear anamnese:", error);
    return { error: "Erro ao liberar formulário." };
  }
}

export async function createPatient(formData: FormData) {
  const session = await auth();
  if (!session?.user) return { error: "Não autorizado" };

  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };

  try {
    const validated = PatientSchema.parse(rawData);

    // 1. Verificar se o e-mail já existe
    let finalEmail = validated.email;
    if (!finalEmail) {
      // Gerar e-mail fictício se vazio
      finalEmail = `paciente-${Date.now()}@fitoclin.com.br`;
    }

    const existingUser = await db.user.findUnique({ where: { email: finalEmail } });
    if (existingUser) {
      return { error: "Este e-mail já está sendo utilizado por outro usuário." };
    }

    // 2. Criar senha padrão (O paciente poderá trocar depois ou usar "Esqueci minha senha")
    const hashedPassword = await bcrypt.hash("fitoclin123", 10);

    // 3. Criar Usuário + Paciente em uma transação
    await db.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          name: validated.name,
          email: finalEmail!,
          password: hashedPassword,
          role: "PATIENT",
        }
      });

      await tx.patient.create({
        data: {
          userId: newUser.id,
          phone: validated.phone || null,
          professionalId: session.user.id, // Vincula ao profissional logado
        }
      });
    });

    // 4. Enviar e-mail de boas-vindas se tiver e-mail real
    if (validated.email) {
      const anamnesisLink = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/anamnesis`;
      await sendEmail({
        to: validated.email,
        subject: "Bem-vindo à Fitoclin - Complete seu Cadastro",
        html: getAnamnesisRequestTemplate(validated.name, anamnesisLink)
      }).catch(err => console.error("Erro ao enviar e-mail:", err));
    }

    revalidatePath("/dashboard/patients");
    return { success: "Paciente cadastrado com sucesso!" };

  } catch (error) {
    console.error("Erro ao criar paciente:", error);
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }
    return { error: "Erro interno ao cadastrar paciente." };
  }
}

export async function getPatientsAndLeadsPaginated(page: number, query: string = "") {
  const session = await auth();
  if (!session?.user) return { data: [], totalPages: 0, total: 0 };

  const PAGE_SIZE = 10;
  const skip = (page - 1) * PAGE_SIZE;

  try {
    const isSpecialist = session.user.role !== "ADMIN" && session.user.role !== "SECRETARY";

    const [patients, leads] = await Promise.all([
      db.patient.findMany({
        where: {
          ...(isSpecialist ? { professionalId: session.user.id } : {}),
          user: {
            name: { contains: query, mode: 'insensitive' }
          }
        },
        include: {
          user: true,
          appointments: {
            where: { status: "COMPLETED" },
            orderBy: { date: "desc" },
            take: 1
          }
        }
      }),
      db.lead.findMany({
        where: {
          ...(isSpecialist ? { professionalId: session.user.id } : {}),
          name: { contains: query, mode: 'insensitive' }
        }
      })
    ]);

    const unifiedRows = [
      ...patients.map(p => ({
        id: p.id,
        name: p.user.name,
        email: p.user.email,
        phone: p.phone || "",
        city: p.city || "",
        state: p.state || "",
        type: "patient" as const,
        lastAppointment: p.appointments[0]?.date || null,
        createdAt: p.createdAt,
        leadId: null,
        registrationToken: null
      })),
      ...leads.map(l => ({
        id: l.id,
        name: l.name,
        email: l.email || "",
        phone: l.phone,
        city: "",
        state: "",
        type: "lead" as const,
        lastAppointment: null,
        createdAt: l.createdAt,
        leadId: l.id,
        registrationToken: l.registrationToken
      }))
    ];

    // Ordenar por createdAt decrescente
    unifiedRows.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const total = unifiedRows.length;
    const paginatedData = unifiedRows.slice(skip, skip + PAGE_SIZE);

    return {
      data: paginatedData,
      totalPages: Math.ceil(total / PAGE_SIZE),
      total
    };
  } catch (error) {
    console.error("Erro ao buscar pacientes e leads:", error);
    return { data: [], totalPages: 0, total: 0 };
  }
}

export async function getPatientsForSelect() {
  const session = await auth();
  if (!session?.user) return [];

  try {
    const isSpecialist = session.user.role !== "ADMIN" && session.user.role !== "SECRETARY";

    const [patients, leads] = await Promise.all([
      db.patient.findMany({
        where: isSpecialist ? { professionalId: session.user.id } : {},
        include: { user: true }
      }),
      db.lead.findMany({
        where: isSpecialist ? { professionalId: session.user.id } : {}
      })
    ]);

    const list = [
      ...patients.map(p => ({
        id: p.id,
        name: p.user.name,
        email: p.user.email,
        phone: p.phone || "",
        type: "patient"
      })),
      ...leads.map(l => ({
        id: `lead_${l.id}`, // Prefixo para identificar na criação de consulta
        name: l.name,
        email: l.email || "",
        phone: l.phone,
        type: "lead"
      }))
    ];

    return list.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Erro ao buscar lista para seleção:", error);
    return [];
  }
}

export async function updatePatientProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user) return { error: "Não autorizado" };

  try {
    const phone = formData.get("phone") as string;
    const birthDateStr = formData.get("birthDate") as string;
    const gender = formData.get("gender") as string;
    const occupation = formData.get("occupation") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const profileImage = formData.get("profileImage") as File | null;

    let imageUrl: string | undefined;

    // Se houver uma nova imagem, fazemos o upload
    if (profileImage && profileImage.size > 0 && profileImage.name !== "undefined") {
      const uploadResult = await utapi.uploadFiles(profileImage);

      if (uploadResult.data) {
        imageUrl = uploadResult.data.ufsUrl;
      } else {
        console.error("Erro no upload:", uploadResult.error);
        return { error: "Erro ao fazer upload da imagem." };
      }
    }

    // Converte a data de nascimento
    const birthDate = birthDateStr ? new Date(birthDateStr) : null;

    // Usamos uma transação para garantir consistência
    await db.$transaction(async (tx) => {
      // 1. Atualiza dados do Usuário (apenas se a imagem mudou)
      if (imageUrl) {
        await tx.user.update({
          where: { id: session.user.id },
          data: { image: imageUrl }
        });
      }

      // 2. Atualiza dados do Paciente
      await tx.patient.update({
        where: { userId: session.user.id },
        data: {
          phone,
          gender,
          occupation,
          address,
          city,
          state,
          birthDate,
        }
      });
    });

    revalidatePath("/dashboard/profile");
    return { success: "Perfil atualizado com sucesso!" };

  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return { error: "Ocorreu um erro ao atualizar o perfil." };
  }
}