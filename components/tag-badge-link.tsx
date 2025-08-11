"use client";
import { Badge } from "@/components/ui/badge";
import { TagFromSelectTagsFunc } from "@/lib/database/handlers/tags";
import Link from "next/link";
import { RouteLiteral } from "nextjs-routes";
import { colourFromTag, cn } from "@/lib/utils";
import type { ClassValue } from "clsx";

type Props = {
  tag: TagFromSelectTagsFunc;
  badgeClassName?: ClassValue;
};

export default function TagBadgeLink({ tag, badgeClassName }: Props) {
  const color = colourFromTag(tag.name);
  return (
    <Badge
      asChild
      className={cn(
        "py-2 px-4 text-md text-slate-700 hover:brightness-90 transition-colors duration-200 ease-in-out",
        badgeClassName,
      )}
      style={{ backgroundColor: color }}
    >
      <Link href={`/tags/${tag.id}` as RouteLiteral}>{tag.name}</Link>
    </Badge>
  );
}
