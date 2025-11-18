"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";
import EDShareButton from "@/components/excerpt_document_action_buttons/share-button";
import LoveButton from "@/components/excerpt_document_action_buttons/love-button";
import FlagButton from "@/components/excerpt_document_action_buttons/flag-button";

const edActionButtonVariants = cva("flex", {
  variants: {
    variant: {
      card: "justify-between border-t border-border p-4",
      page: "gap-2",
    },
  },
  defaultVariants: {
    variant: "card",
  },
});

export default function ExcerptDocumentActionButtons({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof edActionButtonVariants>) {
  return (
    <div
      className={cn(edActionButtonVariants({ className, variant }))}
      {...props}
    >
      <LoveButton />
      <FlagButton />
      <EDShareButton />
    </div>
  );
}
