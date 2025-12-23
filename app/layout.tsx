import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Ou sua fonte atual
import "./globals.css";

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
        {/* Wrapper de segurança contra overflow horizontal */}
        <div className="w-full max-w-full overflow-x-hidden relative flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}