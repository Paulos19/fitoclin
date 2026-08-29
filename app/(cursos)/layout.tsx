import { CursosNavbar } from "@/components/video/cursos-navbar";
import { Footer } from "@/components/layout/footer";

export default function CursosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CursosNavbar />
      <main className="flex-1 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
