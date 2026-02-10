import { SpecializationSidebar } from "@/components/specialization/sidebar";

export default function MainSpecializationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Sidebar Fixa na Esquerda */}
      <SpecializationSidebar />

      {/* Conteúdo Principal Scrollável */}
      <main className="flex-1 min-w-0">
          {children}
      </main>
    </div>
  );
}