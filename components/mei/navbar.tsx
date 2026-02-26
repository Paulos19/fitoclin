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
    <nav className="sticky top-0 z-50 w-full border-b border-green-200/50 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <div className="bg-green-100 p-2 rounded-lg border border-green-200 shadow-sm">
            <Leaf className="w-5 h-5 text-green-700" />
          </div>
          <span className="text-gray-900 font-bold tracking-wider text-xl">
            M<span className="text-green-600">E</span>I
          </span>
        </div>

        {/* Links Principais */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:text-green-600 ${isActive ? "text-green-700 bg-green-50 px-4 py-2 rounded-full shadow-inner" : "text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-full"
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-green-600" : ""}`} />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Ações / Dashboard Access */}
        <div className="flex items-center gap-4">
          {userRole === "ADMIN" && (
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="hidden md:flex border-green-200 text-green-700 hover:text-green-800 hover:bg-green-50 font-medium">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard Gestão
              </Button>
            </Link>
          )}
          <Link href="/dashboard/profile">
            <Button size="icon" variant="ghost" className="text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-full h-10 w-10">
              <UserCircle className="w-6 h-6" />
            </Button>
          </Link>
        </div>

      </div>
    </nav>
  );
}