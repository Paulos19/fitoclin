import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { LeadStatus } from "@prisma/client";

export async function POST(req: Request) {
  // Segurança
  const headerList = await headers();
  const secret = headerList.get("x-n8n-secret");
  if (secret !== process.env.N8N_API_SECRET) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const body = await req.json();
    const { leadId, status } = body;

    if (!leadId || !status) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Atualiza o Status do Lead
    await db.lead.update({
      where: { id: leadId },
      data: { status: status as LeadStatus }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Erro ao atualizar status via API:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}