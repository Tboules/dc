"use client";

import { Badge } from "@/components/ui/badge";
import { TagFromSelectTagsFunc } from "@/lib/database/handlers/tags";
import Link from "next/link";

type Props = {
  tag: TagFromSelectTagsFunc;
};

export default function TagBadgeLink({ tag }: Props) {
  return (
    <Badge>
      <Link href={`/tags`}>{tag.name}</Link>
    </Badge>
  );
}
