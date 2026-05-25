import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { BackupClient } from "./backup-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Backup & Restauração | Fitoclin",
  description: "Área administrativa para backup, exportação e restauração inteligente do banco de dados do Fitoclin.",
};

export default async function BackupPage() {
  const session = await auth();

  // Bloqueio de segurança rígido no servidor: apenas ADMIN
  if (session?.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return <BackupClient />;
}
