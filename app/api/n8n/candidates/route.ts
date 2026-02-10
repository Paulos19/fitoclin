import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { startOfDay, endOfDay, subDays } from "date-fns";

export async function GET(req: Request) {
  // 1. Segurança
  const headerList = await headers();
  const secret = headerList.get("x-n8n-secret");
  if (secret !== process.env.N8N_API_SECRET) return new NextResponse("Unauthorized", { status: 401 });

  try {
    // 2. Definir janela de tempo (ex: Pacientes criados há 3 dias atrás)
    const daysAgo = 3;
    const targetDate = subDays(new Date(), daysAgo);
    
    // 3. Buscar Pacientes Aptos
    // Regra: Criado há 3 dias E que NÃO tenha registro de automação ainda
    const candidates = await db.patient.findMany({
      where: {
        createdAt: {
          gte: startOfDay(targetDate),
          lte: endOfDay(targetDate),
        },
        // Filtra para garantir que não mandamos msg duplicada
        medicalRecords: {
          none: {
            title: "Automação: Pós-Consulta Iniciada"
          }
        }
      },
      include: {
        user: { select: { name: true } }
      }
    });

    // 4. Formatar para o n8n
    const formatted = candidates.map(p => ({
      patientId: p.id,
      name: p.user.name,
      phone: p.phone?.replace(/\D/g, "") || "", // Limpa o telefone
    })).filter(p => p.phone); // Garante que tem telefone

    return NextResponse.json(formatted);

  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}