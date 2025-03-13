"use server";

import db from "@/lib/database";
import { serverAuthSession } from "@/lib/utils/auth";

export async function selectUserExcerpts(
  limit: number = 10,
  offset: number = 0,
) {
  const session = await serverAuthSession();
  if (!session) throw new Error("No user found");

  // make sure to filter by user
  const excerpts = await db.query.excerpts.findMany({
    limit,
    offset,
    where: (exc, { eq }) => eq(exc.createdBy, session.user.id ?? ""),
    with: {
      createdBy: true,
      desertFigure: true,
      status: true,
      excerptToTags: {
        with: {
          tag: true,
        },
      },
    },
    orderBy: (excerpt, { desc }) => [desc(excerpt.dateAdded)],
  });

  return excerpts;
}
