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
        <div className="max-w-screen-2xl overflow-x-auto p-2  md:p-4 mx-auto">
          {children}
        </div>
      </NuqsSearchParamsProvider>
    </SidebarProvider>
  );
}
