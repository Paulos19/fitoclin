import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Segurança
  const headerList = await headers();
  const secret = headerList.get("x-n8n-secret");
  if (secret !== process.env.N8N_API_SECRET) return new NextResponse("Unauthorized", { status: 401 });

  try {
    // Busca Leads que estão marcados como "POS_CONSULTA"
    // Isso significa que alguém clicou no botão, mas a mensagem ainda não foi enviada pelo scheduler
    const candidates = await db.lead.findMany({
      where: {
        status: "POS_CONSULTA"
      },
      select: {
        id: true,
        name: true,
        phone: true,
        professionalId: true
      }
    });

    // Formata os dados para o n8n
    const formatted = candidates.map(lead => ({
      leadId: lead.id,
      name: lead.name,
      phone: lead.phone.replace(/\D/g, ""), // Limpa caracteres
    }));

    return NextResponse.json(formatted);

  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}