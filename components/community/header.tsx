"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function CommunityHeader({ user }: { user: any }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5E7EB] bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-[#2A5432] hover:bg-[#2A5432]/10 p-2 rounded-full transition-colors">
             <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-2">
             <div className="relative w-8 h-8">
                <Image src="/logo.png" alt="Fitoclin" fill className="object-contain" />
             </div>
             <span className="font-semibold text-lg text-[#2A5432]">Fitoclin Academy</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
            <Button variant="ghost" asChild className="text-[#2A5432]">
                <Link href="/community/my-learning">Meus Aprendizados</Link>
            </Button>
            {/* Avatar do Usuário */}
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">
                {user.name?.[0]}
            </div>
        </div>
      </div>
    </header>
  );
}