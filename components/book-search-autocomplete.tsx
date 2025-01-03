"use client";

import { searchForBooks } from "@/lib/network/open-library";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useDebounce } from "./ui/multi-select";
import { BookAsyncAutoComp } from "./ui/book-async-auto-complete";

export default function BookSearchAutoComplete() {
  const [value, setValue] = React.useState<string | undefined>("");

  const debounceValue = useDebounce(value, 500);

  const books = useQuery({
    queryKey: ["books", debounceValue],
    queryFn: () => searchForBooks(debounceValue ?? ""),
    enabled: debounceValue ? debounceValue.length > 3 : true,
  });

  return (
    <div>
      <BookAsyncAutoComp
        inputValue={value ?? ""}
        setInputValue={setValue}
        onValueChange={(v) => {
          console.log("on value change", v);
        }}
        placeholder="async search"
        options={books.data ?? []}
        emptyMessage="No search results at the moment"
        isLoading={books.isLoading}
      />
    </div>
  );
}
