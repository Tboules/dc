import UserSidebar from "@/components/nav/user-sidebar";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function UserContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <UserSidebar />
      <div className="max-w-screen-2xl overflow-x-auto p-2  md:p-4 mx-auto">
        {children}
      </div>
    </SidebarProvider>
  );
}

export function UserContentSidebarHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-col md:flex-row items-center py-2 mb-4 rounded gap-2">
      <div className="flex gap-2 w-full">
        <SidebarTrigger />
        <h1 className="text-lg font-medium">{title}</h1>
      </div>
      <Input className="max-w-[32rem]" placeholder="Search" />
    </div>
  );
}
