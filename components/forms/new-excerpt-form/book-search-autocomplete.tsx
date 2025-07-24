"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormExcerpt } from "@/lib/database/schema/excerpts";
import { NewReference } from "@/lib/database/schema/references";
import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import BookThumbnailHandler from "@/components/book-thumbnail-handler";
import AsyncAutoComplete, {
  AutoCompleteSelectProps,
} from "@/components/ui/async-auto-complete";
import { useDebounce } from "@/hooks/use-debounce";
import { handleReferenceSearch } from "@/server_actions/book-search";

export default function BookSearchAutoComplete() {
  const { setValue: setFormValue } = useFormContext<FormExcerpt>();
  const [value, setValue] = React.useState<string | undefined>("");

  const debounceValue = useDebounce(value, 500);

  const books = useQuery({
    queryKey: ["books", debounceValue],
    queryFn: () =>
      handleReferenceSearch(debounceValue ?? "") ?? Promise.resolve([]),
    enabled: debounceValue ? debounceValue.length > 3 : false,
  });

  return (
    <div>
      <AsyncAutoComplete<NewReference>
        inputValue={value ?? ""}
        setInputValue={setValue}
        onValueChange={(v) => setFormValue("reference", v)}
        placeholder="What book are you looking for?"
        options={books.data ?? []}
        emptyMessage="No search results at the moment"
        isLoading={books.isLoading}
        labelKey="title"
        valueKey="externalId"
        SelectComponent={BookSelectOption}
      />
    </div>
  );
}

function BookSelectOption({
  option,
  onSelect,
  isSelected,
}: AutoCompleteSelectProps<NewReference>) {
  return (
    <CommandItem
      key={option.externalId}
      value={option.externalId}
      onMouseDown={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onSelect={() => onSelect(option)}
      className={cn("w-full flex items-center", !isSelected ? "pl-8" : null)}
    >
      {isSelected ? <Check className="flex-none w-4" /> : null}
      <BookThumbnailHandler url={option.cover} />
      <div className="flex-1 flex flex-col w-full gap-2 items-start">
        <h4 className="text-lg">{option.title}</h4>
        <p>- {option.author}</p>
      </div>
    </CommandItem>
  );
}
