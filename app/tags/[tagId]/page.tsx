import DefaultLayout from "@/components/layouts/default-layout";
import { selectTagExcerpts } from "@/lib/database/handlers/tags";

export default async function TagPage({
  params,
}: {
  params: Promise<{ tagId: string }>;
}) {
  const { tagId } = await params;
  const tag = await selectTagExcerpts(tagId);

  return (
    <DefaultLayout>
      <section>
        <h1>tag page </h1>
        <pre>{JSON.stringify(tag, null, 2)}</pre>
      </section>
    </DefaultLayout>
  );
}
