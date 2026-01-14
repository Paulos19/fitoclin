"use client";

import { Check, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { createCheckoutSession } from "@/actions/stripe"; 
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  planId: string;
  priceId: string;
  name: string;
  price: number;
  features: string;
  isPopular?: boolean;
}

export function PricingCard({ priceId, name, price, features, isPopular }: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const featureList = features.split(";").map((f) => f.trim()).filter(Boolean);

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      const result = await createCheckoutSession(priceId);
      
      if (result?.error) {
        toast.error(result.error);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Erro de conexão. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <Card 
      className={cn(
        "relative flex flex-col w-full overflow-hidden transition-all duration-500",
        // Base Style (Glassmorphism Dark)
        "bg-[#0A311D]/60 backdrop-blur-xl border-2",
        
        isPopular 
          ? "border-[#D4AF37]/50 shadow-[0_0_30px_-5px_rgba(212,175,55,0.15)] scale-[1.02] z-10" 
          : "border-[#2A5432]/30 hover:border-[#76A771]/50 hover:bg-[#0A311D]/80"
      )}
    >
      {/* Faixa de "Recomendado" com gradiente Dourado */}
      {isPopular && (
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_10px_#D4AF37]" />
      )}

      <CardHeader className="pb-4 pt-8 px-8 text-center space-y-2">
        {isPopular && (
          <div className="mx-auto mb-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest w-fit">
            <Sparkles className="w-3 h-3" /> Recomendado
          </div>
        )}
        
        <h3 className="text-xl font-medium text-gray-100">{name}</h3>
        
        <div className="flex items-baseline justify-center gap-1 pt-2">
          <span className="text-sm font-medium text-gray-400 self-start mt-2">R$</span>
          <span className="text-5xl font-bold text-white tracking-tight">
            {price.toFixed(0)}
          </span>
          <span className="text-sm font-medium text-gray-400 self-end mb-2">,00 /mês</span>
        </div>
      </CardHeader>

      <div className="px-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#2A5432] to-transparent opacity-50" />
      </div>

      <CardContent className="flex-1 px-8 py-8">
        <ul className="space-y-4">
          {featureList.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed text-left group">
              <div className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                isPopular ? "border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]" : "border-[#76A771]/30 bg-[#76A771]/10 text-[#76A771]"
              )}>
                <Check className="h-3 w-3" />
              </div>
              <span className="group-hover:text-white transition-colors">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pb-8 px-8">
        <Button 
          onClick={handleSubscribe} 
          disabled={isLoading}
          className={cn(
            "w-full h-12 text-base font-bold shadow-lg transition-all rounded-xl",
            isPopular 
              ? "bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-[#062214] hover:shadow-[#D4AF37]/20 hover:scale-[1.02]" 
              : "bg-[#2A5432] hover:bg-[#2A5432]/80 text-white border border-[#76A771]/20 hover:border-[#76A771]/50"
          )}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Processando..." : (isPopular ? "Quero ser Profissional" : "Assinar Agora")}
        </Button>
      </CardFooter>
    </Card>
  );
}