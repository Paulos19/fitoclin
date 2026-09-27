import React from "react";
import ThreeIridescentBackground from "@/components/desinflama360/three/ThreeIridescentBackground";
import LightNavbar from "@/components/desinflama360/LightNavbar";
import HeroSection from "@/components/desinflama360/HeroSection";
import FirstWeekSection from "@/components/desinflama360/FirstWeekSection";
import TestimonialsLightSection from "@/components/desinflama360/TestimonialsLightSection";
import JourneyCyclesSection from "@/components/desinflama360/JourneyCyclesSection";
import AudioAcceleratorsLight from "@/components/desinflama360/AudioAcceleratorsLight";
import LiveMentorshipLight from "@/components/desinflama360/LiveMentorshipLight";
import DeliverablesSupportSection from "@/components/desinflama360/DeliverablesSupportSection";
import TargetAudienceSection from "@/components/desinflama360/TargetAudienceSection";
import AuthorityLightSection from "@/components/desinflama360/AuthorityLightSection";
import OfferLightSection from "@/components/desinflama360/OfferLightSection";
import GuaranteeAndFaqSection from "@/components/desinflama360/GuaranteeAndFaqSection";
import FinalLightCta from "@/components/desinflama360/FinalLightCta";
import StickyFloatingLightCTA from "@/components/desinflama360/StickyFloatingLightCTA";

const CHECKOUT_URL =
  process.env.NEXT_PUBLIC_CHECKOUT_DESINFLAMA_URL ||
  "https://pay.hotmart.com/I104935049E?off=gmttdcyq";

const VIDEO_URL =
  "https://drive.google.com/file/d/1Sck3Nc5IRc9expUXNX-c0LQpNn5UdPCt/preview";

export default function ClubeDesinflama360Page() {
  return (
    <div className="relative min-h-screen w-full bg-[#f6faf7] text-[#0f2417] overflow-x-clip selection:bg-emerald-200 selection:text-emerald-950">
      {/* 0. Shader WebGL Three.js com dispersão cromática e geometria 3D de vidro */}
      <ThreeIridescentBackground />

      {/* 1. TOPO DA PÁGINA (Navbar translúcida sem as tags antigas) */}
      <LightNavbar checkoutUrl="#oferta" />

      {/* 2. PRIMEIRA SEÇÃO (Hero + VSL + 3 Bullets com nova copy) */}
      <HeroSection checkoutUrl="#oferta" videoUrl={VIDEO_URL} />

      {/* 3. SEGUNDA SEÇÃO (A transformação começa na 1ª semana + 5 Bullets 3D) */}
      <FirstWeekSection checkoutUrl="#oferta" />

      {/* 4. TERCEIRA SEÇÃO (Depoimentos: Histórias reais de mulheres...) */}
      <TestimonialsLightSection />

      {/* 5. QUARTA SEÇÃO (UMA JORNADA COM COMEÇO... + 3 Ciclos de 2 meses) */}
      <JourneyCyclesSection checkoutUrl="#oferta" />

      {/* 6. QUINTA SEÇÃO (APERTE O PLAY QUANDO PENSAR EM DESISTIR) */}
      <AudioAcceleratorsLight />

      {/* 7. SEXTA SEÇÃO (SEIS ENCONTROS AO VIVO PARA ORIENTAR SUA EVOLUÇÃO) */}
      <LiveMentorshipLight />

      {/* 8. SÉTIMA SEÇÃO (Receba todo o material e suporte que precisa...) */}
      <DeliverablesSupportSection checkoutUrl="#oferta" />

      {/* 9. OITAVA SEÇÃO (Para quem é o Clube Desinflama 360?) */}
      <TargetAudienceSection checkoutUrl="#oferta" />

      {/* 10. NONA SEÇÃO (QUEM GUIARÁ VOCÊ NESSA JORNADA - Dra. Isa) */}
      <AuthorityLightSection />

      {/* 11. DÉCIMA SEÇÃO | OFERTA (COMECE AGORA... + Ancoragem R$ 2 mil / R$ 597) */}
      <OfferLightSection checkoutUrl={CHECKOUT_URL} />

      {/* 12. DÉCIMA PRIMEIRA SEÇÃO (Garantia 7 Dias & FAQ) */}
      <GuaranteeAndFaqSection />

      {/* Fechamento & Rodapé Institucional */}
      <FinalLightCta checkoutUrl={CHECKOUT_URL} />

      {/* Barra de Conversão Rápida Flutuante */}
      <StickyFloatingLightCTA checkoutUrl="#oferta" />
    </div>
  );
}
