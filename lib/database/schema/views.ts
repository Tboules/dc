import { excerpts } from "@/lib/database/schema/excerpts";
import { desertFigures } from "@/lib/database/schema/desertFigures";
import { references } from "@/lib/database/schema/references";
import { excerptTags } from "@/lib/database/schema/excerptTags";
import { contentStatus } from "@/lib/database/schema/content_status";
import { tags } from "@/lib/database/schema/tags";

import { pgMaterializedView, QueryBuilder } from "drizzle-orm/pg-core";
import { and, eq, sql } from "drizzle-orm";
import { excerptLove } from "./excerptLove";
import db from "..";

export type Tag = {
  tag: string;
  tagID: string;
};

export type ExcerptDocument = {
  excerptId: string;
  excerptBody: string;
  excerptTitle: string;
  excerptDateAdded: Date;
  desertFigureName: string;
  desertFigureId: string;
  desertFigureThumbnail?: string;
  referenceTitle?: string;
  referenceId?: string;
  referenceSource?: string;
  referenceCover?: string;
  status: string;
  statusId: string;
  excerptCreatedBy: string;
  tags: Tag[];
  searchableTags: string;
};

export type ExcerptDocumentDesertFigure = Pick<
  ExcerptDocument,
  "desertFigureName" | "desertFigureId" | "desertFigureThumbnail"
>;

export type ExcerptDocumentReference = Pick<
  ExcerptDocument,
  "referenceTitle" | "referenceId" | "referenceSource" | "referenceCover"
>;

export const excerptDocumentsWithLoveInfo = (userId: string) => {
  return db
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

  // return qb
  //   .select({
  //     ...excerptDocument._.selectedFields,
  //     loveCount: sql<number>`COALESCE(${lovedSubquery.loveCount}, 0)`.as(
  //       "loveCount",
  //     ),
  //     lovedByUser:
  //       sql<boolean>`COALESCE(${lovedSubquery.lovedByUser}, false)`.as(
  //         "lovedByUser",
  //       ),
  //   })
  //   .from(excerptDocument)
  //   .leftJoin(
  //     lovedSubquery,
  //     eq(lovedSubquery.excerptId, excerptDocument.excerptId),
  //   );
};

// Excerpt Document Style View
export const excerptDocument = pgMaterializedView("excerpt_document").as(
  (qb) => {
    return qb
      .select({
        excerptId: sql<string>`${excerpts.id}`.as("excerptId"),
        excerptBody: excerpts.body,
        excerptTitle: sql<string>`${excerpts.title}`.as("excerptTitle"),
        excerptDateAdded: sql<Date>`${excerpts.dateAdded}`.as(
          "excerptDateAdded",
        ),
        desertFigureName: sql<string>`${desertFigures.fullName}`.as(
          "desertFigureName",
        ),
        desertFigureId: sql<string>`${desertFigures.id}`.as("desertFigureId"),
        desertFigureThumbnail: sql<string>`${desertFigures.thumbnail}`.as(
          "desertFigureThumbnail",
        ),
        referenceTitle: sql<string>`${references.title}`.as("referenceTitle"),
        referenceId: sql<string>`${references.id}`.as("referenceId"),
        referenceSource:
          sql<string>`COALESCE(${references.source}, ${excerpts.articleUrl})`.as(
            "referenceSource",
          ),
        referenceCover: sql<string>`${references.cover}`.as("referenceCover"),
        status: sql<string>`${contentStatus.name}`.as("statusName"),
        statusId: sql<string>`${contentStatus.id}`.as("statusId"),
        excerptCreatedBy: sql<string>`${excerpts.createdBy}`.as(
          "excerptCreatedBy",
        ),
        tags: sql<Tag[]>`
          json_agg(
            json_build_object(
              'tagID', ${tags.id},
              'tag', ${tags.name}
            )
          )::jsonb
        `.as("tags"),
        searchableTags: sql<string>`
          string_agg(${tags.name}, ', ')
        `.as("tagsSearchable"),
      })
      .from(excerpts)
      .leftJoin(desertFigures, eq(desertFigures.id, excerpts.desertFigureID))
      .leftJoin(references, eq(references.id, excerpts.referenceId))
      .leftJoin(contentStatus, eq(contentStatus.id, excerpts.statusId))
      .leftJoin(excerptTags, eq(excerptTags.excerptId, excerpts.id))
      .leftJoin(tags, eq(excerptTags.tagId, tags.id))
      .groupBy(
        excerpts.id,
        excerpts.body,
        excerpts.title,
        desertFigures.fullName,
        desertFigures.id,
        references.title,
        references.id,
        references.source,
        references.cover,
        contentStatus.name,
        contentStatus.id,
      );
  },
);
