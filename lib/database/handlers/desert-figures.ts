"use server";

import db from "@/lib/database";
import {
  desertFigures,
  desertFigureSchema,
} from "@/lib/database/schema/desertFigures";
import { eq, sql } from "drizzle-orm";

export async function selectDesertFigureById(figureId: string | undefined) {
  if (!figureId) return;

  try {
    const figure = await db
      .select()
      .from(desertFigures)
      .where(eq(desertFigures.id, figureId));

    if (figure && figure[0]) return figure[0];
  } catch (error) {
    console.error(error);
  }
}

export async function searchForDesertFigure(searchValue: string) {
  const results = await db.execute(
    sql`
       WITH similarity_figure_score as (
          select similarity(${desertFigures.fullName}, ${searchValue}) as sim_score, *
          from desert_figure
      ) select *
      from similarity_figure_score
      where sim_score > 0
      order by sim_score desc
      LIMIT 5
   `,
  );

  return results.rows.map((row: any) => {
    const figure = {
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      title: row.title,
      epithet: row.epithet,
      type: row.type,
      thumbnail: row.thumbnail,
      dateAdded: row.date_added,
      lastUpdated: row.last_updated,
      createdBy: row.added_by,
      fullName: row.full_name,
    };

    const validFigure = desertFigureSchema.parse(figure);

    return validFigure;
  });
}
