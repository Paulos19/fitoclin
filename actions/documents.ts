"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob"; 

// Configurações de limite (ex: 4MB)
const MAX_FILE_SIZE = 4 * 1024 * 1024; 

export async function uploadDocument(formData: FormData) {
  const session = await auth();
  if (!session?.user) return { error: "Não autorizado" };

  const file = formData.get("file") as File;
  const title = formData.get("title") as string;
  const type = formData.get("type") as string;
  
  // Se for Admin enviando, precisa vir o ID do paciente. Se for Paciente, pega da sessão.
  let patientId = formData.get("patientId") as string;

  if (!file || file.size === 0) return { error: "Arquivo inválido." };
  if (file.size > MAX_FILE_SIZE) return { error: "O arquivo deve ter no máximo 4MB." };
  if (!title) return { error: "Dê um nome ao documento." };

  try {
    // 1. Identificar o Paciente (se não veio no form, tenta buscar pelo user logado)
    if (!patientId) {
        const patient = await db.patient.findUnique({
            where: { userId: session.user.id }
        });
        if (!patient) return { error: "Perfil de paciente não encontrado." };
        patientId = patient.id;
    }

    // 2. Upload para o Vercel Blob
    // 'addRandomSuffix: true' garante que arquivos com mesmo nome não gerem erro
    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true, // 👈 Correção aplicada aqui
    });

    // 3. Salvar referência no Banco de Dados
    await db.document.create({
      data: {
        title,
        url: blob.url, // URL retornada pelo Vercel Blob
        type, // 'EXAM', 'OTHER', 'PRESCRIPTION', etc
        patientId,
      }
    });

    // Revalidar as rotas que mostram documentos
    revalidatePath("/dashboard/documents"); // Visão do Paciente
    revalidatePath(`/dashboard/records/${patientId}`); // Visão da Médica
    
    return { success: "Upload realizado com sucesso!" };

  } catch (error) {
    console.error("Erro no upload:", error);
    return { error: "Falha ao enviar documento. Tente novamente." };
  }
}

export async function deleteDocument(id: string) {
    const session = await auth();
    if (!session) return { error: "Não autorizado" };

    try {
        // 1. Buscar o documento para ter a URL
        const doc = await db.document.findUnique({ where: { id } });
        
        if (!doc) return { error: "Documento não encontrado." };

        // 2. Deletar do Vercel Blob
        // Nota: O Vercel Blob não lança erro se o arquivo já não existir, então é seguro.
        await del(doc.url);

        // 3. Deletar do Banco
        await db.document.delete({ where: { id } });

        revalidatePath("/dashboard/documents");
        revalidatePath(`/dashboard/records/${doc.patientId}`);
        
        return { success: "Documento removido." };
    } catch (e) {
        console.error(e);
        return { error: "Erro ao remover arquivo." };
    }
}