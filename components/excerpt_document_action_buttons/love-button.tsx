"use client";

import { LovedInfo } from "@/components/excerpt_document_action_buttons";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function LoveButton({ loveCount, lovedByUser }: LovedInfo) {
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
