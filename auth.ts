import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user) return null;
          
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            // Retorna o usuário com o campo stripeCustomerId
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                stripeCustomerId: user.stripeCustomerId, // 👈 Importante retornar aqui
            };
          }
        }
        
        console.log("Credenciais inválidas");
        return null;
      },
    }),
  ],
  callbacks: {
    // 1. Passa do Authorize (User) para o Token (JWT)
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.stripeCustomerId = user.stripeCustomerId; // 👈 Salva no token
      }
      return token;
    },
    // 2. Passa do Token para a Sessão (Client Side)
    async session({ session, token }) {
      if (session.user && token) {
        // 👇 CORREÇÃO: Usamos 'as string' para garantir o tipo
        session.user.id = token.id as string; 
        session.user.role = token.role as "ADMIN" | "PATIENT";
        session.user.stripeCustomerId = token.stripeCustomerId as string | null;
      }
      return session;
    }
  }
});