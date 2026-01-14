import { getCourseContent } from "@/actions/courses";
import { redirect } from "next/navigation";
import { LmsSidebar } from "@/components/community/lms-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await getCourseContent(courseId);

  if (!course) {
    redirect("/community");
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#F9FBF9]">
      {/* SIDEBAR (Desktop)
        - Sticky: Fixa enquanto rola o conteúdo.
        - Top: Ajustado para ficar abaixo do Header da comunidade.
      */}
      <aside className="hidden lg:block w-80 shrink-0 sticky top-[80px] h-[calc(100vh-80px)] border-r border-[#E8F5E9] bg-white/50 backdrop-blur-sm">
        <ScrollArea className="h-full">
           <LmsSidebar courseId={course.id} modules={course.modules} />
        </ScrollArea>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 w-full min-w-0">
        {children}
      </main>
    </div>
  );
}