"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db"; // 👈 Importamos o Singleton para evitar o erro de cache
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