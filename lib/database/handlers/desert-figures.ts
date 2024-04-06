import db from "@/lib/database";
import { desertFigures } from "@/lib/database/schema/desertFigures";
import { eq } from "drizzle-orm";

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
