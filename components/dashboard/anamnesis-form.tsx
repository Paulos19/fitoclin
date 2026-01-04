"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { saveAnamnesis } from "@/actions/anamnesis";
import { toast } from "sonner";
import { Loader2, ArrowRight, ArrowLeft, Leaf, Heart, Sparkles, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// Componente para nota de 0 a 10 (Controlado)
function RatingInput({ value, onChange, label }: { value: number, onChange: (val: number) => void, label: string }) {
  return (
    <div className="space-y-3 py-2">
      <div className="flex justify-between items-end">
        <Label className="text-gray-200 text-sm md:text-base">{label}</Label>
        <span className="text-[#76A771] font-bold text-lg">{value}</span>
      </div>
      <div className="flex flex-wrap gap-1 md:gap-2 justify-between">
        {Array.from({ length: 11 }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i)}
            className={cn(
              "w-8 h-8 md:w-10 md:h-10 rounded-full text-sm font-medium transition-all duration-200 border",
              value === i 
                ? "bg-[#76A771] text-[#062214] border-[#76A771] scale-110 shadow-[0_0_10px_rgba(118,167,113,0.5)]" 
                : "bg-[#0A311D] text-gray-400 border-[#2A5432] hover:bg-[#2A5432] hover:text-white"
            )}
          >
            {i}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-wider">
        <span>Muito Ruim</span>
        <span>Excelente</span>
      </div>
    </div>
  );
}

export function AnamnesisForm({ userEmail, userName }: { userEmail?: string, userName?: string }) {
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Estado centralizado para todos os campos
  const [data, setData] = useState({
    fullName: userName || "",
    age: "",
    profession: "",
    phone: "",
    consultationDate: "",
    isFirstTime: "nao",
    mainComplaint: "",
    diagnosedDiseases: "",
    
    // Ratings (Default 5 para não ir nulo)
    sleepQuality: 5,
    bowelFunction: 5,
    energyLevel: 5,
    bodyPain: 5,
    immunity: 5,
    anxiety: 5,
    sadness: 5,
    mentalClarity: 5,
    stressHandling: 5,
    lifeSatisfaction: 5,
    purpose: 5,
    spirituality: 5,
    selfCare: 5,
    innerPeace: 5,
    dietQuality: 5,

    medications: "",
    supplements: "",
    allergies: "",
    lgpdAuthorized: false
  });

  // Função genérica para atualizar estado
  const handleChange = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  async function handleSubmit() {
    if (!data.lgpdAuthorized) {
        toast.error("Você precisa aceitar o termo LGPD.");
        return;
    }

    startTransition(async () => {
      // Criar FormData manualmente a partir do estado
      const formData = new FormData();
      Object.entries(data).forEach(([key, val]) => {
        // Converte booleano para string "on" se for true, para compatibilidade com o backend
        if (key === 'lgpdAuthorized') {
            if (val) formData.append(key, "on");
        } else {
            formData.append(key, String(val));
        }
      });

      const result = await saveAnamnesis(formData);
      
      if (result.success) {
        toast.success(result.success);
        router.push("/dashboard");
      } else {
        toast.error(result.error || "Erro ao salvar.");
      }
    });
  }

  const nextStep = () => {
      // Validação básica por etapa (opcional, mas recomendado)
      if (step === 1 && (!data.fullName || !data.age || !data.phone || !data.mainComplaint)) {
          toast.error("Por favor, preencha os campos obrigatórios.");
          return;
      }
      setStep(s => s + 1);
  };
  
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Barra de Progresso */}
      <div className="mb-8">
        <div className="h-2 bg-[#0A311D] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#76A771] transition-all duration-500 ease-out" 
            style={{ width: `${(step / 5) * 100}%` }} 
          />
        </div>
        <p className="text-right text-xs text-[#76A771] mt-2 font-medium">Etapa {step} de 5</p>
      </div>

      <Card className="bg-[#062214]/80 border-[#2A5432] backdrop-blur-sm shadow-2xl">
          <CardContent className="p-6 md:p-8">
            
            {/* ETAPA 1: BÁSICO */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                    <Leaf className="w-6 h-6 text-[#76A771]" /> Olá, {userName?.split(' ')[0]}!
                  </h2>
                  <p className="text-gray-400 text-sm mt-2">
                    Vamos entender sua saúde de forma integral. Leva apenas 3 minutos.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Nome Completo</Label>
                    <Input 
                        value={data.fullName} 
                        onChange={e => handleChange("fullName", e.target.value)} 
                        className="bg-[#0A311D] border-[#2A5432] text-white" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Idade</Label>
                    <Input 
                        type="number"
                        value={data.age} 
                        onChange={e => handleChange("age", e.target.value)} 
                        className="bg-[#0A311D] border-[#2A5432] text-white" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Profissão</Label>
                    <Input 
                        value={data.profession} 
                        onChange={e => handleChange("profession", e.target.value)} 
                        className="bg-[#0A311D] border-[#2A5432] text-white" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">WhatsApp (com DDD)</Label>
                    <Input 
                        value={data.phone} 
                        onChange={e => handleChange("phone", e.target.value)} 
                        className="bg-[#0A311D] border-[#2A5432] text-white" 
                        placeholder="(00) 00000-0000" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                   <Label className="text-gray-300">Data da Consulta (Se já agendada)</Label>
                   <Input 
                        type="date"
                        value={data.consultationDate} 
                        onChange={e => handleChange("consultationDate", e.target.value)} 
                        className="bg-[#0A311D] border-[#2A5432] text-white" 
                   />
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-300">Já passou por atendimento Fitoclin antes?</Label>
                  <RadioGroup 
                    value={data.isFirstTime} 
                    onValueChange={val => handleChange("isFirstTime", val)} 
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sim" id="r-sim" className="border-white text-[#76A771]" />
                      <Label htmlFor="r-sim" className="text-white">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nao" id="r-nao" className="border-white text-[#76A771]" />
                      <Label htmlFor="r-nao" className="text-white">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Principal incômodo que deseja tratar agora:</Label>
                  <Textarea 
                    value={data.mainComplaint} 
                    onChange={e => handleChange("mainComplaint", e.target.value)} 
                    className="bg-[#0A311D] border-[#2A5432] text-white min-h-[100px]" 
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Doenças diagnosticadas (opcional)</Label>
                  <Textarea 
                    value={data.diagnosedDiseases} 
                    onChange={e => handleChange("diagnosedDiseases", e.target.value)} 
                    className="bg-[#0A311D] border-[#2A5432] text-white" 
                    placeholder="Ex: Hipertensão, Diabetes..." 
                  />
                </div>
              </div>
            )}

            {/* ETAPA 2: FÍSICO */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div className="flex items-center gap-2 mb-4 text-[#76A771]">
                   <Activity className="w-5 h-5" />
                   <h3 className="font-bold uppercase tracking-wider">Saúde Física</h3>
                </div>
                <RatingInput label="Qualidade do Sono" value={data.sleepQuality} onChange={v => handleChange("sleepQuality", v)} />
                <RatingInput label="Qualidade do Intestino" value={data.bowelFunction} onChange={v => handleChange("bowelFunction", v)} />
                <RatingInput label="Nível de Energia" value={data.energyLevel} onChange={v => handleChange("energyLevel", v)} />
                <RatingInput label="Dores no Corpo" value={data.bodyPain} onChange={v => handleChange("bodyPain", v)} />
                <RatingInput label="Imunidade (Facilidade em adoecer)" value={data.immunity} onChange={v => handleChange("immunity", v)} />
              </div>
            )}

            {/* ETAPA 3: EMOCIONAL */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div className="flex items-center gap-2 mb-4 text-purple-400">
                   <Heart className="w-5 h-5" />
                   <h3 className="font-bold uppercase tracking-wider">Saúde Emocional</h3>
                </div>
                <RatingInput label="Ansiedade / Mente Agitada" value={data.anxiety} onChange={v => handleChange("anxiety", v)} />
                <RatingInput label="Tristeza / Irritação / Desânimo" value={data.sadness} onChange={v => handleChange("sadness", v)} />
                <RatingInput label="Clareza Mental / Concentração" value={data.mentalClarity} onChange={v => handleChange("mentalClarity", v)} />
                <RatingInput label="Capacidade de lidar com Estresse" value={data.stressHandling} onChange={v => handleChange("stressHandling", v)} />
                <RatingInput label="Satisfação com a vida hoje" value={data.lifeSatisfaction} onChange={v => handleChange("lifeSatisfaction", v)} />
                <RatingInput label="Sente que tem propósito?" value={data.purpose} onChange={v => handleChange("purpose", v)} />
              </div>
            )}

            {/* ETAPA 4: ESPIRITUAL & HÁBITOS */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div className="flex items-center gap-2 mb-4 text-yellow-400">
                   <Sparkles className="w-5 h-5" />
                   <h3 className="font-bold uppercase tracking-wider">Interior & Hábitos</h3>
                </div>
                
                <RatingInput label="Conexão com espiritualidade/natureza" value={data.spirituality} onChange={v => handleChange("spirituality", v)} />
                <RatingInput label="Tempo para si / Autocuidado" value={data.selfCare} onChange={v => handleChange("selfCare", v)} />
                <RatingInput label="Sensação de Paz Interior" value={data.innerPeace} onChange={v => handleChange("innerPeace", v)} />

                <div className="h-px bg-[#2A5432] my-6" />

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-gray-300">Usa medicamentos contínuos? Quais?</Label>
                        <Textarea 
                            value={data.medications} 
                            onChange={e => handleChange("medications", e.target.value)} 
                            className="bg-[#0A311D] border-[#2A5432] text-white" 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-300">Usa chás ou suplementos? Quais?</Label>
                        <Textarea 
                            value={data.supplements} 
                            onChange={e => handleChange("supplements", e.target.value)} 
                            className="bg-[#0A311D] border-[#2A5432] text-white" 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-300">Possui alergias? (Inclusive a plantas)</Label>
                        <Textarea 
                            value={data.allergies} 
                            onChange={e => handleChange("allergies", e.target.value)} 
                            className="bg-[#0A311D] border-[#2A5432] text-white" 
                        />
                    </div>
                    <RatingInput label="Como avalia sua alimentação hoje?" value={data.dietQuality} onChange={v => handleChange("dietQuality", v)} />
                </div>
              </div>
            )}

            {/* ETAPA 5: LGPD */}
            {step === 5 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 text-center">
                 <div className="p-4 bg-[#76A771]/10 border border-[#76A771]/30 rounded-xl text-left">
                    <h4 className="font-bold text-[#76A771] mb-2 flex items-center gap-2">
                        <Leaf className="w-4 h-4" /> Termo de Consentimento - LGPD
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        Você autoriza a realização da consulta online e o uso da sua imagem (foto ou vídeo) para fins educativos ou institucionais, sem divulgação de dados sensíveis ou informações sobre sua saúde, conforme a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).
                    </p>
                    <div className="flex items-center space-x-2 mt-4">
                        <Checkbox 
                            id="lgpd" 
                            checked={data.lgpdAuthorized}
                            onCheckedChange={val => handleChange("lgpdAuthorized", val)}
                            className="border-white data-[state=checked]:bg-[#76A771] data-[state=checked]:text-[#062214]" 
                        />
                        <Label htmlFor="lgpd" className="text-white font-medium cursor-pointer">Sim, eu autorizo.</Label>
                    </div>
                 </div>

                 <Button 
                    type="button" // Mudado para button normal que chama handleSubmit no onClick
                    onClick={handleSubmit}
                    className="w-full bg-[#76A771] hover:bg-[#659160] text-[#062214] font-bold h-12 text-lg shadow-[0_0_20px_rgba(118,167,113,0.3)]"
                    disabled={isPending}
                 >
                    {isPending ? <Loader2 className="animate-spin mr-2" /> : "Enviar Formulário Pré-Consulta"}
                 </Button>
              </div>
            )}

            {/* Navegação entre passos */}
            <div className="flex justify-between mt-8 pt-4 border-t border-[#2A5432]/50">
                {step > 1 ? (
                    <Button type="button" variant="ghost" onClick={prevStep} className="text-gray-400 hover:text-white">
                        <ArrowLeft className="mr-2 w-4 h-4" /> Voltar
                    </Button>
                ) : <div />}
                
                {step < 5 && (
                    <Button type="button" onClick={nextStep} className="bg-[#2A5432] text-white hover:bg-[#34663d]">
                        Próximo <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                )}
            </div>

          </CardContent>
        </Card>
    </div>
  );
}