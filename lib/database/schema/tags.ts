import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { contentStatus } from "./content_status";

export const tags = pgTable("tag", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  dateAdded: timestamp("date_added").defaultNow(),
  createdBy: text("added_by").references(() => users.id),
  statusId: uuid("status_id")
    .references(() => contentStatus.id)
    .notNull()
    //pull the uuid for draft
    .default("e3884d7e-2b30-40b0-bc77-c075ae4739cb"),
});

export const tagSchema = createSelectSchema(tags);
export const newTagSchema = createInsertSchema(tags);

export type Tag = z.infer<typeof tagSchema>;
export type NewTag = z.infer<typeof newTagSchema>;
