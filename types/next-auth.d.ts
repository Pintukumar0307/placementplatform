import { Role } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      collegeId: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: Role;
    collegeId: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    collegeId: string | null;
  }
}
