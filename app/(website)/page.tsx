import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { MethodSection } from "@/components/home/method-section";
import { ServicesSection } from "@/components/home/services-section";
import { CoursesSection } from "@/components/home/courses-section";
import { PricingSection } from "@/components/home/pricing-section";
import { MaterialsSection } from "@/components/home/materials-section";
import { ContactSection } from "@/components/home/contact-section";
import { SpecializationSection } from "@/components/home/specialization-section";
import { CommunitySection } from "@/components/home/community-section";
import { db } from "@/lib/db";

export const revalidate = 60;

export default async function Home() {
  // 1. Buscar Configurações
  const siteInfo = await db.siteInfo.findUnique({
    where: { key: "homepage_config" }
  });

  // 2. Buscar Cursos e converter Decimal -> Number
  const rawCourses = await db.course.findMany({
    where: { active: true },
    include: { _count: { select: { modules: true } } },
    orderBy: { createdAt: 'desc' },
    take: 3
  });

  const courses = rawCourses.map(c => ({
    ...c,
    price: c.price ? Number(c.price) : 0,
  }));

  const rawMaterials = await db.moduleMaterial.findMany({
    where: {
      module: {
        course: {
          active: true
        }
      }
    },
    take: 2,
    orderBy: { createdAt: 'desc' },
    include: {
      module: {
        include: {
          course: {
            select: {
              id: true,
              title: true,
              imageUrl: true
            }
          }
        }
      }
    }
  });

  const materials = rawMaterials.map(m => ({
    id: m.id,
    title: m.title, // ou m.title dependendo do seu schema
    courseId: m.module.course.id,
    courseTitle: m.module.course.title,
    courseImage: m.module.course.imageUrl,
    moduleTitle: m.module.title
  }));

  // 3. Buscar Planos e converter Decimal -> Number
  const rawPlans = await db.plan.findMany({
    where: { active: true },
    orderBy: { price: 'asc' }
  });

  const plans = rawPlans.map(p => ({
    ...p,
    price: Number(p.price),
  }));

  return (
    <main className="min-h-screen bg-[#062214] text-white selection:bg-[#76A771] selection:text-[#062214] flex flex-col">
      <Navbar />

      <HeroSection
        title={siteInfo?.heroTitle}
        subtitle={siteInfo?.heroSubtitle}
        customBanners={siteInfo?.homeBanners}
      />

      {/* Seção de Especialização: Destaque logo após o Hero para ancorar autoridade */}
      <SpecializationSection />

      <AboutSection
        aboutText={siteInfo?.aboutText}
        whatsapp={siteInfo?.whatsapp}
        instagram={siteInfo?.instagram}
      />

      <MethodSection />

      {/* Comunidade: Quebra o ritmo técnico e traz o lado humano/social antes dos produtos */}
      <CommunitySection customBanner={siteInfo?.communityBanner} />

      <ServicesSection />

      <CoursesSection courses={courses} />

      <PricingSection plans={plans} />

      <MaterialsSection materials={materials} />

      <ContactSection />

    </main>
  );
}