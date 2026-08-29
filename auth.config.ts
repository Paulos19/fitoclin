import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnCursosLogin = nextUrl.pathname.startsWith("/cursos/login");
      const isOnCursosCadastro = nextUrl.pathname.startsWith("/cursos/cadastro");
      const isOnCursosProtegido =
        nextUrl.pathname.startsWith("/cursos") &&
        !isOnCursosLogin &&
        !isOnCursosCadastro;
      const isOnAuth =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register");

      if (isOnDashboard || isOnCursosProtegido) {
        if (isLoggedIn) return true;
        // Redirecionar para a página de login correta
        if (isOnCursosProtegido) {
          return Response.redirect(new URL("/cursos/login", nextUrl));
        }
        return false;
      } else if (isLoggedIn && isOnAuth) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      } else if (isLoggedIn && (isOnCursosLogin || isOnCursosCadastro)) {
        return Response.redirect(new URL("/cursos", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.stripeCustomerId = user.stripeCustomerId;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        // 👇 Atualizado para incluir SECRETARY
        session.user.role = token.role as "ADMIN" | "PATIENT" | "PROFESSIONAL" | "SECRETARY"; 
        session.user.stripeCustomerId = token.stripeCustomerId as string | null;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;