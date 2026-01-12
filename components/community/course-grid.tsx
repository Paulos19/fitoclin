import { CommunityCourse, CourseCard } from "./course-card";

interface CourseGridProps {
  courses: CommunityCourse[]; // 👈 Usamos a nova tipagem aqui
}

export function CourseGrid({ courses }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">🍃</span>
        </div>
        <h3 className="text-xl font-semibold text-[#062214]">Nenhum curso encontrado</h3>
        <p className="text-gray-500 max-w-md mt-2">
          Tente buscar por outro termo ou aguarde novos conteúdos da Dra. Isa.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-700 slide-in-from-bottom-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}