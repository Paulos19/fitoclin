import type { Metadata } from "next";
import { CommunityHeader } from "@/components/community/header";

export const metadata: Metadata = {
  title: "Comunidade Fitoclin",
  description: "Área de ensino e evolução.",
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F9FBF9]">
      {/* Header Fixo no Topo */}
      <CommunityHeader />

      {/* Conteúdo Principal (Sem Sidebar) */}
      {/* Aplicamos as variáveis CSS para forçar o tema CLARO (Light Mode) nesta rota */}
      <main 
          className="flex-1 w-full mx-auto max-w-[1600px] p-4 md:p-8"
          style={{
              // @ts-ignore
              "--background": "150 10% 98%",      // #F9FBF9
              "--foreground": "150 70% 8%",       // #062214
              "--card": "0 0% 100%",              // Branco
              "--card-foreground": "150 70% 8%",
              "--primary": "131 33% 25%",         // Verde Musgo
              "--primary-foreground": "0 0% 100%",
              "--muted": "150 10% 96%",
              "--muted-foreground": "150 5% 40%",
              "--border": "150 20% 90%",
          } as React.CSSProperties}
      >
        {children}
      </main>
    </div>
  );
}