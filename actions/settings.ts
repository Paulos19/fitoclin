"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

// --- SCHEMAS DE VALIDAÇÃO ---

// 1. Schema de Aulas
const LessonSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Título da aula obrigatório"),
  videoUrl: z.string().optional().or(z.literal("")), 
  description: z.string().optional(),
  order: z.number().default(0),
});

// 2. Schema de Módulos
const ModuleSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Título do módulo obrigatório"),
  order: z.number().default(0),
  lessons: z.array(LessonSchema).default([]),
});

// 3. Schema do Curso
const CourseSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Título obrigatório"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  linkUrl: z.string().optional(),
  active: z.boolean().default(false),
  // Agora validamos como número, o Prisma converterá para Decimal
  price: z.coerce.number().min(0).default(0),
  modules: z.array(ModuleSchema).default([]),
});

// 4. Outros Schemas
const PlanSchema = z.object({
  name: z.string().min(1),
  // Validamos como número, o Prisma converterá para Decimal
  price: z.coerce.number().min(0),
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


// --- ACTIONS DE CURSO (LMS COMPLETO) ---

export async function upsertCourse(data: any) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  try {
    const validatedData = CourseSchema.parse(data);

    // --- UPDATE ---
    if (validatedData.id) {
      // 1. Atualizar dados do Curso
      await prisma.course.update({
        where: { id: validatedData.id },
        data: {
          title: validatedData.title,
          description: validatedData.description,
          imageUrl: validatedData.imageUrl,
          active: validatedData.active,
          price: validatedData.price, // Prisma aceita number para campo Decimal
        },
      });

      // 2. Gerenciar Módulos e Aulas
      for (const mod of validatedData.modules) {
        let moduleId = mod.id;

        if (moduleId && !moduleId.startsWith("temp-")) { 
          // Atualiza módulo existente
          await prisma.module.update({
            where: { id: moduleId },
            data: { title: mod.title, order: mod.order }
          });
        } else {
          // Cria novo módulo
          const newMod = await prisma.module.create({
            data: {
              title: mod.title,
              order: mod.order,
              courseId: validatedData.id!
            }
          });
          moduleId = newMod.id;
        }

        // Processar Aulas
        for (const lesson of mod.lessons) {
          if (lesson.id && !lesson.id.startsWith("temp-")) {
            await prisma.lesson.update({
              where: { id: lesson.id },
              data: {
                title: lesson.title,
                videoUrl: lesson.videoUrl,
                order: lesson.order
              }
            });
          } else {
            await prisma.lesson.create({
              data: {
                title: lesson.title,
                videoUrl: lesson.videoUrl,
                order: lesson.order,
                moduleId: moduleId!
              }
            });
          }
        }
      }

    } else {
      // --- CREATE ---
      await prisma.course.create({
        data: {
          title: validatedData.title,
          description: validatedData.description,
          imageUrl: validatedData.imageUrl,
          active: validatedData.active,
          price: validatedData.price,
          modules: {
            create: validatedData.modules.map(mod => ({
              title: mod.title,
              order: mod.order,
              lessons: {
                create: mod.lessons.map(lesson => ({
                  title: lesson.title,
                  videoUrl: lesson.videoUrl,
                  order: lesson.order
                }))
              }
            }))
          }
        },
      });
    }

    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard/courses");
    return { success: "Curso salvo com sucesso!" };

  } catch (error) {
    console.error("Erro ao salvar curso:", error);
    return { error: "Erro ao processar dados do curso." };
  }
}

export async function deleteCourse(id: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };
  
  try {
    await prisma.course.delete({ where: { id } });
    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard/courses");
    return { success: "Curso removido." };
  } catch (e) {
    return { error: "Erro ao remover." };
  }
}


// --- ACTIONS DE PLANOS ---

export async function upsertPlan(formData: FormData, id?: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  const rawData = Object.fromEntries(formData.entries());
  
  // Tratamento de dados para o Zod
  const processedData = {
    ...rawData,
    highlight: rawData.highlight === 'on' || rawData.highlight === 'true',
    // O schema coerce.number() vai lidar com isso
    price: rawData.price 
  };

  const validated = PlanSchema.safeParse(processedData);

  if (!validated.success) return { error: "Dados inválidos: " + validated.error.message };

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
    console.error(e);
    return { error: "Erro ao salvar plano." };
  }
}

export async function deletePlan(id: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };
  try {
    await prisma.plan.delete({ where: { id } });
    revalidatePath("/dashboard/settings");
    revalidatePath("/");
    return { success: "Plano removido." };
  } catch (e) {
    return { error: "Erro ao remover." };
  }
}


// --- ACTIONS DE INFO DO SITE ---

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