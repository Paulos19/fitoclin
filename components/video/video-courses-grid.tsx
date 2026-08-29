"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Calendar, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { utcToSaoPaulo } from "@/lib/timezone";
import { motion } from "framer-motion";

interface VideoCourse {
  id: string;
  title: string;
  description: string | null;
  youtubeUrl: string;
  coverImageUrl: string | null;
  releaseAt: Date;
  order: number;
  active: boolean;
}

interface Props {
  videos: VideoCourse[];
  now?: string; // ISO date string from server
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : null;
}

function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
}

function getYouTubeEmbed(url: string): string | null {
  const id = getYouTubeId(url);
  return id
    ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
    : null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function VideoCoursesGrid({ videos, now }: Props) {
  const [selectedVideo, setSelectedVideo] = useState<VideoCourse | null>(null);

  const nowDate = now ? new Date(now) : new Date();

  // Separar vídeos em disponíveis e bloqueados
  const available = videos.filter(
    (v) => utcToSaoPaulo(new Date(v.releaseAt)) <= nowDate
  );
  const locked = videos.filter(
    (v) => utcToSaoPaulo(new Date(v.releaseAt)) > nowDate
  );

  return (
    <>
      {/* Vídeos Disponíveis */}
      {available.length > 0 && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {available.map((video) => {
            const thumbnail =
              video.coverImageUrl || getYouTubeThumbnail(video.youtubeUrl);
            const videoSP = utcToSaoPaulo(new Date(video.releaseAt));

            return (
              <motion.div
                key={video.id}
                variants={itemVariants}
                className="group relative bg-[#0A311D]/50 border border-[#2A5432] rounded-2xl overflow-hidden hover:border-[#76A771] hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#76A771]/10"
                onClick={() => setSelectedVideo(video)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-[#062214] overflow-hidden">
                  {thumbnail ? (
                    <Image
                      src={thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Play className="w-12 h-12 text-gray-600" />
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A311D] via-transparent to-transparent opacity-60" />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-[#76A771]/90 flex items-center justify-center shadow-2xl shadow-[#76A771]/30 backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-7 h-7 text-[#062214] ml-1" />
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 right-3">
                    <div className="px-2.5 py-1 rounded-full bg-[#062214]/80 backdrop-blur-md border border-white/10 text-xs font-medium text-white flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Assistir
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-white text-base leading-tight mb-1.5 group-hover:text-[#76A771] transition-colors line-clamp-2">
                    {video.title}
                  </h3>

                  {video.description && (
                    <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-2">
                      {video.description}
                    </p>
                  )}

                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5 text-[#76A771]" />
                    {format(videoSP, "dd 'de' MMMM, yyyy", { locale: ptBR })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Vídeos Bloqueados (em breve) */}
      {locked.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#2A5432]/50 to-transparent" />
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#2A5432]/20 border border-[#2A5432]/30">
              <Lock className="w-4 h-4 text-yellow-500/80" />
              <span className="text-sm font-semibold text-gray-400">
                Em Breve
              </span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#2A5432]/50 to-transparent" />
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {locked.map((video) => {
              const thumbnail =
                video.coverImageUrl || getYouTubeThumbnail(video.youtubeUrl);
              const videoSP = utcToSaoPaulo(new Date(video.releaseAt));

              return (
                <motion.div
                  key={video.id}
                  variants={itemVariants}
                  className="group relative bg-[#0A311D]/30 border border-[#2A5432]/40 rounded-2xl overflow-hidden opacity-75 hover:opacity-90 transition-all duration-300"
                >
                  {/* Thumbnail with blur and lock */}
                  <div className="relative aspect-video bg-[#062214] overflow-hidden">
                    {thumbnail ? (
                      <Image
                        src={thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover blur-sm scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Play className="w-12 h-12 text-gray-700" />
                      </div>
                    )}

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-[#062214]/60" />

                    {/* Lock icon center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#062214]/80 backdrop-blur-md border border-yellow-500/20 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-yellow-500/80" />
                      </div>
                    </div>

                    {/* Release date badge */}
                    <div className="absolute top-3 right-3">
                      <div className="px-2.5 py-1 rounded-full bg-yellow-500/10 backdrop-blur-md border border-yellow-500/20 text-xs font-medium text-yellow-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Em breve
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-gray-300 text-base leading-tight mb-1.5 line-clamp-2">
                      {video.title}
                    </h3>

                    {video.description && (
                      <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
                        {video.description}
                      </p>
                    )}

                    <div className="flex items-center gap-1.5 text-xs">
                      <Calendar className="w-3.5 h-3.5 text-yellow-500/60" />
                      <span className="text-yellow-500/70">
                        Disponível em{" "}
                        {format(videoSP, "dd/MM/yyyy", { locale: ptBR })}
                      </span>
                      <span className="text-gray-600 mx-1">·</span>
                      <span className="text-gray-500">
                        {formatDistanceToNow(videoSP, {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}

      {/* Player Dialog */}
      <Dialog
        open={!!selectedVideo}
        onOpenChange={(open) => !open && setSelectedVideo(null)}
      >
        <DialogContent className="bg-[#062214] border-[#2A5432] max-w-4xl p-0 overflow-hidden gap-0">
          {/* Player */}
          <div className="relative aspect-video bg-black">
            {selectedVideo && getYouTubeEmbed(selectedVideo.youtubeUrl) ? (
              <iframe
                src={getYouTubeEmbed(selectedVideo.youtubeUrl)!}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Vídeo não disponível
              </div>
            )}
          </div>

          {/* Info */}
          {selectedVideo && (
            <div className="p-6">
              <DialogTitle className="text-white text-xl font-bold mb-2">
                {selectedVideo.title}
              </DialogTitle>

              {selectedVideo.description && (
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {selectedVideo.description}
                </p>
              )}

              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5 text-[#76A771]" />
                Disponível desde{" "}
                {format(
                  utcToSaoPaulo(new Date(selectedVideo.releaseAt)),
                  "dd/MM/yyyy 'às' HH:mm",
                  { locale: ptBR }
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
