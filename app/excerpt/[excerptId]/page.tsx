import { ExcerptDocumentTags } from "@/components/excerpt_document_card";
import ExcerptDocumentActionButtons from "@/components/excerpt_document_action_buttons";
import { Separator } from "@/components/ui/separator";
import { handleSelectExcerptById } from "@/lib/database/handlers/excerpts";
import type {
  ExcerptDocumentDesertFigure,
  ExcerptDocumentReference,
} from "@/lib/database/schema/views";
import Link from "next/link";
import { RouteLiteral } from "nextjs-routes";
import { BookOpenText } from "lucide-react";
import { cache } from "react";
import { convert } from "html-to-text";
import { DEFAULT_OG_PATH } from "@/lib/constants";

type PageProps = {
  params: Promise<{ excerptId: string }>;
};

const getExcerptByIdCached = cache((id: string) => handleSelectExcerptById(id));

// Look up how ISR works and if it's a good fit for these pages?
export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps) {
  const { excerptId } = await params;
  const excerpt = await getExcerptByIdCached(excerptId);

  const title = "Desert Fathers and Mothers | " + excerpt.excerptTitle;
  const description = convert(excerpt.excerptBody).slice(0, 160);
  const ogImage = excerpt.desertFigureThumbnail ?? DEFAULT_OG_PATH;
  const canonical = `/excerpt/${excerptId}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      siteName: "Desert Collections",
      url: canonical,
      locale: "en_US",
      type: "article",
      images: ogImage
        ? [{ url: ogImage, alt: "Desert Figure Image" }]
        : undefined,
      tags: excerpt.tags.map((t) => t.tag),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function ExcerptPage({ params }: PageProps) {
  const { excerptId } = await params;

  const excerpt = await getExcerptByIdCached(excerptId);

  return (
    <div className="flex flex-col md:flex-row max-w-(--breakpoint-lg) mx-auto relative">
      {/*Section Containing Title, Action Buttons, Body*/}
      <section className="p-4 mt-4 flex-3">
        <div className="md:flex justify-between mb-8">
          <h1 className="font-bold text-3xl mr-8 mb-4 md:mb-0">
            {excerpt.excerptTitle}
          </h1>
          <div className="max-w-40">
            <ExcerptDocumentActionButtons
              lovedInfo={{
                loveCount: excerpt.loveCount,
                lovedByUser: excerpt.lovedByUser,
              }}
              variant={"page"}
              shareData={{
                title: excerpt.excerptTitle,
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/excerpt/${excerptId}`,
              }}
            />
          </div>
        </div>

        <div
          className="text-xl/8 font-normal tracking-wide"
          dangerouslySetInnerHTML={{ __html: excerpt.excerptBody }}
        />
      </section>

      <ResponsiveSeperators />

      {/*Section Containing Tags, Desert Figure, and Reference*/}
      <section className="flex-1 p-4 mt-4 flex flex-col gap-8">
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
          <ExcerptPageReference {...excerpt} />
        </div>
      </section>
    </div>
  );
}

function ResponsiveSeperators() {
  return (
    <>
      <Separator
        className="hidden md:block h-[calc(100lvh-var(--nav-height))]!"
        orientation="vertical"
      />
      <Separator className="block md:hidden" />
    </>
  );
}

function ExcerptPageDesertFigure(df: ExcerptDocumentDesertFigure) {
  return (
    <Link
      href={`/desert-figures/${df.desertFigureId}` as RouteLiteral}
      className="border border-border rounded overflow-hidden bg-card block hover:bg-accent max-w-96"
    >
      <img
        className="w-full"
        src={df.desertFigureThumbnail ?? ""}
        alt="Desert Figure Thumbnail"
      />
      <h4 className="py-4 px-2 text-lg text-center font-medium">
        {df.desertFigureName}
      </h4>
    </Link>
  );
}

function ExcerptPageReference(ref: ExcerptDocumentReference) {
  if (!ref.referenceId && !ref.referenceSource) return;

  if (!ref.referenceId && ref.referenceSource) {
    return (
      <a
        href={ref.referenceSource}
        target="_blank"
        className="bg-card hover:bg-accent rounded p-2 border border-border flex gap-4 items-center max-w-96"
      >
        <div className="h-24 bg-background border border-border flex px-4 items-center justify-center rounded">
          <BookOpenText width={32} height={48} />
        </div>
        <div>
          <h3 className="italic text-lg font-medium">Read the Article!</h3>
        </div>
      </a>
    );
  }

  return (
    <a
      href={ref.referenceSource}
      target="_blank"
      className="bg-card hover:bg-accent rounded p-2 border border-border flex gap-4 items-center max-w-96"
    >
      <img className="h-32" src={ref.referenceCover ?? ""} />
      <div>
        <h3 className="italic text-lg font-medium">{ref.referenceTitle}</h3>
      </div>
    </a>
  );
}
