import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LiveExcerptsView } from "@/lib/database/schema/views";
import { User } from "lucide-react";
import { publishExcerptAction } from "../admin/action";
import AdminExcerptActionButtons from "./admin_excerpt_action_buttons";

export default function AdminExcerptDocCard(doc: LiveExcerptsView) {
  return (
    <div className="p-4 bg-card rounded">
      <SectionTitle name="Title" />

      <div className="flex justify-between items-center gap-4">
        <h1 className="mb-4 text-2xl font-bold">{doc.excerptTitle}</h1>
        <StatusDisplay status={doc.status} />
      </div>
      <Separator className="my-4" />

      <SectionTitle name="Body" />
      <div
        className="text-xl/8 font-normal tracking-wide"
        dangerouslySetInnerHTML={{ __html: doc.excerptBody }}
      />
      <Separator className="my-4" />

      <SectionTitle name="Tags" />
      {doc.tags.map((tag) => (
        <div
          key={tag.tagID}
          className="flex justify-between items-center gap-4 my-1"
        >
          <h4 className="text-lg font-medium">{tag.tag}</h4>
          <StatusDisplay status={tag.tagStatus ?? ""} />
        </div>
      ))}
      <Separator className="my-4" />

      <SectionTitle name="Desert Figure" />
      <div className="flex justify-between items-center gap-8">
        <div className="mt-2">
          {doc.desertFigureThumbnail ? (
            <img
              className="w-40 h-52 object-cover object-top rounded border border-border"
              src={doc.desertFigureThumbnail}
            />
          ) : (
            <div className="h-52 w-40 flex justify-center items-center bg-accent rounded border border-border">
              <User height={80} width={80} />
            </div>
          )}
          <h4 className="mt-2 text-lg font-medium">{doc.desertFigureName}</h4>
        </div>
        <StatusDisplay status={doc.desertFigureStatus} />
      </div>
      <Separator className="my-4" />

      <SectionTitle name="Reference" />
      {doc.referenceSource ? (
        <h4 className="text-lg font-medium">{doc.referenceTitle}</h4>
      ) : (
        <p>No Reference Added</p>
      )}
      <Separator className="my-4" />

      <AdminExcerptActionButtons {...doc} />
    </div>
  );
}

type SectionTitleProps = {
  name: string;
};

function SectionTitle({ name }: SectionTitleProps) {
  return <h4 className="my-1 opacity-60">{name}:</h4>;
}

function StatusDisplay({ status }: { status: string }) {
  return (
    <div className="py-1 px-2 border border-border rounded">
      <p>{status}</p>
    </div>
  );
}
