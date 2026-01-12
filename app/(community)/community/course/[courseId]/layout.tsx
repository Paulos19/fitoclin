import { getCourseContent } from "@/actions/courses";
import { redirect } from "next/navigation";
import { LmsSidebar } from "@/components/community/lms-sidebar";

export default async function CourseLayout({
  children,
  params, // 👈 Agora é uma Promise no Next.js 15/16
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>; // 👈 Tipagem Correta
}) {
  // 👇 Await obrigatório antes de usar os parâmetros
  const { courseId } = await params; 

  const course = await getCourseContent(courseId);

  if (!course) {
    redirect("/community");
  }

  return (
    // Removemos o Header daqui pois ele já vem do layout pai
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)]"> 
      
      {/* Sidebar */}
      <aside className="w-full lg:w-80 lg:shrink-0 lg:fixed lg:top-[88px] lg:bottom-0 lg:z-30 overflow-y-auto bg-white border-r border-gray-100 hidden lg:block">
        <LmsSidebar courseId={course.id} modules={course.modules} />
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 lg:pl-80 w-full">
        {children}
      </main>
    </div>
  );
}