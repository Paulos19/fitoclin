import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  LayoutTemplate, 
  GraduationCap, 
  CreditCard, 
  Plus, 
  Trash2, 
  Save, 
  Globe 
} from "lucide-react";
import { updateSiteInfo, upsertCourse, deleteCourse, upsertPlan, deletePlan } from "@/actions/settings";
import { SiteInfoForm } from "@/components/dashboard/settings/site-info-form";
import { CoursesManager } from "@/components/dashboard/settings/courses-manager";
import { PlansManager } from "@/components/dashboard/settings/plans-manager";

const prisma = new PrismaClient();

export default async function SettingsPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  // Buscar dados existentes
  const courses = await prisma.course.findMany({ orderBy: { createdAt: 'desc' } });
  const plans = await prisma.plan.findMany({ orderBy: { price: 'asc' } });
  const siteInfo = await prisma.siteInfo.findUnique({ where: { key: "homepage_config" } });

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