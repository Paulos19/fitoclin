import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard"); // Exemplo de rota protegida

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redireciona para /login
      }
      return true;
    },
    // Adiciona o ROLE e ID ao token/sessão para usarmos no front
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as "ADMIN" | "PATIENT";
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [], // Providers ficam no auth.ts para evitar erro no Edge
} satisfies NextAuthConfig;