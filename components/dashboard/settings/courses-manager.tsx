"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { upsertCourse, deleteCourse } from "@/actions/settings";
import { Loader2, Plus, Trash2, Edit2, ExternalLink, Image as ImageIcon, UploadCloud } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import Image from "next/image";

export function CoursesManager({ courses }: { courses: any[] }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h2 className="text-xl font-bold text-white">Cursos Cadastrados</h2>
         <CourseDialog />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <Card key={course.id} className="bg-[#062214] border-[#2A5432]/30 relative group hover:border-[#76A771] transition-all overflow-hidden flex flex-col h-full">
            {/* Imagem do Card */}
            <div className="relative h-40 w-full bg-[#0A311D]">
              {course.imageUrl ? (
                <Image 
                  src={course.imageUrl} 
                  alt={course.title} 
                  fill 
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                />
              ) : (
                <div className="flex items-center justify-center h-full text-[#2A5432]">
                   <ImageIcon className="w-12 h-12 opacity-20" />
                </div>
              )}
              {/* Overlay de Edição Rápida */}
              <div className="absolute top-2 right-2">
                 <CourseDialog course={course} isEdit />
              </div>
            </div>

            <CardContent className="pt-4 flex-1 flex flex-col">
               <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{course.title}</h3>
               <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">{course.description}</p>
               
               <div className="flex justify-between items-end border-t border-[#2A5432]/30 pt-4 mt-auto">
                  <span className="text-[#76A771] font-bold text-lg">{course.price || "Grátis"}</span>
                  <div className="flex gap-2">
                     {course.linkUrl && (
                        <a href={course.linkUrl} target="_blank" className="p-2 rounded-md hover:bg-[#2A5432] text-gray-400 hover:text-white transition-colors">
                           <ExternalLink className="w-4 h-4" />
                        </a>
                     )}
                     <DeleteButton id={course.id} action={deleteCourse} />
                  </div>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CourseDialog({ course, isEdit }: { course?: any, isEdit?: boolean }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Estado para Preview da Imagem
  const [previewUrl, setPreviewUrl] = useState<string | null>(course?.imageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    // Se tivermos imageUrl antiga e nenhuma nova imagem selecionada, o formData já pega o hidden input abaixo
    const res = await upsertCourse(formData, course?.id);
    setLoading(false);
    if (res.error) toast.error(res.error);
    else {
      toast.success(res.success);
      setOpen(false);
      // Opcional: limpar preview se for adicionar novo
      if(!isEdit) setPreviewUrl(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/50 hover:bg-[#76A771] text-white backdrop-blur-sm rounded-full">
            <Edit2 className="w-4 h-4" />
          </Button>
        ) : (
          <Button className="btn-gradient"><Plus className="w-4 h-4 mr-2" /> Novo Curso</Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="bg-[#0A311D] border-[#2A5432] text-white max-h-[90vh] overflow-y-auto custom-scrollbar sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar Curso" : "Adicionar Curso"}</DialogTitle>
        </DialogHeader>
        
        <form action={handleSubmit} className="space-y-4">
          
          {/* UPLOAD DE IMAGEM (THUMBNAIL) */}
          <div className="space-y-2">
            <Label>Capa do Curso</Label>
            {/* Input Hidden para manter a URL antiga se não trocar */}
            <input type="hidden" name="imageUrl" value={course?.imageUrl || ""} />
            
            <div 
               onClick={() => fileInputRef.current?.click()}
               className="relative w-full h-40 bg-[#062214] border-2 border-dashed border-[#2A5432] rounded-lg cursor-pointer hover:border-[#76A771] transition-colors flex flex-col items-center justify-center overflow-hidden group"
            >
               {previewUrl ? (
                 <>
                   <Image src={previewUrl} alt="Preview" fill className="object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                   <div className="relative z-10 flex flex-col items-center">
                      <UploadCloud className="w-8 h-8 text-white mb-1" />
                      <span className="text-xs text-white font-bold shadow-black drop-shadow-md">Trocar Imagem</span>
                   </div>
                 </>
               ) : (
                 <div className="flex flex-col items-center text-gray-500 group-hover:text-[#76A771]">
                   <ImageIcon className="w-8 h-8 mb-2" />
                   <span className="text-xs">Clique para enviar imagem</span>
                 </div>
               )}
               <input 
                 type="file" 
                 name="thumbFile" 
                 ref={fileInputRef} 
                 className="hidden" 
                 accept="image/*"
                 onChange={handleImageChange}
               />
            </div>
          </div>

          <div className="space-y-2">
             <Label>Título</Label>
             <Input name="title" defaultValue={course?.title} required className="bg-[#062214] border-[#2A5432]" placeholder="Ex: Detox 7 Dias" />
          </div>
          
          <div className="space-y-2">
             <Label>Descrição Curta</Label>
             <Textarea name="description" defaultValue={course?.description} required className="bg-[#062214] border-[#2A5432] h-20" placeholder="Resumo atrativo para a vitrine..." />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
               <Label>Preço (Texto)</Label>
               <Input name="price" defaultValue={course?.price} placeholder="R$ 97,00" className="bg-[#062214] border-[#2A5432]" />
            </div>
            <div className="space-y-2">
               <Label>Link de Venda</Label>
               <Input name="linkUrl" defaultValue={course?.linkUrl} placeholder="https://hotmart..." className="bg-[#062214] border-[#2A5432]" />
            </div>
          </div>
          
          <div className="flex items-center gap-2 pt-2">
             <Switch name="active" defaultChecked={course?.active ?? true} />
             <Label>Visível na Home</Label>
          </div>

          <Button type="submit" disabled={loading} className="w-full btn-gradient mt-2">
             {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : "Salvar Curso"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteButton({ id, action }: { id: string, action: any }) {
  const [loading, setLoading] = useState(false);
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-8 w-8 text-red-500 hover:text-red-300 hover:bg-red-900/20"
      disabled={loading}
      onClick={async () => {
         if(!confirm("Tem certeza que deseja remover este curso?")) return;
         setLoading(true);
         await action(id);
         setLoading(false);
      }}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </Button>
  );
}