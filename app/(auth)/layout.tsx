import Image from "next/image";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Lado Esquerdo - Conteúdo (Formulários) */}
      <div className="flex flex-col items-center justify-center p-8 bg-background relative">
        
        {/* Logo Mobile / Topo */}
        <div className="absolute top-8 left-8 lg:top-12 lg:left-12">
           <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-[#2A5432]/10 p-2 rounded-full group-hover:bg-[#2A5432]/20 transition-colors">
                <Leaf className="w-5 h-5 text-[#2A5432]" />
              </div>
              <span className="text-xl font-bold text-[#2A5432]">Fitoclin</span>
           </Link>
        </div>

        <div className="w-full max-w-[400px] mt-12 lg:mt-0">
          {children}
        </div>

        <div className="mt-8 text-xs text-muted-foreground">
          &copy; 2025 Fitoclin. Todos os direitos reservados.
        </div>
      </div>

      {/* Lado Direito - Banner Institucional (Fixo) */}
      <div className="hidden lg:block relative bg-[#062214]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#062214] via-[#062214]/40 to-transparent z-10" />
        
        <Image 
          src="/1.png" // Certifique-se que essa imagem existe em /public
          alt="Ambiente Fitoclin"
          fill
          className="object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-1000"
          priority
        />
        
        <div className="relative z-20 flex flex-col justify-end h-full p-16 text-white pb-24">
          <div className="space-y-4 max-w-lg">
            <div className="w-12 h-1 bg-[#76A771] rounded-full mb-6" />
            <h2 className="text-3xl font-bold leading-tight">
              "A verdadeira cura começa quando olhamos para a natureza dentro de nós."
            </h2>
            <div className="flex items-center gap-4 pt-4">
               <div className="h-10 w-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                 <Leaf className="w-5 h-5 text-[#76A771]" />
               </div>
               <div>
                  <p className="font-semibold text-[#76A771]">Dra. Isa</p>
                  <p className="text-sm text-gray-400">Diretora Clínica</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}