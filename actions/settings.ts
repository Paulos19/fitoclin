"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { put } from "@vercel/blob"; 

// --- SCHEMAS DE VALIDAÇÃO ---

// 1. Schema de Aulas
const LessonSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Título da aula obrigatório"),
  videoUrl: z.string().nullish(), 
  description: z.string().nullish(),
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
  description: z.string().nullish(), 
  imageUrl: z.string().nullish(),    
  linkUrl: z.string().nullish(),     
  active: z.boolean().default(false),
  price: z.coerce.number().min(0).default(0),
  modules: z.array(ModuleSchema).default([]),
});

// 4. Outros Schemas
const PlanSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(0),
  period: z.string().min(1),
  features: z.string().min(1),
  highlight: z.coerce.boolean(),
  buttonText: z.string().nullish(), 
  buttonLink: z.string().nullish(),
});

const SiteInfoSchema = z.object({
  heroTitle: z.string().nullish(),
  heroSubtitle: z.string().nullish(),
  aboutText: z.string().nullish(),
  whatsapp: z.string().nullish(),
  instagram: z.string().nullish(),
});


// --- ACTIONS DE IMAGEM ---

export async function uploadCourseImage(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  const file = formData.get("file") as File;
  if (!file || file.size === 0) return { error: "Arquivo inválido" };

  try {
    const filename = `courses/cover-${Date.now()}-${file.name}`;
    const blob = await put(filename, file, {
      access: 'public',
    });
    return { success: true, url: blob.url };
  } catch (error) {
    console.error("Erro upload:", error);
    return { error: "Falha no upload da imagem" };
  }
}


// --- ACTIONS DE CURSO (LMS COMPLETO) ---

export async function upsertCourse(data: any) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  try {
    const validatedData = CourseSchema.parse(data);

    // --- CENÁRIO A: ATUALIZAÇÃO (UPDATE) ---
    if (validatedData.id) {
      await db.course.update({
        where: { id: validatedData.id },
        data: {
          title: validatedData.title,
          description: validatedData.description || null, 
          imageUrl: validatedData.imageUrl || null,
          active: validatedData.active,
          price: validatedData.price,
        },
      });

      // 2. Gerenciar Módulos e Aulas
      for (const mod of validatedData.modules) {
        let moduleId = mod.id;

        if (moduleId && !moduleId.startsWith("temp-")) { 
          await db.module.update({
            where: { id: moduleId },
            data: { title: mod.title, order: mod.order }
          });
        } else {
          const newMod = await db.module.create({
            data: {
              title: mod.title,
              order: mod.order,
              courseId: validatedData.id!
            }
          });
          moduleId = newMod.id;
        }

        for (const lesson of mod.lessons) {
          if (lesson.id && !lesson.id.startsWith("temp-")) {
            await db.lesson.update({
              where: { id: lesson.id },
              data: {
                title: lesson.title,
                videoUrl: lesson.videoUrl || null,
                description: lesson.description || null,
                order: lesson.order
              }
            });
          } else {
            await db.lesson.create({
              data: {
                title: lesson.title,
                videoUrl: lesson.videoUrl || null,
                description: lesson.description || null,
                order: lesson.order,
                moduleId: moduleId!
              }
            });
          }
        }
      }

    } else {
      // --- CENÁRIO B: CRIAÇÃO (CREATE) ---
      await db.course.create({
        data: {
          title: validatedData.title,
          description: validatedData.description || null,
          imageUrl: validatedData.imageUrl || null,
          active: validatedData.active,
          price: validatedData.price,
          modules: {
            create: validatedData.modules.map(mod => ({
              title: mod.title,
              order: mod.order,
              lessons: {
                create: mod.lessons.map(lesson => ({
                  title: lesson.title,
                  videoUrl: lesson.videoUrl || null,
                  description: lesson.description || null,
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
    // 👇 CORREÇÃO: Usar .issues em vez de .errors para maior compatibilidade de tipos
    if (error instanceof z.ZodError) {
       const errorMessage = error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
       return { error: `Erro de validação: ${errorMessage}` };
    }
    return { error: "Erro ao processar dados do curso." };
  }
}

export async function deleteCourse(id: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };
  
  try {
    await db.course.delete({ where: { id } });
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
  
  const processedData = {
    ...rawData,
    highlight: rawData.highlight === 'on' || rawData.highlight === 'true',
    price: rawData.price 
  };

  const validated = PlanSchema.safeParse(processedData);

  if (!validated.success) return { error: "Dados inválidos: " + validated.error.issues[0].message };

  // 👇 CORREÇÃO: Garantir que buttonText não seja null (pois é obrigatório no banco)
  const dataToSave = {
    name: validated.data.name,
    price: validated.data.price,
    period: validated.data.period,
    features: validated.data.features,
    highlight: validated.data.highlight,
    buttonText: validated.data.buttonText ?? "Assinar Agora", // Fallback se null/undefined
    buttonLink: validated.data.buttonLink ?? null, // Aceita null se opcional
  };

  try {
    if (id) {
      await db.plan.update({ where: { id }, data: dataToSave });
    } else {
      await db.plan.create({ data: dataToSave });
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
    await db.plan.delete({ where: { id } });
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
    await db.siteInfo.upsert({
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