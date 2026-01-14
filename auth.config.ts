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
      const isOnAuth = 
        nextUrl.pathname.startsWith("/login") || 
        nextUrl.pathname.startsWith("/register");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn && isOnAuth) {
        return Response.redirect(new URL("/dashboard", nextUrl));
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
        // 👇 Atualizado para incluir PROFESSIONAL
        session.user.role = token.role as "ADMIN" | "PATIENT" | "PROFESSIONAL"; 
        session.user.stripeCustomerId = token.stripeCustomerId as string | null;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;