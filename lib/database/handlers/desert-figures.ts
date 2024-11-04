import db from "@/lib/database";
import {
  DesertFigure,
  desertFigures,
} from "@/lib/database/schema/desertFigures";
import { eq, sql } from "drizzle-orm";

export async function selectDesertFigureById(figureId: string) {
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
      SELECT * FROM ${desertFigures}
      WHERE SIMILARITY( ${desertFigures.fullName}, ${searchValue}) > 0.1
      ORDER BY SIMILARITY(${desertFigures.fullName}, ${searchValue}) DESC
      LIMIT 5
    `,
  );

  return results.rows.map((row: any) => ({
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
  })) as DesertFigure[];
}
