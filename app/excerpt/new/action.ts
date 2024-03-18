"use server";

import db from "@/lib/database";
import {
  newDesertFigureSchema,
  type NewDesertFigure,
} from "@/lib/database/schema/desertFigures";

export async function postDesertFigureAction(
  prev: any,
  formData: FormData,
): Promise<any> {
  const d = Object.fromEntries(formData);
  const parsed = newDesertFigureSchema.safeParse(d);

  if (!parsed.success) {
    return {
      message: "failed",
    };
  }

  return {
    message: "success",
  };
}
