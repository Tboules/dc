import { NextPageProps } from "@/@types/next-types";
import FormHeader from "@/components/forms/form-header";
import NewExcerptForm from "@/components/forms/new-excerpt-form";
import DefaultLayout from "@/components/layouts/default-layout";
import { selectDesertFigureById } from "@/lib/database/handlers/desert-figures";
import { handleProtectedRoute } from "@/lib/utils/auth";

export default async function NewExcerptFormPage({
  searchParams,
}: NextPageProps) {
  await handleProtectedRoute("/excerpt/new");

  const { desertFigure } = await searchParams;
  const figure = await selectDesertFigureById(desertFigure as string);

  return (
    <DefaultLayout>
      <FormHeader title="Add an Excerpt" />

      <NewExcerptForm desertFigure={figure} />
    </DefaultLayout>
  );
}
