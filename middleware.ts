import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const proxy = {
  // Define quais rotas o middleware deve "vigiar"
  // Exclui arquivos estáticos (images, css) e api routes públicas para não travar o site
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};