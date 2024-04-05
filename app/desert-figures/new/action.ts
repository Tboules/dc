"use server";

import db from "@/lib/database";
import {
  desertFigures,
  newDesertFigureSchema,
} from "@/lib/database/schema/desertFigures";
import { InternalFormState } from "@/@types/forms";
import { INTERNAL_FORM_STATE_STATUS } from "@/lib/enums";
import { serverAuthSession } from "@/lib/utils/auth";
import { v4 as uuid } from "uuid";
import { getPresignedUrl } from "@/app/api/documents/get-presigned";
import { revalidatePath } from "next/cache";

export async function postDesertFigureAction(
  formState: InternalFormState,
  formData: FormData,
): Promise<InternalFormState> {
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
    await db.insert(desertFigures).values({
      ...parsed.data,
      thumbnail: thumbnailUrl,
    });

    return {
      ...formState,
      status: INTERNAL_FORM_STATE_STATUS.SUCCESS,
    };
  } catch (error) {
    console.log(error);
    return {
      ...formState,
      message: "An error happend on the server",
      status: INTERNAL_FORM_STATE_STATUS.FAILURE,
    };
  } finally {
    revalidatePath("/excerpt/new");
  }
}
