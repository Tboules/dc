"use client";

import { selectRandomExcerptsForDashboard } from "@/lib/database/handlers/excerpts";
import { SHALLOW_GLOBAL_SEARCH_PARAMS } from "@/lib/utils/params";
import { useQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { useEffect } from "react";

export function ExcerptDashboardClient() {
  const [searchParams, setSearchParams] = useQueryStates(
    SHALLOW_GLOBAL_SEARCH_PARAMS,
  );
  const { data, isLoading } = useQuery({
    queryKey: ["excerpts", searchParams],
    queryFn: () => selectRandomExcerptsForDashboard(searchParams),
  });

  return (
    <div className="p-4">
      <h1>Welcome to Desert Collections</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
