import { Role } from "@prisma/client";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware({ nextUrl: { pathname, searchParams } }) {
    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized({ token, req: { nextUrl } }) {
        // Protection générale : l'utilisateur doit être connecté
        if (nextUrl.pathname.startsWith("/dashboard")) {
          return !!token;
        }

        // Routes spécifiques aux rôles
        if (nextUrl.pathname.startsWith("/bank")) {
          return !!token && token?.role === Role.BANK;
        } else if (nextUrl.pathname.startsWith("/member")) {
          return !!token && token?.role === Role.MEMBER;
        }

        // Routes pour les transactions
        if (nextUrl.pathname.startsWith("/transactions")) {
          return !!token;
        }

        // Routes pour les missions
        if (nextUrl.pathname.startsWith("/missions")) {
          return !!token;
        }

        // Routes pour les articles en vente
        if (nextUrl.pathname.startsWith("/items")) {
          return !!token;
        }

        // Routes pour la gestion du profil
        if (nextUrl.pathname.startsWith("/profile")) {
          return !!token;
        }

        // Par défaut, autoriser l'accès si l'utilisateur est connecté
        return token !== null;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/bank/:path*",
    "/member/:path*",
    "/transactions/:path*",
    "/missions/:path*",
    "/items/:path*",
    "/profile/:path*",
  ],
};
