"use server";

import db from "@/lib/database";
import { handleProtectedHandler } from "@/lib/utils/auth";
import { excerptLove } from "../schema";
import { and, eq, sql } from "drizzle-orm";

export async function postExcerptLove(excerptId: string, lovedByUser: boolean) {
  const session = await handleProtectedHandler();
  const userId = session.user.id ?? "";

  // If loved already, then set love to false
  if (lovedByUser) {
    return await db
      .update(excerptLove)
      .set({ active: false, lastUpdated: sql`now()` })
      .where(
        and(
          eq(excerptLove.excerptId, excerptId),
          eq(excerptLove.userId, userId),
        ),
      );
  }

  // if never loved before, create record
  // if record found, update back to loved
  return await db
    .insert(excerptLove)
    .values({
      excerptId,
      userId,
    })
    .onConflictDoUpdate({
      target: [excerptLove.excerptId, excerptLove.userId],
      set: { active: true, lastUpdated: sql`now()` },
    });
}
