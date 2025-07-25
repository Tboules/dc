"use server";

import db from "@/lib/database";
import { handleProtectedHandler } from "@/lib/utils/auth";
import { UserExcerpt } from "@/app/user/_components/columns";
import { and, count, eq, sql } from "drizzle-orm";
import { excerpts, excerptDocument } from "@/lib/database/schema";
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

  const hasSearch = q.trim().length > 0;

  const searchQuery = hasSearch
    ? sql`
      ${excerptDocument.excerptCreatedBy} = ${session.user.id ?? ""} AND
      (
        ${excerptDocument.excerptId} @@@ paradedb.match('body', ${q}, distance => 1)
         OR ${excerptDocument.excerptId} @@@ paradedb.match('excerptTitle', ${q}, distance => 1)
        OR ${excerptDocument.excerptId} @@@ paradedb.match('referenceTitle', ${q}, distance => 1)
        OR ${excerptDocument.excerptId} @@@ paradedb.match('tagsSearchable', ${q}, distance => 1)
        OR ${excerptDocument.excerptId} @@@ paradedb.match('desertFigureName', ${q}, distance => 1)
      )
    `
    : sql`true`;

  const orderQuery = hasSearch
    ? sql`paradedb.score(${excerptDocument.excerptId}) DESC`
    : sql`${excerptDocument.excerptDateAdded} DESC`; //

  const excerptRows = await db
    .select({
      id: excerptDocument.excerptId,
      title: excerptDocument.excerptTitle,
      body: excerptDocument.excerptBody,
      dateAdded: excerptDocument.excerptDateAdded,
      desertFigureName: excerptDocument.desertFigureName,
      status: excerptDocument.status,
      tags: excerptDocument.tags,
      reference: excerptDocument.referenceTitle,
    })
    .from(excerptDocument)
    .where(
      and(
        eq(excerptDocument.excerptCreatedBy, session.user.id ?? ""),
        searchQuery,
      ),
    )
    .orderBy(orderQuery)
    .limit(pageLimit)
    .offset(page * pageLimit);

  return excerptRows;
}
