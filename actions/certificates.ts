"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function getUserCertificates() {
  const session = await auth();
  if (!session) return [];

  // Busca cursos que o usuário comprou ou tem acesso
  // E calcula o progresso para saber se pode emitir certificado
  const courses = await db.course.findMany({
    where: {
      active: true,
      // Filtra cursos onde o usuário tem progresso ou compra (simplificado)
      modules: {
        some: {
            lessons: {
                some: {}
            }
        }
      }
    },
    include: {
      modules: {
        include: {
          lessons: {
            include: {
              progress: {
                where: { userId: session.user.id }
              }
            }
          }
        }
      },
      certificates: {
        where: { userId: session.user.id }
      }
    }
  });

  // Processa os dados para saber quem está 100%
  const certificatesData = courses.map(course => {
    const allLessons = course.modules.flatMap(m => m.lessons);
    const totalLessons = allLessons.length;
    const completedLessons = allLessons.filter(l => l.progress.length > 0 && l.progress[0].completed).length;
    
    const progress = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);
    const isCompleted = progress === 100;
    
    // Se completou mas não tem certificado no banco, o botão de "Gerar" irá criar
    const existingCertificate = course.certificates[0];

    return {
      courseId: course.id,
      courseTitle: course.title,
      courseImage: course.imageUrl,
      progress,
      isCompleted,
      certificateCode: existingCertificate?.code,
      issuedAt: existingCertificate?.issuedAt,
    };
  });

  // Retorna apenas os que têm algum progresso ou estão completos
  return certificatesData.filter(c => c.progress > 0);
}

// Gera o registro no banco antes de baixar o PDF
export async function issueCertificate(courseId: string) {
  const session = await auth();
  if (!session) return { error: "Não autorizado" };

  // 1. Verificar se realmente completou 100% (Dupla checagem de segurança)
  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
        modules: { include: { lessons: { include: { progress: { where: { userId: session.user.id } } } } } }
    }
  });

  if (!course) return { error: "Curso não encontrado" };

  const allLessons = course.modules.flatMap(m => m.lessons);
  const completedCount = allLessons.filter(l => l.progress?.[0]?.completed).length;
  
  if (completedCount < allLessons.length || allLessons.length === 0) {
      return { error: "Você precisa completar todas as aulas para emitir o certificado." };
  }

  // 2. Criar ou Recuperar Certificado
  const code = `FITO-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Date.now().toString().substring(9)}`;
  
  const cert = await db.certificate.upsert({
    where: {
        userId_courseId: { userId: session.user.id, courseId }
    },
    create: {
        userId: session.user.id,
        courseId,
        code
    },
    update: {} // Não faz nada se já existe
  });

  return { success: true, code: cert.code };
}