import { auth } from "@/auth";
import { db } from "@/lib/db";
import { renderToStream } from "@react-pdf/renderer";
import { CertificateTemplate } from "@/components/documents/certificate-template";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> } // Next 15+ params are async
) {
  const session = await auth();
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  const { courseId } = await params;

  // 1. Busca dados
  const certificate = await db.certificate.findUnique({
    where: {
        userId_courseId: { userId: session.user.id, courseId }
    },
    include: {
        course: true
    }
  });

  if (!certificate) return new NextResponse("Certificado não encontrado ou não emitido.", { status: 404 });

  // 2. Busca configuração global para fallback de imagem
  const siteInfo = await db.siteInfo.findFirst();

  // 3. Define imagem de fundo (Curso > Global > Null)
  const bgUrl = certificate.course.certificateBgUrl || siteInfo?.defaultCertificateBgUrl || undefined;

  // 4. Gera Stream do PDF
  const stream = await renderToStream(
    <CertificateTemplate 
        userName={session.user.name || "Aluno Fitoclin"}
        courseName={certificate.course.title}
        date={certificate.issuedAt}
        code={certificate.code}
        bgUrl={bgUrl}
    />
  );

  return new NextResponse(stream as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="certificado-${certificate.code}.pdf"`,
    },
  });
}