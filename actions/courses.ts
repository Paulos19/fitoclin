"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db"; // 👈 Importamos o Singleton para evitar o erro de cache
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

// NÃO instanciar mais: const prisma = new PrismaClient();

// 1. Listar Cursos Disponíveis
export async function getCourses() {
  // Aqui poderíamos filtrar por "cursos comprados", mas por enquanto mostraremos todos os ativos
  const courses = await db.course.findMany({
    where: { active: true },
    include: {
      _count: { select: { modules: true } } // Contagem de módulos
    },
    orderBy: { createdAt: 'desc' }
  });

  // 👇 Serialização: Converte Decimal para Number para o Frontend aceitar
  return courses.map((course) => ({
    ...course,
    price: course.price ? Number(course.price) : 0,
  }));
}

// 2. Buscar Detalhes do Curso (Módulos e Aulas) + Progresso do Usuário
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
          }
        }
      }
    }
  });

  if (!course) return null;

  // 👇 Serialização: Converte Decimal para Number
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
        userId_lessonId: {
          userId: session.user.id,
          lessonId: lessonId
        }
      },
      update: { completed },
      create: {
        userId: session.user.id,
        lessonId,
        completed
      }
    });

    // Revalidar a página da aula e a lista de cursos para atualizar progresso
    revalidatePath(`/dashboard/courses`);
    revalidatePath(`/dashboard/courses/[courseId]`, 'page'); 
    
    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar progresso:", error);
    return { error: "Erro ao salvar progresso" };
  }
}

export async function addModuleMaterial(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  const moduleId = formData.get("moduleId") as string;
  const title = formData.get("title") as string;
  const file = formData.get("file") as File;

  if (!moduleId || !file || !title) return { error: "Dados incompletos" };

  try {
    // 1. Upload para Vercel Blob
    const blob = await put(`courses/materials/${Date.now()}-${file.name}`, file, {
      access: "public",
    });

    // 2. Determinar tipo
    let type = "OTHER";
    if (file.type.includes("pdf")) type = "PDF";
    else if (file.type.includes("image")) type = "IMAGE";
    else if (file.type.includes("spreadsheet") || file.type.includes("excel")) type = "XLS";
    else if (file.type.includes("document") || file.type.includes("word")) type = "DOC";

    // 3. Salvar no Banco
    await db.moduleMaterial.create({
      data: {
        moduleId,
        title,
        url: blob.url,
        type,
      },
    });

    revalidatePath(`/dashboard/courses`);
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
    // 1. Deletar do Blob (Opcional, mas boa prática para limpar lixo)
    if (url) await del(url);

    // 2. Deletar do Banco
    await db.moduleMaterial.delete({
      where: { id: materialId },
    });

    revalidatePath(`/dashboard/courses`);
    return { success: "Material removido!" };
  } catch (error) {
    return { error: "Erro ao deletar." };
  }
}

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

// Lógica complexa para salvar estrutura aninhada sem perder Materiais
export async function upsertCourse(data: any) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  const { id, title, description, imageUrl, active, price, modules } = data;

  try {
    // 1. Criar ou Atualizar o Curso Base
    const course = await db.course.upsert({
      where: { id: id || "new" },
      create: {
        title, description, imageUrl, active, price,
      },
      update: {
        title, description, imageUrl, active, price,
      },
    });

    // 2. Sincronizar Módulos (Difícil: Preservar IDs para não perder Materiais)
    // Estratégia: Iterar sobre os módulos enviados.
    
    // IDs dos módulos que vieram no formulário
    const moduleIdsInForm = modules.filter((m: any) => m.id).map((m: any) => m.id);

    // Deletar módulos que NÃO estão no formulário (foram removidos na UI)
    await db.module.deleteMany({
      where: {
        courseId: course.id,
        id: { notIn: moduleIdsInForm }
      }
    });

    // Atualizar ou Criar Módulos e Aulas
    for (const [mIndex, mod] of modules.entries()) {
      const currentModule = await db.module.upsert({
        where: { id: mod.id || "new-mod" },
        create: {
          title: mod.title,
          order: mIndex,
          courseId: course.id
        },
        update: {
          title: mod.title,
          order: mIndex
        }
      });

      // Lidar com as Aulas do Módulo (Aqui podemos deletar e recriar pois aula não tem material anexo ainda)
      // Mas para ser seguro, vamos usar deleteMany + createMany para limpar e refazer as aulas deste módulo
      // Isso é mais simples que fazer upsert em cada aula.
      
      // Remove aulas antigas desse módulo
      await db.lesson.deleteMany({ where: { moduleId: currentModule.id } });

      // Cria as novas (se houver)
      if (mod.lessons && mod.lessons.length > 0) {
        await db.lesson.createMany({
            data: mod.lessons.map((l: any, lIndex: number) => ({
                title: l.title,
                videoUrl: l.videoUrl,
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