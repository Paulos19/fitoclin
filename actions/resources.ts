"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function getAllResources() {
  const session = await auth();
  if (!session) return [];

  try {
    // Busca materiais de TODOS os cursos ativos
    const materials = await db.moduleMaterial.findMany({
      where: {
        module: {
          course: {
            active: true
          }
        }
      },
      include: {
        module: {
          select: {
            id: true,
            title: true,
            course: {
              select: {
                id: true,
                title: true,
                imageUrl: true,
                category: true, // Importante para saber se é Specialization ou Community
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc' // Mais recentes primeiro
      }
    });

    return materials;
  } catch (error) {
    console.error("Erro ao buscar recursos:", error);
    return [];
  }
}