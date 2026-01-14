"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const TransactionSchema = z.object({
  description: z.string().min(3, "Descrição muito curta"),
  amount: z.coerce.number().positive("O valor deve ser positivo"),
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().min(1, "Selecione uma categoria"),
  status: z.enum(["PENDING", "PAID", "CANCELED"]),
  date: z.string().transform((str) => new Date(str)),
  patientId: z.string().optional(),
});

export async function createTransaction(formData: FormData) {
  const session = await auth();
  if (!session) return { success: false, message: "Não autorizado" };

  const rawData = {
    description: formData.get("description"),
    amount: formData.get("amount"),
    type: formData.get("type"),
    category: formData.get("category"),
    status: formData.get("status"),
    date: formData.get("date"),
    patientId: formData.get("patientId") || undefined,
  };

  try {
    const data = TransactionSchema.parse(rawData);

    await db.transaction.create({
      data: {
        ...data,
        patientId: data.patientId === "" ? undefined : data.patientId,
        // 👇 VÍNCULO CRÍTICO: A transação pertence a quem criou
        userId: session.user.id, 
      },
    });

    revalidatePath("/dashboard/financial");
    return { success: true, message: "Transação registrada com sucesso!" };
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    return { success: false, message: "Erro ao salvar. Verifique os dados." };
  }
}

export async function getFinancialSummary() {
  const session = await auth();
  if (!session) return { transactions: [], metrics: { income: 0, expense: 0, balance: 0 } };

  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  // 👇 FILTRO DE SEGURANÇA: Cada um vê o seu financeiro
  const transactions = await db.transaction.findMany({
    where: {
      date: { gte: firstDay, lte: lastDay },
      userId: session.user.id // <--- ISOLAMENTO
    },
    orderBy: { date: 'desc' }
  });

  const income = transactions
    .filter(t => t.type === "INCOME" && t.status === "PAID")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const expense = transactions
    .filter(t => t.type === "EXPENSE" && t.status === "PAID")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const balance = income - expense;

  return {
    transactions,
    metrics: { income, expense, balance }
  };
}

export async function deleteTransaction(id: string) {
    const session = await auth();
    if (!session) return;
    
    // Garante que só deleta se for dono
    await db.transaction.deleteMany({ 
        where: { 
            id,
            userId: session.user.id 
        } 
    });
    revalidatePath("/dashboard/financial");
}