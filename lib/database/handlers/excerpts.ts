"use server";

import db from "@/lib/database";

export async function selectUserExcerpts(
  limit: number = 10,
  offset: number = 0,
) {
  // make sure to filter by user

  const excerpts = await db.query.excerpts.findMany({
    limit,
    offset,
    with: {
      createdBy: true,
      desertFigure: true,
      status: true,
    },
  });

  return excerpts;
}
