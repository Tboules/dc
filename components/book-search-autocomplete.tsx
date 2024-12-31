"use client";

import { Input } from "@/components/ui/input";
import { searchForBooks } from "@/lib/network/open-library";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useDebounce } from "./ui/multi-select";
import { AsyncAutoComplete } from "./ui/async-auto-complete";

export default function BookSearchAutoComplete() {
  const [value, setValue] = React.useState<string | undefined>("");

  const debounceValue = useDebounce(value, 500);

  const books = useQuery({
    queryKey: ["books", debounceValue],
    queryFn: () => searchForBooks(debounceValue ?? ""),
    enabled: debounceValue ? debounceValue.length > 3 : true,
    select: (books) =>
      books.map((book) => ({
        ...book,
        label: book.title,
        value: book.externalId,
      })),
  });

  React.useEffect(() => {
    console.log(books.data);
  }, [books.data]);

  return (
    <div>
      <AsyncAutoComplete
        inputValue={value ?? ""}
        setInputValue={setValue}
        placeholder="async search"
        options={books.data ?? []}
        emptyMessage="No search results at the moment"
        isLoading={books.isLoading}
      />
    </div>
  );
}
