"use client";

import { Badge } from "@/components/ui/badge";
import { TagFromSelectTagsFunc } from "@/lib/database/handlers/tags";
import Link from "next/link";

type Props = {
  tag: TagFromSelectTagsFunc;
};

export default function TagBadgeLink({ tag }: Props) {
  return (
    <Badge asChild className="py-2 px-4 text-md">
      <Link href={`/`}>{tag.name}</Link>
    </Badge>
  );
}
