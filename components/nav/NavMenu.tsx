"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return <Button onClick={() => signOut()}>Sign Out</Button>;
  }

  return <Button onClick={() => signIn()}>Sign In</Button>;
}

export default function NavMenu() {
  return (
    <nav>
      <AuthButton />
    </nav>
  );
}
