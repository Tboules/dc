import { excerpts } from "@/lib/database/schema/excerpts";
import { desertFigures } from "@/lib/database/schema/desertFigures";
import { references } from "@/lib/database/schema/references";
import { excerptTags } from "@/lib/database/schema/excerptTags";
import { contentStatus } from "@/lib/database/schema/content_status";
import { tags } from "@/lib/database/schema/tags";
import { eq, ne, sql } from "drizzle-orm";
import { pgMaterializedView, pgView } from "drizzle-orm/pg-core";
import { CONTENT_STATUS } from "@/lib/enums";

export type Tag = {
  tag: string;
  tagID: string;
  statusId?: string;
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

// Excerpt Document Style View
export const excerptDocument = pgMaterializedView("excerpt_document").as(
  (qb) => {
    return qb
      .select({
        //excerpt data
        excerptId: sql<string>`${excerpts.id}`.as("excerptId"),
        excerptBody: excerpts.body,
        excerptTitle: sql<string>`${excerpts.title}`.as("excerptTitle"),
        excerptDateAdded: sql<Date>`${excerpts.dateAdded}`.as(
          "excerptDateAdded",
        ),
        excerptCreatedBy: sql<string>`${excerpts.createdBy}`.as(
          "excerptCreatedBy",
        ),

        //desert figure data
        desertFigureName: sql<string>`${desertFigures.fullName}`.as(
          "desertFigureName",
        ),
        desertFigureId: sql<string>`${desertFigures.id}`.as("desertFigureId"),
        desertFigureThumbnail: sql<string>`${desertFigures.thumbnail}`.as(
          "desertFigureThumbnail",
        ),

        //reference data
        referenceTitle: sql<string>`${references.title}`.as("referenceTitle"),
        referenceId: sql<string>`${references.id}`.as("referenceId"),
        referenceSource:
          sql<string>`COALESCE(${references.source}, ${excerpts.articleUrl})`.as(
            "referenceSource",
          ),
        referenceCover: sql<string>`${references.cover}`.as("referenceCover"),

        //excerpt status info
        status: sql<string>`${contentStatus.name}`.as("statusName"),
        statusId: sql<string>`${contentStatus.id}`.as("statusId"),

        //tag data
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

/*--------------------------------------------*/
// Unpublished Excerpts View

export type LiveExcerptsView = ExcerptDocument & {
  desertFigureStatus: string;
};

export const liveExcerptsView = pgView("live_excerpts_view").as((qb) => {
  return qb
    .select({
      //excerpt data
      excerptId: sql<string>`${excerpts.id}`.as("excerptId"),
      excerptBody: excerpts.body,
      excerptTitle: sql<string>`${excerpts.title}`.as("excerptTitle"),
      excerptDateAdded: sql<Date>`${excerpts.dateAdded}`.as("excerptDateAdded"),
      excerptCreatedBy: sql<string>`${excerpts.createdBy}`.as(
        "excerptCreatedBy",
      ),

      //desert figure data
      desertFigureName: sql<string>`${desertFigures.fullName}`.as(
        "desertFigureName",
      ),
      desertFigureId: sql<string>`${desertFigures.id}`.as("desertFigureId"),
      desertFigureThumbnail: sql<string>`${desertFigures.thumbnail}`.as(
        "desertFigureThumbnail",
      ),
      desertFigureStatus: sql<string>`${desertFigures.statusId}`.as(
        "desertFigureStatus",
      ),

      //reference data
      referenceTitle: sql<string>`${references.title}`.as("referenceTitle"),
      referenceId: sql<string>`${references.id}`.as("referenceId"),
      referenceSource:
        sql<string>`COALESCE(${references.source}, ${excerpts.articleUrl})`.as(
          "referenceSource",
        ),
      referenceCover: sql<string>`${references.cover}`.as("referenceCover"),

      //excerpt status info
      status: sql<string>`${contentStatus.name}`.as("statusName"),
      statusId: sql<string>`${contentStatus.id}`.as("statusId"),

      //tag data
      tags: sql<Tag[]>`
          json_agg(
            json_build_object(
              'tagID', ${tags.id},
              'tag', ${tags.name},
              'tagStatus', ${tags.statusId}
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
});
