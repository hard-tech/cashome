import { Role } from "@prisma/client"
import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    householdId: string;
    householdName: string;
  }

  interface Session {
    user: User;
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
  }
}