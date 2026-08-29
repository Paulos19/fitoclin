"use client";

import React, { useState, useTransition, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Edit2,
  Play,
  Calendar as CalendarIcon,
  Clock,
  Eye,
  EyeOff,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  upsertVideoCourse,
  deleteVideoCourse,
  uploadVideoCourseCover,
} from "@/actions/video-courses";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { utcToSaoPaulo } from "@/lib/timezone";

interface VideoCourse {
  id: string;
  title: string;
  description: string | null;
  youtubeUrl: string;
  coverImageUrl: string | null;
  releaseAt: Date;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  videos: VideoCourse[];
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : null;
}

function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

export function VideoCoursesManager({ videos }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [releaseAtDate, setReleaseAtDate] = useState("");
  const [releaseAtTime, setReleaseAtTime] = useState("12:00");
  const [order, setOrder] = useState(0);
  const [active, setActive] = useState(true);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null);

  function resetForm() {
    setEditId(null);
    setTitle("");
    setDescription("");
    setYoutubeUrl("");
    const today = new Date().toISOString().split("T")[0];
    setReleaseAtDate(today);
    setReleaseAtTime("12:00");
    setOrder(0);
    setActive(true);
    setCoverPreview(null);
    setCoverImageUrl(null);
    setSelectedCoverFile(null);
  }

  function handleOpen(video?: VideoCourse) {
    if (video) {
      setEditId(video.id);
      setTitle(video.title);
      setDescription(video.description || "");
      setYoutubeUrl(video.youtubeUrl);
      // Converter UTC para SP para exibir no form
      const spDate = utcToSaoPaulo(new Date(video.releaseAt));
      setReleaseAtDate(format(spDate, "yyyy-MM-dd"));
      setReleaseAtTime(format(spDate, "HH:mm"));
      setOrder(video.order);
      setActive(video.active);
      setCoverPreview(video.coverImageUrl);
      setCoverImageUrl(video.coverImageUrl);
      setSelectedCoverFile(null);
    } else {
      resetForm();
    }
    setIsOpen(true);
  }

  async function handleSave() {
    if (!title.trim()) {
      toast.error("Título é obrigatório.");
      return;
    }
    if (!youtubeUrl.trim()) {
      toast.error("URL do YouTube é obrigatória.");
      return;
    }
    if (!releaseAtDate) {
      toast.error("Data de lançamento é obrigatória.");
      return;
    }

    startTransition(async () => {
      // Upload da capa se houver um novo arquivo
      let finalCoverUrl = coverImageUrl;
      if (selectedCoverFile) {
        const formData = new FormData();
        formData.append("file", selectedCoverFile);
        const uploadResult = await uploadVideoCourseCover(formData);
        if (uploadResult && "error" in uploadResult) {
          toast.error(uploadResult.error);
          return;
        }
        if (uploadResult && "url" in uploadResult) {
          finalCoverUrl = uploadResult.url;
        }
      }

      // Combinar data e hora (horário de SP)
      const releaseAtISO = `${releaseAtDate}T${releaseAtTime}:00`;

      const result = await upsertVideoCourse({
        id: editId || undefined,
        title,
        description,
        youtubeUrl,
        coverImageUrl: finalCoverUrl || undefined,
        releaseAt: releaseAtISO,
        order,
        active,
      });

      if (result && "error" in result) {
        toast.error(result.error);
      } else {
        toast.success(editId ? "Vídeo atualizado!" : "Vídeo criado!");
        setIsOpen(false);
        resetForm();
      }
    });
  }

  function handleDelete(video: VideoCourse) {
    if (!confirm(`Excluir o vídeo "${video.title}"?`)) return;

    startTransition(async () => {
      const result = await deleteVideoCourse(video.id, video.coverImageUrl);
      if (result && "error" in result) {
        toast.error(result.error);
      } else {
        toast.success("Vídeo excluído!");
      }
    });
  }

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  return (
    <>
      {/* Header com botão de adicionar */}
      <div className="flex justify-end">
        <Button
          onClick={() => handleOpen()}
          className="bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Vídeo
        </Button>
      </div>

      {/* Grid de vídeos */}
      {videos.length === 0 ? (
        <div className="border-2 border-dashed border-[#2A5432]/30 rounded-xl p-12 text-center">
          <Play className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Nenhum vídeo cadastrado.</p>
          <p className="text-gray-500 text-sm mt-1">
            Clique em &quot;Novo Vídeo&quot; para adicionar.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => {
            const thumbnail =
              video.coverImageUrl || getYouTubeThumbnail(video.youtubeUrl);
            const videoSP = utcToSaoPaulo(new Date(video.releaseAt));
            const isAvailable = new Date() >= videoSP;

            return (
              <Card
                key={video.id}
                className="bg-[#0A311D]/50 border-[#2A5432]/30 overflow-hidden"
              >
                {/* Thumbnail */}
                {thumbnail ? (
                  <div className="relative aspect-video">
                    <Image
                      src={thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-[#062214] flex items-center justify-center">
                    <Play className="w-10 h-10 text-gray-500" />
                  </div>
                )}

                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-white text-sm leading-tight">
                      {video.title}
                    </CardTitle>
                    <Badge
                      variant={video.active ? "default" : "secondary"}
                      className={
                        video.active
                          ? "bg-[#76A771]/20 text-[#76A771] shrink-0"
                          : "bg-gray-500/20 text-gray-400 shrink-0"
                      }
                    >
                      {video.active ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400 text-xs flex items-center gap-1 mt-1">
                    <CalendarIcon className="w-3 h-3" />
                    {format(videoSP, "dd 'de' MMMM, yyyy 'às' HH:mm", {
                      locale: ptBR,
                    })}
                    {!isAvailable && (
                      <Badge
                        variant="outline"
                        className="border-yellow-500/50 text-yellow-400 text-[10px] ml-1"
                      >
                        Em breve
                      </Badge>
                    )}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  {video.description && (
                    <p className="text-gray-400 text-xs line-clamp-2 mb-3">
                      {video.description}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#2A5432] text-gray-300 hover:bg-[#2A5432]/30"
                      onClick={() => handleOpen(video)}
                      disabled={isPending}
                    >
                      <Edit2 className="w-3 h-3 mr-1" />
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      onClick={() => handleDelete(video)}
                      disabled={isPending}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Dialog de criação/edição */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-[#062214] border-[#2A5432] max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editId ? "Editar Vídeo" : "Novo Vídeo"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Capa */}
            <div>
              <Label className="text-gray-300">Capa do Vídeo</Label>
              <div className="mt-2 flex items-center gap-4">
                {coverPreview && (
                  <div className="relative w-32 aspect-video rounded overflow-hidden bg-[#0A311D]">
                    <Image
                      src={coverPreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#2A5432] text-gray-300"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {coverPreview ? "Trocar Capa" : "Enviar Capa"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Título */}
            <div>
              <Label className="text-gray-300">Título *</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Aula 01 - Introdução à Fitoterapia"
                className="bg-[#0A311D] border-[#2A5432] text-white mt-1"
              />
            </div>

            {/* URL YouTube */}
            <div>
              <Label className="text-gray-300">URL do YouTube *</Label>
              <Input
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="bg-[#0A311D] border-[#2A5432] text-white mt-1"
              />
            </div>

            {/* Descrição */}
            <div>
              <Label className="text-gray-300">Descrição</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição do vídeo (opcional)"
                rows={3}
                className="bg-[#0A311D] border-[#2A5432] text-white mt-1 resize-none"
              />
            </div>

            {/* Data e Hora de Lançamento */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">
                  <CalendarIcon className="w-3 h-3 inline mr-1" />
                  Data de Lançamento *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full bg-[#0A311D] border-[#2A5432] text-white mt-1 justify-start text-left font-normal"
                    >
                      {releaseAtDate
                        ? format(new Date(releaseAtDate + "T12:00:00"), "dd/MM/yyyy", { locale: ptBR })
                        : "Selecionar data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#062214] border-[#2A5432]">
                    <Calendar
                      mode="single"
                      selected={releaseAtDate ? new Date(releaseAtDate + "T12:00:00") : undefined}
                      onSelect={(date) => {
                        if (date) setReleaseAtDate(format(date, "yyyy-MM-dd"));
                      }}
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-[10px] text-gray-500 mt-1">
                  Horário de São Paulo
                </p>
              </div>
              <div>
                <Label className="text-gray-300">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Horário *
                </Label>
                <Input
                  type="time"
                  value={releaseAtTime}
                  onChange={(e) => setReleaseAtTime(e.target.value)}
                  className="bg-[#0A311D] border-[#2A5432] text-white mt-1"
                />
              </div>
            </div>

            {/* Ordem e Ativo */}
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <Label className="text-gray-300">Ordem</Label>
                <Input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  min={0}
                  className="bg-[#0A311D] border-[#2A5432] text-white mt-1"
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Switch
                  checked={active}
                  onCheckedChange={setActive}
                  className="data-[state=checked]:bg-[#76A771]"
                />
                <Label className="text-gray-300">
                  {active ? (
                    <Eye className="w-4 h-4 inline mr-1 text-[#76A771]" />
                  ) : (
                    <EyeOff className="w-4 h-4 inline mr-1 text-gray-400" />
                  )}
                  {active ? "Ativo" : "Inativo"}
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-[#2A5432] text-gray-300"
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a]"
              disabled={isPending}
            >
              {isPending ? "Salvando..." : editId ? "Salvar Alterações" : "Criar Vídeo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
