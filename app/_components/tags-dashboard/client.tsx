"use client";

import TagBadgeLink from "@/components/tag-badge-link";
import { Button } from "@/components/ui/button";
import { selectRandomTagsForDashbaord } from "@/lib/database/handlers/tags";
import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";

export function TagsDashboardClient() {
  const { data, isError, isLoading, refetch, error } = useQuery({
    queryKey: ["tags"],
    queryFn: () => selectRandomTagsForDashbaord(),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Something went wrong...</span>;
  }

  function refreshTags() {
    refetch();
  }

  return (
    <div className="p-4 ">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-medium">Explore Tags</h3>
        <Button variant="secondary" size="icon" onClick={refreshTags}>
          <RefreshCw />
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        {data?.map((tag) => (
          <TagBadgeLink key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
}
