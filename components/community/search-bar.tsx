"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce"; // Instale se não tiver: npm i use-debounce

export function CommunitySearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Debounce para não atualizar a URL a cada tecla (espera 300ms)
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative w-full md:w-[400px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2A5432]/50" />
      <input
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("q")?.toString()}
        placeholder="Buscar cursos, aulas..."
        className="w-full h-11 pl-10 pr-4 rounded-full border border-green-100 bg-white text-sm text-[#062214] placeholder:text-[#2A5432]/40 focus:outline-none focus:ring-2 focus:ring-[#76A771]/50 focus:border-transparent shadow-sm transition-all"
      />
    </div>
  );
}