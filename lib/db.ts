import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// 1. Pega a URL do banco (venha ela de onde vier)
let dbUrl = process.env.DATABASE_URL || "";

// 2. Injeta à força os parâmetros essenciais para o Neon DB se eles não existirem
if (dbUrl && !dbUrl.includes("connection_limit")) {
  const separator = dbUrl.includes("?") ? "&" : "?";
  dbUrl = `${dbUrl}${separator}pgbouncer=true&connection_limit=20&pool_timeout=30`;
}

// 3. Inicia o Prisma garantindo que ele usa a URL corrigida
export const db =
  globalThis.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}