"use server";

import db from "@/lib/database";
import { desertFigures } from "@/lib/database/schema/desertFigures";
import { handleProtectedHandler, serverAuthSession } from "@/lib/utils/auth";
import { and, count, eq, sql } from "drizzle-orm";
import { contentStatus, excerptDocument } from "@/lib/database/schema";
import {
  GlobalSearchParams,
  UserContentSearchParams,
} from "@/lib/utils/params";
import { CONTENT_STATUS } from "@/lib/enums";
import { selectEDWithLoveInfo } from "@/lib/database/handlers/excerpt-documents";
import { getStatusId } from "./content-status";

export async function selectDesertFigureById(figureId: string | undefined) {
  if (!figureId) return;

  try {
    const figure = await db
      .select()
      .from(desertFigures)
      .where(eq(desertFigures.id, figureId));

    if (figure && figure[0]) return figure[0];
  } catch (error) {
    console.error(error);
  }
}

export async function searchForDesertFigure(searchValue: string) {
  const res = await db
    .select()
    .from(desertFigures)
    .orderBy(sql`similarity(${desertFigures.fullName}, ${searchValue}) DESC`)
    .limit(5);

  return res;
}

// Definition and function for querying User Desert Figures

export type UserDesertFigure = {
  id: string;
  fullName: string;
  dateAdded: Date | null;
  status: string;
};

export async function selectUserDesertFigures({
  page,
  pageLimit,
  q,
}: UserContentSearchParams): Promise<UserDesertFigure[]> {
  const session = await handleProtectedHandler();

  const hasSearch = q.trim().length > 0;

  let desertFigureRows = await db
    .select({
      id: desertFigures.id,
      fullName: desertFigures.fullName,
      status: contentStatus.name,
      dateAdded: desertFigures.dateAdded,
    })
    .from(desertFigures)
    .innerJoin(contentStatus, eq(contentStatus.id, desertFigures.statusId))
    .where(eq(desertFigures.createdBy, session.user.id ?? ""))
    .orderBy(
      ...(hasSearch
        ? [sql`similarity(${desertFigures.fullName}, ${q}) DESC`]
        : []),
    )
    .limit(pageLimit)
    .offset(page * pageLimit);

  return desertFigureRows;
}

// function for grabbing Desert Figure Count by user
export async function selectUserDesertFigureCount(): Promise<number> {
  const session = await handleProtectedHandler();

  const countQueryResult = await db
    .select({ count: count() })
    .from(desertFigures)
    .where(eq(desertFigures.createdBy, session.user.id ?? ""));

  return countQueryResult[0].count;
}

// grab all Desert Figure with params
export async function selectDesertFigures(params: GlobalSearchParams) {
  const publishedStatusId = await getStatusId(CONTENT_STATUS.PUBLISHED);
  const hasSearch = params.q.trim().length > 0;

  let baseQuery = db
    .select({
      fullName: desertFigures.fullName,
      id: desertFigures.id,
      thumbnail: desertFigures.thumbnail,
    })
    .from(desertFigures)
    .where(eq(desertFigures.statusId, publishedStatusId));

  if (hasSearch) {
    baseQuery
      .orderBy(sql`similarity(${desertFigures.fullName}, ${params.q}) DESC`)
      .limit(5);
  }

  return await baseQuery;
}

// grab desert figure by ID with quotes
export async function selectDesertFigureDetails(
  desertFigureId: string,
  // params: GlobalSearchParams,
) {
  const session = await serverAuthSession();
  const publishedStatusId = await getStatusId(CONTENT_STATUS.PUBLISHED);
  const desertFigure = await db.query.desertFigures.findFirst({
    where: (d, { eq }) => eq(d.id, desertFigureId),
  });

  // TODO make sure to bring in published records
  const desertFigureExcerpts = await selectEDWithLoveInfo(
    session?.user.id ?? "",
  ).where(
    and(
      eq(excerptDocument.desertFigureId, desertFigureId),
      eq(excerptDocument.statusId, publishedStatusId),
    ),
  );

  return {
    desertFigure,
    desertFigureExcerpts,
  };
}

// random desert figures for dashboard
export async function selectRandomDesertFiguresForDashboard() {
  const publishedStatusId = await getStatusId(CONTENT_STATUS.PUBLISHED);

  const res = await db
    .select({
      fullName: desertFigures.fullName,
      id: desertFigures.id,
      thumbnail: desertFigures.thumbnail,
    })
    .from(desertFigures)
    .where(eq(desertFigures.statusId, publishedStatusId))
    .orderBy(sql`RANDOM()`)
    .limit(5);

  return res;
}
