"use server";

import db from "@/lib/database";
import {
  desertFigures,
  newDesertFigureSchema,
} from "@/lib/database/schema/desertFigures";
import { InternalFormState } from "@/@types/forms";
import { INTERNAL_FORM_STATE_STATUS } from "@/lib/enums";
import { serverAuthSession } from "@/lib/utils/auth";

export async function postDesertFigureAction(
  formState: InternalFormState,
  formData: FormData,
): Promise<InternalFormState> {
  try {
    const d = Object.fromEntries(formData);
    const parsed = newDesertFigureSchema.safeParse(d);
    const session = await serverAuthSession();

    if (!parsed.success) {
      return {
        ...formState,
        status: INTERNAL_FORM_STATE_STATUS.FAILURE,
      };
    }
    console.log(session);

    // await db.insert(desertFigures).values(parsed.data);

    console.log(formState);
    return {
      ...formState,
      status: INTERNAL_FORM_STATE_STATUS.SUCCESS,
    };
  } catch (error) {
    return {
      ...formState,
      message: "An error happend on the server",
      status: INTERNAL_FORM_STATE_STATUS.FAILURE,
    };
  }
}
