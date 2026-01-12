import { getCourseContent } from "@/actions/courses";
import { redirect } from "next/navigation";
import { LmsSidebar } from "@/components/community/lms-sidebar";

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  const course = await getCourseContent(params.courseId);

  if (!course) {
    redirect("/community");
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]"> 
      {/* calc(100vh - 64px) desconta a altura do Header que está no layout pai 
         Isso garante que o player ocupe a tela toda sem scroll duplo indesejado
      */}
      
      {/* Sidebar (Desktop: Fixa à esquerda / Mobile: Vai para baixo ou drawer futuramente) */}
      <aside className="w-full lg:w-80 lg:shrink-0 lg:fixed lg:top-[64px] lg:bottom-0 lg:z-30 overflow-y-auto bg-white border-r border-gray-100 hidden lg:block">
        <LmsSidebar courseId={course.id} modules={course.modules} />
      </aside>

      {/* Conteúdo Principal (Aulas) */}
      <main className="flex-1 lg:pl-80 w-full">
        {children}
      </main>
    </div>
  );
}