"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitLandingLead } from "@/actions/landing";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";

export function LeadCaptureForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await submitLandingLead(formData);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.success);
      // Opcional: Redirecionar para WhatsApp após cadastro
      // window.location.href = "https://wa.me/5511999999999?text=Vim+pelo+site+e+me+cadastrei";
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4 mt-6">
      <div>
        <label htmlFor="name" className="sr-only">Nome Completo</label>
        <Input 
          id="name" 
          name="name" 
          placeholder="Seu nome completo" 
          required 
          className="h-12 bg-white/90 border-0 text-[#062214] placeholder:text-gray-500 focus-visible:ring-[#76A771]"
        />
      </div>
      <div>
        <label htmlFor="phone" className="sr-only">WhatsApp</label>
        <Input 
          id="phone" 
          name="phone" 
          placeholder="Seu WhatsApp (com DDD)" 
          type="tel"
          required 
          className="h-12 bg-white/90 border-0 text-[#062214] placeholder:text-gray-500 focus-visible:ring-[#76A771]"
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">Email (Opcional)</label>
        <Input 
          id="email" 
          name="email" 
          placeholder="Seu melhor email (opcional)" 
          type="email"
          className="h-12 bg-white/90 border-0 text-[#062214] placeholder:text-gray-500 focus-visible:ring-[#76A771]"
        />
      </div>

      <Button 
        type="submit" 
        disabled={loading}
        className="w-full h-12 bg-[#76A771] hover:bg-[#5e8a5a] text-[#062214] font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Quero Agendar Minha Avaliação"}
        {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
      </Button>
      
      <p className="text-xs text-center text-gray-300/80 mt-2">
        Seus dados estão seguros. Entraremos em contato em até 24h.
      </p>
    </form>
  );
}