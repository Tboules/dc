"use server";

import db from "@/lib/database";
import {
  desertFigures,
  newDesertFigureSchema,
} from "@/lib/database/schema/desertFigures";
import { InternalFormState } from "@/@types/forms";
import { INTERNAL_FORM_STATE_STATUS } from "@/lib/enums";
import { serverAuthSession } from "@/lib/utils/auth";
import { v4 as uuid } from "uuid";
import { getPresignedUrl } from "@/app/api/documents/get-presigned";
import { revalidatePath } from "next/cache";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function findDesertFigure(val: string) {
  await sleep(3000);
  return val;
}
