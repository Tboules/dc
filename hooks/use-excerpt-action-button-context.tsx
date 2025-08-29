"use client";

import { ExcerptDocumentWithLovedInfo } from "@/lib/database/handlers/excerpt-documents";
import { createContext, PropsWithChildren, useContext, useState } from "react";

export type LovedInfo = {
  loveCount: number;
  lovedByUser: boolean;
};

type ExcerptActionButtonCtx = {
  doc: ExcerptDocumentWithLovedInfo;
  lovedInfo: LovedInfo;
  shareData: ShareData;
  toggleLoveInfo: (active: boolean) => void;
};

const ExcerptActionButtonCtx = createContext<ExcerptActionButtonCtx | null>(
  null,
);

export default function ExcerptActionButtonProvider({
  children,
  excerptDoc,
}: PropsWithChildren & { excerptDoc: ExcerptDocumentWithLovedInfo }) {
  const [lovedInfo, setLovedInfo] = useState<LovedInfo>({
    loveCount: excerptDoc.loveCount,
    lovedByUser: excerptDoc.lovedByUser,
  });
  const [shareData, _] = useState<ShareData>({
    title: excerptDoc.excerptTitle,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/excerpt/${excerptDoc.excerptId}`,
  });

  function toggleLoveInfo(active: boolean) {
    if (active) {
      setLovedInfo((v) => ({
        loveCount: v.loveCount + 1,
        lovedByUser: active,
      }));
    }

    if (!active) {
      setLovedInfo((v) => ({
        loveCount: v.loveCount - 1,
        lovedByUser: active,
      }));
    }
  }

  return (
    <ExcerptActionButtonCtx.Provider
      value={{
        doc: excerptDoc,
        lovedInfo,
        shareData,
        toggleLoveInfo,
      }}
    >
      {children}
    </ExcerptActionButtonCtx.Provider>
  );
}

export function useExcerptActionButtonContext() {
  const ctx = useContext(ExcerptActionButtonCtx);
  if (!ctx)
    throw new Error(
      "useExcerptActionButtonContext must be used within provider!",
    );

  return ctx;
}
