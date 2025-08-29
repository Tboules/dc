"use server";

import db from "@/lib/database";
import { handleProtectedHandler } from "@/lib/utils/auth";
import { excerptLove, ExcerptLoveUpsert } from "../schema";
import { and, eq, sql } from "drizzle-orm";

export async function postExcerptLove(elUpsert: ExcerptLoveUpsert) {
  const session = await handleProtectedHandler();
  const userId = session.user.id;

  if (!userId) throw new Error("User ID not found");

  // Not going to handle the toggle logic here
  // state of active handled by the client
  return await db
    .insert(excerptLove)
    .values(elUpsert)
    .onConflictDoUpdate({
      target: [excerptLove.excerptId, excerptLove.userId],
      set: { ...elUpsert, lastUpdated: sql`now()` },
    });
}
