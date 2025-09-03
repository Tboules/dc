import { Separator } from "@/components/ui/separator";
import { TagsDashboard } from "./_components/tags-dashboard";
import { DesertFigureDashboard } from "./_components/desert-figures-dashboard";
import { ExcerptDashboardClient } from "./_components/excerpt-dashboard/client";
import {
  PagePropsWithParams,
  shallowGlobalSearchParamsLoader,
} from "@/lib/utils/params";
import { selectRandomExcerptsForDashboard } from "@/lib/database/handlers/excerpts";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home({ searchParams }: PagePropsWithParams) {
  const queryClient = new QueryClient();
  const params = await shallowGlobalSearchParamsLoader(searchParams);

  await queryClient.prefetchQuery({
    queryKey: ["excerpts", params],
    queryFn: () => selectRandomExcerptsForDashboard(params),
  });

  return (
    <div className="flex md:flex-row flex-col">
      <section className="hidden lg:block flex-1 min-w-80">
        <DesertFigureDashboard />
      </section>
      <Separator
        orientation="vertical"
        className="hidden lg:block h-[calc(100lvh-var(--nav-height))]!"
      />

      <section className="flex-3 overflow-x-scroll">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ExcerptDashboardClient />
        </HydrationBoundary>
      </section>

      <Separator
        orientation="vertical"
        className="hidden md:block h-[calc(100lvh-var(--nav-height))]!"
      />
      <section className="hidden md:block flex-1 min-w-80">
        <TagsDashboard />
      </section>
    </div>
  );
}
