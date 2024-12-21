"use client";

import { Input } from "@/components/ui/input";
import { searchForBooks } from "@/lib/network/open-library";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useDebounce } from "./ui/multi-select";

export default function BookSearchAutoComplete() {
  const [value, setValue] = React.useState<string>("");

  const debounceValue = useDebounce(value, 500);

  const books = useQuery({
    queryKey: ["books", debounceValue],
    queryFn: () => searchForBooks(debounceValue),
    enabled: debounceValue.length > 3,
  });

  React.useEffect(() => {
    console.log(debounceValue);
  }, [debounceValue]);

  return (
    <div>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}
