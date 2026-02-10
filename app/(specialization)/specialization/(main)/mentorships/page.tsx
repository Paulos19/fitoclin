import { auth } from "@/auth";
import { getMentorships } from "@/actions/mentorships";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Lock, PlayCircle, Calendar, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MentorshipPlayerDialog } from "@/components/specialization/mentorship-player-dialog";

export default async function SpecializationMentorshipsPage() {
  const session = await auth();
  if (!session) return redirect("/login");

  // Verificar Permissão
  const subscription = await db.subscription.findUnique({ where: { userId: session.user.id } });
  const hasAccess = 
    session.user.role === "ADMIN" || 
    subscription?.plan === "SPECIALIZATION" ||
    session.user.email === "admin@fitoclin.com";

  const mentorships = await getMentorships();

  if (!hasAccess) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center p-8">
            <div className="bg-purple-500/10 p-6 rounded-full border border-purple-500/20">
                <Lock className="w-12 h-12 text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">Mentorias Exclusivas</h1>
            <p className="text-gray-400 max-w-md">
              Acesso às gravações das mentorias ao vivo com Dra. Isa.
              Faça o upgrade para o plano Especialização.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Fazer Upgrade
            </Button>
        </div>
    );
  }

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-purple-500/10 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <Video className="w-6 h-6 text-purple-400" />
            </div>
            Mentorias Gravadas
        </h1>
        <p className="text-gray-400 mt-2">
            Reveja os encontros ao vivo, tire dúvidas e aprofunde seus estudos.
        </p>
      </div>

      {mentorships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentorships.map((m) => (
                <Card key={m.id} className="bg-[#0A311D]/40 border-purple-500/20 overflow-hidden hover:border-purple-500/40 transition-all group">
                    <div className="aspect-video bg-black/40 relative flex items-center justify-center border-b border-white/5">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A311D] to-transparent opacity-60"></div>
                        {/* Thumbnail Gerada ou Placeholder */}
                        {m.sourceType === "YOUTUBE" ? (
                            <img 
                                src={`https://img.youtube.com/vi/${getYouTubeID(m.videoUrl)}/hqdefault.jpg`} 
                                alt={m.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-purple-900/20" />
                        )}
                        
                        <MentorshipPlayerDialog mentorship={m}>
                            <Button size="icon" className="w-14 h-14 rounded-full bg-purple-600/90 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/40 z-10 transition-transform group-hover:scale-110">
                                <PlayCircle className="w-8 h-8 fill-current" />
                            </Button>
                        </MentorshipPlayerDialog>
                    </div>
                    <CardContent className="p-5">
                        <div className="flex items-center gap-2 text-xs text-purple-300 font-medium mb-2 uppercase tracking-wide">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(m.date), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                        </div>
                        <h3 className="text-lg font-bold text-white leading-tight mb-2 group-hover:text-purple-300 transition-colors">
                            {m.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2">
                            {m.description || "Sem descrição disponível."}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
            Nenhuma mentoria gravada disponível ainda.
        </div>
      )}
    </div>
  );
}

// Helper para extrair ID do Youtube
function getYouTubeID(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}