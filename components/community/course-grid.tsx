"use client";

import { motion } from "framer-motion";
import { CourseCard, CommunityCourse } from "./course-card";

interface CourseGridProps {
  courses: CommunityCourse[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  if (!courses || courses.length === 0) {
    return null;
  }

  // Configuração de animação escalonada (stagger)
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
    >
      {courses.map((course) => (
        <motion.div key={course.id} variants={item} className="h-full">
           {/* Passamos o objeto inteiro 'course' para o card */}
           <CourseCard course={course} />
        </motion.div>
      ))}
    </motion.div>
  );
}