import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { LeadStatus } from "@prisma/client";

export async function POST(req: Request) {
    // Segurança
    const headerList = await headers();
    const secret = headerList.get("x-n8n-secret");
    if (secret !== process.env.N8N_API_SECRET) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    try {
        const body = await req.json();
        const { phone, name, source = "WhatsApp" } = body;

        // Remove qual quer caracter que nao seja numero
        const cleanPhone = String(phone || "").replace(/\D/g, "");

        if (!cleanPhone || cleanPhone.length < 10) {
            return NextResponse.json(
                { success: false, error: "Telefone inválido ou ausente." },
                { status: 400 }
            );
        }

        const leadName = name || "S/N";

        // Busca lead pelo telefone
        const existingLead = await db.lead.findFirst({
            where: {
                phone: cleanPhone,
            },
        });

        if (existingLead) {
            // Já existe, não faz sentido sobrescrever dados se já tem dono
            return NextResponse.json(
                { success: true, message: "Lead já existe.", leadId: existingLead.id },
                { status: 200 }
            );
        }

        // Cria novo Lead
        const newLead = await db.lead.create({
            data: {
                phone: cleanPhone,
                name: leadName,
                source: source,
                status: LeadStatus.NEW,
            },
        });

        return NextResponse.json(
            { success: true, message: "Lead criado com sucesso.", leadId: newLead.id },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Erro na rota POST /api/n8n/leads:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Erro interno do servidor." },
            { status: 500 }
        );
    }
}
