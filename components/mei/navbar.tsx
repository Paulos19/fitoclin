// components/mei/navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, PlayCircle, ShieldAlert, LayoutDashboard, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MeiNavbar({ userRole }: { userRole?: string }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Início", href: "/mei", icon: Leaf },
    { name: "Meus Cursos", href: "/mei/courses", icon: PlayCircle },
    { name: "Suporte", href: "/mei/support", icon: ShieldAlert },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#2A5432] bg-[#04150c]/90 backdrop-blur supports-[backdrop-filter]:bg-[#04150c]/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <div className="bg-green-600/20 p-2 rounded-lg">
            <Leaf className="w-5 h-5 text-green-400" />
          </div>
          <span className="text-white font-bold tracking-wider">
            M<span className="text-green-400">E</span>I
          </span>
        </div>

        {/* Links Principais */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-green-400 ${
                  isActive ? "text-green-400" : "text-gray-400"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Ações / Dashboard Access */}
        <div className="flex items-center gap-3">
          {userRole === "ADMIN" && (
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="hidden md:flex border-[#2A5432] text-gray-300 hover:text-white hover:bg-[#0A311D]">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard Gestão
              </Button>
            </Link>
          )}
          <Link href="/dashboard/profile">
            <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white">
              <UserCircle className="w-6 h-6" />
            </Button>
          </Link>
        </div>

      </div>
    </nav>
  );
}