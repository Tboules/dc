import { pgTable, smallint, text, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export enum RevisionType {
  EXCERPT = 1,
  DESERT_FIGURE = 2,
}

export const revisionRequest = pgTable("revision_request", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdBy: text("added_by")
    .references(() => users.id)
    .notNull(),
  targetId: uuid("target_id").notNull(),
  description: text("description").notNull(),
  type: smallint("type").default(1).notNull(),
});

export const revisionRequestSchema = createSelectSchema(revisionRequest);
export const newRevisionRequestSchema = createInsertSchema(revisionRequest);

export type RevisionRequest = z.infer<typeof revisionRequestSchema>;
export type NewRevisionRequest = z.infer<typeof newRevisionRequestSchema>;
