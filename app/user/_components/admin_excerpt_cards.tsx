import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LiveExcerptsView } from "@/lib/database/schema/views";

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
        <h4 className="text-lg font-medium">{doc.desertFigureName}</h4>
        <StatusDisplay status={doc.desertFigureStatus} />
      </div>
      <Separator className="my-4" />

      <SectionTitle name="Reference" />
      <h4 className="text-lg font-medium">{doc.referenceTitle}</h4>
      <Separator className="my-4" />

      <div className="flex gap-4 w-full">
        <Button variant="secondary" className="flex-1">
          Reject
        </Button>
        <Button className="flex-1">Accept</Button>
      </div>
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
