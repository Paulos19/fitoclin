// Arquivo: app/(specialization)/specialization/(main)/layout.tsx

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SpecializationShell } from "@/components/specialization/layout-shell";

export default async function MainSpecializationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  // ✅ O Shell (Sidebar + Header + Conteúdo) é aplicado AQUI.
  // Isso garante que ele apareça no Dashboard, Cursos e Certificados,
  // mas deixa o layout de Player de Aulas (learning) livre para ter sua própria estrutura.
  return (
    <SpecializationShell user={session.user}>
      {children}
    </SpecializationShell>
  );
}