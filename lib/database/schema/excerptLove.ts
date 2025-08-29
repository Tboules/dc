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
import { sql } from "drizzle-orm";
import { WithRequired } from "@/@types/helper-types";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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
  (el) => [
    primaryKey({ columns: [el.excerptId, el.userId] }),
    index("excerpt_love_excerpt_active_idx")
      .on(el.excerptId)
      .where(sql`${el.active} IS TRUE`),
    index("excerpt_love_user_active_idx")
      .on(el.userId)
      .where(sql`${el.active} IS TRUE`),
  ],
);

export const excerptUpsertSchema = createInsertSchema(excerptLove).extend({
  active: z.boolean(),
});

export type ExcerptLoveUpsert = z.infer<typeof excerptUpsertSchema>;
