"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Video, 
  GripVertical, 
  Image as ImageIcon,
  Upload,
  FileText
} from "lucide-react";
import { upsertCourse, deleteCourse, uploadCourseImage } from "@/actions/courses";
import { MaterialUploadForm } from "@/components/dashboard/courses/material-upload-form";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// --- TIPAGEM ---

type Lesson = {
  id?: string;
  tempId?: string; // Para controle de chave no frontend
  title: string;
  videoUrl: string;
  order: number;
};

type Module = {
  id?: string;
  tempId?: string; // Para controle de chave no frontend
  title: string;
  order: number;
  lessons: Lesson[];
  materials?: { id: string; title: string; url: string }[];
};

type CourseForm = {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  active: boolean;
  price: number;
  modules: Module[];
};

// --- COMPONENTE ---

export function CoursesManager({ courses }: { courses: any[] }) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseForm | null>(null);
  
  // Controle de imagem
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Estado inicial limpo
  const initialForm: CourseForm = {
    title: "",
    description: "",
    imageUrl: "",
    active: true,
    price: 0,
    modules: []
  };

  const [formData, setFormData] = useState<CourseForm>(initialForm);

  // --- HANDLERS PRINCIPAIS ---

  const handleOpen = (course?: any) => {
    setSelectedImageFile(null); 
    
    if (course) {
      setEditingCourse(course);
      
      // Sanitização Profunda: Garante que nulls virem strings vazias e cria tempIds
      const cleanModules: Module[] = (course.modules || []).map((m: any) => ({
        id: m.id,
        tempId: m.id, // Usa o ID do banco como tempId se existir
        title: m.title ?? "",
        order: m.order ?? 0,
        materials: m.materials || [],
        lessons: (m.lessons || []).map((l: any) => ({
          id: l.id,
          tempId: l.id,
          title: l.title ?? "",
          videoUrl: l.videoUrl ?? "",
          order: l.order ?? 0
        }))
      }));

      setFormData({
        id: course.id,
        title: course.title ?? "",
        description: course.description ?? "",
        imageUrl: course.imageUrl ?? "",
        active: !!course.active,
        price: Number(course.price) || 0,
        modules: cleanModules
      });
      setImagePreview(course.imageUrl || null);
    } else {
      setEditingCourse(null);
      setFormData(initialForm);
      setImagePreview(null);
    }
    setIsOpen(true);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setSelectedImageFile(file);
        const url = URL.createObjectURL(file);
        setImagePreview(url);
    }
  };

  const handleSave = async () => {
    startTransition(async () => {
      let finalImageUrl = formData.imageUrl;

      // 1. Upload da Imagem (se houver nova)
      if (selectedImageFile) {
        const uploadForm = new FormData();
        uploadForm.append("file", selectedImageFile);
        
        const uploadRes = await uploadCourseImage(uploadForm);
        if (uploadRes.success && uploadRes.url) {
            finalImageUrl = uploadRes.url;
        } else {
            toast.error("Erro ao fazer upload da imagem.");
            return; 
        }
      }

      // 2. Preparar payload (remover tempIds se necessário, mas o backend ignora campos extras geralmente)
      // O importante é garantir a estrutura correta
      const dataToSave = { 
        ...formData, 
        imageUrl: finalImageUrl,
        // Limpeza final antes de enviar
        modules: formData.modules.map(m => ({
            ...m,
            lessons: m.lessons.map(l => ({
                ...l,
                videoUrl: l.videoUrl || "" // Garante string
            }))
        }))
      };
      
      const res = await upsertCourse(dataToSave);
      
      if (res.success) {
        toast.success(res.success);
        setIsOpen(false);
      } else {
        toast.error(res.error);
      }
    });
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Tem certeza? Isso apagará todo o conteúdo do curso.")) return;
    startTransition(async () => {
       const res = await deleteCourse(id);
       if(res.success) toast.success("Curso removido.");
       else toast.error(res.error);
    });
  };

  // --- GESTÃO DE ESTADO (MÓDULOS & AULAS) ---
  // Refatorado para evitar mutação direta e uso de índices como chaves

  const addModule = () => {
    setFormData(prev => ({
      ...prev,
      modules: [
        ...prev.modules, 
        { 
          tempId: `new-mod-${crypto.randomUUID()}`, // Chave única para o React
          title: "Novo Módulo", 
          order: prev.modules.length, 
          lessons: [] 
        }
      ]
    }));
  };

  const updateModule = (index: number, value: string) => {
    setFormData(prev => {
        const newModules = [...prev.modules];
        newModules[index] = { ...newModules[index], title: value };
        return { ...prev, modules: newModules };
    });
  };

  const removeModule = (index: number) => {
    setFormData(prev => ({ 
        ...prev, 
        modules: prev.modules.filter((_, i) => i !== index) 
    }));
  };

  const addLesson = (moduleIndex: number) => {
    setFormData(prev => {
        const newModules = [...prev.modules];
        const targetModule = { ...newModules[moduleIndex] };
        
        targetModule.lessons = [
            ...targetModule.lessons,
            {
                tempId: `new-lesson-${crypto.randomUUID()}`,
                title: "Nova Aula",
                videoUrl: "",
                order: targetModule.lessons.length
            }
        ];
        
        newModules[moduleIndex] = targetModule;
        return { ...prev, modules: newModules };
    });
  };

  const updateLesson = (modIndex: number, lessonIndex: number, field: keyof Lesson, value: any) => {
    setFormData(prev => {
        const newModules = [...prev.modules];
        const targetModule = { ...newModules[modIndex] };
        const newLessons = [...targetModule.lessons];
        
        newLessons[lessonIndex] = {
            ...newLessons[lessonIndex],
            [field]: value
        };

        targetModule.lessons = newLessons;
        newModules[modIndex] = targetModule;
        return { ...prev, modules: newModules };
    });
  };

  const removeLesson = (modIndex: number, lessonIndex: number) => {
    setFormData(prev => {
        const newModules = [...prev.modules];
        const targetModule = { ...newModules[modIndex] };
        targetModule.lessons = targetModule.lessons.filter((_, i) => i !== lessonIndex);
        newModules[modIndex] = targetModule;
        return { ...prev, modules: newModules };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Gestão de Cursos</h1>
          <p className="text-gray-400">Gerencie conteúdo, preços e materiais.</p>
        </div>
        <Button onClick={() => handleOpen()} className="bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a]">
          <Plus className="w-4 h-4 mr-2" /> Criar Curso
        </Button>
      </div>

      {/* --- LISTA DE CURSOS --- */}
      <div className="grid gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="bg-[#0A311D]/50 border-[#2A5432]/30 overflow-hidden">
            {course.imageUrl && (
                <div className="relative h-40 w-full bg-black/20">
                    <Image src={course.imageUrl} alt={course.title} fill className="object-cover opacity-80" />
                </div>
            )}
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-white text-lg">{course.title}</CardTitle>
                <CardDescription className="text-gray-400 mt-1 line-clamp-1">{course.description || "Sem descrição"}</CardDescription>
                <div className="flex gap-2 mt-2">
                    <Badge variant={course.active ? "default" : "destructive"} className={course.active ? "bg-[#76A771] text-[#062214]" : ""}>
                        {course.active ? "Ativo" : "Inativo"}
                    </Badge>
                    {course.price > 0 && (
                        <Badge variant="outline" className="border-[#76A771] text-[#76A771]">
                            R$ {Number(course.price).toFixed(2)}
                        </Badge>
                    )}
                </div>
              </div>
              <div className="flex gap-1 bg-black/40 rounded p-1 backdrop-blur-sm z-10">
                <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white" onClick={() => handleOpen(course)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => handleDelete(course.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
               {/* ÁREA DE MATERIAIS */}
               <div className="mt-4 border-t border-[#2A5432]/30 pt-4">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                     <FileText className="w-4 h-4" /> Materiais & Downloads
                  </h3>
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    {course.modules.map((module: any) => (
                      <AccordionItem key={module.id} value={module.id} className="border-[#2A5432]/30 bg-[#062214]/30 rounded-lg px-2">
                        <AccordionTrigger className="hover:no-underline py-2 text-sm text-gray-300">
                           {module.title}
                           <Badge variant="secondary" className="ml-2 bg-[#2A5432] text-[10px] h-5">
                              {module.materials?.length || 0} arq
                           </Badge>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-4 px-2 space-y-3">
                           <div className="grid grid-cols-1 gap-2">
                              {module.materials?.map((mat: any) => (
                                 <div key={mat.id} className="flex items-center justify-between p-2 rounded bg-[#062214] border border-[#2A5432]/20 text-xs">
                                    <span className="truncate text-gray-300 flex-1">{mat.title}</span>
                                    <a href={mat.url} target="_blank" className="ml-2 text-[#76A771] hover:underline">Baixar</a>
                                 </div>
                              ))}
                              {(!module.materials || module.materials.length === 0) && (
                                <span className="text-gray-500 text-[10px]">Sem materiais.</span>
                              )}
                           </div>
                           
                           {/* Dialog de Upload de Material */}
                           <Dialog>
                               <DialogTrigger asChild>
                                  <Button size="sm" variant="outline" className="w-full border-dashed border-[#2A5432] text-xs h-8">
                                     <Upload className="w-3 h-3 mr-2" /> Adicionar Material
                                  </Button>
                               </DialogTrigger>
                               <DialogContent className="bg-[#0A311D] border-[#2A5432] text-white">
                                  <DialogHeader>
                                    <DialogTitle>Upload de Material</DialogTitle>
                                    <CardDescription>Adicione PDFs, documentos ou imagens a este módulo.</CardDescription>
                                  </DialogHeader>
                                  <MaterialUploadForm moduleId={module.id} />
                               </DialogContent>
                           </Dialog>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- MODAL DE CRIAÇÃO/EDIÇÃO --- */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-[#062214] border-[#2A5432] text-white">
          <DialogHeader>
            <DialogTitle>{editingCourse ? "Editar Curso" : "Criar Novo Curso"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            
            {/* 1. CONFIGURAÇÕES GERAIS */}
            <div className="p-4 rounded-xl border border-[#2A5432]/50 bg-[#0A311D]/20 space-y-4">
                <h4 className="text-sm font-bold text-[#76A771] uppercase tracking-wider">Informações Básicas</h4>
                
                <div className="flex gap-4 items-start">
                    <div className="relative w-32 h-20 bg-black/40 rounded-lg border border-[#2A5432] flex items-center justify-center overflow-hidden shrink-0">
                        {imagePreview ? (
                            <Image src={imagePreview} alt="Capa" fill className="object-cover" />
                        ) : (
                            <ImageIcon className="w-8 h-8 text-gray-600" />
                        )}
                    </div>
                    <div className="flex-1 space-y-2">
                        <Label>Capa do Curso</Label>
                        <Input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="bg-[#0A311D] border-[#2A5432] text-xs file:bg-[#2A5432] file:text-white file:border-0 file:rounded-md file:mr-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Título do Curso</Label>
                        <Input 
                            value={formData.title ?? ""} // 👈 Proteção contra null
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="bg-[#0A311D] border-[#2A5432]" 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Preço (R$)</Label>
                        <Input 
                            type="number" 
                            value={formData.price ?? 0} 
                            onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                            className="bg-[#0A311D] border-[#2A5432]" 
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Descrição</Label>
                    <Textarea 
                        value={formData.description ?? ""} 
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="bg-[#0A311D] border-[#2A5432] h-20" 
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Switch 
                        checked={!!formData.active} 
                        onCheckedChange={(c) => setFormData({...formData, active: c})} 
                    />
                    <Label>Curso Ativo (Visível para alunos)</Label>
                </div>
            </div>

            {/* 2. ESTRUTURA */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-[#76A771] uppercase tracking-wider">Estrutura (Módulos e Aulas)</h4>
                    <Button size="sm" onClick={addModule} variant="secondary" className="bg-[#2A5432] text-white hover:bg-[#366b42]">
                        <Plus className="w-4 h-4 mr-2" /> Adicionar Módulo
                    </Button>
                </div>

                <Accordion type="multiple" className="space-y-2">
                    {formData.modules.map((module, mIndex) => {
                        // Usar tempId ou id como chave estável, NUNCA o index
                        const moduleKey = module.id || module.tempId || `mod-${mIndex}`;
                        
                        return (
                        <AccordionItem key={moduleKey} value={moduleKey} className="border border-[#2A5432] rounded-lg bg-[#0A311D]/30 px-2">
                            <div className="flex items-center gap-2 py-2">
                                <GripVertical className="w-4 h-4 text-gray-600 cursor-grab" />
                                <AccordionTrigger className="hover:no-underline py-2 flex-1 data-[state=open]:text-[#76A771]">
                                    <Input 
                                        value={module.title ?? ""} // 👈 Proteção contra null
                                        onChange={(e) => updateModule(mIndex, e.target.value)}
                                        className="h-9 bg-transparent border-transparent hover:border-[#2A5432] focus:bg-[#062214] text-white font-bold w-full max-w-sm"
                                        onClick={(e) => e.stopPropagation()} 
                                    />
                                </AccordionTrigger>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:bg-red-900/20" onClick={() => removeModule(mIndex)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>

                            <AccordionContent className="pl-4 pr-2 pb-4 border-t border-[#2A5432]/30 pt-4">
                                <div className="space-y-3">
                                    {module.lessons.map((lesson, lIndex) => {
                                        const lessonKey = lesson.id || lesson.tempId || `lesson-${lIndex}`;

                                        return (
                                        <div key={lessonKey} className="flex flex-col gap-2 p-3 rounded bg-[#062214] border border-[#2A5432]/50">
                                            <div className="flex items-center gap-2">
                                                <div className="bg-[#2A5432]/20 p-1.5 rounded text-[#76A771]">
                                                    <Video className="w-3.5 h-3.5" />
                                                </div>
                                                <Input 
                                                    placeholder="Título da Aula"
                                                    value={lesson.title ?? ""} // 👈 Proteção contra null
                                                    onChange={(e) => updateLesson(mIndex, lIndex, "title", e.target.value)}
                                                    className="h-8 bg-[#0A311D] border-[#2A5432] text-white flex-1 font-medium"
                                                />
                                                <Button size="icon" variant="ghost" className="h-7 w-7 text-red-400 hover:bg-red-900/20" onClick={() => removeLesson(mIndex, lIndex)}>
                                                    <Trash2 className="w-3 h-3" />
                                                </Button>
                                            </div>
                                            <div className="flex items-center gap-2 pl-8">
                                                <Input 
                                                    placeholder="Link do Vídeo (YouTube, Vimeo...)"
                                                    value={lesson.videoUrl ?? ""} // 👈 Proteção contra null
                                                    onChange={(e) => updateLesson(mIndex, lIndex, "videoUrl", e.target.value)}
                                                    className="h-7 text-xs bg-[#0A311D]/50 border-[#2A5432]/30 text-gray-400 focus:text-white"
                                                />
                                            </div>
                                        </div>
                                    )})}
                                    <Button size="sm" variant="ghost" className="w-full border border-dashed border-[#2A5432] text-gray-400 hover:text-white" onClick={() => addLesson(mIndex)}>
                                        <Plus className="w-3 h-3 mr-2" /> Adicionar Aula
                                    </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )})}
                </Accordion>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">Cancelar</Button>
            <Button onClick={handleSave} className="bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a]" disabled={isPending}>
              {isPending ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}