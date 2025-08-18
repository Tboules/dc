"use client";

import { Flag, Heart, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ExcerptDocument } from "@/lib/database/schema/views";

const edActionButtonVariants = cva("flex", {
  variants: {
    variant: {
      card: "justify-between border-t border-border p-4",
      page: "gap-2",
    },
  },
  defaultVariants: {
    variant: "card",
  },
});

export default function ExcerptDocumentActionButtons({
  className,
  variant,
  shareData,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof edActionButtonVariants> & { shareData: ShareData }) {
  return (
    <div
      className={cn(edActionButtonVariants({ className, variant }))}
      {...props}
    >
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
      <EDShareButton {...shareData} />
    </div>
  );
}

function EDShareButton({ url }: ShareData) {
  const navigatorAvailable = navigator?.canShare({ url });

  async function share() {
    try {
      await navigator.share({ url });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Button onClick={share} size="icon" variant="secondary" className="size-8">
      <Share />
    </Button>
  );
}
