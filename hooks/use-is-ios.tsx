"use client";

import { useEffect, useState } from "react";

export default function useIsIOS() {
  const [isIOS, setIsIOS] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent || "";
    setIsIOS(/iPad|iPhone|iPod/.test(ua));
  }, []);
  return isIOS;
}
