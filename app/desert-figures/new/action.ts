"use server";

import db from "@/lib/database";
import {
  desertFigureInsertSchema,
  desertFigures,
  newDesertFigureSchema,
} from "@/lib/database/schema/desertFigures";
import { DESERT_FIGURE_TITLE } from "@/lib/enums";
import { serverAuthSession } from "@/lib/utils/auth";
import { v4 as uuid } from "uuid";
import { getPresignedUrl } from "@/app/api/documents/get-presigned";
import { generateDesertFigureFullname } from "@/lib/utils";
import { contentStatus } from "@/lib/database/schema";
import { eq } from "drizzle-orm";
import { createServerAction } from "zsa";

export const postDesertFigureZsaAction = createServerAction()
  .input(newDesertFigureSchema)
  .handler(async ({ input }) => {
    const session = await serverAuthSession();
    let thumbnailUrl = null;
    if (!session || !session.user.id) {
      throw new Error("No user session found!");
    }
    input.createdBy = session.user.id;

    const draftStatus = await db.query.contentStatus.findFirst({
      where: eq(contentStatus.name, "Draft"),
    });

    if (!draftStatus || !draftStatus.id) {
      throw new Error("Status was not found");
    }

    //upload file to s3
    console.log(input.thumbnail, typeof input.thumbnail, "thumbnail weirdness");
    //@ts-ignore
    if (input.thumbnail?.length && input.thumbnail[0].size != 0) {
      const fileId = uuid();
      const presignedUrl = await getPresignedUrl(fileId);
      if (!presignedUrl) {
        throw new Error("Could not get presigned URL from S3");
      }

      const fileUploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: input.thumbnail[0],
      });

      if (!fileUploadResponse.ok) {
        throw new Error("Unable to upload to S3");
      }

      thumbnailUrl = process.env.NEXT_PUBLIC_AWS_S3_URL + fileId;
    }

    // Create the full name for the figure
    if (input.title == DESERT_FIGURE_TITLE.NONE) {
      input.title = null;
    }

    let insertFigure = desertFigureInsertSchema.parse({
      ...input,
      fullName: generateDesertFigureFullname(input),
      statusId: draftStatus.id,
      thumbnail: thumbnailUrl,
    });

    await db.insert(desertFigures).values(insertFigure);
  });
