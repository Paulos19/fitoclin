import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export async function POST(req: Request) {
    try {
        const headerList = await headers();
        const secret = headerList.get("x-n8n-secret");

        if (secret !== process.env.N8N_API_SECRET) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { recordId, transcriptionText, status } = body;

        if (!recordId || !transcriptionText) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        // Atualiza o registo médico com a transcrição concluída
        await db.medicalRecord.update({
            where: { id: recordId },
            data: {
                transcription: transcriptionText,
                transcriptionStatus: status || "COMPLETED",
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Erro no webhook de transcrição:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}