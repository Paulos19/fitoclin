import { getCourseContent } from "@/actions/courses";
import { redirect } from "next/navigation";
import { LmsSidebar } from "@/components/community/lms-sidebar";

export default async function CourseLayout({
  children,
  params, // 👈 Agora isso é uma Promise
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>; // 👈 Tipagem atualizada
}) {
  const { courseId } = await params; // 👈 O await mágico
  const course = await getCourseContent(courseId);

  if (!course) {
    redirect("/community");
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]"> 
      <aside className="w-full lg:w-80 lg:shrink-0 lg:fixed lg:top-[64px] lg:bottom-0 lg:z-30 overflow-y-auto bg-white border-r border-gray-100 hidden lg:block">
        <LmsSidebar courseId={course.id} modules={course.modules} />
      </aside>

      <main className="flex-1 lg:pl-80 w-full">
        {children}
      </main>
    </div>
  );
}