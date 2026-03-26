"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { utapi, extractFileKey } from "@/lib/uploadthing";

export async function uploadAudioFile(formData: FormData) {
    const file = formData.get("file") as File;
    if (!file) return { error: "Arquivo inválido" };

    try {
        const response = await utapi.uploadFiles(file);
        if (response.error) {
            return { error: "Erro no upload do áudio" };
        }
        return { success: true, url: response.data.url };
    } catch (error) {
        console.error("Erro upload áudio:", error);
        return { error: "Falha ao processar arquivo de áudio" };
    }
}

export async function createTranscriptionRecord(patientId: string, audioUrl: string) {
    try {
        // 1. Cria uma nova evolução (MedicalRecord) com status de PENDING
        const record = await db.medicalRecord.create({
            data: {
                patientId,
                title: `Transcrição de Consulta`,
                audioUrl: audioUrl,
                transcriptionStatus: "PENDING",
                transcription: ""
            }
        });

        // 2. Avisa o n8n via Webhook (Substitua pela URL real do seu n8n)
        const n8nWebhookUrl = process.env.N8N_TRANSCRIPTION_WEBHOOK_URL;

        if (n8nWebhookUrl) {
            await fetch(n8nWebhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    recordId: record.id,
                    patientId: patientId,
                    audioUrl: audioUrl
                })
            }).catch(err => console.error("Erro ao chamar n8n:", err));
        }

        revalidatePath(`/dashboard/records/${patientId}`);
        return { success: true, recordId: record.id };
    } catch (error) {
        console.error("Erro ao iniciar transcrição:", error);
        return { success: false, error: "Falha ao processar áudio." };
    }
}

export async function saveFinalTranscription(recordId: string, text: string, patientId: string) {
    try {
        // 3. Salva a edição final da Dra. Isa
        await db.medicalRecord.update({
            where: { id: recordId },
            data: {
                transcription: text,
                transcriptionStatus: "FINALIZED"
            }
        });

        revalidatePath(`/dashboard/records/${patientId}`);
        return { success: true };
    } catch (error) {
        return { success: false, error: "Falha ao salvar transcrição." };
    }
}

export async function sendTranscriptionToPEP(recordId: string, text: string, patientId: string) {
    try {
        await db.$transaction(async (tx) => {
            // 1. Cria a evolução no PEP
            await tx.medicalRecord.create({
                data: {
                    patientId,
                    title: `Evolução via Transcrição (${new Date().toLocaleDateString('pt-BR')})`,
                    pilar1_investigacao: text,
                    date: new Date(),
                    transcriptionStatus: "NONE" // Registros normais do PEP não são transcrições
                }
            });

            // 2. Marca a transcrição original como MIGRATED para saber que já foi usada
            await tx.medicalRecord.update({
                where: { id: recordId },
                data: {
                    transcriptionStatus: "FINALIZED", // Garantimos que está finalizado
                    notes: "Migrado para o Prontuário em " + new Date().toLocaleString('pt-BR')
                }
            });
        });

        revalidatePath(`/dashboard/records/${patientId}`);
        return { success: true };
    } catch (error) {
        console.error("Erro ao enviar para PEP:", error);
        return { success: false, error: "Falha ao enviar para o prontuário." };
    }
}

export async function deleteTranscriptionRecord(recordId: string, audioUrl: string | null, patientId: string) {
    try {
        // 1. Deletar áudio físico do UploadThing
        if (audioUrl) {
            const key = extractFileKey(audioUrl);
            if (key) {
                await utapi.deleteFiles(key).catch(e => console.error("Erro deletar UT:", e));
            }
        }

        // 2. Deletar do banco de dados
        await db.medicalRecord.delete({
            where: { id: recordId }
        });

        revalidatePath(`/dashboard/records/${patientId}`);
        return { success: true };

    } catch (error) {
        console.error("Erro ao deletar transcrição:", error);
        return { error: "Ocorreu um erro ao excluir." };
    }
}