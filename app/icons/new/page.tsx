import { serverAuthSession } from "@/lib/utils/auth";
import { redirect } from "next/navigation";

export default async function NewIconPage() {
  const session = await serverAuthSession();
  if (!session) {
    redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent("/icons/new")}`,
    );
  }

  return (
    <div>
      <h1>New Icon Page restricted</h1>
    </div>
  );
}
