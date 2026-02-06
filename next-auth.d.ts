import { type DefaultSession } from "next-auth";
import { type UserRole } from "@prisma/client";

// Estende os tipos do NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      // 👇 Adicionado USER explicitamente
      role: "ADMIN" | "PATIENT" | "PROFESSIONAL" | "SECRETARY" | "USER"; 
      stripeCustomerId: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role: "ADMIN" | "PATIENT" | "PROFESSIONAL" | "SECRETARY" | "USER";
    stripeCustomerId: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ADMIN" | "PATIENT" | "PROFESSIONAL" | "SECRETARY" | "USER";
    stripeCustomerId: string | null;
  }
}