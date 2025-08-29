"use client";

import { upsertExcerptLove } from "@/app/excerpt/[excerptId]/action";
import { Button } from "@/components/ui/button";
import { useExcerptActionButtonContext } from "@/hooks/use-excerpt-action-button-context";
import { Heart } from "lucide-react";
import { useServerAction } from "zsa-react";
import useUpdatedSession from "@/hooks/use-updated-session";
import ErrorModal, { useErrorModal } from "@/components/error/error-modal";
import { signIn } from "next-auth/react";

export default function LoveButton() {
  const { data: session } = useUpdatedSession();
  const {
    doc: { excerptId },
    lovedInfo: { loveCount, lovedByUser },
    toggleLoveInfo,
  } = useExcerptActionButtonContext();
  const { isPending, execute } = useServerAction(upsertExcerptLove);
  const { isError, errorState, closeErrorModal, openErrorModal } =
    useErrorModal();

  return (
    <>
      <Button
        disabled={isPending}
        onClick={async () => {
          if (!session || !session.user?.id) {
            return openErrorModal(
              "You need to be logged in to love an excerpt.",
              () => signIn(undefined, { callbackUrl: `/excerpt/${excerptId}` }),
            );
          }

          const [data, err] = await execute({
            userId: session?.user.id,
            excerptId,
            active: !lovedByUser,
          });
          if (err) {
            openErrorModal(err.message);
            return;
          }

          toggleLoveInfo(data.active);
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

      <ErrorModal
        isError={isError}
        closeModal={closeErrorModal}
        message={errorState.message ?? ""}
        resolutionCallback={errorState.resolutionCallback}
      />
    </>
  );
}
