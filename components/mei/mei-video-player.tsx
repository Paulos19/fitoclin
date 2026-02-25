"use client";

export function MeiVideoPlayer({ url, title }: { url: string; title: string }) {
  // Função que converte links normais do YouTube/Vimeo em links de Embed
  const getEmbedUrl = (videoUrl: string) => {
    if (!videoUrl) return "";
    
    // Converte YouTube
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      const videoId = videoUrl.includes("youtu.be") 
        ? videoUrl.split("youtu.be/")[1]?.split("?")[0]
        : videoUrl.split("v=")[1]?.split("&")[0];
      
      // O playsinline=1 previne o fullscreen obrigatório no iOS
      return `https://www.youtube.com/embed/${videoId}?playsinline=1&rel=0&modestbranding=1`;
    }
    
    // Converte Vimeo
    if (videoUrl.includes("vimeo.com")) {
      const videoId = videoUrl.split("vimeo.com/")[1]?.split("?")[0];
      return `https://player.vimeo.com/video/${videoId}?playsinline=1`;
    }

    // Se for URL direta de .mp4 ou outro formato de storage
    return videoUrl;
  };

  const embedUrl = getEmbedUrl(url);

  // Se o link for um .mp4 direto do banco de dados/storage
  if (embedUrl.endsWith(".mp4")) {
    return (
      <video 
        src={embedUrl} 
        controls 
        playsInline 
        className="w-full h-full object-cover"
      />
    );
  }

  // Se for YouTube / Vimeo
  return (
    <iframe
      src={embedUrl}
      title={title || "Video Player"}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full border-0"
    />
  );
}