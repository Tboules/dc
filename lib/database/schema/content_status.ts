import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const contentStatus = pgTable("content_status", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  dateAdded: timestamp("date_added").notNull().defaultNow(),
});

export const contentStatusSchema = createSelectSchema(contentStatus);
export const newContentStatusSchema = createInsertSchema(contentStatus);

export type ContentStatus = z.infer<typeof contentStatusSchema>;
export type NewContentStatus = z.infer<typeof newContentStatusSchema>;
