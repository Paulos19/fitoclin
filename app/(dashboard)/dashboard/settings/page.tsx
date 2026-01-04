import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  LayoutTemplate, 
  GraduationCap, 
  CreditCard, 
  Globe 
} from "lucide-react";
import { SiteInfoForm } from "@/components/dashboard/settings/site-info-form";
import { CoursesManager } from "@/components/dashboard/settings/courses-manager";
import { PlansManager } from "@/components/dashboard/settings/plans-manager";

const prisma = new PrismaClient();

export default async function SettingsPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  // 1. Buscar dados brutos do Prisma
  // ATENÇÃO: Agora incluímos modules e lessons para popular o construtor de cursos
  const rawCourses = await prisma.course.findMany({ 
    orderBy: { createdAt: 'desc' },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: { orderBy: { order: 'asc' } }
        }
      }
    }
  });

  const rawPlans = await prisma.plan.findMany({ orderBy: { price: 'asc' } });
  const siteInfo = await prisma.siteInfo.findUnique({ where: { key: "homepage_config" } });

  // 2. Converter Decimal para Number (para evitar erro de serialização do Next.js)
  const courses = rawCourses.map(course => ({
    ...course,
    price: course.price ? Number(course.price) : 0, 
  }));

  const plans = rawPlans.map(plan => ({
    ...plan,
    price: Number(plan.price),
  }));

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-[#2A5432]/30 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Configurações do Site</h1>
          <p className="text-gray-400 mt-1">Gerencie o conteúdo que aparece na página inicial, cursos e preços.</p>
        </div>
        <Button variant="outline" className="border-[#76A771] text-[#76A771] hover:bg-[#76A771] hover:text-[#062214] gap-2">
          <Globe className="w-4 h-4" /> Ver Site Online
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full md:w-[600px] grid-cols-3 bg-[#062214] p-1 rounded-xl border border-[#2A5432]/30 h-auto">
          <TabsTrigger value="general" className="data-[state=active]:bg-[#2A5432] data-[state=active]:text-white text-gray-400 py-3">
             <LayoutTemplate className="w-4 h-4 mr-2" /> Geral & Home
          </TabsTrigger>
          <TabsTrigger value="courses" className="data-[state=active]:bg-[#2A5432] data-[state=active]:text-white text-gray-400 py-3">
             <GraduationCap className="w-4 h-4 mr-2" /> Cursos
          </TabsTrigger>
          <TabsTrigger value="plans" className="data-[state=active]:bg-[#2A5432] data-[state=active]:text-white text-gray-400 py-3">
             <CreditCard className="w-4 h-4 mr-2" /> Planos & Preços
          </TabsTrigger>
        </TabsList>

        {/* --- ABA GERAL --- */}
        <TabsContent value="general" className="mt-6">
           <SiteInfoForm initialData={siteInfo} />
        </TabsContent>

        {/* --- ABA CURSOS --- */}
        <TabsContent value="courses" className="mt-6">
           {/* O componente CoursesManager agora receberá a árvore completa (curso -> módulos -> aulas) */}
           <CoursesManager courses={courses} />
        </TabsContent>

        {/* --- ABA PLANOS --- */}
        <TabsContent value="plans" className="mt-6">
           <PlansManager plans={plans} />
        </TabsContent>
      </Tabs>
    </div>
  );
}