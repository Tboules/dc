"use server";

import { searchForTagHandler } from "@/lib/database/handlers/tags";
import { searchForDesertFigure } from "@/lib/database/handlers/desert-figures";
import { excerpts, formExcerptSchema } from "@/lib/database/schema/excerpts";
import { createServerAction } from "zsa";
import { Option } from "@/components/ui/multi-select";
import db from "@/lib/database";
import { uuidv4Regex } from "@/lib/utils/regex";
import { NewTag, tags } from "@/lib/database/schema/tags";
import { serverAuthSession } from "@/lib/utils/auth";
import { Reference, references } from "@/lib/database/schema/references";

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
/*
    write a transaction db query that does the following
    2. Determine if it is an article / URL reference or an actual book reference
      a. if it's a book reference add it into our ref table if the book id does not already exist with out table
      b. save the book ref id for later use
    3. Create the excerpt with the refid and the desert figure id
      a. save the new exerpt id
    4. Once we have the exerpt ID add the exerpt tags
*/

export const postExcerptZsaAction = createServerAction()
  .input(formExcerptSchema)
  .handler(async ({ input }) => {
    try {
      const session = await serverAuthSession();
      console.log(session);
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
          ...tagsToUpload.filter((t) => t.id),
          ...insertedTags,
        ];

        console.log("final", finalTags);

        /* Reference Insert Section, if url add on record, if book add to table*/
        let insertedReference: Reference[] | undefined;

        if (!input.articleUrl && input.reference) {
          console.log("this baby has a book attached");

          insertedReference = await tx
            .insert(references)
            .values(input.reference)
            .returning();
        }

        console.log("inserted reference", insertedReference);

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

        console.log("inserted excerpt", insertedExcerpt);

        /* Excert Tag Insert Section */

        //during testing run the following to rollback the transaction
        throw new Error("roll back transaction during testing");
      });
    } catch (error: any) {
      console.error(error);

      return { error: error.message };
    }

    console.log(input);
  });
