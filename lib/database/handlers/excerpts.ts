"use server";

import db from "@/lib/database";
import { handleProtectedHandler, serverAuthSession } from "@/lib/utils/auth";
import { UserExcerpt } from "@/app/user/_components/columns";
import { and, count, eq, ne, sql, desc, or } from "drizzle-orm";
import {
  excerpts,
  excerptDocument,
  liveExcerptsView,
} from "@/lib/database/schema";
import {
  GlobalSearchParams,
  UserContentSearchParams,
} from "@/lib/utils/params";
import {
  ExcerptDocumentWithLovedInfo,
  selectEDWithLoveInfo,
} from "@/lib/database/handlers/excerpt-documents";
import { CONTENT_STATUS, USER_ROLES } from "@/lib/enums";

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
      ${liveExcerptsView.excerptCreatedBy} = ${session.user.id ?? ""} AND
      (
        ${liveExcerptsView.excerptId} @@@ paradedb.match('body', ${q}, distance => 1)
         OR ${liveExcerptsView.excerptId} @@@ paradedb.match('excerptTitle', ${q}, distance => 1)
        OR ${liveExcerptsView.excerptId} @@@ paradedb.match('referenceTitle', ${q}, distance => 1)
        OR ${liveExcerptsView.excerptId} @@@ paradedb.match('tagsSearchable', ${q}, distance => 1)
        OR ${liveExcerptsView.excerptId} @@@ paradedb.match('desertFigureName', ${q}, distance => 1)
      )
    `
    : sql`true`;

  const orderQuery = hasSearch
    ? sql`paradedb.score(${liveExcerptsView.excerptId}) DESC`
    : sql`${liveExcerptsView.excerptDateAdded} DESC`; //

  const excerptRows = await db
    .select({
      id: liveExcerptsView.excerptId,
      title: liveExcerptsView.excerptTitle,
      body: liveExcerptsView.excerptBody,
      dateAdded: liveExcerptsView.excerptDateAdded,
      desertFigureName: liveExcerptsView.desertFigureName,
      status: liveExcerptsView.status,
      tags: liveExcerptsView.tags,
      reference: liveExcerptsView.referenceTitle,
    })
    .from(liveExcerptsView)
    .where(
      and(
        eq(liveExcerptsView.excerptCreatedBy, session.user.id ?? ""),
        searchQuery,
      ),
    )
    .orderBy(orderQuery)
    .limit(pageLimit)
    .offset(page * pageLimit);

  return excerptRows;
}

// grab a excerpt document by id
export async function handleSelectExcerptById(
  exceptId: string,
): Promise<ExcerptDocumentWithLovedInfo> {
  const session = await serverAuthSession();
  const userId = session?.user.id ?? "no user id found";

  const res = await selectEDWithLoveInfo(userId).where(
    eq(excerptDocument.excerptId, exceptId),
  );

  return res[0];
}

export async function selectRandomExcerptsForDashboard({
  q,
}: GlobalSearchParams) {
  const session = await serverAuthSession();
  const userId = session?.user.id ?? "no user id found";
  const hasSearch = q.trim().length > 0;

  const searchQuery = hasSearch
    ? sql`
        ${excerptDocument.excerptId} @@@ paradedb.match('body', ${q}, distance => 1)
         OR ${excerptDocument.excerptId} @@@ paradedb.match('excerptTitle', ${q}, distance => 1)
        OR ${excerptDocument.excerptId} @@@ paradedb.match('referenceTitle', ${q}, distance => 1)
        OR ${excerptDocument.excerptId} @@@ paradedb.match('tagsSearchable', ${q}, distance => 1)
        OR ${excerptDocument.excerptId} @@@ paradedb.match('desertFigureName', ${q}, distance => 1)
    `
    : sql`true`;

  const orderQuery = hasSearch
    ? sql`paradedb.score(${excerptDocument.excerptId}) DESC`
    : sql`RANDOM()`;

  const res = await selectEDWithLoveInfo(userId)
    .where(
      and(eq(excerptDocument.status, CONTENT_STATUS.PUBLISHED), searchQuery),
    )
    .orderBy(orderQuery)
    .limit(5);

  return res;
}

export async function selectUnpublishedExcerpts() {
  await handleProtectedHandler(USER_ROLES.admin);

  const res = await db
    .select()
    .from(liveExcerptsView)
    .where(
      or(
        eq(liveExcerptsView.status, CONTENT_STATUS.DRAFT),
        eq(liveExcerptsView.status, CONTENT_STATUS.FLAGGED),
      ),
    )
    .orderBy(desc(liveExcerptsView.excerptDateAdded));

  return res;
}
