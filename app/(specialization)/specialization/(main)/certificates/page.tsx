import { auth } from "@/auth";
import { getUserCertificates } from "@/actions/certificates";
import { redirect } from "next/navigation";
import { Award, Lock, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { GenerateCertificateButton } from "@/components/specialization/generate-certificate-button"; // Componente Client

export default async function CertificatesPage() {
  const session = await auth();
  if (!session) return redirect("/login");

  const data = await getUserCertificates();
  
  // Ordenar: Completos primeiro
  const sortedData = data.sort((a, b) => (b.isCompleted === a.isCompleted ? 0 : b.isCompleted ? 1 : -1));

  return (
    <div className="p-8 min-h-screen space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="border-b border-purple-500/10 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-yellow-500/20 to-purple-500/20 rounded-lg border border-yellow-500/30">
                <Award className="w-6 h-6 text-yellow-500" />
            </div>
            Meus Certificados
        </h1>
        <p className="text-gray-400 mt-2">
            Acompanhe seu progresso e emita os certificados das suas especializações.
        </p>
      </div>

      {sortedData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedData.map((item) => (
                <Card key={item.courseId} className={`border ${item.isCompleted ? 'bg-[#0A311D]/40 border-yellow-500/30' : 'bg-[#0A311D]/20 border-white/5'}`}>
                    {/* Imagem do Curso ou Placeholder */}
                    <div className="h-32 w-full relative overflow-hidden rounded-t-xl bg-black/40">
                         {item.courseImage ? (
                             // eslint-disable-next-line @next/next/no-img-element
                             <img src={item.courseImage} alt={item.courseTitle} className={`w-full h-full object-cover ${!item.isCompleted && 'grayscale opacity-40'}`} />
                         ) : (
                             <div className="w-full h-full flex items-center justify-center">
                                 <Award className={`w-12 h-12 ${item.isCompleted ? 'text-yellow-500/50' : 'text-gray-700'}`} />
                             </div>
                         )}
                         
                         {item.isCompleted && (
                             <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded flex items-center shadow-lg">
                                 <CheckCircle2 className="w-3 h-3 mr-1" /> Concluído
                             </div>
                         )}
                    </div>

                    <CardContent className="p-5">
                        <h3 className={`font-bold text-lg mb-2 ${item.isCompleted ? 'text-white' : 'text-gray-400'}`}>
                            {item.courseTitle}
                        </h3>
                        
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>Progresso</span>
                                <span>{item.progress}%</span>
                            </div>
                            <Progress value={item.progress} className={`h-2 ${item.isCompleted ? 'bg-white/10' : 'bg-white/5'}`} indicatorClassName={item.isCompleted ? 'bg-yellow-500' : 'bg-purple-600'} />
                        </div>
                    </CardContent>

                    <CardFooter className="p-5 pt-0">
                        {item.isCompleted ? (
                            <GenerateCertificateButton 
                                courseId={item.courseId} 
                                certificateCode={item.certificateCode} 
                            />
                        ) : (
                            <Button disabled variant="outline" className="w-full border-white/10 text-gray-500">
                                <Lock className="w-4 h-4 mr-2" /> Complete para emitir
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
            Você ainda não iniciou nenhum curso que gere certificação.
        </div>
      )}
    </div>
  );
}