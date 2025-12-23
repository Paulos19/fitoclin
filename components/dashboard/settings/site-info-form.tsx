"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { updateSiteInfo } from "@/actions/settings";
import { Loader2, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function SiteInfoForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const res = await updateSiteInfo(formData);
    setLoading(false);
    
    if (res.error) toast.error(res.error);
    else toast.success(res.success);
  }

  return (
    <form action={handleSubmit}>
      <Card className="bg-[#0A311D]/40 border-[#2A5432]/30">
        <CardHeader>
          <CardTitle className="text-white">Informações da Página Inicial</CardTitle>
          <CardDescription>Textos principais que aparecem na Hero Section e Sobre.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-gray-300">Título Principal (Hero)</Label>
            <Input 
              name="heroTitle" 
              defaultValue={initialData?.heroTitle || ""} 
              placeholder="Ex: A Ciência da Natureza a favor da sua Saúde" 
              className="bg-[#062214] border-[#2A5432] text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-gray-300">Subtítulo (Hero)</Label>
            <Textarea 
              name="heroSubtitle" 
              defaultValue={initialData?.heroSubtitle || ""} 
              className="bg-[#062214] border-[#2A5432] text-white h-20"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Texto "Sobre a Dra. Isa"</Label>
            <Textarea 
              name="aboutText" 
              defaultValue={initialData?.aboutText || ""} 
              className="bg-[#062214] border-[#2A5432] text-white h-32"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <Label className="text-gray-300">WhatsApp (Link ou Número)</Label>
               <Input name="whatsapp" defaultValue={initialData?.whatsapp || ""} className="bg-[#062214] border-[#2A5432] text-white" />
             </div>
             <div className="space-y-2">
               <Label className="text-gray-300">Instagram (@usuario)</Label>
               <Input name="instagram" defaultValue={initialData?.instagram || ""} className="bg-[#062214] border-[#2A5432] text-white" />
             </div>
          </div>

          <Button type="submit" disabled={loading} className="btn-gradient w-full md:w-auto">
             {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : <Save className="w-4 h-4 mr-2"/>}
             Salvar Alterações
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}