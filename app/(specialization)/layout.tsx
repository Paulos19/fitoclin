// Arquivo: app/(specialization)/layout.tsx

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SpecializationRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if (!session) {
    return redirect("/login");
  }

  // ⚠️ IMPORTANTE: Aqui retornamos APENAS o children.
  // Não coloque Sidebar ou Header aqui para evitar duplicação.
  return (
    <>
      {children}
    </>
  );
}