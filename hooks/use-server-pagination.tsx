"use client";

import { parseAsInteger, useQueryState } from "nuqs";

export default function useServerPagination() {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(0).withOptions({
      shallow: false,
      history: "push",
    }),
  );

  const [pageLimit, setPageLimit] = useQueryState(
    "pageLimit",
    parseAsInteger.withDefault(10).withOptions({
      shallow: false,
      history: "push",
    }),
  );

  function handleNextPage() {
    setPage((offset) => offset + 1);
  }

  function handlePreviousPage() {
    if (page > 0) {
      setPage((offset) => offset - 1);
    }
  }

  function handleUpdatePageLimit(limit: number) {
    setPageLimit(limit);
  }

  return {
    page,
    pageLimit,
    handleNextPage,
    handlePreviousPage,
    handleUpdatePageLimit,
  };
}
