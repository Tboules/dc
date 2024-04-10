import { NextJsPageProps } from "@/@types";
import FindFigureDialogue from "@/components/find-figure-dialog";
import FormHeader from "@/components/forms/form-header";
import NewExcerptForm from "@/components/forms/new-excerpt-form";
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

  return (
    <div className="md:p-4 p-2 max-w-screen-lg mx-auto">
      <FormHeader title="Add an Excerpt" />

      <NewExcerptForm />
    </div>
  );
}
