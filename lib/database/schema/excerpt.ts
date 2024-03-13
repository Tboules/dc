import { pgTable, smallint, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { desertFigures } from "./desertFigure";
import { users } from "./users";

export enum EExcerptType {
  STORY = 2,
  QUOTE = 1,
}

export const excerpts = pgTable("excerpt", {
  id: uuid("id").defaultRandom().primaryKey(),
  body: text("body").notNull(),
  type: smallint("type").default(1).notNull(),
  title: text("title").notNull(),
  reference: text("reference"),
  desertFigureID: uuid("desert_figure_id").references(() => desertFigures.id),
  dateAdded: timestamp("date_added").defaultNow(),
  lastUpdated: timestamp("last_updated").defaultNow(),
  createdBy: text("added_by").references(() => users.id),
});
