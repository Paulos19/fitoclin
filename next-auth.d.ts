import { type DefaultSession } from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "PATIENT" | "PROFESSIONAL"; // 👈 Atualizado
      stripeCustomerId: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role: "ADMIN" | "PATIENT" | "PROFESSIONAL"; // 👈 Atualizado
    stripeCustomerId: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ADMIN" | "PATIENT" | "PROFESSIONAL"; // 👈 Atualizado
    stripeCustomerId: string | null;
  }
}