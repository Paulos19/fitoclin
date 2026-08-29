import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getVideoCourses } from "@/actions/video-courses";
import { VideoCoursesManager } from "@/components/dashboard/video-courses-manager";

export default async function DashboardVideoCoursesPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return redirect("/dashboard");

  const result = await getVideoCourses();
  const videos = result && "data" in result ? result.data : [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Biblioteca de Vídeos
        </h1>
        <p className="text-gray-400 mt-1">
          Gerencie os vídeos disponíveis para os alunos.
        </p>
      </div>
      <VideoCoursesManager videos={videos} />
    </div>
  );
}
