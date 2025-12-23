import { type DefaultSession } from "next-auth";
import { type User as PrismaUser } from "@prisma/client"; // Opcional: para herdar tipos do Prisma se quiser

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "PATIENT";
    } & DefaultSession["user"];
  }

  interface User {
    role: "ADMIN" | "PATIENT";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ADMIN" | "PATIENT";
  }
}