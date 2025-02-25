"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <Button
        onClick={() => {
          signOut({
            redirect: false,
          });
          router.push("/");
        }}
      >
        Sign Out
      </Button>
    );
  }

  return <Button onClick={() => signIn()}>Sign In</Button>;
}
