"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { put, del } from "@vercel/blob";
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

// 2. Upload de Vídeo (Vercel Blob)
export async function uploadMentorshipVideo(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Não autorizado" };

  const file = formData.get("file") as File;
  if (!file) return { error: "Arquivo inválido" };

  try {
    const blob = await put(`mentorships/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    return { success: true, url: blob.url };
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
    // Se for upload, deleta do Blob para economizar espaço
    if (sourceType === "UPLOAD" && videoUrl.includes("public.blob")) {
        await del(videoUrl);
    }

    await db.mentorship.delete({ where: { id } });
    
    revalidatePath("/dashboard/mentorships");
    revalidatePath("/specialization/mentorships");
    return { success: "Mentoria removida!" };
  } catch (error) {
    return { error: "Erro ao deletar." };
  }
}