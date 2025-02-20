import PostFigureForm from "@/components/forms/post-figure";
import { serverAuthSession } from "@/lib/utils/auth";
import { redirect } from "next/navigation";

export default async function NewDesertFigurePage() {
  const session = await serverAuthSession();
  if (!session) {
    redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent("/desert-figures/new")}`,
    );
  }

  return (
    <div className="max-w-screen-xl flex flex-col items-center m-auto p-4">
      <PostFigureForm />
    </div>
  );
}
