import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { db } from "@/lib/db"; // Usando o singleton do seu projeto
import bcrypt from "bcryptjs";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // Aceita CPF ou email + senha
        const parsedCredentials = z
          .object({
            email: z.string().optional(),
            cpf: z.string().optional(),
            password: z.string().min(4),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, cpf, password } = parsedCredentials.data;

          // Buscar user por CPF ou email
          let user = null;
          if (cpf && cpf.replace(/\D/g, "").length === 11) {
            const cpfClean = cpf.replace(/\D/g, "");
            user = await db.user.findUnique({ where: { cpf: cpfClean } });
          } else if (email) {
            user = await db.user.findUnique({ where: { email } });
          }

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              stripeCustomerId: user.stripeCustomerId,
              cpf: user.cpf,
            };
          }
        }

        console.log("Credenciais inválidas");
        return null;
      },
    }),
  ],
  callbacks: {
    // 1. JWT: Aqui acontece a mágica da atualização
    async jwt({ token, user }) {
      // Se acabou de logar, usa os dados do usuário
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.stripeCustomerId = user.stripeCustomerId;
        token.cpf = (user as any).cpf || null;
      }

      // SE já está logado (token.sub existe), buscamos dados frescos no banco
      if (token.sub) {
        const existingUser = await db.user.findUnique({
          where: { id: token.sub }
        });

        if (existingUser) {
          token.role = existingUser.role;
          token.stripeCustomerId = existingUser.stripeCustomerId;
          token.cpf = existingUser.cpf;
        }
      }

      return token;
    },
    // 2. Session: Passa os dados do token para o front
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as "ADMIN" | "PATIENT" | "PROFESSIONAL" | "SECRETARY" | "USER";
        session.user.stripeCustomerId = token.stripeCustomerId as string | null;
        session.user.cpf = (token.cpf as string | null) || null;
      }
      return session;
    }
  }
});