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
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          const user = await db.user.findUnique({ where: { email } });
          if (!user) return null;
          
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                stripeCustomerId: user.stripeCustomerId,
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
      }

      // SE já está logado (token.sub existe), buscamos dados frescos no banco
      // Isso garante que se o Webhook mudar a role, o usuário vê a mudança no próximo F5
      if (token.sub) {
        const existingUser = await db.user.findUnique({ 
          where: { id: token.sub } 
        });

        if (existingUser) {
          token.role = existingUser.role; // Atualiza a role no token
          token.stripeCustomerId = existingUser.stripeCustomerId;
        }
      }

      return token;
    },
    // 2. Session: Passa os dados do token (já atualizado acima) para o front
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string; 
        session.user.role = token.role as "ADMIN" | "PATIENT" | "PROFESSIONAL";
        session.user.stripeCustomerId = token.stripeCustomerId as string | null;
      }
      return session;
    }
  }
});