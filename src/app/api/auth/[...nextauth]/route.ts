import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
          include: { household: true }
        });

        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          return null;
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
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
        token.householdId = user.householdId;
        token.householdName = user.householdName;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
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
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
