import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // 1. Segurança: Verificar Token
  const headerList = await headers();
  const secret = headerList.get("x-webhook-secret");

  if (secret !== process.env.INTERNAL_WEBHOOK_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();

    // 2. Filtrar Evento: Queremos apenas novas mensagens (MESSAGES_UPSERT)
    // A estrutura do body depende da versão da Evolution, mas geralmente é assim:
    const eventType = body.event;
    const data = body.data;

    if (eventType !== "messages.upsert") {
      return new NextResponse("Ignored Event", { status: 200 });
    }

    const messageData = data.message;
    
    // Ignorar mensagens enviadas por mim (fromMe) e grupos/status
    if (data.key.fromMe || data.key.remoteJid === "status@broadcast" || data.key.remoteJid.includes("@g.us")) {
      return new NextResponse("Ignored Type", { status: 200 });
    }

    // 3. Extrair Telefone e Texto
    // Formato remoto: 5511999999999@s.whatsapp.net -> Pegar apenas os números
    const rawPhone = data.key.remoteJid.split("@")[0]; 
    
    // Tenta pegar o texto (pode vir em conversation ou extendedTextMessage)
    const text = messageData.conversation || messageData.extendedTextMessage?.text;

    if (!text) {
      return new NextResponse("No text content", { status: 200 });
    }

    // 4. Buscar Paciente no Banco
    // A busca usa 'contains' porque o formato do banco pode não ter o 55 ou ter formatação diferente
    // O ideal é sanitizar tudo para apenas números antes de buscar
    const patient = await db.patient.findFirst({
      where: {
        phone: {
          contains: rawPhone.slice(-8) // Busca pelos últimos 8 dígitos para garantir match
        }
      }
    });

    if (!patient) {
      console.log(`Mensagem de desconhecido (${rawPhone}): ${text}`);
      // Opcional: Criar um Lead em "NEW" se não existir?
      return new NextResponse("Patient not found", { status: 200 });
    }

    // 5. Salvar no Prontuário (MedicalRecord)
    await db.medicalRecord.create({
      data: {
        patientId: patient.id,
        title: "📲 Resposta WhatsApp (Pós-Consulta)",
        notes: text,
        // Você pode criar colunas específicas se quiser, mas notes serve bem
        date: new Date(),
        // Adapte os pilares se necessário ou deixe null
      }
    });

    console.log(`✅ Mensagem salva para paciente ${patient.id}`);
    return new NextResponse("Saved", { status: 200 });

  } catch (error) {
    console.error("Erro no Webhook WhatsApp:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}