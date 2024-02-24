import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function NewExcerptFormPage() {
  const session = await getServerSession();
  if (!session) {
    redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent("/excerpt/new")}`,
    );
  }

  return (
    <div>
      <h1>New Excerpt Form Page restricted</h1>
    </div>
  );
}
