"use client";

import { Input } from "@/components/ui/input";
import { useQueryStates } from "nuqs";
import { GLOBAL_SEARCH_PARAMS } from "@/lib/utils/params";
import React from "react";

export default function GlobalSearchInput() {
  const [input, setInput] = React.useState("");
  const [, setSearchParams] = useQueryStates(GLOBAL_SEARCH_PARAMS);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setSearchParams({ q: input });
    }, 300);

    return () => clearTimeout(handler);
  }, [input]);

  return (
    <Input
      className="p-6"
      type="search"
      placeholder="What are you looking for?"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}
