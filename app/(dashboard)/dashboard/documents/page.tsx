import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, ExternalLink, Image as ImageIcon } from "lucide-react";
import { deleteDocument } from "@/actions/documents";
import { NewDocumentDialog } from "@/components/dashboard/documents/new-document-dialog"; // 👈 Importamos o novo componente

const prisma = new PrismaClient();

export default async function DocumentsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const patient = await prisma.patient.findUnique({
    where: { userId: session.user.id },
    include: { documents: { orderBy: { createdAt: 'desc' } } }
  });

  if (!patient) return <div className="text-white p-8">Acesso restrito.</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Meus Documentos</h1>
            <p className="text-gray-400 mt-1">
                Centralize exames e relatórios para a Dra. Isa avaliar.
            </p>
        </div>
        {/* Componente Cliente para Upload */}
        <NewDocumentDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {patient.documents.length > 0 ? (
            patient.documents.map((doc) => (
                <Card key={doc.id} className="bg-[#0A311D]/50 border-[#2A5432]/30 hover:border-[#76A771]/50 transition-all group overflow-hidden">
                    <CardHeader className="flex flex-row items-start justify-between pb-2 bg-[#062214]/30 border-b border-[#2A5432]/30">
                        <div className="bg-[#2A5432]/20 p-2 rounded-lg text-[#76A771]">
                            {/* Ícone Dinâmico */}
                            {doc.url.endsWith('.pdf') ? <FileText className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                        </div>
                        
                        {/* Botão de Excluir (Server Action direta) */}
                        <form action={async () => {
                            "use server";
                            await deleteDocument(doc.id);
                        }}>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Excluir documento"
                                type="submit"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </form>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <h3 className="font-bold text-white truncate text-base" title={doc.title}>{doc.title}</h3>
                        <div className="flex justify-between items-center mt-1 mb-4">
                            <span className="text-xs text-gray-500">{new Date(doc.createdAt).toLocaleDateString('pt-BR')}</span>
                            <span className="text-[10px] uppercase bg-[#2A5432]/50 text-[#76A771] px-2 py-0.5 rounded border border-[#2A5432]">
                                {doc.type === 'EXAM' ? 'Exame' : 'Outro'}
                            </span>
                        </div>
                        <a href={doc.url} target="_blank" rel="noreferrer">
                            <Button variant="outline" size="sm" className="w-full border-[#2A5432] text-[#76A771] hover:bg-[#2A5432] hover:text-white bg-transparent">
                                <ExternalLink className="w-3 h-3 mr-2" /> Visualizar
                            </Button>
                        </a>
                    </CardContent>
                </Card>
            ))
        ) : (
            <div className="col-span-3 text-center py-16 border-2 border-dashed border-[#2A5432] rounded-2xl bg-[#0A311D]/10">
                <div className="bg-[#2A5432]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-[#76A771] opacity-50" />
                </div>
                <p className="text-gray-400 font-medium">Nenhum documento enviado.</p>
                <p className="text-gray-600 text-sm mt-1">Clique em "Novo Documento" para começar.</p>
            </div>
        )}
      </div>
    </div>
  );
}