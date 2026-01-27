"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveEpigeneticAnamnesis } from "@/actions/epigenetic"; // Importe a action criada

const formSchema = z.object({
  familyHistory: z.string().optional(),
  nutrition: z.string().optional(),
  physicalActivity: z.string().optional(),
  environmentalExposure: z.string().optional(),
  stressAndMentalHealth: z.string().optional(),
  healthHistory: z.string().optional(),
  substanceUse: z.string().optional(),
  sleepQuality: z.string().optional(),
  socialRelationships: z.string().optional(),
  traumaHistory: z.string().optional(),
});

interface EpigeneticFormProps {
  patientId: string;
  onSuccess?: () => void;
}

export function EpigeneticForm({ patientId, onSuccess }: EpigeneticFormProps) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      familyHistory: "",
      nutrition: "",
      physicalActivity: "",
      environmentalExposure: "",
      stressAndMentalHealth: "",
      healthHistory: "",
      substanceUse: "",
      sleepQuality: "",
      socialRelationships: "",
      traumaHistory: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      const result = await saveEpigeneticAnamnesis({ ...values, patientId });
      
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success);
        form.reset();
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      toast.error("Erro inesperado. Tente novamente.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* BLOCO 1 */}
          <Card>
            <CardHeader>
                <CardTitle className="text-base">1. Histórico Familiar</CardTitle>
            </CardHeader>
            <CardContent>
                <FormField
                control={form.control}
                name="familyHistory"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="sr-only">Histórico</FormLabel>
                    <FormControl>
                        <Textarea 
                            placeholder="Condições de saúde prevalentes na família, doenças crônicas ou hereditárias..." 
                            className="min-h-[100px]" 
                            {...field} 
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </CardContent>
          </Card>

           {/* BLOCO 2 */}
           <Card>
            <CardHeader>
                <CardTitle className="text-base">2. Nutrição</CardTitle>
            </CardHeader>
            <CardContent>
                <FormField
                control={form.control}
                name="nutrition"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Textarea 
                            placeholder="Dieta diária, o que come num dia típico..." 
                            className="min-h-[100px]" 
                            {...field} 
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </CardContent>
          </Card>

          {/* BLOCO 3 */}
          <Card>
            <CardHeader>
                <CardTitle className="text-base">3. Atividade Física</CardTitle>
            </CardHeader>
            <CardContent>
                <FormField
                control={form.control}
                name="physicalActivity"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Textarea 
                            placeholder="Frequência, intensidade e tipos de exercício..." 
                            className="min-h-[100px]" 
                            {...field} 
                        />
                    </FormControl>
                    </FormItem>
                )}
                />
            </CardContent>
          </Card>

           {/* BLOCO 4 */}
           <Card>
            <CardHeader>
                <CardTitle className="text-base">4. Exposição Ambiental</CardTitle>
            </CardHeader>
            <CardContent>
                <FormField
                control={form.control}
                name="environmentalExposure"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Textarea 
                            placeholder="Poluentes, produtos químicos, ambiente de trabalho..." 
                            className="min-h-[100px]" 
                            {...field} 
                        />
                    </FormControl>
                    </FormItem>
                )}
                />
            </CardContent>
          </Card>

          {/* BLOCO 5 */}
           <Card>
            <CardHeader>
                <CardTitle className="text-base">5. Estresse e Saúde Mental</CardTitle>
            </CardHeader>
            <CardContent>
                <FormField
                control={form.control}
                name="stressAndMentalHealth"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Textarea 
                            placeholder="Principais estressores, métodos de relaxamento..." 
                            className="min-h-[100px]" 
                            {...field} 
                        />
                    </FormControl>
                    </FormItem>
                )}
                />
            </CardContent>
          </Card>

           {/* BLOCO 6 */}
           <Card>
            <CardHeader>
                <CardTitle className="text-base">6. Histórico de Saúde</CardTitle>
            </CardHeader>
            <CardContent>
                <FormField
                control={form.control}
                name="healthHistory"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Textarea 
                            placeholder="Doenças graves passadas e tratamentos..." 
                            className="min-h-[100px]" 
                            {...field} 
                        />
                    </FormControl>
                    </FormItem>
                )}
                />
            </CardContent>
          </Card>

           {/* BLOCO 7 */}
           <Card>
            <CardHeader>
                <CardTitle className="text-base">7. Uso de Substâncias</CardTitle>
            </CardHeader>
            <CardContent>
                <FormField
                control={form.control}
                name="substanceUse"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Textarea 
                            placeholder="Álcool, tabaco, outras substâncias (frequência/quantidade)..." 
                            className="min-h-[100px]" 
                            {...field} 
                        />
                    </FormControl>
                    </FormItem>
                )}
                />
            </CardContent>
          </Card>

           {/* BLOCO 8 */}
           <Card>
            <CardHeader>
                <CardTitle className="text-base">8. Qualidade do Sono</CardTitle>
            </CardHeader>
            <CardContent>
                <FormField
                control={form.control}
                name="sleepQuality"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Textarea 
                            placeholder="Qualidade, quantidade, dificuldades para dormir..." 
                            className="min-h-[100px]" 
                            {...field} 
                        />
                    </FormControl>
                    </FormItem>
                )}
                />
            </CardContent>
          </Card>

           {/* BLOCO 9 */}
           <Card>
            <CardHeader>
                <CardTitle className="text-base">9. Relações Sociais</CardTitle>
            </CardHeader>
            <CardContent>
                <FormField
                control={form.control}
                name="socialRelationships"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Textarea 
                            placeholder="Sistema de apoio, família, amigos..." 
                            className="min-h-[100px]" 
                            {...field} 
                        />
                    </FormControl>
                    </FormItem>
                )}
                />
            </CardContent>
          </Card>

           {/* BLOCO 10 */}
           <Card>
            <CardHeader>
                <CardTitle className="text-base">10. Traumas</CardTitle>
            </CardHeader>
            <CardContent>
                <FormField
                control={form.control}
                name="traumaHistory"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Textarea 
                            placeholder="Eventos traumáticos significativos e impactos..." 
                            className="min-h-[100px]" 
                            {...field} 
                        />
                    </FormControl>
                    </FormItem>
                )}
                />
            </CardContent>
          </Card>

        </div>

        <div className="flex justify-end">
            <Button type="submit" disabled={isPending} className="w-full md:w-auto">
            {isPending ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
                </>
            ) : (
                <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Anamnese Epigenética
                </>
            )}
            </Button>
        </div>
      </form>
    </Form>
  );
}