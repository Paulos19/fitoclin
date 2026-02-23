"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, AlertCircle, ListTodo } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface Quiz {
  id: string;
  passingScore: number;
  questions: Question[];
}

export function ModuleQuiz({ quiz }: { quiz: Quiz }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (questionId: string, optionId: string) => {
    if (isSubmitted) return; // Trava após envio
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    // Verifica se respondeu tudo
    if (Object.keys(answers).length < quiz.questions.length) {
      toast.error("Por favor, responda todas as perguntas antes de enviar.");
      return;
    }

    // Calcula nota
    let correctAnswers = 0;
    quiz.questions.forEach((q) => {
      const selectedOptionId = answers[q.id];
      const selectedOption = q.options.find((o) => o.id === selectedOptionId);
      if (selectedOption?.isCorrect) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);

    if (finalScore >= quiz.passingScore) {
      toast.success("Parabéns! Você foi aprovado neste módulo.");
    } else {
      toast.error("Você não atingiu a nota mínima. Revise o material e tente novamente.");
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  const passed = score >= quiz.passingScore;

  return (
    <Card className="bg-[#0A311D]/80 border-[#2A5432] shadow-xl overflow-hidden mt-8">
      <CardHeader className="bg-[#062214] border-b border-[#2A5432]/50 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <ListTodo className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <CardTitle className="text-2xl text-white">Avaliação do Módulo</CardTitle>
            <CardDescription className="text-gray-400">
              Teste seus conhecimentos. Nota mínima para aprovação: <span className="text-yellow-500 font-bold">{quiz.passingScore}%</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 md:p-8 space-y-8">
        {quiz.questions.map((question, index) => (
          <div key={question.id} className="space-y-4">
            <h3 className="text-lg font-medium text-white flex gap-2">
              <span className="text-yellow-600 font-bold">{index + 1}.</span> 
              {question.text}
            </h3>

            <RadioGroup
              value={answers[question.id]}
              onValueChange={(val) => handleOptionSelect(question.id, val)}
              className="space-y-3 pl-6"
            >
              {question.options.map((option) => {
                const isSelected = answers[question.id] === option.id;
                
                // Lógica de cores pós-submissão
                let optionStyle = "border-[#2A5432]/50 bg-[#062214]";
                let icon = null;

                if (isSubmitted) {
                  if (option.isCorrect) {
                    optionStyle = "border-green-500/50 bg-green-500/10 text-green-400";
                    icon = <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />;
                  } else if (isSelected && !option.isCorrect) {
                    optionStyle = "border-red-500/50 bg-red-500/10 text-red-400";
                    icon = <XCircle className="w-5 h-5 text-red-500 shrink-0" />;
                  }
                } else if (isSelected) {
                  optionStyle = "border-[#76A771] bg-[#76A771]/10";
                }

                return (
                  <div key={option.id} className="flex items-center">
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className="peer sr-only"
                      disabled={isSubmitted}
                    />
                    <Label
                      htmlFor={option.id}
                      className={`flex flex-1 items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-[#0A311D] transition-colors ${optionStyle}`}
                    >
                      <span className="text-sm md:text-base leading-relaxed">{option.text}</span>
                      {icon}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
            {index < quiz.questions.length - 1 && <Separator className="bg-white/5 mt-8" />}
          </div>
        ))}

        <div className="pt-6 border-t border-[#2A5432]/50 mt-8">
          {!isSubmitted ? (
            <Button onClick={handleSubmit} className="w-full md:w-auto bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a] text-lg h-12 px-8">
              Enviar Respostas
            </Button>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#062214] p-6 rounded-xl border border-[#2A5432]">
              <div className="flex items-center gap-4">
                {passed ? (
                  <div className="p-3 bg-green-500/20 rounded-full">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                ) : (
                  <div className="p-3 bg-red-500/20 rounded-full">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                )}
                <div>
                  <h4 className={`text-xl font-bold ${passed ? "text-green-400" : "text-red-400"}`}>
                    {passed ? "Aprovado!" : "Reprovado"}
                  </h4>
                  <p className="text-gray-400">
                    Sua pontuação: <strong className="text-white">{score}%</strong> (Mínimo: {quiz.passingScore}%)
                  </p>
                </div>
              </div>
              
              {!passed && (
                <Button onClick={handleRetry} variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-950 hover:text-red-300">
                  Tentar Novamente
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}