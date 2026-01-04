"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// 1. Listar Cursos Disponíveis
export async function getCourses() {
  // Aqui poderíamos filtrar por "cursos comprados", mas por enquanto mostraremos todos os ativos
  return await prisma.course.findMany({
    where: { active: true },
    include: {
      _count: { select: { modules: true } } // Contagem de módulos
    },
    orderBy: { createdAt: 'desc' }
  });
}

// 2. Buscar Detalhes do Curso (Módulos e Aulas) + Progresso do Usuário
export async function getCourseContent(courseId: string) {
  const session = await auth();
  if (!session?.user) return null;

  const course = await prisma.course.findUnique({
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

  return course;
}

// 3. Alternar Status de Conclusão da Aula
export async function toggleLessonProgress(lessonId: string, completed: boolean) {
  const session = await auth();
  if (!session?.user) return { error: "Não autorizado" };

  try {
    await prisma.userLessonProgress.upsert({
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

    // Revalidar a página da aula para atualizar o ícone
    revalidatePath(`/dashboard/courses`); 
    return { success: true };
  } catch (error) {
    return { error: "Erro ao salvar progresso" };
  }
}