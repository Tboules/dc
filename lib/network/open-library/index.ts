"use server";

import { z } from "zod";
import {
  NewReference,
  newReferenceSchema,
} from "@/lib/database/schema/references";
import { openLibraryInstance } from "@/lib/network";

const refArraySchema = z.array(newReferenceSchema);

export async function searchForBooks(value: string): Promise<NewReference[]> {
  const res = await openLibraryInstance.get(
    `/search.json?q=${value}&limit=10&fields=key,title,author_name,cover_i`,
  );
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

  if (safeResponse.error) throw new Error("Zod was unable to parse data");

  return safeResponse.data;
}
