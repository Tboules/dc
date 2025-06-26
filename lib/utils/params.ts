import {
  parseAsInteger,
  createLoader,
  parseAsString,
  inferParserType,
} from "nuqs/server";

// used in use-server-params hook
export const USER_CONTENT_SEARCH_PARAMS = {
  page: parseAsInteger.withDefault(0).withOptions({
    shallow: false,
    history: "push",
  }),
  pageLimit: parseAsInteger.withDefault(10).withOptions({
    shallow: false,
    history: "push",
  }),
  q: parseAsString.withDefault("").withOptions({
    shallow: false,
    history: "push",
  }),
};

export type UserContentSearchParams = inferParserType<
  typeof USER_CONTENT_SEARCH_PARAMS
>;

export const userContentSearchParamsLoader = createLoader(
  USER_CONTENT_SEARCH_PARAMS,
);

// used for search feature on many pages
export const GLOBAL_SEARCH_PARAMS = {
  q: parseAsString.withDefault("").withOptions({
    shallow: false,
    history: "push",
  }),
};

export type GlobalSearchParams = inferParserType<typeof GLOBAL_SEARCH_PARAMS>;

export const globalSearchParamsLoader = createLoader(GLOBAL_SEARCH_PARAMS);
