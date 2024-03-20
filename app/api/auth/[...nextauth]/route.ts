import NextAuth, { AuthOptions } from "next-auth";
import { nextAuthConfig } from "@/lib/utils/auth";

const handler = NextAuth(nextAuthConfig);

export { handler as GET, handler as POST };
