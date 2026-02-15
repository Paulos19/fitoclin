"use server";

import { auth } from "@/auth";

export async function generatePrescriptionSuggestion(data: {
  patientName: string;
  age: string | number;
  gender?: string;
  complaint: string; // O texto que vem do front
}) {
  const session = await auth();
  
  if (!session || !["ADMIN", "PROFESSIONAL"].includes(session.user.role)) {
    return { error: "Não autorizado." };
  }

  const webhookUrl = process.env.N8N_PRESCRIPTION_WEBHOOK_URL; 

  if (!webhookUrl) {
    return { error: "Serviço de IA não configurado." };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // A chave deve bater com o "Name" definido na credencial do n8n
        "x-n8n-secret": process.env.N8N_API_SECRET || "", 
      },
      body: JSON.stringify({
        patientName: data.patientName,
        age: data.age,
        gender: data.gender || "Não informado",
        // CORREÇÃO CRITICA: Mapeando 'complaint' para 'evolutionText' que o n8n espera
        evolutionText: data.complaint, 
        professionalName: session.user.name
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro n8n (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    return { success: result }; 

  } catch (error) {
    console.error("Erro na IA:", error);
    return { error: "Falha ao gerar sugestão. Tente novamente." };
  }
}