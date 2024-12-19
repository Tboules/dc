"use server";

import { searchForTagHandler } from "@/lib/database/handlers/tags";
import { searchForDesertFigure } from "@/lib/database/handlers/desert-figures";
import { formExcerptSchema } from "@/lib/database/schema/excerpts";
import { createServerAction } from "zsa";
import { Option } from "@/components/ui/multi-select";

export async function findDesertFigure(val: string) {
  try {
    return await searchForDesertFigure(val);
  } catch (error) {
    console.log(error);
  }
}

export async function handleTagSearch(value: string) {
  let res: Option[] = [];
  try {
    res = await searchForTagHandler(value);
    return res;
  } catch (error) {
    console.error(error);
  }

  return res;
}

// TODO upload excerpt functionality
export const postExcerptZsaAction = createServerAction()
  .input(formExcerptSchema)
  .handler(async ({ input }) => {
    console.log(input);

    return input;
  });
