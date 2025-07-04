import { NextPageProps } from "@/@types/next-types";
import DefaultLayout from "@/components/layouts/default-layout";

export default async function TagPage({
  params,
}: {
  params: Promise<{ tagId: string }>;
}) {
  const { tagId } = await params;

  return (
    <DefaultLayout>
      <section>
        <h1>tag page </h1>
        <p>find tag at {tagId}</p>
      </section>
    </DefaultLayout>
  );
}
