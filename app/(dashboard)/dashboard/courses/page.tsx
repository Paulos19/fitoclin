import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CoursesManager } from "@/components/dashboard/settings/courses-manager";

export default async function CoursesAdminPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  // 1. Busca os dados brutos do banco
  const rawCourses = await db.course.findMany({
    include: {
      modules: {
        include: {
          lessons: { orderBy: { order: 'asc' } },
          materials: true,
        },
        orderBy: { order: 'asc' }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // 2. Serialização: Converte Decimal para Number
  const courses = rawCourses.map((course) => ({
    ...course,
    price: Number(course.price), // 👈 A mágica acontece aqui
    // Se houver datas causando erro, converta também:
    // createdAt: course.createdAt.toISOString(),
    // updatedAt: course.updatedAt.toISOString(),
  }));

  return (
    <div className="animate-in fade-in duration-500">
      <CoursesManager courses={courses} />
    </div>
  );
}