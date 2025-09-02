import ExcerptDocumentCard from "@/components/excerpt_document_card";
import DefaultLayout from "@/components/layouts/default-layout";
import { selectDesertFigureDetails } from "@/lib/database/handlers/desert-figures";
import { User } from "lucide-react";

export default async function DesertFigurePage({
  params,
}: {
  params: Promise<{ desertFigureId: string }>;
}) {
  const { desertFigureId } = await params;

  const { desertFigure, desertFigureExcerpts } =
    await selectDesertFigureDetails(desertFigureId);

  return (
    <DefaultLayout>
      <div className="flex gap items-center py-8 gap-4">
        {desertFigure?.thumbnail ? (
          <img
            className="h-24 border border-border rounded"
            src={desertFigure.thumbnail}
            alt="Desert Figure Thumbnail"
          />
        ) : (
          <div className="h-24 bg-card flex px-4 items-center justify-center rounded">
            <User width={32} height={48} />
          </div>
        )}

        <h1 className="text-3xl font-bold uppercase">
          {desertFigure?.fullName}
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        {desertFigureExcerpts.map((excerptDoc) => (
          <ExcerptDocumentCard
            showFigure={false}
            excerptDocument={excerptDoc}
            key={excerptDoc.excerptId}
          />
        ))}
      </div>
    </DefaultLayout>
  );
}
