import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CommunityHeader } from "@/components/community/header";

export default async function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Apenas autenticação básica. 
  // A verificação de "Pagou ou não" será feita página a página.
  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans">
      <CommunityHeader user={session.user} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}