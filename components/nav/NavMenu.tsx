"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  LogIn,
  LogOut,
  Menu,
  ShieldIcon,
  TableOfContents,
  User,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
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
import { IconName, NavIconSwitcher } from "@/components/icon";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { generateUserInitials } from "@/lib/utils";

interface NavMenuItem {
  route: Exclude<Route, { query: any }>["pathname"];
  name: string;
}

interface SubMenuItem extends NavMenuItem {
  icon: IconName;
}

const NAV_MENU_ITEMS: NavMenuItem[] = [
  { route: "/", name: "Dashboard" },
  { route: "/desert-figures", name: "Desert Figures" },
  { route: "/tags", name: "Tags" },
  // { route: "/icons", name: "Icons" },
];

const SUB_MENU_ITEMS: SubMenuItem[] = [
  { route: "/excerpt/new", name: "Excerpt", icon: "quote" },
  { route: "/desert-figures/new", name: "Desert Figure", icon: "user" },
  { route: "/icons/new", name: "Icon", icon: "image" },
];

export default function NavMenu() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-b-border/60">
      <div className="p-4 text-secondary-foreground w-full max-w-(--breakpoint-2xl) m-auto flex items-center gap-4">
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

        <Separator className="hidden sm:h-4 sm:block" orientation="vertical" />
        <div className="hidden sm:block">
          <AddMenu />
        </div>

        {/* Mobile Nav */}
        <MobileMenu />

        <Separator className="h-4" orientation="vertical" />
        <UserMenu />
      </div>
    </nav>
  );
}

function AddMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Add</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="min-w-32">
              {SUB_MENU_ITEMS.map((item) => (
                <Link key={item.name} href={item.route} legacyBehavior passHref>
                  <NavigationMenuLink className="w-full border border-border p-4 rounded hover:bg-secondary transition mb-2">
                    <NavIconSwitcher name={item.icon} />
                    <p className="mt-2">{item.name}</p>
                  </NavigationMenuLink>
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function UserMenu() {
  const session = useSession();
  const router = useRouter();

  const userInitials = generateUserInitials(session.data?.user.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={session.data?.user.image ?? undefined}
            alt="user image"
            onError={(e) => console.log(e)}
          />
          <AvatarFallback>
            {userInitials ? userInitials : <User />}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {session.status === "authenticated" ? (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/user/admin">
                <ShieldIcon />
                Admin Panel
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/user/content/excerpts">
                <TableOfContents />
                Manage Content
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => {
                signOut({ redirect: false });
                router.push("/");
              }}
            >
              <LogOut />
              Sign Out
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onSelect={() => signIn()}>
            <LogIn />
            Sign In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileMenu() {
  return (
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="w-8 h-8 p-1 rounded-md hover:bg-secondary" />
        </SheetTrigger>
        <SheetContent className="max-w-[400px] w-full">
          <SheetHeader className="h-full">
            <SheetTitle>Desert Collections</SheetTitle>
            <ul className="pt-4">
              {NAV_MENU_ITEMS.map((item) => (
                <li key={item.name} className="w-full text-start py-2">
                  <Link href={item.route}>
                    <SheetClose asChild>
                      <Button variant="ghost" className="w-full justify-start">
                        {item.name}
                      </Button>
                    </SheetClose>
                  </Link>
                </li>
              ))}
            </ul>

            <Separator className="mx-auto mb-2!" />

            <h3 className="pb-4">Contribute</h3>
            {SUB_MENU_ITEMS.map((item) => (
              <Link href={item.route} key={item.name}>
                <SheetClose asChild>
                  <Button className="w-full" variant={"outline"}>
                    <NavIconSwitcher
                      name={item.icon}
                      className="mr-1 p-[2px]"
                    />
                    {item.name}
                  </Button>
                </SheetClose>
              </Link>
            ))}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
