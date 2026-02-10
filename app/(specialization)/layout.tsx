import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SpecializationHeader } from "@/components/specialization/header";

export default async function SpecializationRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) return redirect("/login");

  return (
    <div className="min-h-screen bg-[#062214]">
      {/* Header Fixo no Topo (Comum a todas as páginas) */}
      <SpecializationHeader user={session.user} />
      
      {/* O conteúdo abaixo será injetado pelo layout de (main) ou (learning) */}
      {children}
    </div>
  );
}