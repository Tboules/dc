import {
  boolean,
  index,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { excerpts } from "@/lib/database/schema/excerpts";

export const excerptLove = pgTable(
  "excerpt_love",
  {
    excerptId: uuid("excerpt_id")
      .notNull()
      .references(() => excerpts.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => excerpts.id),
    dateAdded: timestamp("date_added").defaultNow().notNull(),
    lastUpdated: timestamp("last_updated").defaultNow().notNull(),
    active: boolean("active").default(true).notNull(),
  },
  (el) => [primaryKey({ columns: [el.excerptId, el.userId] })],
);
