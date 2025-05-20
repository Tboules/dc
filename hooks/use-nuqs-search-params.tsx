"use client";
import { USER_CONTENT_SEARCH_PARAMS } from "@/lib/utils/params";
import { useQueryStates } from "nuqs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// for Reference view @/lib/utils/params.ts

type NuqsSearchParamsContextProps = {
  params: ReturnType<
    typeof useQueryStates<typeof USER_CONTENT_SEARCH_PARAMS>
  >[0];
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  getCannotMoveForward: () => boolean;
  getCannotMoveBack: () => boolean;
  initTotalDataCount: (dc: number) => void;
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
};

const NuqsSearchParamsContext =
  createContext<NuqsSearchParamsContextProps | null>(null);

type Props = {
  children: ReactNode;
};

export function NuqsSearchParamsProvider({ children }: Props) {
  const [params, setSearchParams] = useQueryStates(USER_CONTENT_SEARCH_PARAMS);
  const [totalDataCount, setTotalDataCount] = useState<number | null>(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setSearchInput(params.q);
  }, []);

  //debounce search param
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchParams({ q: searchInput });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  function handleNextPage() {
    setSearchParams({ page: params.page + 1 });
  }

  function handlePreviousPage() {
    setSearchParams({ page: params.page - 1 });
  }

  function getCannotMoveBack() {
    return params.page <= 0;
  }

  function getCannotMoveForward() {
    if (totalDataCount) {
      return (params.page + 1) * params.pageLimit >= totalDataCount;
    }

    return true;
  }

  function initTotalDataCount(dc: number) {
    setTotalDataCount(dc);
  }

  return (
    <NuqsSearchParamsContext.Provider
      value={{
        params,
        handleNextPage,
        handlePreviousPage,
        getCannotMoveForward,
        getCannotMoveBack,
        initTotalDataCount,
        searchInput,
        setSearchInput,
      }}
    >
      {children}
    </NuqsSearchParamsContext.Provider>
  );
}

export default function useNuqsSearchParams() {
  const context = useContext(NuqsSearchParamsContext);

  if (!context) {
    throw new Error("Cannot use Nuqs Search Params outside provider!");
  }

  return context;
}
