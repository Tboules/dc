"use server";

import db from "@/lib/database";
import {
  DesertFigure,
  desertFigures as df,
} from "@/lib/database/schema/desertFigures";
import { sql } from "drizzle-orm";

export async function findDesertFigure(val: string) {
  val = "%" + val + "%";
  console.log(val);
  try {
    const res = await db
      .select()
      .from(df)
      .where(
        sql`concat_ws(' ', ${df.title}, ${df.firstName}, ${df.lastName}, ${df.epithet}) ilike ${val}`,
      );

    return res as DesertFigure[];
  } catch (error) {
    console.log(error);
  }
}
