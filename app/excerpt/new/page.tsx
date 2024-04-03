import FindFigureDialogue from "@/components/find-figure-dialog";
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
    <div className="max-w-screen-xl flex flex-col items-center m-auto p-4">
      <FindFigureDialogue />
    </div>
  );
}
