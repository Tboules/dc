import { LucideProps, Quote, SquareUser, Tags } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { DesertCollectionsStaticRoute } from "@/@types/helper-types";

type SideBarMenu = {
  title: string;
  url: DesertCollectionsStaticRoute;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

const USER_SIDE_BAR_NAV_ITEMS: SideBarMenu[] = [
  {
    title: "Excerpts",
    url: "/user/content/excerpts",
    icon: Quote,
  },
  {
    title: "Desert Figures",
    url: "/user/content/desert-figures",
    icon: SquareUser,
  },
  {
    title: "Tags",
    url: "/user/content/tags",
    icon: Tags,
  },
];

export default function UserSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>User Content</SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {USER_SIDE_BAR_NAV_ITEMS.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
