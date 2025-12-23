"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetTitle, 
  SheetDescription 
} from "@/components/ui/sheet";
import { 
  Menu, 
  Home, 
  User, 
  Leaf, 
  GraduationCap, 
  CreditCard, 
  Instagram, 
  Mail, 
  ArrowRight 
} from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar o fechamento ao clicar

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mapeamento de links com Ícones
  const navLinks = [
    { name: "Início", href: "/", icon: Home },
    { name: "A Clínica", href: "#sobre", icon: User },
    { name: "Método Fitoclin", href: "#metodo", icon: Leaf },
    { name: "Cursos", href: "#cursos", icon: GraduationCap },
    { name: "Planos", href: "#planos", icon: CreditCard },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        scrolled
          ? "bg-[#062214]/95 backdrop-blur-md border-b border-white/5 py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* --- LOGO --- */}
        <Link href="/" className="flex items-center gap-3 group shrink-0 z-50">
          <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-105">
            <Image 
              src="/logo.png" 
              alt="Logo Fitoclin" 
              fill
              className="object-contain"
              sizes="(max-width: 768px) 40px, 48px"
              priority
            />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-white whitespace-nowrap">
            Fito<span className="text-[#76A771]">clin</span>
          </span>
        </Link>

        {/* --- DESKTOP MENU --- */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-[#76A771] transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#76A771] hover:after:w-full after:transition-all"
            >
              {link.name}
            </Link>
          ))}
          <Button className="btn-gradient rounded-full px-6 h-10 font-semibold shadow-[#76A771]/20 hover:shadow-[#76A771]/40 hover:scale-105 transition-all">
            Área do Paciente
          </Button>
        </nav>

        {/* --- MOBILE MENU --- */}
        <div className="md:hidden flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10 active:bg-white/20 -mr-2 transition-colors rounded-full w-12 h-12"
              >
                <Menu className="w-7 h-7" />
              </Button>
            </SheetTrigger>
            
            <SheetContent 
              side="right" 
              className="bg-[#0A311D] border-l border-white/10 text-white w-[85vw] sm:w-[400px] flex flex-col p-6 shadow-2xl"
            >
              {/* Cabeçalho do Menu */}
              <div className="flex flex-col gap-2 mb-8 border-b border-white/10 pb-6">
                <SheetTitle className="text-white text-2xl font-bold flex items-center gap-3">
                  <div className="relative w-8 h-8">
                    <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                  </div>
                  Fito<span className="text-[#76A771]">clin</span>
                </SheetTitle>
                <SheetDescription className="text-gray-400 text-sm">
                  Saúde integrativa e bem-estar.
                </SheetDescription>
              </div>

              {/* Lista de Links */}
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
                    className="flex items-center gap-4 px-4 py-4 rounded-xl text-lg font-medium text-gray-200 hover:text-white hover:bg-white/5 transition-all group"
                  >
                    <div className="p-2 rounded-lg bg-[#2A5432]/30 text-[#76A771] group-hover:bg-[#76A771] group-hover:text-[#062214] transition-colors">
                      <link.icon className="w-5 h-5" />
                    </div>
                    {link.name}
                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#76A771]" />
                  </Link>
                ))}
              </nav>

              {/* Rodapé do Menu */}
              <div className="mt-auto space-y-6 pt-6 border-t border-white/10">
                <Button className="w-full btn-gradient h-12 text-lg font-bold shadow-lg rounded-xl">
                  Área do Paciente
                </Button>
                
                <div className="flex justify-center gap-6 text-gray-400">
                  <a href="#" className="hover:text-[#76A771] transition-colors p-2 hover:bg-white/5 rounded-full">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="hover:text-[#76A771] transition-colors p-2 hover:bg-white/5 rounded-full">
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
                
                <p className="text-center text-xs text-gray-600">
                  © 2025 Fitoclin - Dra. Isa
                </p>
              </div>

            </SheetContent>
          </Sheet>
        </div>

      </div>
    </motion.header>
  );
}