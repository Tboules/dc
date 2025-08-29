"use server";

import db from "@/lib/database";
import { excerptLove, ExcerptLoveUpsert } from "../schema";
import { sql } from "drizzle-orm";

export async function postExcerptLove(elUpsert: ExcerptLoveUpsert) {
  // Not going to handle the toggle logic here
  // state of active handled by the client
  return await db
    .insert(excerptLove)
    .values(elUpsert)
    .onConflictDoUpdate({
      target: [excerptLove.excerptId, excerptLove.userId],
      set: { ...elUpsert, lastUpdated: sql`now()` },
    })
    .returning();
}
