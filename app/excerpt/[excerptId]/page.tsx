import { ExcerptDocumentTags } from "@/components/excerpt_document_card";
import ExcerptDocumentActionButtons from "@/components/excerpt_document_card/ed_action_buttons";
import { Separator } from "@/components/ui/separator";
import { handleSelectExcerptById } from "@/lib/database/handlers/excerpts";
import type { ExcerptDocumentDesertFigure } from "@/lib/database/schema/views";
import { NAV_HEIGHT } from "@/lib/utils/constants";

export default async function ExcerptPage({
  params,
}: {
  params: Promise<{ excerptId: string }>;
}) {
  const { excerptId } = await params;

  const excerpt = await handleSelectExcerptById(excerptId);

  return (
    <div className="flex flex-col md:flex-row max-w-(--breakpoint-lg) mx-auto relative">
      {/*Section Containing Title, Action Buttons, Body*/}
      <section className="p-4 flex-3">
        <div className="md:flex justify-between mb-8">
          <h1 className="font-bold text-2xl mr-8 mb-4 md:mb-0">
            {excerpt.excerptTitle}
          </h1>
          <div className="max-w-40">
            <ExcerptDocumentActionButtons variant={"page"} />
          </div>
        </div>

        <div
          className="text-lg"
          dangerouslySetInnerHTML={{ __html: excerpt.excerptBody }}
        />
      </section>

      <ResponsiveSeperators />

      {/*Section Containing Tags, Desert Figure, and Reference*/}
      <section className="flex-1 p-4 flex flex-col gap-8">
        <div>
          <h3 className="text-xl font-medium mb-4">Tags:</h3>
          <ExcerptDocumentTags tags={excerpt.tags} />
        </div>
        <div>
          <h3 className="text-xl font-medium mb-4">Desert Figure:</h3>
          <ExcerptPageDesertFigure {...excerpt} />
        </div>
        <div>
          <h3 className="text-xl font-medium mb-4">Reference:</h3>
          <ExcerptDocumentTags tags={excerpt.tags} />
        </div>
      </section>
    </div>
  );
}

function ResponsiveSeperators() {
  return (
    <>
      <Separator
        className={`hidden md:block h-[calc(100vh-${NAV_HEIGHT})]! w-1`}
        orientation="vertical"
      />
      <Separator className="block md:hidden" />
    </>
  );
}

function ExcerptPageDesertFigure(df: ExcerptDocumentDesertFigure) {
  return (
    <div>
      <img src={df.desertFigureThumbnail ?? ""} alt="Desert Figure Thumbnail" />
      <h4>{df.desertFigureName}</h4>
    </div>
  );
}
