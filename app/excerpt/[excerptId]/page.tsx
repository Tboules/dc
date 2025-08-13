import ExcerptDocumentCard from "@/components/excerpt_document_card";
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
      <ExcerptDocumentCard excerptDocument={excerpt} />
    </DefaultLayout>
  );
}
