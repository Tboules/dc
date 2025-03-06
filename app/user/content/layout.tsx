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
      <div className="max-w-screen-2xl p-4">
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  );
}
