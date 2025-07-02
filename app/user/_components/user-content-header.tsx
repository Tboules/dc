"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import useNuqsSearchParams from "@/hooks/use-nuqs-search-params";

export function UserContentSidebarHeader({ title }: { title: string }) {
  const { searchInput, setSearchInput } = useNuqsSearchParams();

  return (
    <div className="flex flex-col md:flex-row items-center py-2 mb-4 rounded gap-2">
      <div className="flex gap-2 w-full">
        <SidebarTrigger />
        <h1 className="text-lg font-medium">{title}</h1>
      </div>
      <Input
        className="max-w-lg"
        placeholder="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
}
