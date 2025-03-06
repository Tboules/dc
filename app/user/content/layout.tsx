import UserSidebar from "@/components/nav/user-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function UserContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <UserSidebar />
      <div className="max-w-screen-2xl p-4">{children}</div>
    </SidebarProvider>
  );
}

export function UserContentSidebarHeader({ title }: { title: string }) {
  return (
    <div className="flex gap-2">
      <SidebarTrigger />
      <h1>{title}</h1>
    </div>
  );
}
