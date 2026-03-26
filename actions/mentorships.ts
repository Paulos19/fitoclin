"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { utapi, extractFileKey } from "@/lib/uploadthing";
import { revalidatePath } from "next/cache";

// 1. Listar Mentorias
export async function getMentorships() {
  try {
    const mentorships = await db.mentorship.findMany({
      orderBy: { date: 'desc' }
    });
    return mentorships;
  } catch (error) {
    return [];
  }
}

// 2. Upload de Vídeo (UploadThing)
export async function uploadMentorshipVideo(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  const file = formData.get("file") as File;
  if (!file) return { error: "Arquivo inválido" };

  try {
    const response = await utapi.uploadFiles(file);

    if (response.error) {
      console.error("Erro UploadThing:", response.error);
      return { error: "Erro no upload. Verifique o tamanho do arquivo." };
    }

    return { success: true, url: response.data.url };
  } catch (error) {
    console.error(error);
    return { error: "Erro no upload. Verifique o tamanho do arquivo." };
  }
}

// 3. Criar ou Atualizar Mentoria
export async function upsertMentorship(data: any) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  try {
    await db.mentorship.upsert({
      where: { id: data.id || "new" },
      create: {
        title: data.title,
        description: data.description,
        videoUrl: data.videoUrl,
        sourceType: data.sourceType,
        date: new Date(data.date),
      },
      update: {
        title: data.title,
        description: data.description,
        videoUrl: data.videoUrl,
        sourceType: data.sourceType,
        date: new Date(data.date),
      },
    });

    revalidatePath("/dashboard/mentorships");
    revalidatePath("/specialization/mentorships");
    return { success: "Mentoria salva com sucesso!" };
  } catch (error) {
    return { error: "Erro ao salvar mentoria." };
  }
}

// 4. Deletar Mentoria
export async function deleteMentorship(id: string, videoUrl: string, sourceType: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  try {
    // Se for upload, deleta do UploadThing para economizar espaço
    if (sourceType === "UPLOAD" && videoUrl) {
      const fileKey = extractFileKey(videoUrl);
      if (fileKey) {
        try {
          await utapi.deleteFiles(fileKey);
        } catch (e) {
          console.warn("Aviso: Não foi possível deletar vídeo do storage:", e);
        }
      }
    }

    await db.mentorship.delete({ where: { id } });

    revalidatePath("/dashboard/mentorships");
    revalidatePath("/specialization/mentorships");
    return { success: "Mentoria removida!" };
  } catch (error) {
    return { error: "Erro ao deletar." };
  }
}