"use client";

import Link from "next/link";
import Image from "next/image"; // Importação do Image
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react"; // Removido 'Leaf'
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-[#04160c] border-t border-[#2A5432]/30 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Coluna 1: Sobre + Logo */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              {/* Logo Imagem */}
              <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-105">
                <Image 
                  src="/logo.png" 
                  alt="Logo Fitoclin" 
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 40px, 48px"
                />
              </div>
              
              {/* Nome da Marca */}
              <span className="text-2xl font-bold text-white">
                Fito<span className="text-[#76A771]">clin</span>
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed">
              Clínica especializada em Fitoterapia e Saúde Integrativa. 
              Tratando a causa raiz para promover longevidade e bem-estar.
            </p>
            
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-[#76A771] transition-colors hover:scale-110 transform duration-200"><Instagram className="w-5 h-5"/></a>
              <a href="#" className="text-gray-400 hover:text-[#76A771] transition-colors hover:scale-110 transform duration-200"><Facebook className="w-5 h-5"/></a>
              <a href="#" className="text-gray-400 hover:text-[#76A771] transition-colors hover:scale-110 transform duration-200"><Youtube className="w-5 h-5"/></a>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 className="text-white font-bold mb-6">Navegação</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-[#76A771] transition-colors hover:translate-x-1 inline-block duration-200">Início</Link></li>
              <li><Link href="#sobre" className="hover:text-[#76A771] transition-colors hover:translate-x-1 inline-block duration-200">Sobre a Dra. Isa</Link></li>
              <li><Link href="#servicos" className="hover:text-[#76A771] transition-colors hover:translate-x-1 inline-block duration-200">Tratamentos</Link></li>
              <li><Link href="#cursos" className="hover:text-[#76A771] transition-colors hover:translate-x-1 inline-block duration-200">Cursos</Link></li>
              <li><Link href="/login" className="hover:text-[#76A771] transition-colors hover:translate-x-1 inline-block duration-200">Área do Paciente</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div>
            <h4 className="text-white font-bold mb-6">Contato</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-[#76A771] shrink-0 group-hover:text-white transition-colors" />
                <span>Av. Paulista, 1000 - Sala 42<br/>São Paulo - SP</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-[#76A771] shrink-0 group-hover:text-white transition-colors" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-[#76A771] shrink-0 group-hover:text-white transition-colors" />
                <span>contato@fitoclin.com.br</span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6">Receba Dicas de Saúde</h4>
            <p className="text-gray-400 text-sm mb-4">
              Inscreva-se para receber conteúdos exclusivos sobre fitoterapia.
            </p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="bg-[#0A311D] border border-[#2A5432] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#76A771] text-sm placeholder:text-gray-500"
              />
              <Button className="btn-gradient w-full font-semibold">Inscrever-se</Button>
            </div>
          </div>
        </div>

        {/* Rodapé Inferior */}
        <div className="border-t border-[#2A5432]/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Fitoclin - Dra. Isa. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}