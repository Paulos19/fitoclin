"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle } from "lucide-react";
import { toast } from "sonner";
import { toggleLessonProgress } from "@/actions/courses";
import { useRouter } from "next/navigation";

interface LessonCheckButtonProps {
  lessonId: string;
  initialIsCompleted: boolean;
}

export function LessonCheckButton({ lessonId, initialIsCompleted }: LessonCheckButtonProps) {
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);
      const newStatus = !isCompleted;
      
      // Atualiza UI otimista
      setIsCompleted(newStatus);

      const result = await toggleLessonProgress(lessonId, newStatus);
      
      if (result.error) {
        setIsCompleted(!newStatus); // Reverte
        toast.error("Erro ao atualizar progresso");
      } else {
        toast.success(newStatus ? "Aula concluída! 🎉" : "Progresso reiniciado");
        router.refresh(); // Atualiza a sidebar para mostrar o check
      }
    } catch {
      setIsCompleted(!isCompleted);
      toast.error("Algo deu errado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      variant={isCompleted ? "default" : "outline"}
      className={
        isCompleted 
          ? "bg-[#2A5432] hover:bg-[#204026] text-white gap-2 transition-all" 
          : "border-[#2A5432] text-[#2A5432] hover:bg-[#E8F5E9] gap-2 transition-all"
      }
    >
      {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
      {isCompleted ? "Concluída" : "Marcar como Concluída"}
    </Button>
  );
}