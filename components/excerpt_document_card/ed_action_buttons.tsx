"use client";

import {
  Facebook,
  Flag,
  Heart,
  Linkedin,
  Mail,
  MessageCircle,
  MessagesSquare,
  Share,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ExcerptDocument } from "@/lib/database/schema/views";
import React from "react";
import { PopoverTrigger, Popover, PopoverContent } from "../ui/popover";

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
  const [canShare, setCanShare] = React.useState(false);

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
        {/* Messges */}
        <a href="/" target="_blank" rel="noreferrer">
          <Button size="icon" variant="secondary" className="size-8">
            <MessagesSquare />
          </Button>
        </a>
        {/* Email */}
        <a href="/" target="_blank" rel="noreferrer">
          <Button size="icon" variant="secondary" className="size-8">
            <Mail />
          </Button>
        </a>
        {/* What's App */}
        <a href="/" target="_blank" rel="noreferrer">
          <Button size="icon" variant="secondary" className="size-8">
            <MessageCircle />
          </Button>
        </a>
        {/* Facebook */}
        <a href="/" target="_blank" rel="noreferrer">
          <Button size="icon" variant="secondary" className="size-8">
            <Facebook />
          </Button>
        </a>
        {/* Linked In */}
        <a href="/" target="_blank" rel="noreferrer">
          <Button size="icon" variant="secondary" className="size-8">
            <Linkedin />
          </Button>
        </a>
        {/* Twitter */}
        <a href="/" target="_blank" rel="noreferrer">
          <Button size="icon" variant="secondary" className="size-8">
            <Twitter />
          </Button>
        </a>
      </PopoverContent>
    </Popover>
  );
}

// going to do something like this but gonna grab the url via usePathname and process.env.NEXT_PUBLIC_SITE_URL
// function buildShareTargets({ title, url, text }: { title: string; url: string; text?: string }) {
//   const u = encodeURIComponent(url);
//   const t = encodeURIComponent(title);
//   const msg = encodeURIComponent(text ?? title); // not used for iOS SMS but fine for others
//
//   const isIOS =
//     typeof navigator !== "undefined" &&
//     /iPad|iPhone|iPod/.test(navigator.userAgent);
//
//   // For iMessage: body should be *just the URL* for best preview
//   const smsBodyIOS = encodeURIComponent(url);
//   const smsHref = isIOS
//     ? `sms:&body=${smsBodyIOS}`   // iOS uses "&body="
//     : `sms:?body=${msg}%20${u}`;  // Android accepts "?body=" and allows text
//
//   return [
//     { name: "Messages", href: smsHref },
//     { name: "WhatsApp", href: `https://wa.me/?text=${msg}%20${u}` },
//     { name: "Telegram", href: `https://t.me/share/url?url=${u}&text=${msg}` },
//     { name: "X (Twitter)", href: `https://twitter.com/intent/tweet?text=${msg}&url=${u}` },
//     { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
//     { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
//     { name: "Reddit", href: `https://www.reddit.com/submit?url=${u}&title=${t}` },
//     { name: "Email", href: `mailto:?subject=${t}&body=${u}` },
//   ];
// }
