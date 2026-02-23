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

  // Envolvemos o children num flex-col de tela cheia (100dvh adapta bem no mobile)
  // Assim os layouts filhos podem usar flex-1 para preencher a tela perfeitamente
  return (
    <div className="flex flex-col min-h-[100dvh] w-full bg-[#062214]">
      {children}
    </div>
  );
}