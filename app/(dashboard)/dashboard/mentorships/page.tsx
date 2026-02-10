import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getMentorships } from "@/actions/mentorships";
import { MentorshipsManager } from "@/components/specialization/mentorships-manager";

export default async function DashboardMentorshipsPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return redirect("/dashboard");

  const mentorships = await getMentorships();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestão de Mentorias</h1>
        <p className="text-muted-foreground">Adicione gravações para a área de Especialização.</p>
      </div>
      <MentorshipsManager mentorships={mentorships} />
    </div>
  );
}