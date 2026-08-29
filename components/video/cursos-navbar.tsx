"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  LayoutDashboard,
  LogIn,
  Loader2,
  Play,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";

export function CursosNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        scrolled
          ? "bg-[#062214]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
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

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Início
          </Link>

          <div className="h-6 w-px bg-white/10 mx-2" />

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#76A771]/10 border border-[#76A771]/20">
            <Play className="w-4 h-4 text-[#76A771]" />
            <span className="text-sm font-semibold text-[#76A771]">
              Biblioteca de Vídeos
            </span>
          </div>

          <div className="h-6 w-px bg-white/10 mx-2" />

          {isLoading ? (
            <Button disabled variant="ghost" className="text-white/70">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            </Button>
          ) : session ? (
            <div className="flex items-center gap-2">
              {session.user?.role === "ADMIN" && (
                <Link href="/dashboard">
                  <Button variant="ghost" className="rounded-full px-4 h-10 text-gray-300 hover:text-white hover:bg-white/10 text-sm font-medium">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              )}
              <Button
                onClick={() => signOut({ callbackUrl: "/cursos" })}
                className="rounded-full pl-2 pr-6 h-10 bg-[#76A771] hover:bg-[#5e8f5a] text-[#062214] font-semibold shadow-lg shadow-[#76A771]/20 transition-all hover:scale-105"
              >
                <Avatar className="w-7 h-7 mr-2 border-2 border-white/20">
                  <AvatarImage src={session.user?.image || ""} />
                  <AvatarFallback className="bg-[#062214] text-[#76A771] text-xs">
                    {session.user?.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                Sair
              </Button>
            </div>
          ) : (
            <Link href="/cursos/login">
              <Button
                variant="outline"
                className="rounded-full px-6 h-10 border-[#76A771] text-[#76A771] hover:bg-[#76A771] hover:text-[#062214] transition-all font-semibold"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Entrar
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-full w-10 h-10"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-[#041A0F] border-l border-white/10 text-white w-[85vw] sm:w-[360px] flex flex-col p-0"
            >
              <div className="p-6 border-b border-white/5 bg-[#062214]">
                <SheetTitle className="text-white text-xl font-bold flex items-center gap-2">
                  <div className="relative w-7 h-7">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  Fito<span className="text-[#76A771]">clin</span>
                </SheetTitle>
                <SheetDescription className="text-gray-400 text-xs mt-1">
                  Biblioteca de Vídeos
                </SheetDescription>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4">
                <nav className="flex flex-col gap-2">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <span className="p-2 rounded-lg bg-[#0A311D] text-[#76A771]">
                      <ArrowLeft className="w-5 h-5" />
                    </span>
                    Voltar ao Início
                  </Link>

                  <div className="flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium bg-[#76A771]/10 text-white border border-[#76A771]/20">
                    <span className="p-2 rounded-lg bg-[#76A771] text-[#062214]">
                      <Play className="w-5 h-5" />
                    </span>
                    Biblioteca de Vídeos
                  </div>
                </nav>
              </div>

              <div className="p-6 border-t border-white/10 bg-[#062214]/50">
                {session ? (
                  <div className="space-y-2">
                    {session.user?.role === "ADMIN" && (
                      <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                      >
                        <Button className="w-full h-12 rounded-xl bg-[#2A5432] hover:bg-[#76A771] text-white font-bold text-lg shadow-lg">
                          <LayoutDashboard className="w-5 h-5 mr-2" />
                          Dashboard Admin
                        </Button>
                      </Link>
                    )}
                    <Button
                      onClick={() => {
                        signOut({ callbackUrl: "/cursos" });
                        setIsOpen(false);
                      }}
                      className="w-full h-12 rounded-xl bg-[#76A771] hover:bg-[#659260] text-[#062214] font-bold text-lg shadow-lg"
                    >
                      Sair
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/cursos/login" onClick={() => setIsOpen(false)}>
                      <Button className="w-full h-12 rounded-xl bg-[#76A771] text-[#062214] hover:bg-[#659260] font-bold text-lg shadow-lg">
                        <LogIn className="w-5 h-5 mr-2" />
                        Entrar
                      </Button>
                    </Link>
                    <Link href="/cursos/cadastro" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full h-12 rounded-xl border-[#2A5432] text-gray-300 hover:bg-white/5 font-bold text-lg"
                      >
                        Criar Conta
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
