import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"; // <--- Importe aqui

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fitoclin - Dra. Isa",
  description: "Clínica de Fitoterapia e Saúde Integrativa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${font.className} antialiased`}>
        {/* Wrapper Global */}
        <div className="w-full max-w-full overflow-x-hidden relative flex flex-col min-h-screen">
          {children}
        </div>
        
        {/* Componente de Toast Global */}
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}