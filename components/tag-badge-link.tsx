"use client";
import { Badge } from "@/components/ui/badge";
import { TagFromSelectTagsFunc } from "@/lib/database/handlers/tags";
import Link from "next/link";
import chroma from "chroma-js";
import { RouteLiteral } from "nextjs-routes";

type Props = {
  tag: TagFromSelectTagsFunc;
};

// simple hash → number
function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = str.charCodeAt(i) + ((h << 5) - h);
  }
  return Math.abs(h);
}

// map hash → pleasant colour that still passes contrast check
function colourFromTag(name: string) {
  let col: string;
  let tries = 0;
  do {
    const hue = hash(name + tries) % 360; // rotate hue if contrast fails
    col = chroma.hsl(hue, 0.55, 0.55).hex();
    tries++;

    //just in case of infinite loop
    if (tries > 720) break;
  } while (chroma.contrast(col, "#314158") < 4.5);
  return col;
}

export default function TagBadgeLink({ tag }: Props) {
  const color = colourFromTag(tag.name);
  return (
    <Badge
      asChild
      className={`py-2 px-4 text-md text-slate-700`}
      style={{ backgroundColor: color }}
    >
      <Link href={`/tags/${tag.id}` as RouteLiteral}>{tag.name}</Link>
    </Badge>
  );
}
