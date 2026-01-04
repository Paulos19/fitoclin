"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

// Schema de validação para nova transação
const TransactionSchema = z.object({
  description: z.string().min(3, "Descrição muito curta"),
  amount: z.coerce.number().positive("O valor deve ser positivo"),
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().min(1, "Selecione uma categoria"),
  status: z.enum(["PENDING", "PAID", "CANCELED"]),
  date: z.string().transform((str) => new Date(str)), // Recebe string do input date e converte
  patientId: z.string().optional(),
});

export async function createTransaction(formData: FormData) {
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

    await prisma.transaction.create({
      data: {
        ...data,
        // Se for paciente vazio, remove do objeto para não dar erro de chave estrangeira
        patientId: data.patientId === "" ? undefined : data.patientId, 
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
  // Pega transações do mês atual
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const transactions = await prisma.transaction.findMany({
    where: {
      date: {
        gte: firstDay,
        lte: lastDay,
      },
    },
    orderBy: { date: 'desc' }
  });

  // Cálculos
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
    await prisma.transaction.delete({ where: { id } });
    revalidatePath("/dashboard/financial");
}