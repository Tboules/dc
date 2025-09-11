"use server";

// lib/content-status.ts
import { unstable_cache, revalidateTag } from "next/cache";
import db from "@/lib/database";
import { contentStatus } from "@/lib/database/schema";

// ✅ Only return JSON-serializable data
export const getContentStatuses = unstable_cache(
  async () => {
    const rows = await db
      .select({ id: contentStatus.id, name: contentStatus.name })
      .from(contentStatus);

    const idToName: Record<string, string> = {};
    const nameToId: Record<string, string> = {};
    for (const r of rows) {
      idToName[r.id] = r.name;
      nameToId[r.name] = r.id;
    }

    return { rows, idToName, nameToId };
  },
  ["content-statuses"],
  { revalidate: 3600, tags: ["content-statuses"] },
);

export async function getStatusId(name: string) {
  const { nameToId } = await getContentStatuses();

  if (!nameToId[name]) throw new Error("Status could not be found");

  return nameToId[name];
}

export async function getStatusName(id: string) {
  const { idToName } = await getContentStatuses();
  return idToName[id] ?? null;
}

export async function invalidateContentStatuses() {
  revalidateTag("content-statuses");
}
