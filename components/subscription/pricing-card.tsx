"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className={cn(
      "relative flex flex-col w-full max-w-sm overflow-hidden border-2 transition-all duration-300 hover:shadow-xl bg-white",
      isPopular ? "border-[#2A5432] shadow-md scale-105 z-10" : "border-gray-100 hover:border-green-100"
    )}>
      {isPopular && (
        <div className="absolute top-0 inset-x-0 h-8 bg-[#2A5432] flex items-center justify-center">
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">
            Recomendado
          </span>
        </div>
      )}

      <CardHeader className={cn("pb-8 text-center", isPopular && "pt-12")}>
        <CardTitle className="text-xl font-bold text-gray-900">{name}</CardTitle>
        <div className="mt-4 flex items-baseline justify-center gap-1">
          <span className="text-4xl font-extrabold text-[#062214]">
            R$ {price.toFixed(2).replace(".", ",")}
          </span>
          <span className="text-sm font-medium text-gray-500">/mês</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <ul className="space-y-4">
          {featureList.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed text-left">
              <CheckCircle className="h-5 w-5 shrink-0 text-[#76A771]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-8 pb-8">
        <Button 
          onClick={handleSubscribe} 
          disabled={isLoading}
          className={cn(
            "w-full h-12 text-base font-semibold shadow-lg transition-all",
            isPopular 
              ? "bg-[#2A5432] hover:bg-[#1e3d24] text-white hover:shadow-green-900/20" 
              : "bg-white border-2 border-[#2A5432] text-[#2A5432] hover:bg-green-50"
          )}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Processando..." : "Assinar Agora"}
        </Button>
      </CardFooter>
    </Card>
  );
}