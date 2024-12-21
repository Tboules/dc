import { uuid, pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const references = pgTable("reference", {
  id: uuid("id").defaultRandom().primaryKey(),
  externalId: text("external_id").notNull(),
  source: text("source").notNull().default("open_library"),
  title: text("title").notNull(),
  subTitle: text("sub_title"),
  author: text("author").notNull(),
  cover: text("cover"),
});

export const referenceSchema = createSelectSchema(references);
export const newReferenceSchema = createInsertSchema(references);

export type Reference = z.infer<typeof referenceSchema>;
export type NewReference = z.infer<typeof newReferenceSchema>;
