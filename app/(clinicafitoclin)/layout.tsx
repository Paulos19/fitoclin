import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fitoclin | Saúde Integrativa e Fitoterapia",
  description: "Recupere sua vitalidade através da fitoterapia clínica e modulação epigenética. Agende sua avaliação personalizada.",
  keywords: ["fitoterapia", "saúde integrativa", "epigenética", "emagrecimento", "ansiedade", "natural"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://institutoisa.com.br",
    title: "Fitoclin - Transforme sua Saúde",
    description: "Tratamentos naturais e personalizados para sua melhor versão.",
    images: [
      {
        url: "/banner-lp.jpeg",
        width: 1200,
        height: 630,
        alt: "Fitoclin Banner",
      },
    ],
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-white text-[#062214] antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}