"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Importação necessária
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react"; // Removi 'Leaf' pois não usaremos mais
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
    { name: "Blog", href: "#blog" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
        scrolled
          ? "bg-[#062214]/90 backdrop-blur-md border-white/5 py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO + NOME DA MARCA */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Container da Imagem do Logo */}
          <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-105">
            <Image 
              src="/logo.png" 
              alt="Logo Fitoclin" 
              fill
              className="object-contain" // Garante que a logo não distorça
              sizes="(max-width: 768px) 40px, 48px"
            />
          </div>
          
          {/* Texto da Marca (Mantivemos para reforçar o nome, se a logo for só o símbolo) */}
          <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Fito<span className="text-[#76A771]">clin</span>
          </span>
        </Link>

        {/* Desktop Menu */}
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
          <Button className="btn-gradient rounded-full px-6 h-10 font-semibold shadow-[#76A771]/20 hover:shadow-[#76A771]/40">
            Área do Paciente
          </Button>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0A311D] border-l border-white/10 text-white">
              <nav className="flex flex-col gap-6 mt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-gray-200 hover:text-[#76A771]"
                  >
                    {link.name}
                  </Link>
                ))}
                <Button className="w-full btn-gradient">Área do Paciente</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}