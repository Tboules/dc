import ExcerptDocument from "@/components/excerpt_document";
import DefaultLayout from "@/components/layouts/default-layout";
import { selectTagExcerpts } from "@/lib/database/handlers/tags";

export default async function TagPage({
  params,
}: {
  params: Promise<{ tagId: string }>;
}) {
  const { tagId } = await params;
  const tagAndExcerpts = await selectTagExcerpts(tagId);

  return (
    <DefaultLayout>
      <section>
        <h1 className="text-3xl font-bold mb-8 uppercase">
          {tagAndExcerpts.tag?.name}{" "}
        </h1>

        <div className="flex flex-col gap-4">
          {tagAndExcerpts.excerpts.map((excerptDoc) => (
            <ExcerptDocument
              excerptDocument={excerptDoc}
              key={excerptDoc.excerptId}
            />
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
