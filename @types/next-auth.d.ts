import { JWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role?: number;
      id?: string;
    } & DefaultSession["user"];
  }

  // add addtional fields to the user type for next auth
  interface User {
    role: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    role?: number;
  }
}
