"use client";

import { parseAsInteger, useQueryState } from "nuqs";

type Props = {
  totalDataCount: number;
};

export default function useServerPagination({ totalDataCount }: Props) {
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

  function getCannotMoveBack() {
    return page <= 0;
  }

  function getCannotMoveForward() {
    return (page + 1) * pageLimit >= totalDataCount;
  }

  return {
    page,
    pageLimit,
    getCannotMoveBack,
    getCannotMoveForward,
    handleNextPage,
    handlePreviousPage,
    handleUpdatePageLimit,
  };
}
