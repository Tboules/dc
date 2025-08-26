import {
  boolean,
  index,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { excerpts } from "@/lib/database/schema/excerpts";
import { users } from "@/lib/database/schema/users";

export const excerptLove = pgTable(
  "excerpt_love",
  {
    excerptId: uuid("excerpt_id")
      .notNull()
      .references(() => excerpts.id),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    dateAdded: timestamp("date_added").defaultNow().notNull(),
    lastUpdated: timestamp("last_updated").defaultNow().notNull(),
    active: boolean("active").default(true).notNull(),
  },
  (el) => [primaryKey({ columns: [el.excerptId, el.userId] })],
);
