"use server";

import db from "@/lib/database";
import { serverAuthSession } from "@/lib/utils/auth";
import { UserExcerpt } from "@/app/user/_components/columns";

export async function selectUserExcerpts(
  limit: number = 10,
  offset: number = 0,
): Promise<UserExcerpt[]> {
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
      reference: true,
      excerptToTags: {
        with: {
          tag: true,
        },
      },
    },
    orderBy: (excerpt, { desc }) => [desc(excerpt.dateAdded)],
  });

  return excerpts.map((exc) => ({
    id: exc.id,
    title: exc.title,
    body: exc.body,
    dateAdded: exc.dateAdded,
    desertFigureName: exc.desertFigure.fullName,
    status: exc.status.name,
    reference: exc.articleUrl ?? exc.reference?.title,
    tags: exc.excerptToTags.map((excerptTag) => ({
      name: excerptTag.tag.name,
      id: excerptTag.tag.id,
    })),
  }));
}
