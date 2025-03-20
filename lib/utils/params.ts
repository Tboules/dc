import { parseAsInteger, createLoader } from "nuqs/server";

export const paginationSearchParams = createLoader({
  page: parseAsInteger.withDefault(0),
  pageLimit: parseAsInteger.withDefault(10),
});
