"use server";

import db from "@/lib/database";
import { handleProtectedHandler } from "@/lib/utils/auth";
import { UserExcerpt, Tag } from "@/app/user/_components/columns";
import { and, count, eq, sql } from "drizzle-orm";
import {
  excerpts,
  contentStatus,
  desertFigures,
  tags,
  excerptTags,
} from "@/lib/database/schema";
import { UserContentSearchParams } from "@/lib/utils/params";

export async function selectUserExcerptCount() {
  const session = await handleProtectedHandler();

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
  const session = await handleProtectedHandler();

  console.log(q);

  const hasSearch = q.trim().length > 0;

  const searchQuery = hasSearch
    ? sql`
      ${excerpts.createdBy} = ${session.user.id ?? ""} AND
      (
        ${excerpts.id}        @@@ paradedb.match('title',  ${q}, distance => 1)
        OR ${excerpts.id}      @@@ paradedb.match('body',   ${q}, distance => 1)
        OR ${tags.id}          @@@ paradedb.match('name',   ${q}, distance => 1)
        OR ${desertFigures.id} @@@ paradedb.match('full_name', ${q}, distance => 1)
      )
    `
    : sql`true`;

  const orderQuery = hasSearch
    ? sql`paradedb.score(${excerpts.id}) DESC`
    : sql`${excerpts.dateAdded} DESC`; //

  const excerptRows = await db
    .select({
      id: excerpts.id,
      title: excerpts.title,
      body: excerpts.body,
      dateAdded: excerpts.dateAdded,
      desertFigureName: desertFigures.fullName,
      status: contentStatus.name,
      tags: sql<Tag[]>`
        json_agg(
          json_build_object(
            'id', ${tags.id},
            'name', ${tags.name}
          )
        )
      `,
    })
    .from(excerpts)
    .innerJoin(desertFigures, eq(desertFigures.id, excerpts.desertFigureID))
    .innerJoin(contentStatus, eq(contentStatus.id, excerpts.statusId))
    .innerJoin(excerptTags, eq(excerptTags.excerptId, excerpts.id))
    .innerJoin(tags, eq(tags.id, excerptTags.tagId))
    .where(and(eq(excerpts.createdBy, session.user.id ?? ""), searchQuery))
    .groupBy(excerpts.id, desertFigures.fullName, contentStatus.name)
    .orderBy(orderQuery)
    .limit(pageLimit)
    .offset(page * pageLimit);

  return excerptRows.map((r) => ({
    ...r,
    tags: r.tags as Tag[],
  }));
}
