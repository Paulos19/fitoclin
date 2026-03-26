"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { utapi } from "@/lib/uploadthing";

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
      const response = await utapi.uploadFiles(profileImage);
      if (response.error) {
        console.error("Erro no upload:", response.error);
        return { error: "Falha ao enviar a foto." };
      }
      newImageUrl = response.data.url;
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

// --- BUSCA SIMPLIFICADA PARA SELECT ---
export async function getPatientsForSelect() {
  const session = await auth();
  if (!session) return [];

  const role = session.user.role;
  // @ts-ignore
  const canViewAll = role === "ADMIN" || role === "SECRETARY";

  const whereClause = canViewAll
    ? {}
    : { professionalId: session.user.id };

  // 1. Busca Pacientes
  const patients = await db.patient.findMany({
    where: whereClause,
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: 'desc' }
  });

  // 2. Busca Leads (Interessados)
  // Nota: Idealmente filtramos leads que já são pacientes. 
  // Por simplicidade, traremos todos os leads atrelados ao profissional (ou todos se admin)
  const leads = await db.lead.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' }
  });

  const patientResults = patients.map(p => ({
    id: p.id,
    name: p.user?.name || "Sem Nome",
    phone: p.phone || "",
    email: p.user?.email || "",
    type: 'patient' as const
  }));

  // Filtra leads que possam ter o mesmo email de um paciente já cadastrado
  const patientEmails = new Set(patientResults.map(p => p.email).filter(Boolean));
  const leadResults = leads
    .filter(l => !l.email || !patientEmails.has(l.email))
    .map(l => ({
      id: `lead_${l.id}`,
      name: l.name,
      phone: l.phone,
      email: l.email || "",
      type: 'lead' as const
    }));

  return [...patientResults, ...leadResults];
}

// --- BUSCA PAGINADA DE PACIENTES + LEADS ---
export async function getPatientsAndLeadsPaginated(page: number = 1, query: string = "") {
  const session = await auth();
  if (!session) return { data: [], totalPages: 0, currentPage: page, total: 0 };

  const role = session.user.role;
  // @ts-ignore
  const canViewAll = role === "ADMIN" || role === "SECRETARY";
  const PAGE_SIZE = 10;

  const whereBase = canViewAll ? {} : { professionalId: session.user.id };

  // Filtros
  const patientWhere: any = {
    ...whereBase,
    ...(query ? { user: { name: { contains: query, mode: 'insensitive' } } } : {}),
  };
  const leadWhere: any = {
    ...whereBase,
    status: { notIn: ['WON'] },
    ...(query ? { name: { contains: query, mode: 'insensitive' } } : {}),
  };

  // 1. Contar totais no banco
  const [patientCount, leadCount] = await Promise.all([
    db.patient.count({ where: patientWhere }),
    db.lead.count({ where: leadWhere }),
  ]);

  const totalRecords = patientCount + leadCount;
  const totalPages = Math.ceil(totalRecords / PAGE_SIZE);
  const offset = (page - 1) * PAGE_SIZE;

  // 2. Calcular quais registros buscar de cada tabela
  // Pacientes vêm primeiro, depois Leads
  let data: any[] = [];

  if (offset < patientCount) {
    // Ainda estamos na faixa de pacientes
    const patientsToFetch = Math.min(PAGE_SIZE, patientCount - offset);
    const patients = await db.patient.findMany({
      where: patientWhere,
      include: {
        user: { select: { name: true, email: true } },
        appointments: { orderBy: { date: 'desc' as const }, take: 1 },
      },
      orderBy: { createdAt: 'desc' },
      take: patientsToFetch,
      skip: offset,
    });

    data = patients.map(p => ({
      id: p.id,
      name: p.user?.name || "Sem Nome",
      email: p.user?.email || "",
      phone: p.phone || "",
      city: p.city || "",
      state: p.state || "",
      type: 'patient' as const,
      lastAppointment: p.appointments[0]?.date || null,
      createdAt: p.createdAt,
      leadId: null as string | null,
      registrationToken: null as string | null,
    }));

    // Se sobrou espaço na página, preencher com leads
    const remaining = PAGE_SIZE - data.length;
    if (remaining > 0) {
      const leads = await db.lead.findMany({
        where: leadWhere,
        orderBy: { createdAt: 'desc' },
        take: remaining,
        skip: 0,
      });

      data.push(...leads.map(l => ({
        id: `lead_${l.id}`,
        name: l.name,
        email: l.email || "",
        phone: l.phone || "",
        city: "",
        state: "",
        type: 'lead' as const,
        lastAppointment: null as Date | null,
        createdAt: l.createdAt,
        leadId: l.id,
        registrationToken: l.registrationToken || null,
      })));
    }
  } else {
    // Já passamos de todos os pacientes, buscar apenas leads
    const leadOffset = offset - patientCount;
    const leads = await db.lead.findMany({
      where: leadWhere,
      orderBy: { createdAt: 'desc' },
      take: PAGE_SIZE,
      skip: leadOffset,
    });

    data = leads.map(l => ({
      id: `lead_${l.id}`,
      name: l.name,
      email: l.email || "",
      phone: l.phone || "",
      city: "",
      state: "",
      type: 'lead' as const,
      lastAppointment: null as Date | null,
      createdAt: l.createdAt,
      leadId: l.id,
      registrationToken: l.registrationToken || null,
    }));
  }

  return { data, totalPages, currentPage: page, total: totalRecords };
}