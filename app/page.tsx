import { Separator } from "@/components/ui/separator";
import { ComponentType, PropsWithChildren } from "react";
import { TagsDashboard } from "./_components/tags-dashboard";
import { DesertFigureDashboard } from "./_components/desert-figures-dashboard";
import { ExcerptDashboardClient } from "./_components/excerpt-dashboard/client";

export default function Home() {
  return (
    <div className="flex md:flex-row flex-col">
      <section className="hidden lg:block flex-1 min-w-80">
        <DesertFigureDashboard />
      </section>
      <Separator
        orientation="vertical"
        className="hidden lg:block h-[calc(100lvh-var(--nav-height))]!"
      />

      <section className="flex-3">
        <ExcerptDashboardClient />
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
