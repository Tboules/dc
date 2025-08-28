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
import { Adapter, AdapterUser } from "next-auth/adapters";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/lib/database/schema";
import { redirect } from "next/navigation";
import { USER_ROLES, UserRole } from "../enums";
import { DesertCollectionsStaticRoute } from "@/@types/helper-types";

const baseAdapter = DrizzleAdapter(db, {
  usersTable: users,
  accountsTable: accounts,
  sessionsTable: sessions,
  verificationTokensTable: verificationTokens,
}) as Adapter;

const customAdapter: Adapter = {
  ...baseAdapter,
  async createUser(userData: Omit<AdapterUser, "id">) {
    const [created] = await db
      .insert(users)
      .values({
        name: userData.name,
        email: userData.email,
        image: userData.image,
        emailVerified: userData.emailVerified,
        role: USER_ROLES.user,
      })
      .returning();

    return created;
  },
};

export const nextAuthConfig = {
  adapter: customAdapter,
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

export async function handleProtectedHandler(role: UserRole = 1) {
  const session = await serverAuthSession();

  if (!session || !session.user?.id) {
    redirect(`/api/auth/signin`);
  }

  if (role == USER_ROLES.admin && session.user.role != USER_ROLES.admin) {
    redirect(`/api/auth/signin`);
  }

  return session;
}

// We can pass in another param here to check for user role as well to protect admin pages
export async function handleProtectedRoute(
  callbackRoute?: DesertCollectionsStaticRoute,
  role: UserRole = 1,
) {
  const session = await serverAuthSession();
  if (!session) {
    redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent(callbackRoute ?? "/")}`,
    );
  }

  if (role == USER_ROLES.admin && session.user.role != USER_ROLES.admin) {
    throw new Error("You are not an admin");
  }

  return session;
}
