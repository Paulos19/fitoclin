"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { put } from "@vercel/blob"; // Importação necessária

const prisma = new PrismaClient();

// --- SCHEMAS ---
const CourseSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().min(1),
  price: z.string().optional(),
  imageUrl: z.string().optional(), // URL da imagem
  linkUrl: z.string().optional(),
  active: z.coerce.boolean(),
});

// ... (Outros schemas PlanSchema e SiteInfoSchema mantêm-se iguais) ...
const PlanSchema = z.object({
  name: z.string().min(1),
  price: z.string().min(1),
  period: z.string().min(1),
  features: z.string().min(1),
  highlight: z.coerce.boolean(),
  buttonText: z.string().optional(),
  buttonLink: z.string().optional(),
});

const SiteInfoSchema = z.object({
  heroTitle: z.string().optional(),
  heroSubtitle: z.string().optional(),
  aboutText: z.string().optional(),
  whatsapp: z.string().optional(),
  instagram: z.string().optional(),
});


// --- ACTIONS DE CURSO ---

export async function upsertCourse(formData: FormData, id?: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  // 1. Processamento da Imagem (Thumbnail)
  const thumbFile = formData.get("thumbFile") as File;
  let imageUrl = formData.get("imageUrl") as string; // Mantém a URL antiga se não vier nova

  if (thumbFile && thumbFile.size > 0) {
    try {
      // Upload para Vercel Blob
      const filename = `courses/thumb-${Date.now()}-${thumbFile.name}`;
      const blob = await put(filename, thumbFile, {
        access: 'public',
      });
      imageUrl = blob.url;
    } catch (error) {
      console.error("Erro upload thumb:", error);
      return { error: "Falha ao salvar a imagem do curso" };
    }
  }

  // 2. Monta o objeto com a URL correta
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    linkUrl: formData.get("linkUrl"),
    active: formData.get("active"),
    imageUrl: imageUrl, 
  };

  const validated = CourseSchema.safeParse(rawData);

  if (!validated.success) return { error: "Dados inválidos" };

  try {
    if (id) {
      await prisma.course.update({ where: { id }, data: validated.data });
    } else {
      await prisma.course.create({ data: validated.data });
    }
    revalidatePath("/dashboard/settings");
    revalidatePath("/");
    return { success: "Curso salvo com sucesso!" };
  } catch (e) {
    return { error: "Erro ao salvar curso." };
  }
}

export async function deleteCourse(id: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };
  await prisma.course.delete({ where: { id } });
  revalidatePath("/dashboard/settings");
  revalidatePath("/");
  return { success: "Curso removido." };
}

// ... (O restante das actions upsertPlan, deletePlan, updateSiteInfo permanece igual) ...
// Vou incluir aqui para garantir que você tenha o arquivo completo se copiar/colar

export async function upsertPlan(formData: FormData, id?: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  const rawData = Object.fromEntries(formData.entries());
  const validated = PlanSchema.safeParse(rawData);

  if (!validated.success) return { error: "Dados inválidos" };

  try {
    if (id) {
      await prisma.plan.update({ where: { id }, data: validated.data });
    } else {
      await prisma.plan.create({ data: validated.data });
    }
    revalidatePath("/dashboard/settings");
    revalidatePath("/");
    return { success: "Plano salvo com sucesso!" };
  } catch (e) {
    return { error: "Erro ao salvar plano." };
  }
}

export async function deletePlan(id: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };
  await prisma.plan.delete({ where: { id } });
  revalidatePath("/dashboard/settings");
  revalidatePath("/");
  return { success: "Plano removido." };
}

export async function updateSiteInfo(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  const rawData = Object.fromEntries(formData.entries());
  const validated = SiteInfoSchema.safeParse(rawData);

  if (!validated.success) return { error: "Dados inválidos" };

  try {
    await prisma.siteInfo.upsert({
      where: { key: "homepage_config" },
      update: validated.data,
      create: { key: "homepage_config", ...validated.data },
    });
    revalidatePath("/dashboard/settings");
    revalidatePath("/");
    return { success: "Informações gerais atualizadas!" };
  } catch (e) {
    return { error: "Erro ao atualizar informações." };
  }
}