import { pgTable, text, timestamp, uuid, smallint } from "drizzle-orm/pg-core";
import { users } from "./users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export enum DesertFigureType {
  SUBJECT = 2,
  AUTHOR = 1,
}

export const desertFigures = pgTable("desert_figure", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  title: text("title"),
  epithet: text("epithet"),
  type: smallint("type").default(1).notNull(),
  thumbnail: text("thumbnail"),
  dateAdded: timestamp("date_added").defaultNow(),
  lastUpdated: timestamp("last_updated").defaultNow(),
  createdBy: text("added_by").references(() => users.id),
});

export const newDesertFigureSchema = createInsertSchema(desertFigures);
export const desertFigureSchema = createSelectSchema(desertFigures);

export type DesertFigure = z.infer<typeof desertFigureSchema>;
export type NewDesertFigure = z.infer<typeof newDesertFigureSchema>;
