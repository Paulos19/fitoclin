"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updatePatientProfile } from "@/actions/patient";
import { Loader2, Save, User, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileFormProps {
  initialData: {
    phone?: string | null;
    birthDate?: Date | null;
    gender?: string | null;
    occupation?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    user: {
      name: string;
      email: string;
    };
  };
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);

  // Formatar data para o input (YYYY-MM-DD)
  const formattedDate = initialData.birthDate 
    ? new Date(initialData.birthDate).toISOString().split('T')[0] 
    : "";

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    
    const promise = updatePatientProfile(formData);

    toast.promise(promise, {
      loading: 'Salvando alterações...',
      success: (data) => {
        setLoading(false);
        if (data.error) throw new Error(data.error);
        return "Dados atualizados com sucesso!";
      },
      error: (err) => {
        setLoading(false);
        return err.message;
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      
      {/* SEÇÃO 1: DADOS PESSOAIS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#062214]">
            <User className="w-5 h-5 text-[#76A771]" /> Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          
          {/* Campos Read-Only (Nome/Email) */}
          <div className="space-y-2">
            <Label>Nome Completo</Label>
            <Input value={initialData.user.name} disabled className="bg-gray-100 cursor-not-allowed" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={initialData.user.email} disabled className="bg-gray-100 cursor-not-allowed" />
          </div>

          {/* Campos Editáveis */}
          <div className="space-y-2">
            <Label htmlFor="phone">Celular / WhatsApp</Label>
            <Input id="phone" name="phone" defaultValue={initialData.phone || ""} placeholder="(11) 99999-9999" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="birthDate">Data de Nascimento</Label>
            <Input id="birthDate" name="birthDate" type="date" defaultValue={formattedDate} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gênero / Identidade</Label>
            <Select name="gender" defaultValue={initialData.gender || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Feminino">Feminino</SelectItem>
                <SelectItem value="Masculino">Masculino</SelectItem>
                <SelectItem value="Outro">Prefiro não dizer / Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupation">Profissão</Label>
            <Input id="occupation" name="occupation" defaultValue={initialData.occupation || ""} placeholder="Ex: Advogada" />
          </div>
        </CardContent>
      </Card>

      {/* SEÇÃO 2: ENDEREÇO */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#062214]">
            <MapPin className="w-5 h-5 text-[#76A771]" /> Endereço
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Logradouro Completo</Label>
            <Input id="address" name="address" defaultValue={initialData.address || ""} placeholder="Av. Paulista, 1000 - Apt 42" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="city">Cidade</Label>
            <Input id="city" name="city" defaultValue={initialData.city || ""} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="state">Estado (UF)</Label>
            <Input id="state" name="state" maxLength={2} defaultValue={initialData.state || ""} placeholder="SP" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" className="btn-gradient w-full md:w-auto md:px-8" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Salvar Alterações
        </Button>
      </div>
    </form>
  );
}