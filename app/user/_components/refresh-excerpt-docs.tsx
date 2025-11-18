"use client";

import { Button } from "@/components/ui/button";
import { refreshDocs } from "../admin/action";
import React from "react";
import { Spinner } from "@/components/ui/spinner";

export default function RefreshExcerptDocsButton() {
  const [loading, setLoading] = React.useState<boolean>(false);

  async function refreshMaterializedView() {
    setLoading(true);
    console.log(loading);
    await refreshDocs();
    setLoading(false);
  }

  return (
    <Button disabled={loading} onClick={refreshMaterializedView}>
      Refresh Published Excerpts
      {loading && <Spinner />}
    </Button>
  );
}
