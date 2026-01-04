"use client";

import { Button } from "@/components/ui/button";
import { toggleLessonProgress } from "@/actions/courses";
import { useState, useTransition } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { toast } from "sonner";

export function LessonCheckButton({ lessonId, initialCompleted }: { lessonId: string, initialCompleted: boolean }) {
    const [completed, setCompleted] = useState(initialCompleted);
    const [isPending, startTransition] = useTransition();

    const handleToggle = () => {
        const newState = !completed;
        setCompleted(newState); // Otimistic update (muda visualmente na hora)

        startTransition(async () => {
            const result = await toggleLessonProgress(lessonId, newState);
            if (!result.success) {
                setCompleted(!newState); // Reverte se der erro
                toast.error("Erro ao salvar progresso.");
            } else {
                if (newState) toast.success("Aula concluída! 🎉");
            }
        });
    };

    return (
        <Button 
            onClick={handleToggle}
            disabled={isPending}
            variant={completed ? "default" : "outline"}
            className={completed 
                ? "bg-[#76A771] text-[#062214] hover:bg-[#659160] font-bold" 
                : "border-[#2A5432] text-[#76A771] hover:bg-[#2A5432]/30 hover:text-white"
            }
        >
            {completed ? (
                <>
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Concluída
                </>
            ) : (
                <>
                    <Circle className="w-4 h-4 mr-2" /> Marcar como Vista
                </>
            )}
        </Button>
    );
}