import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Identifiants manquants");
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
          include: { household: true }
        });

        if (!user) {
          throw new Error("Utilisateur non trouvé");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Mot de passe incorrect");
        }

        return {
          id: String(user.id),
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          householdId: String(user.householdId),
          householdName: user.household.name
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        // Mise à jour initiale du token avec les données utilisateur
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
        token.householdId = user.householdId;
        token.householdName = user.householdName;
        token.exp = Math.floor(Date.now() / 1000) + (60 * 60); // Expire dans 1 heure
      }

      // Vérifier si le token n'est pas expiré
      if (token.exp && Date.now() >= token.exp * 1000) {
        throw new Error("Token expiré");
      }

      // Vérifier si l'utilisateur existe toujours
      if (token.sub) {
        const userExists = await prisma.user.findUnique({
          where: { id: Number(token.sub) }
        });

        if (!userExists) {
          throw new Error("Utilisateur non trouvé");
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (!token) {
        throw new Error("Token non valide");
      }

      if (!token.sub) {
        throw new Error("Token ID is missing");
      }
      session.user = {
        ...session.user,
        id: token.sub,
        username: token.username,
        firstName: token.firstName,
        lastName: token.lastName,
        role: token.role,
        householdId: token.householdId,
        householdName: token.householdName
      };

      return session;
    }
  },
  events: {
    async signOut({ token }) {
      // Nettoyer les ressources lors de la déconnexion
      if (token?.sub) {
        // Vous pouvez ajouter ici la logique de nettoyage
        console.log(`Utilisateur ${token.sub} déconnecté`);
      }
    }
  },
  pages: {
    signIn: "/login",
    error: "/error", // Page d'erreur personnalisée
    signOut: "/login"
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 heure
  },
  jwt: {
    maxAge: 60 * 60 // 1 heure
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Types pour TypeScript
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      firstName: string;
      lastName: string;
      role: string;
      householdId: string;
      householdName: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    householdId: string;
    householdName: string;
    exp?: number;
  }
}