import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { MethodSection } from "@/components/home/method-section";
import { ServicesSection } from "@/components/home/services-section";
import { CoursesSection } from "@/components/home/courses-section"; // Nova
import { PricingSection } from "@/components/home/pricing-section"; // Nova
import { MaterialsSection } from "@/components/home/materials-section";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#062214] text-white selection:bg-[#76A771] selection:text-[#062214]">
      <Navbar />
      
      {/* 1. Atração & Impacto */}
      <HeroSection />
      
      {/* 2. Autoridade (Quem é a Doutora) */}
      <AboutSection />
      
      {/* 3. Lógica (O Método) */}
      <MethodSection />
      
      {/* 4. Soluções Clínicas (Serviços) */}
      <ServicesSection />
      
      {/* 5. Soluções Educacionais (Cursos) */}
      <CoursesSection />
      
      {/* 6. Oferta de Recorrência (Assinaturas) */}
      <PricingSection />
      
      {/* 7. Isca Digital (Materiais Gratuitos) */}
      <MaterialsSection />
      
      <Footer />
    </main>
  );
}