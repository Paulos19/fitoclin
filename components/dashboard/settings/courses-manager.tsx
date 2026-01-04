"use client";

import { useState, useTransition } from "react";
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
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
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
  Youtube,
  PlayCircle
} from "lucide-react";
import { upsertCourse, deleteCourse } from "@/actions/settings";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

// Tipos locais para o estado do formulário
type Lesson = {
  id?: string;
  title: string;
  videoUrl: string;
  order: number;
};

type Module = {
  id?: string;
  title: string;
  order: number;
  lessons: Lesson[];
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

export function CoursesManager({ courses }: { courses: any[] }) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseForm | null>(null);

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

  const handleOpen = (course?: any) => {
    if (course) {
      // Edição: Popula o formulário com os dados existentes
      setEditingCourse(course);
      setFormData({
        id: course.id,
        title: course.title,
        description: course.description || "",
        imageUrl: course.imageUrl || "",
        active: course.active,
        price: Number(course.price) || 0,
        modules: course.modules || [] 
      });
    } else {
      // Criação: Limpa o formulário
      setEditingCourse(null);
      setFormData(initialForm);
    }
    setIsOpen(true);
  };

  const handleSave = async () => {
    startTransition(async () => {
      const res = await upsertCourse(formData);
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
       await deleteCourse(id);
       toast.success("Curso removido.");
    });
  };

  // --- Funções de Manipulação de Módulos ---

  const addModule = () => {
    setFormData(prev => ({
      ...prev,
      modules: [...prev.modules, { title: "Novo Módulo", order: prev.modules.length, lessons: [] }]
    }));
  };

  const updateModule = (index: number, value: string) => {
    const newModules = [...formData.modules];
    newModules[index].title = value;
    setFormData(prev => ({ ...prev, modules: newModules }));
  };

  const removeModule = (index: number) => {
    const newModules = formData.modules.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, modules: newModules }));
  };

  // --- Funções de Manipulação de Aulas ---

  const addLesson = (moduleIndex: number) => {
    const newModules = [...formData.modules];
    newModules[moduleIndex].lessons.push({
      title: "Nova Aula",
      videoUrl: "",
      order: newModules[moduleIndex].lessons.length
    });
    setFormData(prev => ({ ...prev, modules: newModules }));
  };

  const updateLesson = (modIndex: number, lessonIndex: number, field: keyof Lesson, value: any) => {
    const newModules = [...formData.modules];
    // @ts-ignore
    newModules[modIndex].lessons[lessonIndex][field] = value;
    setFormData(prev => ({ ...prev, modules: newModules }));
  };

  const removeLesson = (modIndex: number, lessonIndex: number) => {
    const newModules = [...formData.modules];
    newModules[modIndex].lessons = newModules[modIndex].lessons.filter((_, i) => i !== lessonIndex);
    setFormData(prev => ({ ...prev, modules: newModules }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => handleOpen()} className="bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a]">
          <Plus className="w-4 h-4 mr-2" /> Criar Curso
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <Card key={course.id} className="bg-[#0A311D]/50 border-[#2A5432]/30">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-white text-lg">{course.title}</CardTitle>
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
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white" onClick={() => handleOpen(course)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => handleDelete(course.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-400 line-clamp-2 mb-2">{course.description || "Sem descrição."}</p>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                    <Video className="w-3 h-3" />
                    {course.modules?.length || 0} Módulos • {course.modules?.reduce((acc:any, m:any) => acc + m.lessons.length, 0) || 0} Aulas
                </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- MODAL --- */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-[#062214] border-[#2A5432] text-white">
          <DialogHeader>
            <DialogTitle>{editingCourse ? "Editar Curso" : "Criar Novo Curso"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            
            {/* 1. CONFIGURAÇÕES GERAIS */}
            <div className="p-4 rounded-xl border border-[#2A5432]/50 bg-[#0A311D]/20 space-y-4">
                <h4 className="text-sm font-bold text-[#76A771] uppercase tracking-wider">Informações Básicas</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Título do Curso</Label>
                        <Input 
                            value={formData.title} 
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="bg-[#0A311D] border-[#2A5432]" 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Preço (R$)</Label>
                        <Input 
                            type="number" 
                            value={formData.price} 
                            onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                            className="bg-[#0A311D] border-[#2A5432]" 
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Descrição</Label>
                    <Textarea 
                        value={formData.description} 
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="bg-[#0A311D] border-[#2A5432] h-20" 
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Switch 
                        checked={formData.active} 
                        onCheckedChange={(c) => setFormData({...formData, active: c})} 
                    />
                    <Label>Curso Ativo (Visível para alunos)</Label>
                </div>
            </div>

            {/* 2. CONTEÚDO (MÓDULOS) */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-[#76A771] uppercase tracking-wider">Estrutura do Curso</h4>
                    <Button size="sm" onClick={addModule} variant="secondary" className="bg-[#2A5432] text-white hover:bg-[#366b42]">
                        <Plus className="w-4 h-4 mr-2" /> Adicionar Módulo
                    </Button>
                </div>

                <div className="space-y-3">
                    {formData.modules.length === 0 && (
                        <div className="text-center py-8 border-2 border-dashed border-[#2A5432] rounded-lg text-gray-500">
                            Nenhum módulo criado.
                        </div>
                    )}

                    <Accordion type="multiple" className="space-y-2">
                        {formData.modules.map((module, mIndex) => (
                            <AccordionItem key={mIndex} value={`mod-${mIndex}`} className="border border-[#2A5432] rounded-lg bg-[#0A311D]/30 px-2">
                                <div className="flex items-center gap-2 py-2">
                                    <GripVertical className="w-4 h-4 text-gray-600 cursor-grab" />
                                    <AccordionTrigger className="hover:no-underline py-2 flex-1 data-[state=open]:text-[#76A771]">
                                        <Input 
                                            value={module.title} 
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
                                        {module.lessons.map((lesson, lIndex) => (
                                            <div key={lIndex} className="flex flex-col gap-2 p-3 rounded bg-[#062214] border border-[#2A5432]/50 hover:border-[#76A771]/50 transition-colors">
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-[#2A5432]/20 p-1.5 rounded text-[#76A771]">
                                                        <Video className="w-3.5 h-3.5" />
                                                    </div>
                                                    <Input 
                                                        placeholder="Título da Aula"
                                                        value={lesson.title}
                                                        onChange={(e) => updateLesson(mIndex, lIndex, "title", e.target.value)}
                                                        className="h-8 bg-[#0A311D] border-[#2A5432] text-white flex-1 font-medium"
                                                    />
                                                    <Button size="icon" variant="ghost" className="h-7 w-7 text-red-400 hover:bg-red-900/20" onClick={() => removeLesson(mIndex, lIndex)}>
                                                        <Trash2 className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                                
                                                {/* INPUT DE VÍDEO */}
                                                <div className="flex items-center gap-2 pl-8">
                                                    {lesson.videoUrl.includes('youtube') || lesson.videoUrl.includes('youtu.be') ? (
                                                        <Youtube className="w-4 h-4 text-red-500" />
                                                    ) : (
                                                        <PlayCircle className="w-4 h-4 text-blue-400" />
                                                    )}
                                                    <Input 
                                                        placeholder="Link do Vídeo (YouTube, Vimeo, Vercel Blob...)"
                                                        value={lesson.videoUrl}
                                                        onChange={(e) => updateLesson(mIndex, lIndex, "videoUrl", e.target.value)}
                                                        className="h-7 text-xs bg-[#0A311D]/50 border-[#2A5432]/30 text-gray-400 focus:text-white"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        
                                        <Button 
                                            size="sm" 
                                            variant="ghost" 
                                            className="w-full border border-dashed border-[#2A5432] text-gray-400 hover:text-white hover:bg-[#2A5432]/20"
                                            onClick={() => addLesson(mIndex)}
                                        >
                                            <Plus className="w-3 h-3 mr-2" /> Adicionar Aula
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
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