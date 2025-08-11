"use client";

import { Flag, Heart, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExcerptDocumentFooter() {
  return (
    <div className="flex justify-between p-4 border-t border-border">
      <Button
        onClick={() => console.log("clicked")}
        size="icon"
        variant="secondary"
        className="size-8"
      >
        <Heart />
      </Button>
      <Button size="icon" variant="secondary" className="size-8">
        <Flag />
      </Button>
      <Button size="icon" variant="secondary" className="size-8">
        <Share />
      </Button>
    </div>
  );
}
