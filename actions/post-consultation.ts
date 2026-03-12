"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addPostConsultationUpdateAction(patientId: string, notes: string) {
    const session = await auth();

    if (!session?.user) {
        return { error: "Sem permissão." };
    }

    const role = session.user.role;
    const isAllowed = role === "ADMIN" || role === "PROFESSIONAL" || role === "SECRETARY";

    if (!isAllowed) {
        return { error: "Apenas profissionais podem adicionar atualizações." };
    }

    if (!patientId || !notes) {
        return { error: "Dados inválidos." };
    }

    try {
        const record = await db.medicalRecord.create({
            data: {
                patientId,
                title: "Pós-Consulta - Atualização",
                notes,
            },
        });

        revalidatePath(`/dashboard/records/${patientId}`);
        return { success: "Atualização salva com sucesso!", record };
    } catch (error) {
        console.error("Erro ao salvar atualização:", error);
        return { error: "Erro interno ao salvar." };
    }
}
