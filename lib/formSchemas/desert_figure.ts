import { desertFigure } from "@/lib/database/drizzle/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export enum EDesertFigureTypes {
  SUBJECT = 2,
  AUTHOR = 1,
}

export type IDesertFigure = typeof desertFigure.$inferSelect;
export type INewDesertFigure = typeof desertFigure.$inferInsert;

export const desertFigureInsertSchema = createInsertSchema(desertFigure);
export const desertFigureSelectSchema = createSelectSchema(desertFigure);
