"use server";

import { postExcerptLove } from "@/lib/database/handlers/excerpt-love";
import { excerptUpsertSchema } from "@/lib/database/schema";
import { createServerAction } from "zsa";

export const upsertExcerptLove = createServerAction()
  .input(excerptUpsertSchema)
  .handler(async ({ input }) => {
    const res = await postExcerptLove(input);

    if (!res || !res[0]) throw "There was an issue loving this guy";
    return res[0];
  });
