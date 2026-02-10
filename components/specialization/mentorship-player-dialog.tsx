"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function MentorshipPlayerDialog({ mentorship, children }: { mentorship: any, children: React.ReactNode }) {
    
  const getEmbedUrl = (url: string) => {
    if (mentorship.sourceType === "UPLOAD") return url;
    
    // Converter link normal do YT para Embed
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const id = (match && match[2].length === 11) ? match[2] : null;
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : url;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-[#062214] border-purple-500/20 p-0 overflow-hidden">
        <div className="aspect-video w-full bg-black">
            {mentorship.sourceType === "YOUTUBE" ? (
                <iframe 
                    src={getEmbedUrl(mentorship.videoUrl)} 
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                />
            ) : (
                <video controls className="w-full h-full" src={mentorship.videoUrl} autoPlay />
            )}
        </div>
        <div className="p-6">
            <DialogHeader>
                <DialogTitle className="text-xl text-white">{mentorship.title}</DialogTitle>
                <div className="text-sm text-purple-300">
                    Realizada em {format(new Date(mentorship.date), "PPP", { locale: ptBR })}
                </div>
            </DialogHeader>
            <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                {mentorship.description}
            </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}