"use client";

import { Button } from "@/components/ui/button";
import { createCourseCheckout } from "@/actions/stripe";
import { Loader2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BuyButtonProps {
  courseId: string;
  price: number;
}

export function BuyButton({ courseId, price }: BuyButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const result = await createCourseCheckout(courseId);
      
      if (result?.error) {
        toast.error(result.error);
        setIsLoading(false);
      }
      // Se der certo, o redirect acontece no server action
    } catch (error) {
      toast.error("Erro ao iniciar compra");
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={onClick} 
      disabled={isLoading}
      className="w-full h-12 text-lg font-bold bg-[#2A5432] hover:bg-[#204026] text-white shadow-lg hover:shadow-green-900/20 transition-all transform hover:-translate-y-1"
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
      ) : (
        <ShoppingCart className="w-5 h-5 mr-2" />
      )}
      Comprar por R$ {price.toFixed(2).replace('.', ',')}
    </Button>
  );
}