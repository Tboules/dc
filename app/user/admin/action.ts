"use server";

import { z } from "zod";
import { createServerAction } from "zsa";

const publishExcerptSchema = z.object({
  excerptId: z.string(),
  desertFigureId: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const publishExcerptAction = createServerAction()
  .input(publishExcerptSchema)
  .handler(async ({ input }) => {
    console.log(input);
  });
