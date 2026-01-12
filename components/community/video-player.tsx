"use client";

interface VideoPlayerProps {
  url: string;
  title: string;
}

export function VideoPlayer({ url, title }: VideoPlayerProps) {
  if (!url) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-400">
        <p>Vídeo indisponível</p>
      </div>
    );
  }

  // Lógica simples para detectar YouTube (pode ser melhorada com regex se necessário)
  const isYoutube = url.includes("youtube.com") || url.includes("youtu.be");

  if (isYoutube) {
    // Extrair ID simples ou usar URL embed direta se o admin já salvar assim
    // Assumindo que o admin salva o link normal, precisaríamos converter.
    // Para simplificar, vamos assumir que o admin coloca o link "embed" ou usamos um iframe genérico
    const embedUrl = url.replace("watch?v=", "embed/"); 
    
    return (
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full absolute top-0 left-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  // Player Nativo (Vercel Blob, S3, MP4 direto)
  return (
    <video 
      src={url} 
      controls 
      className="w-full h-full absolute top-0 left-0"
      poster="/placeholder-video.png" // Opcional
    >
      Seu navegador não suporta a reprodução de vídeos.
    </video>
  );
}