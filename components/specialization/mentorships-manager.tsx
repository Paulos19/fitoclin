"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Plus, Trash2, Edit2, Video, Youtube, Upload, CalendarIcon, AlertTriangle } from "lucide-react";
import { upsertMentorship, deleteMentorship, uploadMentorshipVideo } from "@/actions/mentorships";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function MentorshipsManager({ mentorships }: { mentorships: any[] }) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  
  // Form States
  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [sourceType, setSourceType] = useState<"YOUTUBE" | "UPLOAD">("YOUTUBE");
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleOpen = (mentorship?: any) => {
    if (mentorship) {
      setId(mentorship.id);
      setTitle(mentorship.title);
      setDescription(mentorship.description || "");
      setDate(new Date(mentorship.date));
      setSourceType(mentorship.sourceType as any);
      setVideoUrl(mentorship.videoUrl);
    } else {
      setId(null);
      setTitle("");
      setDescription("");
      setDate(new Date());
      setSourceType("YOUTUBE");
      setVideoUrl("");
    }
    setSelectedFile(null);
    setIsOpen(true);
  };

  const handleSave = async () => {
    if (!title || !date) {
        toast.error("Preencha os campos obrigatórios.");
        return;
    }

    startTransition(async () => {
      let finalUrl = videoUrl;

      // Lógica de Upload
      if (sourceType === "UPLOAD" && selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const res = await uploadMentorshipVideo(formData);
        if (res.error || !res.url) {
            toast.error(res.error || "Erro no upload");
            return;
        }
        finalUrl = res.url;
      }

      if (!finalUrl) {
        toast.error("Adicione um vídeo ou link.");
        return;
      }

      const res = await upsertMentorship({
        id, title, description, date, sourceType, videoUrl: finalUrl
      });

      if (res.success) {
        toast.success(res.success);
        setIsOpen(false);
      } else {
        toast.error(res.error);
      }
    });
  };

  const handleDelete = async (m: any) => {
    if (!confirm("Tem certeza?")) return;
    startTransition(async () => {
        await deleteMentorship(m.id, m.videoUrl, m.sourceType);
        toast.success("Deletado.");
    });
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <Button onClick={() => handleOpen()} className="bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a]">
            <Plus className="w-4 h-4 mr-2" /> Nova Mentoria
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mentorships.map((m) => (
            <Card key={m.id} className="bg-card">
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div>
                        <CardTitle className="text-lg">{m.title}</CardTitle>
                        <CardDescription>{format(new Date(m.date), "dd 'de' MMMM, yyyy", { locale: ptBR })}</CardDescription>
                    </div>
                    {m.sourceType === "YOUTUBE" ? <Youtube className="w-5 h-5 text-red-500" /> : <Upload className="w-5 h-5 text-blue-500" />}
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 justify-end mt-4">
                        <Button size="sm" variant="outline" onClick={() => handleOpen(m)}>
                            <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(m)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>{id ? "Editar Mentoria" : "Adicionar Mentoria"}</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Título</Label>
                        <Input value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <Label>Data da Mentoria</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className={cn("pl-3 text-left font-normal", !date && "text-muted-foreground")}>
                                    {date ? format(date, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Descrição</Label>
                    <Textarea value={description} onChange={e => setDescription(e.target.value)} />
                </div>

                <div className="space-y-4 border rounded-md p-4 bg-muted/20">
                    <div className="space-y-2">
                        <Label>Fonte do Vídeo</Label>
                        <Select value={sourceType} onValueChange={(v: any) => setSourceType(v)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="YOUTUBE">YouTube (Recomendado para vídeos longos)</SelectItem>
                                <SelectItem value="UPLOAD">Upload Direto (Máx 4.5MB)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {sourceType === "YOUTUBE" ? (
                        <div className="space-y-2 animate-in fade-in">
                            <Label>Link do YouTube</Label>
                            <Input placeholder="https://youtube.com/watch?v=..." value={videoUrl} onChange={e => setVideoUrl(e.target.value)} />
                            <p className="text-xs text-muted-foreground">Cole o link completo do vídeo (pode ser Não Listado).</p>
                        </div>
                    ) : (
                        <div className="space-y-2 animate-in fade-in">
                            <Label>Arquivo de Vídeo</Label>
                            <Input type="file" accept="video/*" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
                            
                            <Alert variant="destructive" className="mt-2 bg-yellow-500/10 border-yellow-500/50 text-yellow-600 dark:text-yellow-400">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Atenção ao Tamanho</AlertTitle>
                                <AlertDescription>
                                    O upload direto tem limite de 4.5MB (limite serverless). 
                                    Para mentorias completas (horas de duração), <strong>use a opção YouTube</strong>.
                                </AlertDescription>
                            </Alert>
                        </div>
                    )}
                </div>
            </div>

            <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
                <Button onClick={handleSave} disabled={isPending}>{isPending ? "Salvando..." : "Salvar"}</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}