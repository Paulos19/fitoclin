import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const headerList = await headers();
  const secret = headerList.get("x-n8n-secret");
  if (secret !== process.env.N8N_API_SECRET) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const body = await req.json();
    const { phone, patientId, title, notes, type } = body;

    let targetPatientId = patientId;

    // Se não veio ID (caso do fluxo de resposta), busca pelo telefone
    if (!targetPatientId && phone) {
      // Busca pelos últimos 8 dígitos para evitar problemas com 55/9
      const patient = await db.patient.findFirst({
        where: { phone: { contains: phone.slice(-8) } }
      });
      if (patient) targetPatientId = patient.id;
    }

    if (!targetPatientId) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    // Salva no Prontuário
    await db.medicalRecord.create({
      data: {
        patientId: targetPatientId,
        title: title,
        notes: notes,
        date: new Date(),
        // Se quiser usar colunas específicas do schema para categorizar, adicione aqui
      }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}