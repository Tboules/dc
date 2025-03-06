"use client";

import { Button } from "@/components/ui/button";
import { parseAsInteger, useQueryState } from "nuqs";

const CONTENT_LIMIT = 10;

export default function PaginationTester() {
  const [offset, setOffset] = useQueryState(
    "offset",
    parseAsInteger.withDefault(0).withOptions({
      shallow: false,
      history: "push",
    }),
  );

  function handleNext() {
    setOffset((offset) => offset + CONTENT_LIMIT);
  }

  function handleBack() {
    if (offset > 0) {
      setOffset((offset) => offset - CONTENT_LIMIT);
    }
  }

  return (
    <div className="flex gap-4">
      <Button variant="outline" onClick={handleBack}>
        back
      </Button>
      <Button onClick={handleNext}>next</Button>
    </div>
  );
}
