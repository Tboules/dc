"use client";

import { createContext, PropsWithChildren, useContext } from "react";

export type LovedInfo = {
  loveCount: number;
  lovedByUser: boolean;
};

type ExcerptActionButtonCtx = {
  lovedInfo: LovedInfo;
  shareData: ShareData;
};

const ExcerptActionButtonCtx = createContext<ExcerptActionButtonCtx | null>(
  null,
);

export default function ExcerptActionButtonProvider({
  children,
  value,
}: PropsWithChildren & { value: ExcerptActionButtonCtx }) {
  return (
    <ExcerptActionButtonCtx.Provider value={value}>
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
