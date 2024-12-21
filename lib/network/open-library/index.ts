import {
  NewReference,
  newReferenceSchema,
} from "@/lib/database/schema/references";
import { openLibraryInstance } from "@/lib/network";
import { z } from "zod";

const refArraySchema = z.array(newReferenceSchema);

export async function searchForBooks(value: string): Promise<NewReference[]> {
  const res = await openLibraryInstance.get(`/search.json?q=${value}&limit=15`);
  console.log(res);
  const rawBookData = res.data?.docs;

  if (!Array.isArray(rawBookData)) {
    console.log("error");
    throw new Error("Docs was not an arrray");
  }

  const safeResponse = refArraySchema.safeParse(
    rawBookData.map(
      (b) =>
        ({
          externalId: b.key,
          title: b.title,
          author: b.author_name?.length > 0 ? b.author_name[0] : "",
          cover: b.cover_i
            ? `https://covers.openlibrary.org/b/id/${b.cover_i.toString()}-M.jpg`
            : "",
        }) as NewReference,
    ),
  );

  console.log(safeResponse);

  if (safeResponse.error) throw new Error("Zod was unable to parse data");

  return safeResponse.data;
}
