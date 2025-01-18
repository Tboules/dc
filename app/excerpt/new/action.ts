"use server";

import { searchForTagHandler } from "@/lib/database/handlers/tags";
import { searchForDesertFigure } from "@/lib/database/handlers/desert-figures";
import { formExcerptSchema } from "@/lib/database/schema/excerpts";
import { createServerAction } from "zsa";
import { Option } from "@/components/ui/multi-select";
import db from "@/lib/database";
import { uuidv4Regex } from "@/lib/utils/regex";
import { tags } from "@/lib/database/schema/tags";
import { serverAuthSession } from "@/lib/utils/auth";

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
x   1. Determine if there are any tags without a UUID and add those to the tags table
      a. update the new tag with the proper UUID that came back from the server
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
    // test some business logic beforhand
    const tagsToUpload = input.tags.filter(
      (tag) => !tag.value.match(uuidv4Regex),
    );

    try {
      const session = await serverAuthSession();
      console.log(session);
      if (!session) {
        throw new Error("No user session found!");
      }

      await db.transaction(async (tx) => {
        for (let tag of tagsToUpload) {
          const insertedTag = await tx
            .insert(tags)
            .values({
              name: tag.label,
              createdBy: session?.user.id,
            })
            .returning();

          console.log(insertedTag);
          // need to get the new id and update the original tags array so I can create excerpt tags
        }

        //during testing run the following to rollback the transaction
        throw new Error("roll back transaction during testing");
      });
    } catch (error: any) {
      console.error(error);

      return { error: error.message };
    }

    console.log(input);
  });
