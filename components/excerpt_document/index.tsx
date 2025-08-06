import type { ExcerptDocument } from "@/lib/database/schema/views";
import SafeHtmlRenderer from "../safe-html-renderer";
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
    <div className="bg-card rounded p-4 text-card-foreground">
      <h1 className="text-2xl font-bold mb-8">
        {excerptDocument.excerptTitle}
      </h1>
      <div
        className="text-lg mb-8"
        dangerouslySetInnerHTML={{ __html: excerptDocument.excerptBody }}
      />
      <ExportDocumentDesertFigure
        thumbnail={excerptDocument.desertFigureThumbnail}
        name={excerptDocument.desertFigureName}
      />

      <ExportDocumentReference
        title={excerptDocument.referenceTitle}
        source={excerptDocument.referenceSource}
        cover={excerptDocument.referenceCover}
      />
    </div>
  );
}

function ExportDocumentDesertFigure({ thumbnail, name }: DesertFigureEDProps) {
  return (
    <div className="flex gap-2 items-center max-w-48">
      {thumbnail ? (
        <img className="h-24" src={thumbnail} alt="Desert Figure Thumbnail" />
      ) : (
        <div className="h-24 bg-accent flex px-4 items-center justify-center rounded">
          <User width={32} height={48} />
        </div>
      )}
      <h3 className="italic text-lg font-medium">{name}</h3>
    </div>
  );
}

function ExportDocumentReference({ title, cover, source }: ReferenceEDProps) {
  return (
    <div>
      <img src={source ?? ""} />
      <h3>{title}</h3>
      <p>{source}</p>
    </div>
  );
}
