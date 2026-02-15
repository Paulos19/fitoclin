"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Menu,
  Home,
  Leaf,
  GraduationCap, // Para Cursos
  CreditCard,
  Instagram,
  Mail,
  ArrowRight,
  LayoutDashboard,
  LogIn,
  Loader2,
  Users, // Para Comunidade
  Award, // Para Especialização
  BookOpen
} from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Menu atualizado com as novas rotas estratégicas
const NAV_LINKS = [
  { name: "Início", href: "/", icon: Home },
  { name: "Especialização", href: "/#especializacao", icon: Award }, // Novo destaque
  { name: "Comunidade", href: "/#comunidade", icon: Users },         // Novo destaque
  { name: "Cursos", href: "/#cursos", icon: BookOpen },
  { name: "Método", href: "/#metodo", icon: Leaf },
  { name: "Planos", href: "/subscription", icon: CreditCard },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        scrolled
          ? "bg-[#062214]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/10"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* --- LOGO --- */}
        <Link href="/" className="flex items-center gap-3 group z-50 relative">
          <div className="relative w-10 h-10 md:w-11 md:h-11 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Logo Fitoclin"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 40px, 44px"
              priority
            />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Fito<span className="text-[#76A771]">clin</span>
          </span>
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  relative px-3 py-2 rounded-full text-sm font-medium transition-all duration-300
                  hover:bg-white/10 hover:text-white flex items-center gap-1.5
                  ${isActive ? "text-white bg-white/10" : "text-gray-300"}
                `}
              >
                {/* Ícone opcional no desktop para dar um charme visual nas novas seções */}
                {(link.name === "Especialização" || link.name === "Comunidade") && (
                    <link.icon className="w-3.5 h-3.5 text-[#76A771]" />
                )}
                {link.name}
              </Link>
            );
          })}

          {/* Separator */}
          <div className="h-6 w-px bg-white/10 mx-4" />

          {/* --- AUTH ACTION BUTTON --- */}
          {isLoading ? (
             <Button disabled variant="ghost" className="text-white/70">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Carregando...
             </Button>
          ) : session ? (
            <Link href="/dashboard">
              <Button className="rounded-full pl-2 pr-6 h-10 bg-[#76A771] hover:bg-[#5e8f5a] text-white font-semibold shadow-lg shadow-[#76A771]/20 transition-all hover:scale-105 group">
                 <Avatar className="w-7 h-7 mr-2 border-2 border-white/20">
                    <AvatarImage src={session.user?.image || ""} />
                    <AvatarFallback className="bg-[#062214] text-xs">
                      {session.user?.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                 </Avatar>
                 Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button 
                variant="outline" 
                className="rounded-full px-6 h-10 border-[#76A771] text-[#76A771] hover:bg-[#76A771] hover:text-white transition-all font-semibold hover:border-[#76A771]"
              >
                Entrar
                <LogIn className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </nav>

        {/* --- MOBILE TOGGLE --- */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-full w-10 h-10"
                aria-label="Abrir Menu"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-[#041A0F] border-l border-white/10 text-white w-[85vw] sm:w-[380px] flex flex-col p-0"
            >
              {/* Header do Mobile Menu */}
              <div className="p-6 border-b border-white/5 bg-[#062214]">
                <SheetTitle className="text-white text-xl font-bold flex items-center gap-2">
                  <div className="relative w-7 h-7">
                    <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                  </div>
                  Fito<span className="text-[#76A771]">clin</span>
                </SheetTitle>
                <SheetDescription className="text-gray-400 text-xs mt-1">
                  Navegue pela plataforma
                </SheetDescription>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto py-6 px-4">
                <nav className="flex flex-col gap-2">
                  {NAV_LINKS.map((link, idx) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`
                            flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium transition-all group active:scale-95
                            ${(link.name === "Especialização" || link.name === "Comunidade") 
                                ? "bg-[#76A771]/10 text-white border border-[#76A771]/20" 
                                : "text-gray-300 hover:text-white hover:bg-white/5"
                            }
                        `}
                      >
                        <span className={`
                            p-2 rounded-lg transition-colors
                            ${(link.name === "Especialização" || link.name === "Comunidade") 
                                ? "bg-[#76A771] text-[#062214]" 
                                : "bg-[#0A311D] text-[#76A771] group-hover:text-white group-hover:bg-[#76A771]"
                            }
                        `}>
                          <link.icon className="w-5 h-5" />
                        </span>
                        {link.name}
                        <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#76A771]" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Footer Mobile com Ação Principal */}
              <div className="p-6 border-t border-white/10 bg-[#062214]/50 space-y-4">
                {session ? (
                   <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button className="w-full h-12 rounded-xl bg-[#76A771] hover:bg-[#659260] text-white font-bold text-lg shadow-lg">
                        <LayoutDashboard className="w-5 h-5 mr-2" />
                        Acessar Dashboard
                      </Button>
                   </Link>
                ) : (
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full h-12 rounded-xl bg-white text-[#062214] hover:bg-gray-200 font-bold text-lg shadow-lg">
                      <LogIn className="w-5 h-5 mr-2" />
                      Área do Aluno
                    </Button>
                  </Link>
                )}

                <div className="flex justify-center gap-6 pt-2">
                  <SocialLink href="#" icon={Instagram} />
                  <SocialLink href="#" icon={Mail} />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}

// Componente auxiliar para links sociais
function SocialLink({ href, icon: Icon }: { href: string; icon: any }) {
  return (
    <a
      href={href}
      className="text-gray-400 hover:text-[#76A771] hover:bg-white/5 p-2 rounded-full transition-all duration-300"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}