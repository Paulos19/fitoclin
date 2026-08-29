import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAllActiveVideoCourses } from "@/actions/video-courses";
import { VideoCoursesGrid } from "@/components/video/video-courses-grid";
import { Play, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CursosPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const videos = await getAllActiveVideoCourses();
  const now = new Date().toISOString();

  return (
    <div className="min-h-screen bg-[#062214] selection:bg-[#76A771] selection:text-[#062214]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#76A771]/5 rounded-full blur-[120px]" />
          <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-[#2A5432]/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2A5432]/30 border border-[#76A771]/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#76A771]" />
              <span className="text-[#76A771] text-sm font-semibold tracking-wider uppercase">
                Biblioteca de Vídeos
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Aprenda com{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#76A771] to-[#a8d4a0]">
                especialistas
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Assista às aulas disponíveis e aprofunde seus conhecimentos em
              fitoterapia e saúde natural.
            </p>

            {/* Stats */}
            {videos.length > 0 && (
              <div className="flex items-center justify-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Play className="w-4 h-4 text-[#76A771]" />
                  <span className="text-sm font-medium">
                    {videos.length} vídeo{videos.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          {videos.length > 0 ? (
            <VideoCoursesGrid videos={videos} now={now} />
          ) : (
            <div className="max-w-md mx-auto text-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-[#0A311D] border border-[#2A5432]/50 flex items-center justify-center mx-auto mb-6">
                <Play className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Nenhum vídeo disponível
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Novos vídeos serão disponibilizados em breve. Fique de olho!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
