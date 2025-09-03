"use client";

import { Button } from "@/components/ui/button";
import { selectRandomExcerptsForDashboard } from "@/lib/database/handlers/excerpts";
import { SHALLOW_GLOBAL_SEARCH_PARAMS } from "@/lib/utils/params";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { useEffect } from "react";

export function ExcerptDashboardClient() {
  const [searchParams, setSearchParams] = useQueryStates(
    SHALLOW_GLOBAL_SEARCH_PARAMS,
  );
  const queryClient = useQueryClient();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["excerpts", searchParams],
    queryFn: () => selectRandomExcerptsForDashboard(searchParams),
  });

  async function refreshRandomQuotes() {
    setSearchParams({ q: "" });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["excerpts"] });
    }, 0);
  }

  return (
    <div className="p-4">
      <h1>Welcome to Desert Collections</h1>
      <Button onClick={refreshRandomQuotes}>Refresh</Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
