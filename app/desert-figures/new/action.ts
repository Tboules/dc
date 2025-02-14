"use server";

import db from "@/lib/database";
import {
  DesertFigureDirectInsert,
  desertFigureInsertSchema,
  desertFigures,
  newDesertFigureSchema,
} from "@/lib/database/schema/desertFigures";
import { InternalFormState } from "@/@types/forms";
import { DESERT_FIGURE_TITLE, INTERNAL_FORM_STATE_STATUS } from "@/lib/enums";
import { serverAuthSession } from "@/lib/utils/auth";
import { v4 as uuid } from "uuid";
import { getPresignedUrl } from "@/app/api/documents/get-presigned";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateDesertFigureFullname } from "@/lib/utils";
import { contentStatus } from "@/lib/database/schema";
import { eq } from "drizzle-orm";

export async function postDesertFigureAction(
  formState: InternalFormState,
  formData: FormData,
): Promise<InternalFormState> {
  let figure: DesertFigureDirectInsert[];

  try {
    const d = Object.fromEntries(formData);

    // inject draft status
    const draftStatus = await db.query.contentStatus.findFirst({
      where: eq(contentStatus.name, "Draft"),
    });
    const parsedFigure = desertFigureInsertSchema.safeParse({
      ...d,
      statusId: draftStatus?.id,
    });

    const session = await serverAuthSession();
    const fileId = uuid();
    let thumbnailUrl = null;

    if (!parsedFigure.success || !session) {
      return {
        ...formState,
        status: INTERNAL_FORM_STATE_STATUS.FAILURE,
      };
    }

    //upload file to s3
    if (parsedFigure.data.thumbnail && parsedFigure.data.thumbnail?.size != 0) {
      const presignedUrl = await getPresignedUrl(fileId);

      if (!presignedUrl) {
        throw new Error("Unable to get presigned URL");
      }

      const fileUploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: parsedFigure.data.thumbnail,
      });

      if (!fileUploadResponse.ok) {
        throw new Error("Unable to upload to S3");
      }

      thumbnailUrl = process.env.NEXT_PUBLIC_AWS_S3_URL + fileId;
    }

    //add user id to created by
    parsedFigure.data.createdBy = session?.user?.id;

    if (parsedFigure.data.title == DESERT_FIGURE_TITLE.NONE) {
      parsedFigure.data.title = null;
    }

    //Derive Full Name
    let fullName = generateDesertFigureFullname(parsedFigure.data);

    figure = await db
      .insert(desertFigures)
      .values({
        ...parsedFigure.data,
        fullName,
        thumbnail: thumbnailUrl,
      })
      .returning();
  } catch (error) {
    console.log(error);
    return {
      ...formState,
      message: "An error happend on the server",
      status: INTERNAL_FORM_STATE_STATUS.FAILURE,
    };
  }

  if (formState.params && formState.params["fromExcerpt"] == "1") {
    redirect(`/excerpt/new?desertFigure=${figure[0].id}`);
  }

  revalidatePath("/desert-figures/new");
  return {
    ...formState,
    status: INTERNAL_FORM_STATE_STATUS.SUCCESS,
  };
}
