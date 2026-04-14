"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/mail";
import { auth } from "@/auth";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

const TrialGrantSchema = z.object({
    email: z.string().email("Email inválido"),
    days: z.coerce.number().min(1, "A duração deve ser de pelo menos 1 dia").default(7),
});

export async function inviteProfessionalTrial(prevState: any, formData: FormData) {
    const session = await auth();

    // Verifica se é ADMIN
    if (session?.user?.role !== "ADMIN") {
        return { error: "Não autorizado" };
    }

    const data = Object.fromEntries(formData.entries());
    const validatedFields = TrialGrantSchema.safeParse(data);

    if (!validatedFields.success) {
        return { error: "Dados inválidos! Verifique os campos." };
    }

    const { email, days } = validatedFields.data;
    const expiresAt = new Date(Date.now() + days * 86400000); // days in milliseconds

    try {
        const user = await db.user.findUnique({ where: { email } });

        if (user) {
            // 1. O usuário já existe, ativamos o trial diretamente na assinatura
            if (user.role === "PATIENT" || user.role === "USER") {
                await db.user.update({
                    where: { id: user.id },
                    data: { role: "PROFESSIONAL" }
                });
            }

            await db.subscription.upsert({
                where: { userId: user.id },
                update: {
                    plan: "PRO",
                    isTrial: true,
                    stripeCurrentPeriodEnd: expiresAt,
                    status: "active"
                },
                create: {
                    userId: user.id,
                    plan: "PRO",
                    isTrial: true,
                    stripeCurrentPeriodEnd: expiresAt,
                    status: "active"
                }
            });

            // Envia email avisando do trial ativado
            await sendEmail({
                to: email,
                subject: "🎉 Seu Trial Fitoclin PRO foi ativado!",
                html: `<p>Olá ${user.name}, a Drª Isa acabou de liberar seu acesso trial à plataforma Clínica Fitoclin para Profissionais.</p>
               <p>Seu acesso expira em: <strong>${expiresAt.toLocaleDateString("pt-BR")}</strong>.</p>
               <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">Acessar a Plataforma</a></p>`
            });

            revalidatePath("/dashboard");
            return { success: "Trial ativado com sucesso para usuário existente!" };
        } else {
            // 2. Novo usuário: Salva token e envia convite
            const token = crypto.randomBytes(32).toString("hex");

            await db.trialInvite.upsert({
                where: { email },
                update: { token, expiresAt },
                create: { email, token, expiresAt }
            });

            const registerLink = `${process.env.NEXT_PUBLIC_APP_URL}/register-trial?token=${token}`;

            await sendEmail({
                to: email,
                subject: "🚀 Convite Exclusivo - Trial Fitoclin PRO",
                html: `<p>Olá! Você foi convidado pela Drª Isa para testar a plataforma Clínica Fitoclin para Profissionais.</p>
               <p>Seu trial terá duração até <strong>${expiresAt.toLocaleDateString("pt-BR")}</strong> após seu cadastro.</p>
               <p><strong><a href="${registerLink}">Clique aqui para criar sua conta e iniciar seu trial</a></strong></p>`
            });

            return { success: "Convite de trial enviado com sucesso!" };
        }
    } catch (error) {
        console.error("Erro ao enviar trial:", error);
        return { error: "Erro interno. Tente novamente mais tarde." };
    }
}

// ==== Função para Registrar Paciente via Token de Trial ====
export async function registerTrialProfessional(prevState: any, formData: FormData) {
    const token = formData.get("token") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    if (!token || !name || !password) {
        return { error: "Preencha todos os campos." };
    }

    if (password.length < 6) {
        return { error: "A senha deve ter no mínimo 6 caracteres." };
    }

    try {
        const invite = await db.trialInvite.findUnique({ where: { token } });

        if (!invite) {
            return { error: "Link de convite inválido ou expirado." };
        }

        const existingUser = await db.user.findUnique({ where: { email: invite.email } });
        if (existingUser) {
            return { error: "Este email já possui conta. Por favor, faça login." };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                name,
                email: invite.email,
                password: hashedPassword,
                role: "PROFESSIONAL",
                subscription: {
                    create: {
                        plan: "PRO",
                        isTrial: true,
                        stripeCurrentPeriodEnd: invite.expiresAt,
                        status: "active"
                    }
                }
            }
        });

        // Deletar o convite após uso
        await db.trialInvite.delete({ where: { id: invite.id } });

        // Cuidar de enviar um email de boas-vindas se necessário

        return { success: "Cadastro realizado com sucesso! Você já pode fazer login." };

    } catch (error) {
        console.error("Erro no cadastro trial:", error);
        return { error: "Ocorreu um erro. Tente novamente mais tarde." };
    }
}
