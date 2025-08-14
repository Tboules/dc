import ExcerptDocumentActionButtons from "@/components/excerpt_document_card/ed_action_buttons";
import { Separator } from "@/components/ui/separator";
import { handleSelectExcerptById } from "@/lib/database/handlers/excerpts";
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
        <div className="flex justify-between items-center flex-wrap">
          <h1>{excerpt.excerptTitle}</h1>
          <div className="max-w-40">
            <ExcerptDocumentActionButtons variant={"page"} />
          </div>
        </div>
      </section>

      <ResponsiveSeperators />

      {/*Section Containing Tags, Desert Figure, and Reference*/}
      <section className="flex-1 p-4">
        <h1>This section will have info, author, tags, ref, etc.</h1>
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
