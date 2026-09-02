import type { Metadata } from "next";
import DesinflamaNavbar from "@/components/desinflama360/Navbar";
import HeroVideoSection from "@/components/desinflama360/HeroVideoSection";
import PainPointsSection from "@/components/desinflama360/PainPointsSection";
import TestimonialsSection from "@/components/desinflama360/TestimonialsSection";
import PillarsAndDeliverables from "@/components/desinflama360/PillarsAndDeliverables";
import JourneyTimeline from "@/components/desinflama360/JourneyTimeline";
import LiveMentorshipSection from "@/components/desinflama360/LiveMentorshipSection";
import PsychologistSection from "@/components/desinflama360/PsychologistSection";
import AudioAcceleratorsSection from "@/components/desinflama360/AudioAcceleratorsSection";
import BonusesSection from "@/components/desinflama360/BonusesSection";
import GamificationAndPrizes from "@/components/desinflama360/GamificationAndPrizes";
import NotForWhoSection from "@/components/desinflama360/NotForWhoSection";
import AuthorityDraIsa from "@/components/desinflama360/AuthorityDraIsa";
import PricingOfferSection from "@/components/desinflama360/PricingOfferSection";
import GuaranteeSection from "@/components/desinflama360/GuaranteeSection";
import FaqSection from "@/components/desinflama360/FaqSection";
import FinalCtaSection from "@/components/desinflama360/FinalCtaSection";
import StickyFloatingCTA from "@/components/desinflama360/StickyFloatingCTA";

export const metadata: Metadata = {
  title: "Clube Desinflama 360 | Dra. Isa Bieski - Método FITOCLIN®",
  description:
    "Desinflame seus hábitos, recupere seu sono, seu intestino e sua energia vital em uma jornada prática de 6 meses com a Dra. Isa Bieski e o Método FITOCLIN®.",
  keywords: [
    "Clube Desinflama 360",
    "Dra. Isa Bieski",
    "FITOCLIN",
    "Fitoterapia",
    "Saúde Integrativa",
    "Desinflamação",
    "Plantas Medicinais",
    "Sono Reparador",
    "Saúde Intestinal",
  ],
  openGraph: {
    title: "Clube Desinflama 360 | Dra. Isa Bieski - Método FITOCLIN®",
    description:
      "Seu corpo não está falhando. Ele está pedindo um novo caminho de cuidado. Assista à aula e conheça a jornada de 6 meses.",
    images: [
      {
        url: "/banner-desinflama360.jpeg",
        width: 1080,
        height: 1080,
        alt: "Dra. Isa Bieski - Clube Desinflama 360",
      },
    ],
  },
};

const CHECKOUT_URL =
  process.env.NEXT_PUBLIC_CHECKOUT_DESINFLAMA_URL ||
  process.env.NEXT_PUBLIC_CHECKOUT_URL ||
  process.env.CHECKOUT_URL ||
  "https://pay.hotmart.com/I104935049E?off=gmttdcyq";

const VIDEO_URL =
  "https://drive.google.com/file/d/1Sck3Nc5IRc9expUXNX-c0LQpNn5UdPCt/preview";

export default function ClubeDesinflama360Page() {
  return (
    <div className="min-h-screen bg-[#020d07] text-[#f0fdf4] font-sans antialiased selection:bg-emerald-500/30 selection:text-white">
      {/* 1. Header Fixo & Barra de Navegação */}
      <DesinflamaNavbar checkoutUrl="#oferta" />

      {/* 1. Primeira tela com aula em vídeo (Hero + VSL) */}
      <HeroVideoSection checkoutUrl="#oferta" videoUrl={VIDEO_URL} />

      {/* 2. Conexão com a dor ("Para quem é o Clube?") */}
      <PainPointsSection checkoutUrl="#oferta" />

      {/* 3. Prova social ("Depoimentos Reais em Vídeo & Prints") */}
      <TestimonialsSection />

      {/* 4. Conteúdo do Clube + Os 5 Pilares do Método FITOCLIN® */}
      <PillarsAndDeliverables checkoutUrl="#oferta" />

      {/* 5, 6, 7, 8. Apresentação da Jornada (3 Ciclos + 3 Desafios 21 Dias) */}
      <JourneyTimeline checkoutUrl="#oferta" />

      {/* 10. Seis Encontros ao Vivo com a Dra. Isa */}
      <LiveMentorshipSection />

      {/* 11. Participação da Psicóloga Luciane */}
      <PsychologistSection />

      {/* 12. Áudios Aceleradores ("Aperte o Play") */}
      <AudioAcceleratorsSection />

      {/* 13. Apresentação dos 3 Bônus Especiais */}
      <BonusesSection />

      {/* 14 & 15. Gamificação (Jornada das Folhas) e Premiações */}
      <GamificationAndPrizes />

      {/* 17. Para quem NÃO é o Clube */}
      <NotForWhoSection />

      {/* 18. Apresentação da Dra. Isa Bieski (Autoridade & Biografia) */}
      <AuthorityDraIsa />

      {/* 20. Apresentação da Oferta (Preço, Parcelamento e Checkout) */}
      <PricingOfferSection checkoutUrl={CHECKOUT_URL} />

      {/* 21. Garantia Incondicional de 7 Dias */}
      <GuaranteeSection />

      {/* 22. Perguntas Frequentes (FAQ) */}
      <FaqSection />

      {/* 23. Chamada Final (CTA Decisivo & Footer) */}
      <FinalCtaSection checkoutUrl={CHECKOUT_URL} />

      {/* Barra Flutuante de Conversão Rápida */}
      <StickyFloatingCTA checkoutUrl="#oferta" />
    </div>
  );
}
