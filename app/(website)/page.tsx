import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { MethodSection } from "@/components/home/method-section";
import { ServicesSection } from "@/components/home/services-section";
import { CoursesSection } from "@/components/home/courses-section";
import { PricingSection } from "@/components/home/pricing-section";
import { MaterialsSection } from "@/components/home/materials-section";
import { ContactSection } from "@/components/home/contact-section"; // 👈 Novo Import
import { Footer } from "@/components/layout/footer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Revalidar a cada 60 segundos para garantir performance e dados frescos
export const revalidate = 60; 

export default async function Home() {
  // 1. Buscar Configurações Gerais (Hero, Sobre, Contatos)
  // Tenta buscar, se não existir (primeiro acesso), retorna null e os componentes lidam com isso
  const siteInfo = await prisma.siteInfo.findUnique({
    where: { key: "homepage_config" }
  });

  // 2. Buscar Cursos Ativos
  const courses = await prisma.course.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
    take: 3 // Mostramos apenas os 3 mais recentes na home
  });

  // 3. Buscar Planos Ativos
  const plans = await prisma.plan.findMany({
    where: { active: true },
    orderBy: { price: 'asc' } // Ordenado pelo menor preço
  });

  return (
    // Mantendo o tema escuro que você definiu
    <main className="min-h-screen bg-[#062214] text-white selection:bg-[#76A771] selection:text-[#062214]">
      <Navbar />
      
      {/* Seção 1: Hero Dinâmico */}
      <HeroSection 
        title={siteInfo?.heroTitle} 
        subtitle={siteInfo?.heroSubtitle} 
      />
      
      {/* Seção 2: Sobre Dinâmico */}
      <AboutSection 
        aboutText={siteInfo?.aboutText}
        whatsapp={siteInfo?.whatsapp}
        instagram={siteInfo?.instagram}
      />
      
      {/* Seção 3: Método (Estático) */}
      <MethodSection />
      
      {/* Seção 4: Serviços (Estático) */}
      <ServicesSection />
      
      {/* Seção 5: Cursos Dinâmicos */}
      <CoursesSection courses={courses} />
      
      {/* Seção 6: Planos Dinâmicos */}
      <PricingSection plans={plans} />
      
      {/* Seção 7: Materiais (Estático) */}
      <MaterialsSection />

      {/* Seção 8: Contato & Captura de Leads (NOVO) */}
      {/* Esta seção tem fundo claro (slate-50), criando um contraste no final da page */}
      <ContactSection />
      
    </main>
  );
}