"use server";

import { z } from "zod";
import {
  NewReference,
  newReferenceSchema,
} from "@/lib/database/schema/references";
import axios from "axios";
import { GoogleBooksResponse } from "@/@types/google-books";

const refArraySchema = z.array(newReferenceSchema);

export async function handleReferenceSearch(
  value: string,
): Promise<NewReference[]> {
  const res = await axios.get<GoogleBooksResponse>(
    `https://www.googleapis.com/books/v1/volumes?q=${value}&key=${process.env.GOOGLE_BOOBKS_API_KEY}`,
  );

  const bookData = res.data?.items ?? [];

  const parsedReferences = refArraySchema.safeParse(
    bookData.map(
      (b) =>
        ({
          externalId: b.id,
          title: b.volumeInfo.title,
          author: b.volumeInfo.authors?.[0] ?? "",
          cover: b.volumeInfo.imageLinks?.smallThumbnail,
          subTitle: b.volumeInfo.subtitle,
          source: b.volumeInfo.infoLink,
        }) as NewReference,
    ),
  );

  if (parsedReferences.error)
    throw new Error("Zod was unable to parse this book data");

  return parsedReferences.data;
}
