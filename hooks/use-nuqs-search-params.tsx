import { USER_CONTENT_SEARCH_PARAMS } from "@/lib/utils/params";
import { useQueryStates } from "nuqs";

type Props = {
  totalDataCount: number;
};

export default function useNuqsSearchParams({ totalDataCount }: Props) {
  const [params, setSearchParams] = useQueryStates(USER_CONTENT_SEARCH_PARAMS);

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
    return (params.page + 1) * params.pageLimit >= totalDataCount;
  }

  return {
    params,
    setSearchParams,
    handleNextPage,
    handlePreviousPage,
    getCannotMoveForward,
    getCannotMoveBack,
  };
}
