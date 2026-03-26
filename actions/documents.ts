"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { utapi, extractFileKey } from "@/lib/uploadthing";

// Configurações de limite (16MB - UploadThing suporta muito mais)
const MAX_FILE_SIZE = 16 * 1024 * 1024;

// --- 1. UPLOAD DE DOCUMENTO (Prescrições, Exames, etc) ---
export async function uploadDocument(formData: FormData) {
  const session = await auth();
  if (!session?.user) return { error: "Não autorizado" };

  const file = formData.get("file") as File;
  const title = formData.get("title") as string;
  const type = formData.get("type") as string;

  // Se for Admin/Profissional, o ID vem do form. Se for Paciente, pega da sessão.
  let patientId = formData.get("patientId") as string;

  if (!file || file.size === 0) return { error: "Arquivo inválido." };
  if (file.size > MAX_FILE_SIZE) return { error: "O arquivo deve ter no máximo 16MB." };
  if (!title) return { error: "Dê um nome ao documento." };

  try {
    // A. Identificar o Paciente (Segurança)
    if (!patientId) {
      // Se não veio ID, assume que é o próprio paciente fazendo upload
      const patient = await db.patient.findUnique({
        where: { userId: session.user.id }
      });
      if (!patient) return { error: "Perfil de paciente não encontrado." };
      patientId = patient.id;
    } else {
      // Se veio ID, verificar se quem está fazendo upload tem permissão (Admin ou Profissional)
      const isAllowed = session.user.role === "ADMIN" || session.user.role === "PROFESSIONAL" || session.user.role === "SECRETARY";
      if (!isAllowed) {
        // Fallback: Se um paciente tentar injetar um ID de outro, forçamos o dele mesmo
        const patient = await db.patient.findUnique({ where: { userId: session.user.id } });
        if (patient && patient.id !== patientId) return { error: "Não autorizado a enviar para este paciente." };
      }
    }

    // B. Upload para o UploadThing
    const response = await utapi.uploadFiles(file);

    if (response.error) {
      console.error("Erro UploadThing:", response.error);
      return { error: "Falha ao enviar arquivo. Tente novamente." };
    }

    // C. Salvar referência no Banco de Dados
    await db.document.create({
      data: {
        title,
        url: response.data.url,
        type: type || "OTHER",
        patientId,
      }
    });

    // D. Revalidar rotas
    revalidatePath("/dashboard/documents");
    revalidatePath(`/dashboard/records/${patientId}`); // Prontuário
    revalidatePath("/dashboard/prescriptions"); // Painel de Prescrições

    return { success: "Upload realizado com sucesso!" };

  } catch (error) {
    console.error("Erro no upload:", error);
    return { error: "Falha ao enviar documento. Tente novamente." };
  }
}

// --- 2. BUSCAR PRESCRIÇÕES (Novo - Para o Histórico) ---
export async function getPatientPrescriptions(patientId: string) {
  const session = await auth();
  if (!session) return [];

  // Verificação básica de segurança
  const isProfessional = session.user.role === "ADMIN" || session.user.role === "PROFESSIONAL";

  try {
    const documents = await db.document.findMany({
      where: {
        patientId,
        type: "PRESCRIPTION",
      },
      orderBy: { createdAt: "desc" }, // Mais recentes primeiro
    });
    return documents;
  } catch (error) {
    console.error("Erro ao buscar prescrições:", error);
    return [];
  }
}

// --- 3. DELETAR DOCUMENTO ---
export async function deleteDocument(id: string) {
  const session = await auth();
  if (!session) return { error: "Não autorizado" };

  // Apenas Admins e Profissionais podem deletar documentos clínicos/prescrições para garantir integridade
  const isAllowed = session.user.role === "ADMIN" || session.user.role === "PROFESSIONAL";

  if (!isAllowed) {
    return { error: "Permissão negada. Apenas profissionais podem excluir documentos." };
  }

  try {
    // A. Buscar o documento para obter a URL
    const doc = await db.document.findUnique({ where: { id } });

    if (!doc) return { error: "Documento não encontrado." };

    // B. Deletar do UploadThing (Limpeza de Storage)
    if (doc.url) {
      const fileKey = extractFileKey(doc.url);
      if (fileKey) {
        try {
          await utapi.deleteFiles(fileKey);
        } catch (e) {
          console.warn("Aviso: Não foi possível deletar arquivo do storage:", e);
        }
      }
    }

    // C. Deletar do Banco (Limpeza de Dados)
    await db.document.delete({ where: { id } });

    // D. Revalidar
    revalidatePath("/dashboard/documents");
    revalidatePath(`/dashboard/records/${doc.patientId}`);
    revalidatePath("/dashboard/prescriptions");

    return { success: "Documento removido." };
  } catch (e) {
    console.error("Erro ao deletar:", e);
    return { error: "Erro ao remover arquivo." };
  }
}