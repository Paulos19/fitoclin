import { LeadForm } from "./lead-form";
import { Mail, MapPin, Phone, Instagram, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function ContactSection() {
  return (
    <section id="contato" className="relative py-24 bg-[#062214] overflow-hidden">
      
      {/* --- Efeitos de Fundo (Ambient Light) --- */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#76A771]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#2A5432]/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Lado Esquerdo: Texto e Infos */}
          <div className="space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A5432]/30 border border-[#2A5432]/50 text-[#76A771] text-xs font-semibold uppercase tracking-wide mb-6">
                 <Sparkles className="w-3 h-3" /> Contato
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Comece a sua <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#76A771]">
                  Jornada de Saúde
                </span>
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                O Método FitoClin une ciência e natureza para tratar a causa raiz dos seus sintomas. Estamos prontos para te ouvir.
              </p>
            </div>

            <div className="space-y-4">
              {/* Card WhatsApp */}
              <div className="group flex items-start gap-4 p-4 rounded-2xl bg-[#0A311D]/50 border border-[#2A5432]/30 hover:bg-[#0A311D] hover:border-[#76A771]/50 transition-all duration-300">
                <div className="bg-[#2A5432]/30 p-3 rounded-xl text-[#76A771] group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">WhatsApp / Telefone</h4>
                  <p className="text-gray-400">(11) 99999-9999</p>
                  <p className="text-xs text-[#76A771] mt-1">Seg a Sex das 09h às 18h</p>
                </div>
              </div>

              {/* Card E-mail */}
              <div className="group flex items-start gap-4 p-4 rounded-2xl bg-[#0A311D]/50 border border-[#2A5432]/30 hover:bg-[#0A311D] hover:border-[#76A771]/50 transition-all duration-300">
                <div className="bg-[#2A5432]/30 p-3 rounded-xl text-[#76A771] group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">E-mail</h4>
                  <p className="text-gray-400">contato@fitoclin.com.br</p>
                  <p className="text-xs text-[#76A771] mt-1">Resposta em até 24h úteis</p>
                </div>
              </div>

              {/* Card Localização */}
              <div className="group flex items-start gap-4 p-4 rounded-2xl bg-[#0A311D]/50 border border-[#2A5432]/30 hover:bg-[#0A311D] hover:border-[#76A771]/50 transition-all duration-300">
                <div className="bg-[#2A5432]/30 p-3 rounded-xl text-[#76A771] group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Localização</h4>
                  <p className="text-gray-400">Av. Paulista, 1000 - Sala 101</p>
                  <p className="text-sm text-gray-500">Jardins, São Paulo - SP</p>
                </div>
              </div>
            </div>
            
            {/* Redes Sociais */}
            <div className="pt-4">
                <Link 
                  href="https://instagram.com" 
                  target="_blank"
                  className="inline-flex items-center gap-2 text-white hover:text-[#76A771] transition-colors group"
                >
                    <div className="p-2 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 group-hover:opacity-80 transition-opacity">
                      <Instagram className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium">Siga nosso dia a dia no Instagram</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
          </div>

          {/* Lado Direito: Formulário com Efeito de Glow */}
          <div className="relative">
            {/* Glow Effect atrás do formulário */}
            <div className="absolute inset-0 bg-[#76A771] blur-[60px] opacity-20 rounded-3xl transform translate-y-4" />
            
            <div className="relative z-10">
               {/* Nota: O LeadForm original tem fundo branco (bg-white). 
                 Isso cria um ótimo contraste "Card Flutuante" sobre o fundo escuro.
                 Se quiser escurecer o form, precisaria editar o arquivo lead-form.tsx.
                 Por enquanto, o contraste Branco sobre Verde Escuro é muito elegante e funcional.
               */}
               <LeadForm />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}