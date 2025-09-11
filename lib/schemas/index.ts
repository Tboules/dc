import { z } from "zod";
import { CONTENT_STATUS, ContentStatus } from "../enums";

export const publishExcerptSchema = z.object({
  status: z.enum([CONTENT_STATUS.PUBLISHED, CONTENT_STATUS.PRIVATE]),
  excerptId: z.string(),
  desertFigureId: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type PublishExcerptSchema = z.infer<typeof publishExcerptSchema>;
