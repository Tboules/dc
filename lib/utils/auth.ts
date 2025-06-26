import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "@/lib/database";
import { Adapter } from "next-auth/adapters";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/lib/database/schema";
import { redirect } from "next/navigation";
import { USER_ROLES, UserRole } from "../enums";
import { DesertCollectionsStaticRoute } from "@/@types/helper-types";

export const nextAuthConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.userId) {
        session.user.id = token.userId;
        session.user.role = token.role;
      }
      // the idea is to pass permissions here
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
} satisfies AuthOptions;

// Use it in server contexts
export function serverAuthSession(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, nextAuthConfig);
}

export async function handleProtectedHandler(role: UserRole = "user") {
  const session = await serverAuthSession();

  if (!session) {
    redirect(`/api/auth/signin`);
  }

  if (role == "admin" && session.user.role != USER_ROLES.admin) {
    redirect(`/api/auth/signin`);
  }

  return session;
}

// We can pass in another param here to check for user role as well to protect admin pages
export async function handleProtectedRoute(
  callbackRoute?: DesertCollectionsStaticRoute,
  role: UserRole = "user",
) {
  const session = await serverAuthSession();
  if (!session) {
    redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent(callbackRoute ?? "/")}`,
    );
  }

  if (role == "admin" && session.user.role != USER_ROLES.admin) {
    throw new Error("You are not an admin");
  }

  return session;
}
