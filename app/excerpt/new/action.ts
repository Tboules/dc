"use server";

import { searchForDesertFigure } from "@/lib/database/handlers/desert-figures";

export async function findDesertFigure(val: string) {
  try {
    return await searchForDesertFigure(val);
  } catch (error) {
    console.log(error);
  }
}
