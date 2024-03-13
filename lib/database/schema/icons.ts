import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { desertFigures } from "./desertFigures";

export const icons = pgTable("icon", {
  id: uuid("id").defaultRandom().primaryKey(),
  file: text("file").notNull(),
  title: text("title"),
  description: text("description"),
  desertFigureID: uuid("desert_figure_id").references(() => desertFigures.id),
  dateAdded: timestamp("date_added").defaultNow(),
  lastUpdated: timestamp("last_updated").defaultNow(),
  createdBy: text("added_by").references(() => users.id),
});
