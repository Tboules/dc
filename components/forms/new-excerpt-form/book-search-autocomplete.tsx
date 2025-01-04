"use client";

import { searchForBooks } from "@/lib/network/open-library";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useDebounce } from "@/components/ui/multi-select";
import { BookAsyncAutoComp } from "@/components/ui/book-async-auto-complete";
import { useFormContext } from "react-hook-form";
import { FormExcerpt } from "@/lib/database/schema/excerpts";

export default function BookSearchAutoComplete() {
  const { setValue: setFormValue } = useFormContext<FormExcerpt>();
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
          setFormValue("reference", v);
        }}
        placeholder="What book are you looking for?"
        options={books.data ?? []}
        emptyMessage="No search results at the moment"
        isLoading={books.isLoading}
      />
    </div>
  );
}
