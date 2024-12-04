"use server";

import { InternalFormState } from "@/@types/forms";
import { searchForDesertFigure } from "@/lib/database/handlers/desert-figures";
import { formExcerptSchema } from "@/lib/database/schema/excerpts";
import { INTERNAL_FORM_STATE_STATUS } from "@/lib/enums";

export async function findDesertFigure(val: string) {
  try {
    return await searchForDesertFigure(val);
  } catch (error) {
    console.log(error);
  }
}

export async function postExcerptAction(
  formState: InternalFormState,
  formData: FormData,
): Promise<InternalFormState> {
  try {
    const data = Object.fromEntries(formData);
    const excerpt = formExcerptSchema.parse({
      ...data,
      tags: JSON.parse(data.tags as string),
    });

    console.log({ excerpt });
    console.log(excerpt.tags);

    return {
      ...formState,
    };
  } catch (error) {
    console.log(error);
    return {
      ...formState,
      message: "An error occored",
      status: INTERNAL_FORM_STATE_STATUS.FAILURE,
    };
  }
}
