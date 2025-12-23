"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"; // SheetTitle/Description para acessibilidade
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "/" },
    { name: "A Clínica", href: "#sobre" },
    { name: "Método Fitoclin", href: "#metodo" },
    { name: "Cursos", href: "#cursos" },
    { name: "Planos", href: "#planos" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent w-full overflow-hidden ${
        scrolled
          ? "bg-[#062214]/95 backdrop-blur-md border-white/5 py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* --- LOGO + BRANDING --- */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
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
          <Button className="btn-gradient rounded-full px-6 h-10 font-semibold shadow-[#76A771]/20 hover:shadow-[#76A771]/40 transition-all hover:scale-105">
            Área do Paciente
          </Button>
        </nav>

        {/* --- MOBILE MENU (CORRIGIDO) --- */}
        {/* Adicionei 'mr-0 pr-0' e 'justify-end' para evitar overflow lateral */}
        <div className="md:hidden flex items-center justify-end mr-0 pr-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 mr-0 pr-0">
                <Menu className="w-8 h-8" /> {/* Ícone levemente maior para toque */}
              </Button>
            </SheetTrigger>
            
            <SheetContent side="right" className="bg-[#0A311D] border-l border-white/10 text-white w-[300px] sm:w-[400px] flex flex-col">
              
              {/* Cabeçalho do Menu Mobile (Acessibilidade) */}
              <div className="mb-6 border-b border-white/10 pb-6">
                <SheetTitle className="text-white text-xl font-bold flex items-center gap-2">
                  <div className="relative w-8 h-8">
                    <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                  </div>
                  Menu Fitoclin
                </SheetTitle>
                <SheetDescription className="text-gray-400 text-xs mt-1">
                  Navegue pelas seções da clínica
                </SheetDescription>
              </div>

              {/* Links Mobile */}
              <nav className="flex flex-col gap-6 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-gray-200 hover:text-[#76A771] hover:pl-2 transition-all border-l-2 border-transparent hover:border-[#76A771]"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-6 mt-auto">
                   <Button className="w-full btn-gradient h-12 text-lg shadow-lg">
                     Área do Paciente
                   </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </motion.header>
  );
}