"use client";

import ExcerptDocumentCard from "@/components/excerpt_document_card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { selectRandomExcerptsForDashboard } from "@/lib/database/handlers/excerpts";
import { SHALLOW_GLOBAL_SEARCH_PARAMS } from "@/lib/utils/params";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { useQueryStates } from "nuqs";
import { useEffect, useState } from "react";

export function ExcerptDashboardClient() {
  const [_, setSearchParams] = useQueryStates(SHALLOW_GLOBAL_SEARCH_PARAMS);
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");

  async function refreshRandomQuotes() {
    setSearchParams({ q: "" });
    setInput("");
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["excerpts"] });
    }, 0);
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchParams({ q: input });
    }, 300);

    return () => clearTimeout(handler);
  }, [input]);

  return (
    <div className="p-4">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-medium">Explore Our Collection</h1>
          <Button variant="secondary" size="icon" onClick={refreshRandomQuotes}>
            <RefreshCw />
          </Button>
        </div>

        <div className="">
          <Input
            className="h-12"
            placeholder="What are you looking for? Search by tags, authors, books, quotes, etc."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>

      <ExcerptDocFeed />
    </div>
  );
}

function ExcerptDocFeed() {
  const [searchParams, _] = useQueryStates(SHALLOW_GLOBAL_SEARCH_PARAMS);
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["excerpts", searchParams],
    queryFn: () => selectRandomExcerptsForDashboard(searchParams),
  });

  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Something Went Wrong...</span>;
  }

  return (
    <div className="flex flex-col gap-8">
      {data?.map((excerpt) => (
        <ExcerptDocumentCard
          key={excerpt.excerptId}
          excerptDocument={excerpt}
        />
      ))}
    </div>
  );
}
