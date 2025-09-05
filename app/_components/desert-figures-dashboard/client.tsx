"use client";

import DesertFigureCard from "@/components/desert_figure_card";
import { Button } from "@/components/ui/button";
import { selectRandomDesertFiguresForDashboard } from "@/lib/database/handlers/desert-figures";
import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";

export function DesertFigureDashboardClient() {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["desertFigures"],
    queryFn: selectRandomDesertFiguresForDashboard,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Something went wrong...</span>;
  }

  function refreshDF() {
    refetch();
  }
  return (
    <div className="p-4 ">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-medium">Explore Tags</h3>
        <Button variant="secondary" size="icon" onClick={refreshDF}>
          <RefreshCw />
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        {data?.map((df) => (
          <DesertFigureCard key={df.id} {...df} />
        ))}
      </div>
    </div>
  );
}
