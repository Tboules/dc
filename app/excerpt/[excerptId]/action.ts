"use server";

import { postExcerptLove } from "@/lib/database/handlers/excerpt-love";
import {
  excerptUpsertSchema,
  newRevisionRequestSchema,
} from "@/lib/database/schema";
import { handleProtectedHandler, handleProtectedRoute } from "@/lib/utils/auth";
import { createServerAction } from "zsa";

export const upsertExcerptLove = createServerAction()
  .input(excerptUpsertSchema)
  .handler(async ({ input }) => {
    const res = await postExcerptLove(input);

    if (!res || !res[0]) throw "There was an issue loving this guy";
    return res[0];
  });

export const postRevisionRequest = createServerAction()
  .input(newRevisionRequestSchema)
  .handler(async ({ input }) => {
    const session = await handleProtectedHandler();
    input.createdBy = session.user.id;
    console.log(input);
  });
