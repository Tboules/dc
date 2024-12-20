import { uuid, pgTable, text } from "drizzle-orm/pg-core";

export const references = pgTable("reference", {
  id: uuid("id").defaultRandom().primaryKey(),
  externalId: text("external_id").notNull(),
  source: text("source").notNull().default("open_library"),
  title: text("title").notNull(),
  subTitle: text("sub_title"),
  author: text("author").notNull(),
  cover: text("cover"),
});
