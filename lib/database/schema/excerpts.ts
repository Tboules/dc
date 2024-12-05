import { pgTable, smallint, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { desertFigures } from "./desertFigures";
import { users } from "./users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

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
  reference: text("reference"),
  desertFigureID: uuid("desert_figure_id").references(() => desertFigures.id),
  dateAdded: timestamp("date_added").defaultNow(),
  lastUpdated: timestamp("last_updated").defaultNow(),
  createdBy: text("added_by").references(() => users.id),
});

export const excerptSchema = createSelectSchema(excerpts);
export const newExcerptSchema = createInsertSchema(excerpts, {
  reference: (z) => z.reference.url(),
});

export const formExcerptSchema = newExcerptSchema.extend({
  tags: z.array(OptionSchema),
});

export type Excerpt = z.infer<typeof excerptSchema>;
export type NewExcerpt = z.infer<typeof newExcerptSchema>;
export type FormExcerpt = z.infer<typeof formExcerptSchema>;
