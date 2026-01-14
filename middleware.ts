import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // A regex abaixo exclui arquivos estáticos e rotas de API internas do Next.js
  // para que o middleware só rode nas páginas reais.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};