"use client";

import React from "react";
import useIsIOS from "@/hooks/use-is-ios";
import {
  FacebookLogo,
  GoogleLogo,
  IMessageLogo,
  TwitterLogo,
  WhatsAppLogo,
} from "@/components/svg/share-button-logos";
import { Linkedin, Mail, Share } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";

export default function EDShareButton({ url, title }: ShareData) {
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
        <Button size="icon" variant="secondary" className="size-8">
          <Share />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-40 justify-center items-center grid grid-cols-3 gap-4">
        {buildShareButtons({ url: url ?? "", title: title ?? "", isIOS }).map(
          (button) => (
            <a key={url} target="_blank" rel="noreferrer" href={button.href}>
              <button.icon />
            </a>
          ),
        )}
      </PopoverContent>
    </Popover>
  );
}

type BuildShareButtonProps = {
  url: string;
  title: string;
  isIOS: boolean;
};

export function buildShareButtons({
  url,
  title,
  isIOS,
}: BuildShareButtonProps) {
  const u = encodeURIComponent(url);
  const uriTitle = encodeURIComponent(title);

  const smsHref = isIOS ? `sms:&body=${u}` : `sms:?body=${uriTitle}%20${u}`;

  return [
    {
      icon: isIOS ? IMessageLogo : GoogleLogo,
      href: smsHref,
      name: "Messages",
    },
    {
      icon: Mail,
      href: `mailto:?subject=${uriTitle}&body=${u}`,
      name: "Email",
    },
    {
      icon: WhatsAppLogo,
      href: `https://wa.me/?text=${uriTitle}%20${u}`,
      name: "What's App",
    },
    {
      icon: FacebookLogo,
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      name: "Facebook",
    },
    {
      icon: TwitterLogo,
      href: `https://twitter.com/intent/tweet?text=${uriTitle}&url=${u}`,
      name: "Twitter",
    },
    {
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      name: "Linked In",
    },
  ];
}
