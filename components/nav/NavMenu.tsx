"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Menu, Quote, SquareUser } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
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
  { route: "/", name: "Dashboard" },
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

function AddMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Add</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-2 min-w-32 space-y-2">
              <Link href="/excerpt/new" legacyBehavior passHref>
                <NavigationMenuLink>
                  <div className="w-full border border-border p-4 rounded hover:bg-secondary transition mb-2">
                    <Quote className="mb-2" />
                    <p>Excerpt</p>
                  </div>
                </NavigationMenuLink>
              </Link>
              <Link href="/icons/new" legacyBehavior passHref>
                <NavigationMenuLink>
                  <div className="w-full border border-border p-4 rounded hover:bg-secondary transition">
                    <SquareUser className="mb-2" />
                    <p>Icons</p>
                  </div>
                </NavigationMenuLink>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default function NavMenu() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-b-border/60">
      <div className="p-4 text-secondary-foreground w-full max-w-screen-xl m-auto flex items-center gap-4">
        <h1 className="text-lg font-semibold flex-1">Desert Collections</h1>

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
          <AddMenu />
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
                    <Quote className="mr-2 p-1" />
                    Add Excerpt
                  </Button>
                </SheetClose>
              </Link>
              <Link href="/icons/new">
                <SheetClose asChild>
                  <Button className="w-full" variant={"outline"}>
                    <SquareUser className="mr-2 p-1" />
                    Add Icons
                  </Button>
                </SheetClose>
              </Link>

              <SheetClose asChild>
                <AuthButton />
              </SheetClose>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
