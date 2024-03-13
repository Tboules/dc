import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const tags = pgTable("tag", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  dateAdded: timestamp("date_added").defaultNow(),
  createdBy: text("added_by").references(() => users.id),
});
