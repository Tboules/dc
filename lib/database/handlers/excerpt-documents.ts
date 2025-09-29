import { excerptDocument, excerptLove } from "@/lib/database/schema";
import db from "@/lib/database";
import { sql, eq } from "drizzle-orm";
import { ExcerptDocument } from "../schema/views";
import { handleProtectedHandler } from "@/lib/utils/auth";
import { USER_ROLES } from "@/lib/enums";

export interface ExcerptDocumentWithLovedInfo extends ExcerptDocument {
  loveCount: number;
  lovedByUser: boolean;
}

export const selectEDWithLoveInfo = (userId: string) => {
  const lovedSubQuery = db
    .select({
      excerptId: excerptLove.excerptId,
      loveCount: sql<number>`COUNT(*)`.as("loveCount"),
      lovedByUser: sql<boolean>`BOOL_OR(${excerptLove.userId} = ${userId})`.as(
        "lovedByUser",
      ),
    })
    .from(excerptLove)
    .where(eq(excerptLove.active, true))
    .groupBy(excerptLove.excerptId)
    .as("love_sub");

  return db
    .select({
      excerptId: excerptDocument.excerptId,
      excerptBody: excerptDocument.excerptBody,
      excerptTitle: excerptDocument.excerptTitle,
      excerptDateAdded: excerptDocument.excerptDateAdded,

      desertFigureName: excerptDocument.desertFigureName,
      desertFigureId: excerptDocument.desertFigureId,
      desertFigureThumbnail: excerptDocument.desertFigureThumbnail,

      referenceTitle: excerptDocument.referenceTitle,
      referenceId: excerptDocument.referenceId,
      referenceSource: excerptDocument.referenceSource,
      referenceCover: excerptDocument.referenceCover,

      status: excerptDocument.status,
      statusId: excerptDocument.statusId,
      excerptCreatedBy: excerptDocument.excerptCreatedBy,

      tags: excerptDocument.tags,
      searchableTags: excerptDocument.searchableTags,

      loveCount: sql<number>`COALESCE(${lovedSubQuery.loveCount}, 0)::int`.as(
        "loveCount",
      ),
      lovedByUser:
        sql<boolean>`COALESCE(${lovedSubQuery.lovedByUser}, false)`.as(
          "lovedByUser",
        ),
    })
    .from(excerptDocument)
    .leftJoin(
      lovedSubQuery,
      eq(lovedSubQuery.excerptId, excerptDocument.excerptId),
    )
    .$dynamic();
};

export async function refreshExcerptDocuments() {
  await handleProtectedHandler(USER_ROLES.admin);
  await db.refreshMaterializedView(excerptDocument);
}
