import { pgTable, smallint, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { desertFigures, desertFigureSchema } from "./desertFigures";
import { users } from "./users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { newReferenceSchema, references } from "./references";
import { contentStatus } from "./content_status";

export enum ExcerptType {
  STORY = 2,
  QUOTE = 1,
}

const OptionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const excerpts = pgTable("excerpt", {
  id: uuid("id").defaultRandom().primaryKey(),
  body: text("body").notNull(),
  type: smallint("type").default(1).notNull(),
  title: text("title").notNull(),
  referenceId: uuid("reference_id").references(() => references.id),
  articleUrl: text("article_url"),
  desertFigureID: uuid("desert_figure_id")
    .references(() => desertFigures.id)
    .notNull(),
  dateAdded: timestamp("date_added").defaultNow(),
  lastUpdated: timestamp("last_updated").defaultNow(),
  createdBy: text("added_by").references(() => users.id),
  statusId: uuid("status_id")
    .references(() => contentStatus.id)
    .notNull()
    //pull the uuid for draft
    .default("e3884d7e-2b30-40b0-bc77-c075ae4739cb"),
});

export const excerptSchema = createSelectSchema(excerpts);
export const newExcerptSchema = createInsertSchema(excerpts, {
  articleUrl: (s) => s.articleUrl.url().optional().or(z.literal("")),
  title: (s) => s.title.min(1, "Title Required"),
});

export const formExcerptSchema = newExcerptSchema.extend({
  tags: z.array(OptionSchema),
  reference: newReferenceSchema.optional(),
  desertFigure: desertFigureSchema,
});

export type Excerpt = z.infer<typeof excerptSchema>;
export type NewExcerpt = z.infer<typeof newExcerptSchema>;
export type FormExcerpt = z.infer<typeof formExcerptSchema>;
