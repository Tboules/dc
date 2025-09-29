"use client";

import { Button } from "@/components/ui/button";
import { refreshDocs } from "../admin/action";

export default function RefreshExcerptDocsButton() {
  return <Button onClick={refreshDocs}>Refresh Published Excerpts</Button>;
}
