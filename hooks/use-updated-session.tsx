import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function useUpdatedSession() {
  const s = useSession();

  useEffect(() => {
    s.update();
  }, []);

  return s;
}
