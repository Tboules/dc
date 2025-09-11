"use server";

import db from "@/lib/database";
import { getStatusId } from "@/lib/database/handlers/content-status";
import { desertFigures, excerpts, tags } from "@/lib/database/schema";
import { CONTENT_STATUS, USER_ROLES } from "@/lib/enums";
import { publishExcerptSchema } from "@/lib/schemas";
import { handleProtectedHandler } from "@/lib/utils/auth";
import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { createServerAction } from "zsa";

export const publishExcerptAction = createServerAction()
  .input(publishExcerptSchema)
  .handler(async ({ input }) => {
    await handleProtectedHandler(USER_ROLES.admin);

    // TODO create a rejected status
    if (input.status == CONTENT_STATUS.PRIVATE) {
      const privateStatusId = await getStatusId(CONTENT_STATUS.PRIVATE);
      await db
        .update(excerpts)
        .set({ statusId: privateStatusId })
        .where(eq(excerpts.id, input.excerptId));
      return revalidatePath("/user/admin");
    }

    const publishStatusId = await getStatusId(CONTENT_STATUS.PUBLISHED);
    await db.transaction(async (tx) => {
      if (input.tags && input.tags.length > 0) {
        await tx
          .update(tags)
          .set({ statusId: publishStatusId })
          .where(inArray(tags.id, input.tags));
      }

      if (input.desertFigureId) {
        await tx
          .update(desertFigures)
          .set({ statusId: publishStatusId })
          .where(eq(desertFigures.id, input.desertFigureId));
      }

      await tx
        .update(excerpts)
        .set({ statusId: publishStatusId })
        .where(eq(excerpts.id, input.excerptId));
    });

    return revalidatePath("/user/admin");
  });
