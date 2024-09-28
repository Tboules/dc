"use server";

import db from "@/lib/database";
import {
  DesertFigureDirectInsert,
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

export async function postDesertFigureAction(
  formState: InternalFormState,
  formData: FormData,
): Promise<InternalFormState> {
  let figure: DesertFigureDirectInsert[];

  try {
    const d = Object.fromEntries(formData);
    const parsed = newDesertFigureSchema.safeParse(d);
    const session = await serverAuthSession();
    const fileId = uuid();
    let thumbnailUrl = null;

    if (!parsed.success || !session) {
      return {
        ...formState,
        status: INTERNAL_FORM_STATE_STATUS.FAILURE,
      };
    }

    //upload file to s3
    if (parsed.data.thumbnail && parsed.data.thumbnail?.size != 0) {
      const presignedUrl = await getPresignedUrl(fileId);

      if (!presignedUrl) {
        throw new Error("Unable to get presigned URL");
      }

      const fileUploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: parsed.data.thumbnail,
      });

      if (!fileUploadResponse.ok) {
        throw new Error("Unable to upload to S3");
      }

      thumbnailUrl = process.env.NEXT_PUBLIC_AWS_S3_URL + fileId;
    }

    //add user id to created by
    parsed.data.createdBy = session?.user?.id;

    if (parsed.data.title == DESERT_FIGURE_TITLE.NONE) {
      parsed.data.title = null;
    }

    //Derive Full Name
    // TODO Test
    let fullName = parsed.data.firstName;
    if (parsed.data.title && parsed.data.title != DESERT_FIGURE_TITLE.NONE) {
      fullName = parsed.data.title + " " + fullName;
    }

    if (parsed.data.lastName) {
      fullName += ` ${parsed.data.lastName}`;
    }

    if (parsed.data.epithet) {
      fullName += ` ${parsed.data.epithet}`;
    }

    figure = await db
      .insert(desertFigures)
      .values({
        ...parsed.data,
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

  if (formState.params && formState.params["fromExcerpt"] == "true") {
    redirect(
      `/excerpt/new?desertFigure=${figure[0].id}&figureName=${generateDesertFigureFullname(figure[0])}`,
    );
  }

  revalidatePath("/desert-figures/new");
  return {
    ...formState,
    status: INTERNAL_FORM_STATE_STATUS.SUCCESS,
  };
}
