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
  title: "Clube Desinflama 360 | Oferta Especial 17 de Setembro • Dra. Isa Bieski",
  description:
    "Dia 17 de setembro: 50% de desconto no Clube Desinflama 360, somente dentro do grupo de WhatsApp. Entre no grupo para receber a condição especial e ainda ganhar o e-book de chás como presente.",
  keywords: [
    "Clube Desinflama 360",
    "Oferta Especial 17 de Setembro",
    "Dra. Isa Bieski",
    "E-book sobre Chás",
    "Desinflamação",
    "Plantas Medicinais",
    "FITOCLIN",
    "Sono e Intestino",
  ],
  openGraph: {
    title: "Clube Desinflama 360 | Oferta Especial 17 de Setembro",
    description:
      "Dia 17 de setembro: 50% de desconto no Clube Desinflama 360, somente dentro do grupo de WhatsApp. Entre e ganhe o e-book de chás como presente.",
    images: [
      {
        url: "/oferta-17-setembro-ebook.jpeg",
        width: 1254,
        height: 1254,
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
  "https://pay.hotmart.com/I104935049E?off=gmttdcyq";

export default function GrupoOfertaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Clube Desinflama 360 - Oferta Especial 17 de Setembro",
    image: "https://fitoclin.com.br/oferta-17-setembro-ebook.jpeg",
    description:
      "Acompanhamento de 6 meses para desinflamar seus hábitos, sono e intestino com a Dra. Isa Bieski e o Método FITOCLIN®.",
    brand: {
      "@type": "Brand",
      name: "FITOCLIN",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      availability: "https://schema.org/LimitedAvailability",
      validFrom: "2026-09-17",
      description: "50% de desconto exclusivo dentro do grupo VIP de WhatsApp no dia 17 de setembro.",
    },
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-950">
      {/* Schema JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Navbar com Barra de Aviso Superior */}
      <PromoNavbar whatsappUrl={WHATSAPP_URL} />

      {/* 1ª Sessão: Hero Promocional com Oferta 17 de Setembro + Imagem do E-book + CTA */}
      <PromoHero whatsappUrl={WHATSAPP_URL} />

      {/* 2ª Sessão: Testemunhos / Prova Social (Prints Reais do WhatsApp em Fundo Clean) */}
      <section className="relative py-20 md:py-28 bg-[#F8FAF9] border-t border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WhatsAppPrintsGallery
            title="Veja os Resultados e Relatos de Quem Já Aplica o Método"
            subtitle="Conversas reais e espontâneas de mulheres que desinflamaram o corpo, recuperaram a energia e o sono com o direcionamento da Dra. Isa Bieski."
          />
        </div>
      </section>

      {/* 3ª Sessão: DEPOIS QUE PASSAR, NÃO ADIANTA DESCOBRIR A OFERTA (Urgência + Cronômetro) */}
      <PromoUrgencyBeforeSept10
        whatsappUrl={WHATSAPP_URL}
        checkoutUrl={CHECKOUT_HOTMART_URL}
      />

      {/* 4ª Sessão: Conexão com a Dor & Quebra de Objeções (Sintomas e Sinais) */}
      <PromoSymptomsPain />

      {/* 5ª Sessão: Conheça o Clube Desinflama 360, 5 Pilares e Entregáveis */}
      <PromoPillarsAndMethod whatsappUrl={WHATSAPP_URL} />

      {/* 6ª Sessão: Autoridade & Biografia: Dra. Isa Bieski */}
      <PromoAuthorityIsa />

      {/* 7ª Sessão: Como Participar: 4 Passos + Box Central */}
      <PromoHowToParticipate whatsappUrl={WHATSAPP_URL} />

      {/* Rodapé Institucional */}
      <PromoFooter />

      {/* Barra Flutuante de Conversão */}
      <PromoFloatingCTA whatsappUrl={WHATSAPP_URL} />
    </main>
  );
}
