import { NextJsPageProps } from "@/@types";
import FindFigureDialogue from "@/components/find-figure-dialog";
import { selectDesertFigureById } from "@/lib/database/handlers/desert-figures";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function NewExcerptFormPage({
  searchParams,
}: NextJsPageProps) {
  const session = await getServerSession();
  if (!session) {
    redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent("/excerpt/new")}`,
    );
  }

  const figureId = searchParams["desertFigure"] as string;
  const desertFigure = await selectDesertFigureById(figureId);

  console.log(desertFigure);

  return (
    <div className="max-w-screen-xl flex flex-col items-center m-auto p-4">
      <FindFigureDialogue />
    </div>
  );
}
