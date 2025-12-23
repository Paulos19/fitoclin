"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { updatePatientProfile } from "@/actions/patient";
import { 
  Loader2, 
  Save, 
  User, 
  MapPin, 
  Camera,
  Briefcase,
  Phone,
  Mail,
  Calendar
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      image?: string | null; // Adicionado campo de imagem
    };
  };
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData.user.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Formatar data para o input (YYYY-MM-DD)
  const formattedDate = initialData.birthDate 
    ? new Date(initialData.birthDate).toISOString().split('T')[0] 
    : "";

  // Handler para quando o usuário seleciona uma foto
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamanho (ex: máx 4MB)
      if (file.size > 4 * 1024 * 1024) {
        toast.error("A imagem deve ter no máximo 4MB.");
        return;
      }
      // Cria URL temporária para preview imediato
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    
    // O input file já está dentro do form, então o formData já contém a imagem como "profileImage"
    const promise = updatePatientProfile(formData);

    toast.promise(promise, {
      loading: 'Enviando foto e salvando dados...',
      success: (data) => {
        setLoading(false);
        if (data.error) throw new Error(data.error);
        return "Perfil atualizado com sucesso!";
      },
      error: (err) => {
        setLoading(false);
        return err.message;
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      
      {/* SEÇÃO 1: CABEÇALHO COM AVATAR E DADOS BÁSICOS */}
      <Card className="overflow-hidden border-[#2A5432]/30 bg-[#0A311D]/40">
        <div className="h-32 bg-gradient-to-r from-[#062214] to-[#2A5432] relative">
           <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        </div>
        
        <CardContent className="relative px-6 pb-6">
           {/* Avatar Upload - Posicionado sobre o Banner */}
           <div className="absolute -top-12 left-6">
              <div className="relative group">
                <Avatar className="w-24 h-24 border-4 border-[#0A311D] shadow-xl cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <AvatarImage src={previewUrl || ""} className="object-cover" />
                  <AvatarFallback className="bg-[#2A5432] text-white text-3xl font-bold">
                    {initialData.user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                  
                  {/* Overlay de Edição */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </Avatar>
                
                {/* Input Invisível */}
                <input 
                  type="file" 
                  name="profileImage" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageChange}
                />
              </div>
           </div>

           <div className="pt-14 md:pl-28 md:pt-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{initialData.user.name}</h2>
                <p className="text-gray-400 flex items-center gap-2">
                   <Mail className="w-4 h-4" /> {initialData.user.email}
                </p>
              </div>
              <div className="px-3 py-1 bg-[#76A771]/10 border border-[#76A771]/30 rounded-full text-[#76A771] text-xs font-bold uppercase tracking-wider">
                Paciente Verificado
              </div>
           </div>
        </CardContent>
      </Card>

      {/* SEÇÃO 2: FORMULÁRIO DE DADOS */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* COLUNA ESQUERDA: PESSOAL */}
        <Card className="bg-[#0A311D]/40 border-[#2A5432]/30 h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white text-lg">
              <User className="w-5 h-5 text-[#76A771]" /> Dados Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                 <Phone className="w-4 h-4" /> Celular / WhatsApp
              </Label>
              <Input 
                 name="phone" 
                 defaultValue={initialData.phone || ""} 
                 placeholder="(11) 99999-9999" 
                 className="bg-[#062214] border-[#2A5432] text-white focus-visible:ring-[#76A771]"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                 <Calendar className="w-4 h-4" /> Data de Nascimento
              </Label>
              <Input 
                 name="birthDate" 
                 type="date" 
                 defaultValue={formattedDate} 
                 className="bg-[#062214] border-[#2A5432] text-white focus-visible:ring-[#76A771] [color-scheme:dark]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Gênero / Identidade</Label>
              <Select name="gender" defaultValue={initialData.gender || ""}>
                <SelectTrigger className="bg-[#062214] border-[#2A5432] text-white focus:ring-[#76A771]">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent className="bg-[#062214] border-[#2A5432] text-white">
                  <SelectItem value="Feminino">Feminino</SelectItem>
                  <SelectItem value="Masculino">Masculino</SelectItem>
                  <SelectItem value="Outro">Prefiro não dizer / Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Profissão
              </Label>
              <Input 
                 name="occupation" 
                 defaultValue={initialData.occupation || ""} 
                 placeholder="Ex: Designer" 
                 className="bg-[#062214] border-[#2A5432] text-white focus-visible:ring-[#76A771]"
              />
            </div>
          </CardContent>
        </Card>

        {/* COLUNA DIREITA: ENDEREÇO */}
        <Card className="bg-[#0A311D]/40 border-[#2A5432]/30 h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white text-lg">
              <MapPin className="w-5 h-5 text-[#76A771]" /> Localização
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <div className="space-y-2">
              <Label className="text-gray-300">Logradouro</Label>
              <Input 
                 name="address" 
                 defaultValue={initialData.address || ""} 
                 placeholder="Rua, Número, Complemento" 
                 className="bg-[#062214] border-[#2A5432] text-white focus-visible:ring-[#76A771]"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label className="text-gray-300">Cidade</Label>
                  <Input 
                     name="city" 
                     defaultValue={initialData.city || ""} 
                     className="bg-[#062214] border-[#2A5432] text-white focus-visible:ring-[#76A771]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-300">UF</Label>
                  <Input 
                     name="state" 
                     maxLength={2} 
                     defaultValue={initialData.state || ""} 
                     placeholder="SP" 
                     className="bg-[#062214] border-[#2A5432] text-white focus-visible:ring-[#76A771] text-center uppercase"
                  />
                </div>
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="flex justify-end pt-4 border-t border-[#2A5432]/30">
        <Button 
           type="submit" 
           className="btn-gradient w-full md:w-auto md:px-10 h-12 text-lg font-bold shadow-xl shadow-[#76A771]/10" 
           disabled={loading}
        >
          {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
          Salvar Alterações
        </Button>
      </div>
    </form>
  );
}