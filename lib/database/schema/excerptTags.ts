import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { excerpts } from "./excerpts";
import { tags } from "./tags";

export const excerptTags = pgTable(
  "excerpt_tag",
  {
    excerptId: uuid("excerpt_id")
      .notNull()
      .references(() => excerpts.id),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id),
  },
  (tag) => ({
    compoundKey: primaryKey({
      columns: [tag.tagId, tag.excerptId],
    }),
  }),
);
