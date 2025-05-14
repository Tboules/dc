"use server";

import db from "@/lib/database";
import { serverAuthSession } from "@/lib/utils/auth";
import { UserExcerpt } from "@/app/user/_components/columns";
import { count, eq } from "drizzle-orm";
import { excerpts } from "@/lib/database/schema/excerpts";
import { UserContentSearchParams } from "@/lib/utils/params";

export async function selectUserExcerptCount() {
  const session = await serverAuthSession();
  if (!session) throw new Error("No user found");

  const excerptCount = await db
    .select({ count: count() })
    .from(excerpts)
    .where(eq(excerpts.createdBy, session.user.id ?? ""));

  return excerptCount[0].count;
}

export async function selectUserExcerpts({
  page,
  pageLimit,
  q,
}: UserContentSearchParams): Promise<UserExcerpt[]> {
  const session = await serverAuthSession();
  if (!session) throw new Error("No user found");

  console.log(q);

  // make sure to filter by user
  const excerpts = await db.query.excerpts.findMany({
    limit: pageLimit,
    offset: page * pageLimit,
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

// example from Chatp gpt of how to do it using drizzle query builder
// const rows = await db
//   .select({
//     id: excerpt.id,
//     title: excerpt.title,
//     body: excerpt.body,
//     dateAdded: excerpt.dateAdded,
//     desertFigure: desertFigure.fullName,
//     status: contentStatus.name,
//     reference: sql`COALESCE(${excerpt.articleUrl}, ${ref.title})`.as("reference"),
//     tags: sql<string>`string_agg(${tag.name}, ', ' ORDER BY ${tag.name})`.as("tags"),
//     score: sql<number>`paradedb.score(${excerpt.id})`.as("score"),
//   })
//   .from(excerpt)
//   .innerJoin(desertFigure, eq(desertFigure.id, excerpt.desertFigureId))
//   .innerJoin(contentStatus, eq(contentStatus.id, excerpt.statusId))
//   .leftJoin(ref, eq(ref.id, excerpt.referenceId))
//   .innerJoin(excerptTag, eq(excerptTag.excerptId, excerpt.id))
//   .innerJoin(tag, eq(tag.id, excerptTag.tagId))
//   .where(sql`
//     ${excerpt.createdBy} = ${session.user.id ?? ""} AND
//     (
//       ${excerpt.id}        @@@ paradedb.match('title',  ${q}, distance => 1)
//       OR ${excerpt.id}      @@@ paradedb.match('body',   ${q}, distance => 1)
//       OR ${tag.id}          @@@ paradedb.match('name',   ${q}, distance => 1)
//       OR ${desertFigure.id} @@@ paradedb.match('full_name', ${q}, distance => 1)
//     )
//   `)
//   .groupBy(
//     excerpt.id,
//     desertFigure.fullName,
//     contentStatus.name,
//     ref.title,
//     excerpt.articleUrl
//   )
//   .orderBy(sql`paradedb.score(${excerpt.id}) DESC`)
//   .limit(pageLimit)
//   .offset(page * pageLimit);
//
