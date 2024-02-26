"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Separator } from "../ui/separator";

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
        <div className="hidden sm:flex items-center justify-center gap-8">
          <Link href="/desert_figures">Desert Figures</Link>
          <Link href="/tags">Tags</Link>
          <Link href="/icons">Icons</Link>
        </div>
        <Separator className="h-4" orientation="vertical" />
        <div className="hidden sm:flex items-center gap-4">
          <Link href="/excerpt/new">
            <Button variant={"outline"}>Add</Button>
          </Link>
          <AuthButton />
        </div>
        <Button className="sm:hidden" size="icon" variant={"ghost"}>
          <Menu />
        </Button>
      </div>
    </nav>
  );
}
