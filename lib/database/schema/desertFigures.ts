import { pgTable, text, timestamp, uuid, smallint } from "drizzle-orm/pg-core";
import { users } from "./users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { ObjectValues } from "@/lib/utils";

export const DESERT_FIGURE_TYPE = {
  AUTHOR: 1,
  SUBJECT: 2,
} as const;

export type DesertFigureType = ObjectValues<typeof DESERT_FIGURE_TYPE>;

export const DESERT_FIGURE_TITLE = {
  SAINT: "Saint",
  DOCTOR: "Doctor",
  FATHER: "Father",
  MOTHER: "Mother",
} as const;

export type DesertFigureTitle = ObjectValues<typeof DESERT_FIGURE_TITLE>;

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

export const desertFigureSchema = createSelectSchema(desertFigures);
export const newDesertFigureSchema = createInsertSchema(desertFigures);

export type DesertFigure = z.infer<typeof desertFigureSchema>;
export type NewDesertFigure = z.infer<typeof newDesertFigureSchema>;
