import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  role: "ADMIN" | "PATIENT" | "PROFESSIONAL" | "SECRETARY"; // Adicione SECRETARY aqui
  stripeCustomerId: string | null;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "ADMIN" | "PATIENT" | "PROFESSIONAL" | "SECRETARY"; // E aqui também
    stripeCustomerId: string | null;
  }
}