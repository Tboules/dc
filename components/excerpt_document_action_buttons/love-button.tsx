"use client";

import { upsertExcerptLove } from "@/app/excerpt/[excerptId]/action";
import { Button } from "@/components/ui/button";
import { useExcerptActionButtonContext } from "@/hooks/use-excerpt-action-button-context";
import { Heart } from "lucide-react";
import { useServerAction } from "zsa-react";
import { useSession } from "next-auth/react";
import useUpdatedSession from "@/hooks/use-updated-session";

export default function LoveButton() {
  const { data: session } = useUpdatedSession();
  const {
    doc: { excerptId },
    lovedInfo: { loveCount, lovedByUser },
    toggleLoveInfo,
  } = useExcerptActionButtonContext();

  const { isPending, execute, data } = useServerAction(upsertExcerptLove);

  return (
    <Button
      disabled={isPending}
      onClick={async () => {
        console.log(session);
        if (!session || !session.user?.id) {
          // redirect user
          // need a client side session handler (useProtectedSession)
          // put it in that above updated session func
          return;
        }

        console.log(session.user.id);

        const [data, err] = await execute({
          userId: session?.user.id,
          excerptId,
          active: !lovedByUser,
        });
        if (err) {
          console.log(err);
          return;
        }

        toggleLoveInfo(data.active);
        console.log(data);
      }}
      size="icon"
      variant="secondary"
      className="h-8 w-min px-2"
    >
      <div className="flex gap-2 items-center">
        <Heart color={lovedByUser ? "#ffa2a2" : undefined} />
        <p className={lovedByUser ? "text-red-300" : ""}>{loveCount}</p>{" "}
      </div>
    </Button>
  );
}
