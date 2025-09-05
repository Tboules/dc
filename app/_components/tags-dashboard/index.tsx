import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { TagsDashboardClient } from "./client";
import { selectRandomTagsForDashbaord } from "@/lib/database/handlers/tags";

export const revalidate = 0;

export async function TagsDashboard() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["tags"],
    queryFn: selectRandomTagsForDashbaord,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TagsDashboardClient />
    </HydrationBoundary>
  );
}
