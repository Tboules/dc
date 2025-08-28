"use client";

import { Button } from "@/components/ui/button";
import { useExcerptActionButtonContext } from "@/hooks/use-excerpt-action-button-context";
import { Heart } from "lucide-react";

export default function LoveButton() {
  const {
    lovedInfo: { loveCount, lovedByUser },
  } = useExcerptActionButtonContext();

  return (
    <Button
      onClick={() => console.log("clicked")}
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
