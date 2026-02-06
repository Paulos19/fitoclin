import { type DefaultSession } from "next-auth";
import { type User as PrismaUser } from "@prisma/client";

// Estende os tipos do NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      // 👇 Adicionado SECRETARY para evitar erros na lógica do dashboard
      role: "ADMIN" | "PATIENT" | "PROFESSIONAL" | "SECRETARY"; 
      stripeCustomerId: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    // 👇 Essas propriedades precisam estar aqui para que o 'user' no callback jwt não dê erro
    role: "ADMIN" | "PATIENT" | "PROFESSIONAL" | "SECRETARY";
    stripeCustomerId: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ADMIN" | "PATIENT" | "PROFESSIONAL" | "SECRETARY";
    stripeCustomerId: string | null;
  }
}