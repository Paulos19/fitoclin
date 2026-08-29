"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { utapi, extractFileKey } from "@/lib/uploadthing";
import { revalidatePath } from "next/cache";
import { saoPauloToUtc, nowInSaoPaulo } from "@/lib/timezone";

// Lista todos os vídeos (admin)
export async function getVideoCourses() {
  const session = await auth();
  if (!session) return { error: "Não autorizado" };

  try {
    const videos = await db.videoCourse.findMany({
      orderBy: { order: "asc" },
    });
    return { success: true, data: videos };
  } catch (error) {
    console.error("Erro ao buscar vídeos:", error);
    return { error: "Erro ao buscar vídeos." };
  }
}

// Lista vídeos disponíveis (usuários autenticados) - só vídeos com releaseAt <= agora em SP
export async function getAvailableVideoCourses() {
  const session = await auth();
  if (!session) return [];

  try {
    const nowSP = nowInSaoPaulo();

    const videos = await db.videoCourse.findMany({
      where: {
        active: true,
        releaseAt: { lte: nowSP },
      },
      orderBy: { order: "asc" },
    });

    return videos;
  } catch (error) {
    console.error("Erro ao buscar vídeos disponíveis:", error);
    return [];
  }
}

// Lista TODOS os vídeos ativos (liberados + futuros) para a pública
export async function getAllActiveVideoCourses() {
  const session = await auth();
  if (!session) return [];

  try {
    const videos = await db.videoCourse.findMany({
      where: {
        active: true,
      },
      orderBy: { order: "asc" },
    });

    return videos;
  } catch (error) {
    console.error("Erro ao buscar vídeos:", error);
    return [];
  }
}

// Upload de capa do vídeo
export async function uploadVideoCourseCover(formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Não autorizado" };
  if (session.user.role !== "ADMIN") return { error: "Não autorizado" };

  try {
    const file = formData.get("file") as File;
    if (!file) return { error: "Nenhum arquivo selecionado." };

    const uploaded = await utapi.uploadFiles([file]);
    if (!uploaded || uploaded.length === 0) return { error: "Erro no upload." };

    return { success: true, url: uploaded[0].ufsUrl };
  } catch (error) {
    console.error("Erro ao upload capa:", error);
    return { error: "Erro ao fazer upload da capa." };
  }
}

// Criar ou atualizar vídeo
export async function upsertVideoCourse(data: {
  id?: string;
  title: string;
  description?: string;
  youtubeUrl: string;
  coverImageUrl?: string;
  releaseAt: string; // data no formato ISO ou date string (horário de SP)
  order?: number;
  active?: boolean;
}) {
  const session = await auth();
  if (!session) return { error: "Não autorizado" };
  if (session.user.role !== "ADMIN") return { error: "Não autorizado" };

  try {
    // Converter releaseAt de SP para UTC antes de salvar
    const releaseAtSP = new Date(data.releaseAt);
    const releaseAtUTC = saoPauloToUtc(releaseAtSP);

    const videoData = {
      title: data.title,
      description: data.description || null,
      youtubeUrl: data.youtubeUrl,
      coverImageUrl: data.coverImageUrl || null,
      releaseAt: releaseAtUTC,
      order: data.order ?? 0,
      active: data.active ?? true,
    };

    if (data.id) {
      await db.videoCourse.update({
        where: { id: data.id },
        data: videoData,
      });
    } else {
      await db.videoCourse.create({
        data: videoData,
      });
    }

    revalidatePath("/dashboard/video-courses");
    revalidatePath("/cursos");

    return { success: "Vídeo salvo com sucesso!" };
  } catch (error) {
    console.error("Erro ao salvar vídeo:", error);
    return { error: "Erro ao salvar vídeo." };
  }
}

// Deletar vídeo
export async function deleteVideoCourse(id: string, coverImageUrl?: string | null) {
  const session = await auth();
  if (!session) return { error: "Não autorizado" };
  if (session.user.role !== "ADMIN") return { error: "Não autorizado" };

  try {
    // Deletar capa do UploadThing se existir
    if (coverImageUrl) {
      try {
        const fileKey = extractFileKey(coverImageUrl);
        if (fileKey) {
          await utapi.deleteFiles([fileKey]);
        }
      } catch (e) {
        console.error("Erro ao deletar capa do UploadThing:", e);
      }
    }

    await db.videoCourse.delete({ where: { id } });

    revalidatePath("/dashboard/video-courses");
    revalidatePath("/cursos");

    return { success: "Vídeo excluído com sucesso!" };
  } catch (error) {
    console.error("Erro ao excluir vídeo:", error);
    return { error: "Erro ao excluir vídeo." };
  }
}
