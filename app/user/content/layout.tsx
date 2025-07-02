import UserSidebar from "@/components/nav/user-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NuqsSearchParamsProvider } from "@/hooks/use-nuqs-search-params";

export default async function UserContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <NuqsSearchParamsProvider>
        <UserSidebar />
        <div className="max-w-(--breakpoint-2xl) 2xl:min-w-[calc(1536px-16rem)] md:min-w-[calc(100%-16rem)] min-w-full overflow-x-auto p-2  md:p-4 mx-auto">
          {children}
        </div>
      </NuqsSearchParamsProvider>
    </SidebarProvider>
  );
}
