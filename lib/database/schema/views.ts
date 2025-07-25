import { excerpts } from "@/lib/database/schema/excerpts";
import { desertFigures } from "@/lib/database/schema/desertFigures";
import { references } from "@/lib/database/schema/references";
import { excerptTags } from "@/lib/database/schema/excerptTags";
import { contentStatus } from "@/lib/database/schema/content_status";
import { tags } from "@/lib/database/schema/tags";

import { pgMaterializedView } from "drizzle-orm/pg-core";
import { eq, sql } from "drizzle-orm";

export type Tag = {
  tag: string;
  tagID: string;
};

// Excerpt Document Style View
export const excerptDocument = pgMaterializedView("excerpt_document").as((qb) =>
  qb
    .select({
      excerptId: sql<string>`${excerpts.id}`.as("excerptId"),
      excerptBody: excerpts.body,
      excerptTitle: sql<string>`${excerpts.title}`.as("excerptTitle"),
      excerptDateAdded: sql<Date>`${excerpts.dateAdded}`.as("excerptDateAdded"),
      desertFigureName: sql<string>`${desertFigures.fullName}`.as(
        "desertFigureName",
      ),
      desertFigureId: sql<string>`${desertFigures.id}`.as("desertFigureId"),
      desertFigureThumbnail: sql<string>`${desertFigures.thumbnail}`.as(
        "desertFigureThumbnail",
      ),
      referenceTitle: sql<string>`${references.title}`.as("referenceTitle"),
      referenceId: sql<string>`${references.id}`.as("referenceId"),
      referenceSource: sql<string>`${references.source}`.as("referenceSource"),
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
      searchableTags: sql`
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
    ),
);
