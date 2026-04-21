import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/auth";

const f = createUploadthing();

// FileRouter para a aplicação FitoClin
export const ourFileRouter = {

    // 1. Upload de imagens gerais (perfil, banners, capas de cursos)
    imageUploader: f({
        image: { maxFileSize: "8MB", maxFileCount: 1 },
    })
        .middleware(async () => {
            const session = await auth();
            if (!session?.user) throw new UploadThingError("Não autorizado");
            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            return { url: file.ufsUrl, uploadedBy: metadata.userId };
        }),

    // 2. Upload de múltiplas imagens (banners do slider)
    multiImageUploader: f({
        image: { maxFileSize: "8MB", maxFileCount: 10 },
    })
        .middleware(async () => {
            const session = await auth();
            if (!session?.user || session.user.role !== "ADMIN") {
                throw new UploadThingError("Não autorizado");
            }
            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            return { url: file.ufsUrl, uploadedBy: metadata.userId };
        }),

    // 3. Upload de documentos (prescrições, exames, materiais)
    documentUploader: f({
        pdf: { maxFileSize: "2GB", maxFileCount: 1 },
        image: { maxFileSize: "8MB", maxFileCount: 1 },
        "application/msword": { maxFileSize: "2GB", maxFileCount: 1 },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "2GB", maxFileCount: 1 },
        "application/vnd.ms-excel": { maxFileSize: "2GB", maxFileCount: 1 },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": { maxFileSize: "2GB", maxFileCount: 1 },
        video: { maxFileSize: "2GB", maxFileCount: 1 },
        audio: { maxFileSize: "2GB", maxFileCount: 1 },
    })
        .middleware(async () => {
            const session = await auth();
            if (!session?.user) throw new UploadThingError("Não autorizado");
            return { userId: session.user.id, role: session.user.role };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            return { url: file.ufsUrl, uploadedBy: metadata.userId };
        }),

    // 4. Upload de vídeos (mentorias)
    videoUploader: f({
        video: { maxFileSize: "2GB", maxFileCount: 1 },
    })
        .middleware(async () => {
            const session = await auth();
            if (!session?.user || session.user.role !== "ADMIN") {
                throw new UploadThingError("Não autorizado");
            }
            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            return { url: file.ufsUrl, uploadedBy: metadata.userId };
        }),

    // 5. Upload de áudio (gravação de consultas)
    audioUploader: f({
        audio: { maxFileSize: "2GB", maxFileCount: 1 },
    })
        .middleware(async () => {
            const session = await auth();
            if (!session?.user) throw new UploadThingError("Não autorizado");
            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            return { url: file.ufsUrl, uploadedBy: metadata.userId };
        }),

    // 6. Upload de materiais de curso (PDF, Docs, XLS, imagens)
    courseMaterialUploader: f({
        pdf: { maxFileSize: "2GB", maxFileCount: 1 },
        image: { maxFileSize: "8MB", maxFileCount: 1 },
        "application/vnd.ms-excel": { maxFileSize: "2GB", maxFileCount: 1 },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": { maxFileSize: "2GB", maxFileCount: 1 },
        "application/msword": { maxFileSize: "2GB", maxFileCount: 1 },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "2GB", maxFileCount: 1 },
        video: { maxFileSize: "2GB", maxFileCount: 1 },
        audio: { maxFileSize: "2GB", maxFileCount: 1 },
    })
        .middleware(async () => {
            const session = await auth();
            if (!session?.user || session.user.role !== "ADMIN") {
                throw new UploadThingError("Não autorizado");
            }
            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            return { url: file.ufsUrl, uploadedBy: metadata.userId };
        }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
