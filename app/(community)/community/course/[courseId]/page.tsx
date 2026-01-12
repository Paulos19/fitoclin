import { getCourseContent } from "@/actions/courses";
import { redirect } from "next/navigation";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>; // 👈 Promise
}) {
  const { courseId } = await params; // 👈 Await
  const course = await getCourseContent(courseId);

  // Tenta achar a primeira lição do primeiro módulo
  const firstLesson = course?.modules?.[0]?.lessons?.[0];

  if (firstLesson) {
    redirect(`/community/course/${courseId}/lesson/${firstLesson.id}`);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 text-3xl">
        🎓
      </div>
      <h2 className="text-2xl font-bold text-[#062214]">Bem-vindo ao curso!</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        Selecione uma aula no menu lateral para começar seus estudos.
      </p>
    </div>
  );
}