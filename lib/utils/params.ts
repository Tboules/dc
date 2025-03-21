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
