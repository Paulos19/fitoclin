import type { Metadata } from "next";
import PromoNavbar from "@/components/desinflama360/promo/PromoNavbar";
import PromoHero from "@/components/desinflama360/promo/PromoHero";
import PromoSymptomsPain from "@/components/desinflama360/promo/PromoSymptomsPain";
import PromoPillarsAndMethod from "@/components/desinflama360/promo/PromoPillarsAndMethod";
import WhatsAppPrintsGallery from "@/components/desinflama360/WhatsAppPrintsGallery";
import PromoAuthorityIsa from "@/components/desinflama360/promo/PromoAuthorityIsa";
import PromoHowToParticipate from "@/components/desinflama360/promo/PromoHowToParticipate";
import PromoUrgencyBeforeSept10 from "@/components/desinflama360/promo/PromoUrgencyBeforeSept10";
import PromoFooter from "@/components/desinflama360/promo/PromoFooter";
import PromoFloatingCTA from "@/components/desinflama360/promo/PromoFloatingCTA";

export const metadata: Metadata = {
  title: "Clube Desinflama 360 | Oferta Especial 10 de Setembro • Dra. Isa Bieski",
  description:
    "Entre gratuitamente no grupo do WhatsApp e receba um E-book especial sobre chás. Condição exclusiva de 30% a 50% de desconto em 10 de setembro.",
  keywords: [
    "Clube Desinflama 360",
    "Oferta Especial 10 de Setembro",
    "Dra. Isa Bieski",
    "E-book sobre Chás",
    "Desinflamação",
    "Plantas Medicinais",
    "FITOCLIN",
    "Sono e Intestino",
  ],
  openGraph: {
    title: "Clube Desinflama 360 | Oferta Especial 10 de Setembro",
    description:
      "Garanta seu E-book gratuito sobre chás e prepare-se para a condição especial de 30% a 50% de desconto somente no grupo do WhatsApp.",
    images: [
      {
        url: "/banner-desinflama360.jpeg",
        width: 1080,
        height: 1080,
        alt: "Oferta Especial Clube Desinflama 360 - Dra. Isa Bieski",
      },
    ],
  },
};

const WHATSAPP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_GROUP_DESINFLAMA_URL ||
  process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL ||
  "https://chat.whatsapp.com/GWNMBPvBJKlGEBs74sdcwu?s=cl&p=i&mlu=4&ilr=4";

const CHECKOUT_HOTMART_URL =
  process.env.NEXT_PUBLIC_CHECKOUT_DESINFLAMA_URL ||
  process.env.NEXT_PUBLIC_CHECKOUT_URL ||
  process.env.CHECKOUT_URL ||
  "https://pay.hotmart.com/I104935049E?off=gmttdcyq";

export default function GrupoOfertaPage() {
  return (
    <main className="min-h-screen bg-[#020d07] text-[#f0fdf4] font-sans antialiased selection:bg-emerald-500/30 selection:text-white">
      {/* 1. Navbar com Barra de Aviso Superior */}
      <PromoNavbar whatsappUrl={WHATSAPP_URL} />

      {/* 2. Hero Promocional: Oferta 10 de Setembro + E-book Gratuito + 4 Tópicos + CTA */}
      <PromoHero whatsappUrl={WHATSAPP_URL} />

      {/* 3. Conexão com a Dor & Quebra de Objeções (Sintomas e Tentativas Anteriores) */}
      <PromoSymptomsPain />

      {/* 4. Conheça o Clube Desinflama 360, 5 Pilares e 9 Entregáveis */}
      <PromoPillarsAndMethod whatsappUrl={WHATSAPP_URL} />

      {/* 5. Prova Social: Galeria com os 10 Prints Reais de WhatsApp */}
      <section className="relative py-20 bg-[#020e07] border-t border-emerald-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WhatsAppPrintsGallery
            title="Veja os Resultados e Relatos de Quem Já Aplica o Método"
            subtitle="Conversas reais e espontâneas de mulheres que desinflamaram o corpo, recuperaram a energia e o sono com o direcionamento da Dra. Isa Bieski."
          />
        </div>
      </section>

      {/* 6. Autoridade & Biografia: Dra. Isa Bieski */}
      <PromoAuthorityIsa />

      {/* 7. Como Participar: 4 Passos + Aviso Educativo */}
      <PromoHowToParticipate whatsappUrl={WHATSAPP_URL} />

      {/* 8. Urgência: Antes do dia 10 + Cronômetro + CTA Final Decisivo */}
      <PromoUrgencyBeforeSept10
        whatsappUrl={WHATSAPP_URL}
        checkoutUrl={CHECKOUT_HOTMART_URL}
      />

      {/* 9. Rodapé Institucional */}
      <PromoFooter />

      {/* 10. Barra Flutuante de Conversão */}
      <PromoFloatingCTA whatsappUrl={WHATSAPP_URL} />
    </main>
  );
}
