import type { ExcerptDocument, Tag } from "@/lib/database/schema/views";
import TagBadgeLink from "../tag-badge-link";
import ExcerptDocumentFooter from "./ed_footer_buttons";
import { User } from "lucide-react";

type Props = {
  excerptDocument: ExcerptDocument;
};

type DesertFigureEDProps = {
  name: string;
  thumbnail?: string;
};

type ReferenceEDProps = {
  title?: string;
  cover?: string;
  source?: string;
};

export default async function ExcerptDocument({ excerptDocument }: Props) {
  return (
    <div className="bg-card rounded text-card-foreground border border-border">
      <div className="sm:flex p-4 justify-between items-center bg-secondary border-b border-border">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">
          {excerptDocument.excerptTitle}
        </h1>
        <ExcerptDocumentTags tags={excerptDocument.tags} />
      </div>

      <div
        className="text-xl p-4"
        dangerouslySetInnerHTML={{ __html: excerptDocument.excerptBody }}
      />

      <div className="sm:flex justify-between p-4 gap-4 ">
        <ExcerptDocumentDesertFigure
          thumbnail={excerptDocument.desertFigureThumbnail}
          name={excerptDocument.desertFigureName}
        />

        <ExcerptDocumentReference
          title={excerptDocument.referenceTitle}
          source={excerptDocument.referenceSource}
          cover={excerptDocument.referenceCover}
        />
      </div>
      <ExcerptDocumentFooter />
    </div>
  );
}

function ExcerptDocumentTags({ tags }: { tags: Tag[] }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((t) => (
        <TagBadgeLink
          key={t.tagID}
          badgeClassName="h-8 px-2"
          tag={{ name: t.tag, id: t.tagID }}
        />
      ))}
    </div>
  );
}

function ExcerptDocumentDesertFigure({ thumbnail, name }: DesertFigureEDProps) {
  return (
    <div className="bg-secondary rounded p-2 border border-border flex gap-4 items-center sm:mb-0 mb-4 flex-1 sm:max-w-64">
      {thumbnail ? (
        <img
          className="h-24 border border-border rounded"
          src={thumbnail}
          alt="Desert Figure Thumbnail"
        />
      ) : (
        <div className="h-24 bg-accent flex px-4 items-center justify-center rounded">
          <User width={32} height={48} />
        </div>
      )}
      <h3 className="italic text-lg font-medium">{name}</h3>
    </div>
  );
}

function ExcerptDocumentReference({ title, cover, source }: ReferenceEDProps) {
  return (
    <div className="bg-secondary rounded p-2 border border-border justify-end flex gap-4 items-center flex-1 sm:max-w-64">
      <div className="text-right">
        <h3 className="italic text-lg font-medium">{title}</h3>
        <a href={source} target="_blank" className="text-ring  hover:underline">
          More Info
        </a>
      </div>
      <img className="h-24" src={cover ?? ""} />
    </div>
  );
}
