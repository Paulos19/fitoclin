import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();

/**
 * Extrai o fileKey de uma URL do UploadThing.
 * URLs seguem o formato: https://utfs.io/f/<fileKey> ou https://<appId>.ufs.sh/f/<fileKey>
 */
export function extractFileKey(url: string): string | null {
    try {
        const urlObj = new URL(url);
        const parts = urlObj.pathname.split("/");
        // O fileKey geralmente vem depois de /f/
        const fIndex = parts.indexOf("f");
        if (fIndex !== -1 && parts[fIndex + 1]) {
            return parts[fIndex + 1];
        }
        // Fallback: retorna último segmento
        return parts[parts.length - 1] || null;
    } catch {
        return null;
    }
}
