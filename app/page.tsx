import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/home/hero-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-accent/20">
      <Navbar />
      <HeroSection />
      
      {/* Placeholder para as próximas seções apenas para visualização do scroll */}
      <section className="h-[500px] flex items-center justify-center text-muted-foreground">
        Próximas seções: Sobre, Serviços, Depoimentos...
      </section>
    </main>
  );
}