"use server";

import { searchForTagHandler } from "@/lib/database/handlers/tags";
import { searchForDesertFigure } from "@/lib/database/handlers/desert-figures";
import { excerpts, formExcerptSchema } from "@/lib/database/schema/excerpts";
import { createServerAction } from "zsa";
import { Option } from "@/components/ui/multi-select";
import db from "@/lib/database";
import { uuidv4Regex } from "@/lib/utils/regex";
import { NewTag, Tag, tags } from "@/lib/database/schema/tags";
import { serverAuthSession } from "@/lib/utils/auth";
import { Reference, references } from "@/lib/database/schema/references";
import { excerptTags } from "@/lib/database/schema/excerptTags";

export async function findDesertFigure(val: string) {
  try {
    return await searchForDesertFigure(val);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function handleTagSearch(value: string) {
  let res: Option[] = [];
  try {
    res = await searchForTagHandler(value);
    return res;
  } catch (error) {
    console.error(error);
  }

  return res;
}

export const postExcerptZsaAction = createServerAction()
  .input(formExcerptSchema)
  .handler(async ({ input }) => {
    const session = await serverAuthSession();
    if (!session || !session.user.id) {
      throw new Error("No user session found!");
    }

    await db.transaction(async (tx) => {
      /* Tag Insert Section */
      const tagsToUpload = input.tags.map<NewTag>((tag) => ({
        id: tag.value.match(uuidv4Regex) ? tag.value : undefined,
        name: tag.label,
        createdBy: session.user.id,
      }));

      const insertedTags = await tx
        .insert(tags)
        .values(tagsToUpload)
        .onConflictDoNothing()
        .returning();

      const finalTags = [
        ...(tagsToUpload.filter((t) => t.id) as Tag[]),
        ...insertedTags,
      ];

      /* Reference Insert Section */
      let insertedReference: Reference[] | undefined;

      if (!input.articleUrl && input.reference) {
        console.log("this baby has a book attached");

        insertedReference = await tx
          .insert(references)
          .values(input.reference)
          .returning();
      }

      /* Excerpt Insert Section */
      const insertedExcerpt = await tx
        .insert(excerpts)
        .values({
          body: input.body,
          title: input.title,
          type: input.type,
          desertFigureID: input.desertFigureID,
          createdBy: session.user.id,
          articleUrl: input.articleUrl || null,
          referenceId:
            insertedReference && insertedReference.length > 0
              ? insertedReference[0].id
              : undefined,
        })
        .returning();

      /* Excert Tag Insert Section */
      const excerptTagsToInsert = finalTags.map((t) => ({
        excerptId: insertedExcerpt[0].id,
        tagId: t.id,
      }));
      await tx.insert(excerptTags).values(excerptTagsToInsert).returning();
    });
  });
