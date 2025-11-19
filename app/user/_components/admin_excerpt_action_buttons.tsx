"use client";

import { Button } from "@/components/ui/button";
import { LiveExcerptsView } from "@/lib/database/schema/views";
import { CONTENT_STATUS } from "@/lib/enums";
import { PublishExcerptSchema } from "@/lib/schemas";
import { useMemo } from "react";
import { useServerAction } from "zsa-react";
import { publishExcerptAction } from "../admin/action";

export default function AdminExcerptActionButtons(doc: LiveExcerptsView) {
  const actionInput = useMemo<PublishExcerptSchema>(() => {
    return {
      excerptId: doc.excerptId,
      desertFigureId:
        doc.desertFigureStatus == CONTENT_STATUS.PUBLISHED
          ? undefined
          : doc.desertFigureId,
      tags: doc.tags.reduce((a, tag) => {
        if (tag.tagStatus != CONTENT_STATUS.PUBLISHED) {
          a.push(tag.tagID);
        }
        return a;
      }, [] as string[]),
      status: "Published",
    };
  }, []);

  const { execute } = useServerAction(publishExcerptAction);

  return (
    <div className="flex gap-4 w-full">
      <Button
        onClick={() => execute({ ...actionInput, status: "Rejected" })}
        variant="secondary"
        className="flex-1"
      >
        Reject
      </Button>
      <Button onClick={() => execute(actionInput)} className="flex-1">
        Accept
      </Button>
    </div>
  );
}
