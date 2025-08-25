"use client";

import { Flag, Heart, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import { buildShareButtons, cn } from "@/lib/utils";
import React from "react";
import { PopoverTrigger, Popover, PopoverContent } from "../ui/popover";
import useIsIOS from "@/hooks/use-is-ios";

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

function EDShareButton({ url, title }: ShareData) {
  const [canShare, setCanShare] = React.useState(false);
  const isIOS = useIsIOS();

  React.useEffect(() => {
    if (navigator != undefined && "share" in navigator) {
      setCanShare(navigator.canShare({ url }));
    }
  }, []);

  async function share() {
    try {
      await navigator.share({ url });
    } catch (error) {
      console.error(error);
    }
  }

  if (canShare) {
    return (
      <Button
        onClick={share}
        size="icon"
        variant="secondary"
        className="size-8"
      >
        <Share />
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          onClick={() => console.log("fire fox sucks hehe")}
          size="icon"
          variant="secondary"
          className="size-8"
        >
          <Share />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-40 justify-center items-center grid grid-cols-3 gap-4">
        {buildShareButtons({ url: url ?? "", title: title ?? "", isIOS }).map(
          (button) => (
            <a key={title} target="_blank" rel="noreferrer" href={button.href}>
              <button.icon />
            </a>
          ),
        )}
      </PopoverContent>
    </Popover>
  );
}
