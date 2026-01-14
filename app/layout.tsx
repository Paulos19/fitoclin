import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers"; 

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fitoclin - Dra. Isa",
  description: "Clínica de Fitoterapia e Saúde Integrativa",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${font.className} antialiased bg-[#F8FAF9]`}>
        {/* O Providers envolve tudo para garantir acesso à Sessão em qualquer lugar */}
        <Providers>
          
          <div className="w-full max-w-full overflow-x-hidden relative flex flex-col min-h-screen">
            {children}
          </div>
          
          <Toaster richColors position="top-right" closeButton />
        </Providers>
      </body>
    </html>
  );
}