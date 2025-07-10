import { excerpts } from "@/lib/database/schema/excerpts";
import { desertFigures } from "@/lib/database/schema/desertFigures";
import { references } from "@/lib/database/schema/references";
import { excerptTags } from "@/lib/database/schema/excerptTags";
import { contentStatus } from "@/lib/database/schema/content_status";
import { tags } from "@/lib/database/schema/tags";

import { pgMaterializedView } from "drizzle-orm/pg-core";
import { eq, sql } from "drizzle-orm";

// Excerpt Document Style View
export const excerptDocument = pgMaterializedView("excerpt_document").as((qb) =>
  qb
    .select({
      excerptId: sql<string>`${excerpts.id}`.as("excerptId"),
      excerptBody: excerpts.body,
      excerptTitle: sql`${excerpts.title}`.as("excerptTitle"),
      desertFigureName: desertFigures.fullName,
      desertFigureId: sql<string>`${desertFigures.id}`.as("desertFigureId"),
      referenceTitle: sql<string>`${references.title}`.as("referenceTitle"),
      referenceId: sql<string>`${references.id}`.as("referenceId"),
      referenceSource: references.source,
      referenceCover: references.cover,
      status: contentStatus.name,
      statusId: sql<string>`${contentStatus.id}`.as("statusId"),
      tags: sql`
          json_agg(
            json_build_object(
              'tagID', ${tags.id},
              'tag', ${tags.name}
            )
          )
        `.as("tags"),
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
