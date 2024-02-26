"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return <Button onClick={() => signOut()}>Sign Out</Button>;
  }

  return <Button onClick={() => signIn()}>Sign In</Button>;
}

export default function NavMenu() {
  return (
    <nav className="w-full">
      <div className="p-4 bg-secondary text-secondary-foreground w-full max-w-screen-xl m-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-lg font-semibold">Desert Collections</h1>
        </Link>
        <div className="flex items-center flex-1 justify-center gap-4">
          <Link href="/desert_figures">Desert Figures</Link>
          <Link href="/tags">tags</Link>
          <Link href="/icons">icons</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/excerpt/new">
            <Button variant={"outline"}>Add</Button>
          </Link>
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
