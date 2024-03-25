import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { excerpts } from "./excerpts";
import { tags } from "./tags";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

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

export const excerptTagSchema = createSelectSchema(excerptTags);
export const newExcerptTagSchema = createInsertSchema(excerptTags);

export type ExcerptTag = z.infer<typeof excerptTagSchema>;
export type NewExcerptTag = z.infer<typeof newExcerptTagSchema>;
