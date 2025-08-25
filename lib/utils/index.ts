import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { uuidv4Regex } from "./regex";
import { Params } from "@/@types/forms";
import {
  DesertFigure,
  DesertFigureDirectInsert,
  NewDesertFigure,
} from "../database/schema/desertFigures";
import { DESERT_FIGURE_TITLE } from "../enums";
import chroma from "chroma-js";
import { Linkedin, Mail } from "lucide-react";
import {
  FacebookLogo,
  GoogleLogo,
  IMessageLogo,
  TwitterLogo,
  WhatsAppLogo,
} from "@/components/svg/share-button-logos";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pullUuidFromUrl(url: string) {
  const match = url.match(uuidv4Regex);

  if (match) {
    return match[0];
  }
}

export function getAllParams(entries: IterableIterator<[string, string]>) {
  let params: Params = {};

  Array.from(entries).forEach(([key, value]) => {
    params[key] = value;
  });

  return params;
}

export function generateDesertFigureFullname(
  figure: DesertFigureDirectInsert | NewDesertFigure | DesertFigure,
) {
  let fullname = figure.firstName;

  if (figure.title && figure.title != DESERT_FIGURE_TITLE.NONE) {
    fullname = figure.title + " " + fullname;
  }

  if (figure.lastName) {
    fullname += ` ${figure.lastName}`;
  }

  if (figure.epithet) {
    fullname += ` ${figure.epithet}`;
  }

  return fullname;
}

// make sure values come through as null in the DB rather than empty string
export function normalizeStringToNull(s: string) {
  if (s === "") return null;

  return s;
}

export function generateUserInitials(name: string | null | undefined) {
  if (!name) return null;

  const nameArray = name.trim().split(" ");

  if (nameArray.length > 1) {
    return nameArray[0][0] + nameArray[nameArray.length - 1][0];
  }

  return nameArray[0][0];
}

export function generateHash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = str.charCodeAt(i) + ((h << 5) - h);
  }
  return Math.abs(h);
}

export function colourFromTag(name: string) {
  let col: string;
  let tries = 0;
  do {
    const hue = generateHash(name + tries) % 360; // rotate hue if contrast fails
    col = chroma.hsl(hue, 0.55, 0.55).hex();
    tries++;

    //just in case of infinite loop
    if (tries > 720) break;
  } while (chroma.contrast(col, "#314158") < 4.5);
  return col;
}

export function truncateString(string: string, maxLength: number) {
  if (!string || string.length < maxLength) return string;

  let cutLength = string.lastIndexOf(" ", maxLength);

  if (cutLength == -1) {
    cutLength = maxLength;
  }

  return string.substring(0, cutLength) + "...";
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
