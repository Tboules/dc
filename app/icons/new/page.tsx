import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function NewIconPage() {
  const session = await getServerSession();
  if (!session) {
    redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent("/excerpt/new")}`,
    );
  }

  return (
    <div>
      <h1>New Icon Page restricted</h1>
    </div>
  );
}
