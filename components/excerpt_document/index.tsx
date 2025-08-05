import type { ExcerptDocument } from "@/lib/database/schema/views";
import SafeHtmlRenderer from "../safe-html-renderer";

type Props = {
  excerptDocument: ExcerptDocument;
};

export default async function ExcerptDocument({ excerptDocument }: Props) {
  return (
    <div>
      <h1>{excerptDocument.excerptTitle}</h1>
      <div dangerouslySetInnerHTML={{ __html: excerptDocument.excerptBody }} />
    </div>
  );
}
