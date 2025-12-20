"use server";

import db from "@/lib/database";
import { getStatusId } from "@/lib/database/handlers/content-status";
import { postExcerptLove } from "@/lib/database/handlers/excerpt-love";
import {
  excerptDocument,
  excerpts,
  excerptUpsertSchema,
  newRevisionRequestSchema,
  revisionRequest,
} from "@/lib/database/schema";
import { CONTENT_STATUS } from "@/lib/enums";
import { handleProtectedHandler } from "@/lib/utils/auth";
import { eq } from "drizzle-orm";
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
    const contentStatus = input.revise
      ? CONTENT_STATUS.REVISE
      : CONTENT_STATUS.FLAGGED;

    await db.transaction(async (tx) => {
      // upload the request in the DB
      await tx.insert(revisionRequest).values(input);

      // set the status of the excerpt to REVISE
      await tx
        .update(excerpts)
        .set({
          statusId: await getStatusId(contentStatus),
          lastUpdated: new Date(Date.now()),
        })
        .where(eq(excerpts.id, input.targetId));

      // Refresh the excerpt docs table
      await tx.refreshMaterializedView(excerptDocument);
    });
  });
