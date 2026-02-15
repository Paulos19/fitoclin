"use server";

import { auth } from "@/auth";

export async function generatePrescriptionSuggestion(data: {
  patientName: string;
  age: string | number;
  gender?: string;
  complaint: string; // O texto da queixa/evolução
}) {
  const session = await auth();
  
  // Verifica permissão (apenas profissionais e admins)
  if (!session || !["ADMIN", "PROFESSIONAL"].includes(session.user.role)) {
    return { error: "Não autorizado." };
  }

  // URL do seu Webhook n8n (Defina no .env)
  const webhookUrl = process.env.N8N_PRESCRIPTION_WEBHOOK_URL; 

  if (!webhookUrl) {
    return { error: "Serviço de IA não configurado (Env Var missing)." };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "X-Auth-Token": process.env.N8N_SECRET // Se tiver auth no n8n
      },
      body: JSON.stringify({
        ...data,
        professionalName: session.user.name
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Erro n8n: ${response.statusText}`);
    }

    const result = await response.json();
    
    // O n8n deve retornar um JSON com { suggestion: string } ou a estrutura completa
    // Vamos assumir que ele retorna o texto formatado ou um objeto
    return { success: result }; 

  } catch (error) {
    console.error("Erro na IA:", error);
    return { error: "Falha ao gerar sugestão. Tente novamente." };
  }
}