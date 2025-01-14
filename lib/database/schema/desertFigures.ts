import { pgTable, text, timestamp, uuid, smallint } from "drizzle-orm/pg-core";
import { users } from "./users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { normalizeStringToNull } from "@/lib/utils";

export const desertFigures = pgTable("desert_figure", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  title: text("title"),
  epithet: text("epithet"),
  fullName: text("full_name").notNull(),
  type: smallint("type").default(1).notNull(),
  thumbnail: text("thumbnail"),
  dateAdded: timestamp("date_added").defaultNow(),
  lastUpdated: timestamp("last_updated").defaultNow(),
  createdBy: text("added_by").references(() => users.id),
});

export type DesertFigureDirectInsert = typeof desertFigures.$inferInsert;

export const desertFigureSchema = createSelectSchema(desertFigures, {
  dateAdded: z.coerce.date(),
  lastUpdated: z.coerce.date(),
});

export const newDesertFigureSchema = createInsertSchema(desertFigures, {
  firstName: (s) => s.firstName.min(1, "First Name is required"),
  thumbnail: () => z.custom<File>(),
  fullName: (s) => s.fullName.optional(),
  lastName: (s) => s.lastName.transform(normalizeStringToNull),
  epithet: (s) => s.epithet.transform(normalizeStringToNull),
  title: (s) => s.title.transform(normalizeStringToNull),
});

export type DesertFigure = z.infer<typeof desertFigureSchema>;
export type NewDesertFigure = z.infer<typeof newDesertFigureSchema>;

export type DbDesertFigure = {
  id: string;
  first_name: string;
  last_name: string | null;
  title: string | null;
  epithet: string | null;
  type: number;
  thumbnail: string | null;
  date_added: Date | null;
  last_updated: Date | null;
  added_by: string | null;
  full_name: string;
};
