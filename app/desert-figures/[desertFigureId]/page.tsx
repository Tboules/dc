import DefaultLayout from "@/components/layouts/default-layout";

export default async function DesertFigurePage({
  params,
}: {
  params: Promise<{ desertFigureId: string }>;
}) {
  const { desertFigureId } = await params;

  return (
    <DefaultLayout>
      <h1>Desert Figure Page</h1>
      <p>{desertFigureId}</p>
    </DefaultLayout>
  );
}
