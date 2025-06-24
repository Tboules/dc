"use server";

import db from "@/lib/database";
import {
  desertFigures,
  desertFigureSchema,
} from "@/lib/database/schema/desertFigures";
import { serverAuthSession } from "@/lib/utils/auth";
import { eq, sql } from "drizzle-orm";
import { contentStatus } from "../schema";

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
      statusId: row.status_id,
    };

    const validFigure = desertFigureSchema.parse(figure);

    return validFigure;
  });
}

// Definition and function for querying User Desert Figures

export type UserDesertFigure = {
  id: string;
  fullName: string;
  dateAdded: Date | null;
  status: string;
};

export async function selectUserDesertFigures(): Promise<UserDesertFigure[]> {
  const session = await serverAuthSession();
  if (!session) throw new Error("No user found");

  const desertFigureRows = await db
    .select({
      id: desertFigures.id,
      fullName: desertFigures.fullName,
      status: contentStatus.name,
      dateAdded: desertFigures.dateAdded,
    })
    .from(desertFigures)
    .innerJoin(contentStatus, eq(contentStatus.id, desertFigures.statusId));

  return desertFigureRows;
}
