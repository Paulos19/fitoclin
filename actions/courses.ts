"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

// 1. Listar Cursos (Agora com módulos e materiais para edição no Dashboard)
export async function getCourses() {
  const courses = await db.course.findMany({
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: { orderBy: { order: 'asc' } },
          materials: true // 👈 ESSENCIAL: Carrega os materiais para o Modal de Edição
        }
      },
      _count: { select: { modules: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return courses.map((course) => ({
    ...course,
    price: course.price ? Number(course.price) : 0,
  }));
}

// 2. Buscar Detalhes do Curso (Para o Player do Aluno)
export async function getCourseContent(courseId: string) {
  const session = await auth();
  if (!session?.user) return null;

  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' },
            include: {
              progress: {
                where: { userId: session.user.id }
              }
            }
          },
          materials: true // Carrega materiais para o aluno baixar
        }
      }
    }
  });

  if (!course) return null;

  return {
    ...course,
    price: course.price ? Number(course.price) : 0,
  };
}

// 3. Alternar Status de Conclusão da Aula
export async function toggleLessonProgress(lessonId: string, completed: boolean) {
  const session = await auth();
  if (!session?.user) return { error: "Não autorizado" };

  try {
    await db.userLessonProgress.upsert({
      where: {
        userId_lessonId: { userId: session.user.id, lessonId: lessonId }
      },
      update: { completed },
      create: { userId: session.user.id, lessonId, completed }
    });

    revalidatePath(`/dashboard/courses`);
    revalidatePath(`/dashboard/courses/[courseId]`, 'page'); 
    return { success: true };
  } catch (error) {
    return { error: "Erro ao salvar progresso" };
  }
}

// 4. Gestão de Materiais (Upload e Delete)
export async function addModuleMaterial(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  const moduleId = formData.get("moduleId") as string;
  const title = formData.get("title") as string;
  const file = formData.get("file") as File;

  if (!moduleId || !file || !title) return { error: "Dados incompletos" };

  try {
    const blob = await put(`courses/materials/${Date.now()}-${file.name}`, file, {
      access: "public",
    });

    let type = "OTHER";
    if (file.type.includes("pdf")) type = "PDF";
    else if (file.type.includes("image")) type = "IMAGE";
    else if (file.type.includes("spreadsheet") || file.type.includes("excel")) type = "XLS";
    else if (file.type.includes("document") || file.type.includes("word")) type = "DOC";

    await db.moduleMaterial.create({
      data: { moduleId, title, url: blob.url, type },
    });

    revalidatePath(`/dashboard/courses`); // Atualiza a lista para aparecer no modal
    return { success: "Material adicionado com sucesso!" };

  } catch (error) {
    console.error(error);
    return { error: "Erro ao fazer upload do material." };
  }
}

export async function deleteModuleMaterial(materialId: string, url: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  try {
    if (url) await del(url); // Remove do Vercel Blob
    await db.moduleMaterial.delete({ where: { id: materialId } }); // Remove do Banco
    
    revalidatePath(`/dashboard/courses`);
    return { success: "Material removido!" };
  } catch (error) {
    return { error: "Erro ao deletar." };
  }
}

// 5. Gestão de Cursos (Capa e Upsert Geral)
export async function uploadCourseImage(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  const file = formData.get("file") as File;
  if (!file) return { error: "Arquivo inválido" };

  try {
    const blob = await put(`courses/covers/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    return { success: true, url: blob.url };
  } catch (error) {
    return { error: "Erro no upload" };
  }
}

export async function deleteCourse(courseId: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  try {
    await db.course.delete({ where: { id: courseId } });
    revalidatePath("/dashboard/courses");
    return { success: "Curso removido" };
  } catch (error) {
    return { error: "Erro ao deletar curso" };
  }
}

export async function upsertCourse(data: any) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  const { id, title, description, imageUrl, active, price, modules } = data;

  try {
    // 1. Curso Base
    const course = await db.course.upsert({
      where: { id: id || "new" },
      create: { title, description, imageUrl, active, price },
      update: { title, description, imageUrl, active, price },
    });

    // 2. Sincronizar Módulos
    const moduleIdsInForm = modules.filter((m: any) => m.id).map((m: any) => m.id);

    // Deleta módulos removidos da UI
    await db.module.deleteMany({
      where: {
        courseId: course.id,
        id: { notIn: moduleIdsInForm }
      }
    });

    for (const [mIndex, mod] of modules.entries()) {
      const currentModule = await db.module.upsert({
        where: { id: mod.id || "new-mod" },
        create: { title: mod.title, order: mIndex, courseId: course.id },
        update: { title: mod.title, order: mIndex }
      });

      // Refazer aulas (Delete + Create é mais seguro para garantir ordem e limpeza)
      await db.lesson.deleteMany({ where: { moduleId: currentModule.id } });

      if (mod.lessons && mod.lessons.length > 0) {
        await db.lesson.createMany({
            data: mod.lessons.map((l: any, lIndex: number) => ({
                title: l.title,
                videoUrl: l.videoUrl || "",
                order: lIndex,
                moduleId: currentModule.id
            }))
        });
      }
    }

    revalidatePath("/dashboard/courses");
    return { success: "Curso salvo com sucesso!" };

  } catch (error) {
    console.error(error);
    return { error: "Erro ao salvar curso." };
  }
}