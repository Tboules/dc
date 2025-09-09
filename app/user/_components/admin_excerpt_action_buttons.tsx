"use client";

import { Button } from "@/components/ui/button";

export default function AdminExcerptActionButtons() {
  return (
    <div className="flex gap-4 w-full">
      <Button variant="secondary" className="flex-1">
        Reject
      </Button>
      <Button className="flex-1">Accept</Button>
    </div>
  );
}
