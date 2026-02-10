import { auth } from "@/auth";
import { getAllResources } from "@/actions/resources";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { FolderOpen, Search, Filter, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResourceCard } from "@/components/specialization/resource-card";

export default async function SpecializationResourcesPage() {
  const session = await auth();
  if (!session) return redirect("/login");

  // 1. Buscar Assinatura
  const subscription = await db.subscription.findUnique({
    where: { userId: session.user.id },
  });

  // 2. Buscar Compras Avulsas (IDs dos cursos comprados)
  const purchases = await db.purchase.findMany({
    where: { userId: session.user.id },
    select: { courseId: true }
  });
  const purchasedCourseIds = purchases.map(p => p.courseId);

  // 3. Buscar Todos os Recursos
  const resources = await getAllResources();

  // 4. Função Helper de Acesso
  const checkAccess = (material: any) => {
    const course = material.module.course;
    const isAdmin = session.user.role === "ADMIN";
    
    // Tem o curso comprado individualmente?
    if (purchasedCourseIds.includes(course.id)) return true;

    // É Admin?
    if (isAdmin) return true;

    // Lógica de Planos
    const isSpecializationPlan = subscription?.plan === "SPECIALIZATION" && subscription?.status === "active";
    const isCommunityPlan = subscription?.plan === "COMMUNITY" && subscription?.status === "active";

    // Se o curso é Specialization, precisa do plano Specialization
    if (course.category === "SPECIALIZATION") {
        return isSpecializationPlan;
    }

    // Se o curso é Community, qualquer plano ativo serve
    if (course.category === "COMMUNITY") {
        return isSpecializationPlan || isCommunityPlan;
    }

    return false;
  };

  return (
    <div className="p-8 min-h-screen space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-purple-500/10 pb-6">
        <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <FolderOpen className="w-6 h-6 text-purple-400" />
                </div>
                Biblioteca de Recursos
            </h1>
            <p className="text-gray-400 mt-2 max-w-xl">
                Acesse PDFs, planilhas e materiais de apoio de todos os cursos em um só lugar.
            </p>
        </div>

        {/* Busca (Visual) */}
        <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative group flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                <Input 
                    placeholder="Buscar arquivo..." 
                    className="pl-10 bg-[#0A311D] border-white/10 text-white focus:border-purple-500/50 transition-all"
                />
            </div>
            <Button variant="outline" size="icon" className="border-white/10 bg-[#0A311D] text-gray-400 hover:text-white hover:bg-white/5">
                <Filter className="w-4 h-4" />
            </Button>
        </div>
      </div>

      {/* Grid de Recursos */}
      {resources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {resources.map((material) => (
                <ResourceCard 
                    key={material.id} 
                    material={material} 
                    hasAccess={checkAccess(material)}
                />
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-[#0A311D]/30 rounded-2xl border border-dashed border-white/5">
            <div className="p-4 bg-white/5 rounded-full mb-4">
                <FileText className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-300">Biblioteca Vazia</h3>
            <p className="text-sm text-gray-500 mt-1">
                Nenhum material complementar foi adicionado ainda.
            </p>
        </div>
      )}
    </div>
  );
}