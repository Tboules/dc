"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Route } from "nextjs-routes";

type TNavMenuItems = {
  route: Exclude<Route, { query: any }>["pathname"];
  name: string;
}[];

const NAV_MENU_ITEMS: TNavMenuItems = [
  { route: "/desert_figures", name: "Desert Figures" },
  { route: "/tags", name: "Tags" },
  { route: "/icons", name: "Icons" },
];

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return <Button onClick={() => signOut()}>Sign Out</Button>;
  }

  return <Button onClick={() => signIn()}>Sign In</Button>;
}

export default function NavMenu() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-b-border/60">
      <div className="p-4 text-secondary-foreground w-full max-w-screen-xl m-auto flex items-center gap-4">
        <Link href="/" className="flex-1">
          <h1 className="text-lg font-semibold">Desert Collections</h1>
        </Link>

        {/* navigation menu */}
        <NavigationMenu className="hidden sm:block">
          <NavigationMenuList>
            {NAV_MENU_ITEMS.map((item) => (
              <NavigationMenuItem key={item.name}>
                <Link href={item.route} passHref legacyBehavior>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Separator className="h-4" orientation="vertical" />
        <div className="hidden sm:flex items-center gap-4">
          <Link href="/excerpt/new">
            <Button className="w-full" variant={"outline"}>
              Add
            </Button>
          </Link>
          <AuthButton />
        </div>

        {/* Mobile Nav */}

        <Sheet>
          <SheetTrigger>
            <Menu className="sm:hidden w-8 h-8 p-1 rounded-md hover:bg-secondary" />
          </SheetTrigger>
          <SheetContent className="max-w-[400px] w-full">
            <SheetHeader>
              <SheetTitle>Desert Collections</SheetTitle>
              <ul className="pt-4">
                {NAV_MENU_ITEMS.map((item) => (
                  <li key={item.name} className="w-full text-start py-2">
                    <Link href={item.route}>
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          {item.name}
                        </Button>
                      </SheetClose>
                    </Link>
                  </li>
                ))}
              </ul>

              <Separator className="mx-auto !mb-2" />

              <Link href="/excerpt/new">
                <SheetClose asChild>
                  <Button className="w-full" variant={"outline"}>
                    Add
                  </Button>
                </SheetClose>
              </Link>
              <AuthButton />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
