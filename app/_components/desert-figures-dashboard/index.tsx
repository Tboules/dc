import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { DesertFigureDashboardClient } from "./client";
import { selectRandomDesertFiguresForDashboard } from "@/lib/database/handlers/desert-figures";

export async function DesertFigureDashboard() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["desertFigures"],
    queryFn: selectRandomDesertFiguresForDashboard,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DesertFigureDashboardClient />
    </HydrationBoundary>
  );
}
