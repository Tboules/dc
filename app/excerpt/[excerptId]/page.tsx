import ExcerptDocument from "@/components/excerpt_document";
import DefaultLayout from "@/components/layouts/default-layout";
import { handleSelectExcerptById } from "@/lib/database/handlers/excerpts";

export default async function ExcerptPage({
  params,
}: {
  params: Promise<{ excerptId: string }>;
}) {
  const { excerptId } = await params;

  const excerpt = await handleSelectExcerptById(excerptId);

  return (
    <DefaultLayout>
      <ExcerptDocument excerptDocument={excerpt} />
    </DefaultLayout>
  );
}
