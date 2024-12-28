"use client";
import BookSearchAutoComplete from "@/components/book-search-autocomplete";
import { AsyncAutoComplete } from "@/components/ui/async-auto-complete";
import {
  AutoComplete,
  AutoCompleteOption,
} from "@/components/ui/auto-complete";
import { useState } from "react";

interface Book extends AutoCompleteOption {
  imageUrl: string;
  id: number;
}

const OPTIONS: Book[] = [
  {
    label: "hello",
    value: "goodbye",
    id: 1,
    imageUrl: "hdijf",
  },
  {
    label: "world",
    value: "earth",
    id: 2,
    imageUrl: "hdijf",
  },
];

export default function Home() {
  const [value, setValue] = useState("");
  return (
    <div className="p-4">
      <AsyncAutoComplete
        inputValue={value}
        setInputValue={setValue}
        placeholder="book input"
        emptyMessage="Please choose a book"
        options={OPTIONS}
      />

      <BookSearchAutoComplete />
    </div>
  );
}
