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
        <h1>{tagAndExcerpts.tag?.name} </h1>
        <pre>{JSON.stringify(tagAndExcerpts.excerpts, null, 2)}</pre>
      </section>
    </DefaultLayout>
  );
}
